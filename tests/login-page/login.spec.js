import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login/login.page";
import {
  CORRECT_LOGIN_DATA,
  WRONG_LOGIN_DATA,
  WRONG_EMAIL_DATA,
  WRONG_PASSWORD_DATA,
  EMPTY_EMAIL_DATA,
  EMPTY_PASSWORD_DATA,
  WRONG_EMAIL_FORMAT_DATA,
  WRONG_PASSWORD_FORMAT_DATA,
} from "../../testingData/login/login_data";

const baseURL = process.env.BASE_URL;

// Do poprawnego uruchomienia sekcji login scenarios należy wygenerować plik auth.json oraz incorrect_auth.json
// incorect_auth.json tworzymy ręcznie manipulując wartością authToken, refreshToken, oraz wartościami w cookiesach

async function setupPage(browser, listenForApiCall = false, useSmallScreen = false, lng = "pl") {
  const localStorage = { i18nextLng: lng };
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${baseURL}`);
  await page.evaluate((lng) => {
    localStorage.setItem("i18nextLng", lng);
  }, lng);
  if (useSmallScreen) {
    await page.setViewportSize({ width: 375, height: 667 });
  }
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(`${baseURL}`);
  if (listenForApiCall) {
    // page.on('request', request => {
    //   if (request.url().includes('/int/login')) {
    //     console.log(`Request url for ${request.url()}: ${request.method()}`);
    //     console.log(`Request headers:`, request.headers());
    //   }
    // });
    page.on("response", async (response) => {
      if (response.url().includes("/int/login")) {
        console.log(`Response status for ${response.url()}: ${response.status()}`);
        loginPage.responseStatus = response.status();
        // const responseBody = await response.json();
        // console.log(`Treść odpowiedzi:`, responseBody);
      }
    });
  }
  return loginPage;
}
async function setupPageWithStorageState(browser, path = "./auth.json") {
  const context = await browser.newContext({
    storageState: path,
  });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(`${baseURL}`);
  return loginPage;
}

test.describe("Login Page - page details", () => {
  test("has the correct title", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toBe("Logowanie | System AML");
  });
  test("has only one heading", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    const h1Count = await loginPage.getElementsCountByLocator("h1");
    expect(h1Count).toBe(1);
  });
  test("heading has correct pl text", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    const headingText = await loginPage.getHeadingText();
    expect(headingText).toMatch(/Zaloguj się/);
  });
  test("heading has correct en text", async ({ browser }) => {
    const loginPage = await setupPage(browser, false, false, "en");
    const headingText = await loginPage.getHeadingText();
    expect(headingText).toMatch(/Log in/);
  });
  test("is lng change button working", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    const headingTextBeforeLngChange = await loginPage.getHeadingText();
    console.log("heading text before change", headingTextBeforeLngChange);
    await loginPage.clickButtonById("#lng-en");
    const headingTextAfterLngChange = await loginPage.getHeadingText();
    console.log("heading text after change", headingTextAfterLngChange);
    expect(headingTextBeforeLngChange).not.toBe(headingTextAfterLngChange);
  });
  test("is theme change working", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    const colorBeforeThemeChange = await loginPage.getHeadingBgColor();
    console.log("heading bg color before change", colorBeforeThemeChange);
    await loginPage.clickButtonById("#footer-theme-switch");
    const colorAfterThemeChange = await loginPage.getHeadingBgColor();
    console.log("heading bg color after change", colorAfterThemeChange);
    expect(colorBeforeThemeChange).not.toBe(colorAfterThemeChange);
  });
  test("is go to reset password page button working", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    //dziala na chromie
    // let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#go-to-reset-password-btn", false);
    //działa na firefoxie i webkicie
    let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#go-to-reset-password-btn");
    expect(newPageURL).toBe(`${baseURL}/user/reset-password/`);
  });
  test("is go to register page button working", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#go-to-register-btn");
    expect(newPageURL).toBe(`${baseURL}/user/register/`);
  });
});

test.describe("Login Page - login scenarios", () => {
  test("is login possible with correct credentials", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(CORRECT_LOGIN_DATA);
    let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#login-submit-btn");
    expect(newPageURL).toBe(`${baseURL}/dashboard/`);
    expect(loginPage.responseStatus).toBe(200);
  });
  test("is login possible with incorrect credentials", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(WRONG_LOGIN_DATA);
    let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#login-submit-btn");
    expect(newPageURL).not.toBe(`${baseURL}/dashboard/`);
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
    // let errorText = await loginPage.getLocatorTextById("#login-general-error");
    // expect(errorText).toBe("Błędne dane uwierzytelniające");
    expect(loginPage.responseStatus).toBe(401);
  });
  test("is login possible with incorrect email", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(WRONG_EMAIL_DATA);
    let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#login-submit-btn");
    expect(newPageURL).not.toBe(`${baseURL}/dashboard/`);
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
    expect(loginPage.responseStatus).toBe(401);
  });
  test("is login possible with incorrect password", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(WRONG_PASSWORD_DATA);
    let newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#login-submit-btn");
    expect(newPageURL).not.toBe(`${baseURL}/dashboard/`);
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
    expect(loginPage.responseStatus).toBe(401);
  });
  test("is login possible with empty credentials", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm({ email: "", password: "" });
    let isLocatorDisabled = await loginPage.isLocatorDisabled("#login-submit-btn");
    expect(isLocatorDisabled).toBeTruthy();
  });
  test("is login possible with empty password", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(EMPTY_PASSWORD_DATA);
    let isLocatorDisabled = await loginPage.isLocatorDisabled("#login-submit-btn");
    expect(isLocatorDisabled).toBeTruthy();
  });
  test("is login possible with empty email", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(EMPTY_EMAIL_DATA);
    let isLocatorDisabled = await loginPage.isLocatorDisabled("#login-submit-btn");
    expect(isLocatorDisabled).toBeTruthy();
  });
  test("is login possible with incorrect email format", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(WRONG_EMAIL_FORMAT_DATA);
    let isLocatorDisabled = await loginPage.isLocatorDisabled("#login-submit-btn");
    expect(isLocatorDisabled).toBeTruthy();
  });
  test("is login possible with incorrect password format", async ({ browser }) => {
    const loginPage = await setupPage(browser, true);
    await loginPage.fillLoginForm(WRONG_PASSWORD_FORMAT_DATA);
    let isLocatorDisabled = await loginPage.isLocatorDisabled("#login-submit-btn");
    expect(isLocatorDisabled).toBeTruthy();
  });
  test("is redirect to login page working without authToken in localStorage", async ({ browser }) => {
    const loginPage = await setupPage(browser);
    await loginPage.goToPage(`${baseURL}/dashboard/`);
    let newPageURL = await loginPage.getPageUrl();
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
  });
  test("is redirect to dashboard page working with authToken in localStorage", async ({ browser }) => {
    const loginPage = await setupPageWithStorageState(browser);
    await loginPage.goToPage(`${baseURL}/dashboard/`);
    let newPageURL = await loginPage.getPageUrl();
    expect(newPageURL).toBe(`${baseURL}/dashboard/`);
  });
  test("is redirect to dashboard page working with incorrect authToken in localStorage", async ({ browser }) => {
    const loginPage = await setupPageWithStorageState(browser, "./incorrect_auth.json");
    await loginPage.goToPage(`${baseURL}/dashboard/`);
    let newPageURL = await loginPage.getPageUrl();
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
  });
});
