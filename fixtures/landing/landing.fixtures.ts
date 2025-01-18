import { test as base } from "@playwright/test";
import { LandingPage } from "../../pageObjects/landing/landing.page";

type Fixtures = {
  landingPage: LandingPage;
  useSmallScreen: boolean;
}

export const test = base.extend<Fixtures>({
  useSmallScreen: [false, { scope: "test", option: true }],

  landingPage: async ({ browser, useSmallScreen}, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined");
    }

    await page.goto(process.env.BASE_URL, { waitUntil: "commit" });

    if (useSmallScreen) {
      await page.setViewportSize({ width: 375, height: 667 });
    }

    const landingPage = new LandingPage(page);
    await landingPage.navigateToLandingPage(process.env.BASE_URL);

    await use(landingPage);
    await context.close()
  },
});

export { expect } from "@playwright/test";
