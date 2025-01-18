// fixtures/test.fixture.ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login/login.page";

type Fixtures = {
  loginPage: LoginPage;
  useSmallScreen: boolean;
  language: string;
  listenForApi: boolean;
  storageStatePath: string | undefined;
};

export const test = base.extend<Fixtures>({
  // Base options
  storageStatePath: [undefined, { scope: "test", option: true }],
  useSmallScreen: [false, { scope: "test", option: true }],
  language: ["pl", { scope: "test", option: true }],
  listenForApi: [false, { scope: "test", option: true }],

  loginPage: async ({ browser, useSmallScreen, language, listenForApi, storageStatePath }, use) => {
    const contextOptions = storageStatePath ? { storageState: storageStatePath } : {};
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined");
    }
    await page.goto(process.env.BASE_URL, { waitUntil: "commit" });
    // dodany waitUntil commit zeby uniknąć błędu na webkicie "navigation interrupted by a new navigation"
    await page.evaluate((lng) => {
      localStorage.setItem("i18nextLng", lng);
    }, language);

    if (useSmallScreen) {
      await page.setViewportSize({ width: 375, height: 667 });
    }

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage(process.env.BASE_URL);

    if (listenForApi) {
      page.on("response", async (response) => {
        if (response.url().includes("/int/login")) {
          loginPage.responseStatus = response.status();
        }
      });
    }

    await use(loginPage);
    await context.close();
  },
});

export { expect } from "@playwright/test";
