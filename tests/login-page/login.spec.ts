import { test, expect } from "../../fixtures/login/login.fixture";
import { CORRECT_LOGIN_DATA, WRONG_LOGIN_DATA, FormValidationDynamicTest } from "../../testingData/login/login_data";

const baseURL = process.env.BASE_URL;

// to start: npx playwright test --ui

// Do poprawnego uruchomienia sekcji login scenarios należy wygenerować plik auth.json oraz incorrect_auth.json
// incorrect_auth.json tworzymy ręcznie manipulując wartością authToken, refreshToken, oraz wartościami w cookies

test.describe("Login Page - page details", () => {
  test("has the correct title", async ({ loginPage }) => {
    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toBe("Logowanie | System AML");
  });
  test("has only one heading", async ({ loginPage }) => {
    const h1Count = await loginPage.getElementsCountByLocator("h1");
    expect(h1Count).toBe(1);
  });
  test("heading has correct pl text", async ({ loginPage }) => {
    const headingText = await loginPage.getHeadingText();
    expect(headingText).toMatch(/Zaloguj się/);
  });
});

test.describe("Login Page - page details in English", () => {
  test.use({ language: "en" });
  test("heading has correct en text", async ({ loginPage }) => {
    const headingText = await loginPage.getHeadingText();
    expect(headingText).toMatch(/Log in/);
  });
});

test.describe("Login Page - UI Features", () => {
  test("theme change updates colors", async ({ loginPage }) => {
    const colorBeforeThemeChange = await loginPage.getHeadingBgColor();
    await loginPage.clickButtonById("#footer-theme-switch");
    const colorAfterThemeChange = await loginPage.getHeadingBgColor();
    expect(colorBeforeThemeChange).not.toBe(colorAfterThemeChange);
  });

  test("navigation to reset password page", async ({ loginPage }) => {
    const newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#go-to-reset-password-btn");
    expect(newPageURL).toBe(`${process.env.BASE_URL}/user/reset-password/`);
  });

  test("navigation to register page", async ({ loginPage }) => {
    const newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#go-to-register-btn");
    expect(newPageURL).toBe(`${process.env.BASE_URL}/user/register/`);
  });

  test("is lng change button working", async ({ loginPage }) => {
    const headingTextBeforeLngChange = await loginPage.getHeadingText();
    await loginPage.changeLanguage();
    const headingTextAfterLngChange = await loginPage.getHeadingText();
    expect(headingTextBeforeLngChange).not.toBe(headingTextAfterLngChange);
  });
});

test.describe("Login Page - dashboard redirect without localStorage", () => {
  test("is redirect to login page works without authToken in localStorage", async ({ loginPage }) => {
    await loginPage.goToPage(`${baseURL}/dashboard/`);
    let newPageURL = await loginPage.getPageUrl();
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
  });
});

test.describe("Login Page - dashboard redirect with auth.json", () => {
  test.use({ storageStatePath: "./auth.json" });
  test("is redirect to dashboard page works with authToken in localStorage", async ({ loginPage }) => {
    await loginPage.goToPage(`${baseURL}/dashboard/`);
    let newPageURL = await loginPage.getPageUrl();
    expect(newPageURL).toBe(`${baseURL}/dashboard/`);
  });
});

test.describe("Login Page - dashboard redirect with incorrect auth.json", () => {
  test.use({ storageStatePath: "./incorrect_auth.json" });
  test("is redirect to dashboard page work with incorrect authToken in localStorage", async ({ loginPage }) => {
    await loginPage.goToPage(`${baseURL}/dashboard/`);
    let newPageURL = await loginPage.getPageUrl();
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
    expect(loginPage.isLocatorVisible("#login-general-error")).toBeTruthy();
  });
});

test.describe("Login Page - authentication tests", () => {
  test.use({ listenForApi: true });

  test("successful login with correct credentials", async ({ loginPage }) => {
    await loginPage.fillLoginForm(CORRECT_LOGIN_DATA);
    const newPageURL = await loginPage.getPageUrlAfterClickingButtonById("#login-submit-btn");
    expect(newPageURL).toBe(`${process.env.BASE_URL}/dashboard/`);
    expect(loginPage.responseStatus).toBe(200);
  });

  test("failed login with incorrect credentials", async ({ loginPage }) => {
    // Setup response promise before action
    const responsePromise = loginPage.page.waitForResponse((response) => response.url().includes("/int/login"));
    await loginPage.fillLoginForm(WRONG_LOGIN_DATA);
    await loginPage.clickButtonById("#login-submit-btn");
    await responsePromise;
    expect(loginPage.responseStatus).toBe(401);
  });
});

test.describe("Login Page - form validation", () => {
  FormValidationDynamicTest.forEach(({ testName, formData }) => {
    test(testName, async ({ loginPage }) => {
      await loginPage.fillLoginForm(formData);
      expect(await loginPage.isLocatorDisabled("#login-submit-btn")).toBeTruthy();
    });
  });
});
