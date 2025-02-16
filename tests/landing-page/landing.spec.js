import { test, expect } from "../../fixtures/landing/landing.fixtures.ts";
import { LandingPage } from "../../pageObjects/landing/landing.page";

// to start:
// npx playwright test --grep "Landing Page"
// to see report:
// npx playwright show-report

const baseURL = process.env.BASE_URL;

// async function setupPage(browser, useSmallScreen = false) {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   if (useSmallScreen) {
//     await page.setViewportSize({ width: 375, height: 667 });
//   }
//   const landingPage = new LandingPage(page);
//   await landingPage.navigateToLandingPage(baseURL);
//   return landingPage;
// }

test.describe("Landing Page - page details", () => {

  test("has the correct title", async ({ landingPage }) => {
    const pageTitle = await landingPage.getPageTitle();
    expect(pageTitle).toBe("System AML - Przeciwdziałanie praniu pieniędzy");
  });

  test("has only one heading", async ({ landingPage }) => {
    const h1Count = await landingPage.getElementsCountByLocator("h1");
    expect(h1Count).toBe(1);
  });

  test("heading has correct pl text", async ({ landingPage }) => {
    const headingText = await landingPage.getHeadingText();
    expect(headingText).toMatch(/System AML\s*Przeciwdziałanie praniu pieniędzy/);
  });

});

test.describe("Landing Page - UI Features", () => {

  test("is theme change working", async ({ landingPage }) => {
    const colorBeforeThemeChange = await landingPage.getHeadingBgColor();
    await landingPage.clickButtonById("#landing-theme-switch");
    const colorAfterThemeChange = await landingPage.getHeadingBgColor();
    expect(colorBeforeThemeChange).not.toBe(colorAfterThemeChange);
  });
});

test.describe("Landing Page - page layout", () => {

  test("is kompendium section with 4 different articles", async ({ landingPage }) => {
    const paragraphs = await landingPage.getContainerChildren("#articles-container", "a");
    const uniqueParagraphs = new Set(
      await Promise.all(
        paragraphs.map(async (p) => {
          return await p.getAttribute("href");
        })
      )
    );
    expect(uniqueParagraphs.size).toBe(4);
  });

});

test.describe("Landing Page - buttons works", () => {

  test("is try it now button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#try-it-now-button");
    expect(newPageURL).toBe(`${baseURL}/user/register/`);
  });

  test("is go to register button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#register-button");
    expect(newPageURL).toBe(`${baseURL}/user/register/`);
  });

  test("is login button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#login-layout-button");
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
  });

  test("is branze button working", async ({ landingPage }) => {
    await landingPage.clickButtonById("#industries-button");
    const antiquariansBtn = await landingPage.getElementsCountByLocator("#antiquarians-article-button");
    expect(antiquariansBtn).toBe(1);
    const accountingOfficesBtn = await landingPage.getElementsCountByLocator("#accounting-offices-article-button");
    expect(accountingOfficesBtn).toBe(1);
    const exchangeOfficesBtn = await landingPage.getElementsCountByLocator("#exchange-offices-article-button");
    expect(exchangeOfficesBtn).toBe(1);
    const paymentBtn = await landingPage.getElementsCountByLocator("#payment-institutions-article-button");
    expect(paymentBtn).toBe(1);
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#payment-institutions-article-button", false);
    expect(newPageURL).toBe(`${baseURL}/aml-dla-instytucji-platniczych/`);
  });

  test("is cennik button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#price-list-buton");
    expect(newPageURL).toBe(`${baseURL}/produkty/cennik/`);
  });

  test("is kompendium button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#compendium-button");
    expect(newPageURL).toBe(`${baseURL}/kompendium/`);
  });

  test("is uslugi button working", async ({ landingPage }) => {
    await landingPage.clickButtonById("#services-button");
    const sanctionsBtn = await landingPage.getElementsCountByLocator("#sanction-lists-button");
    expect(sanctionsBtn).toBe(1);
    const proceduresBtn = await landingPage.getElementsCountByLocator("#aml-procedures-button");
    expect(proceduresBtn).toBe(1);
    const ppvBtn = await landingPage.getElementsCountByLocator("#aml-quick-scan-ppv-button");
    expect(ppvBtn).toBe(1);
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#aml-quick-scan-ppv-button", false);
    expect(newPageURL).toBe(`${baseURL}/produkty/sprawdzenie-aml/`);
  });

  test("is contact button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#contact-button");
    expect(newPageURL).toBe(`${baseURL}/kontakt/`);
  });

  test("is cart button working", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#cart-button");
    expect(newPageURL).toBe(`${baseURL}/koszyk/`);
  });
});

test.describe("Landing Page - buttons works on small screen", () => {
  test.use({useSmallScreen: true});
  test("is login button working in small screen", async ({ landingPage }) => {
    await landingPage.clickButtonById("#open-layout-menu-small-screen");
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#login-layout-menu-item");
    expect(newPageURL).toBe(`${baseURL}/user/login/`);
  });
  test("is branze button working in small screen", async ({ landingPage }) => {
    await landingPage.clickButtonById("#open-layout-menu-small-screen");
    await landingPage.clickButtonById("#industries-button-small-screen");
    const antiquariansBtn = await landingPage.getElementsCountByLocator("#antiquarians-article-button-small-screen");
    expect(antiquariansBtn).toBe(1);
    const accountingOfficesBtn = await landingPage.getElementsCountByLocator(
      "#accounting-offices-article-button-small-screen"
    );
    expect(accountingOfficesBtn).toBe(1);
    const exchangeOfficesBtn = await landingPage.getElementsCountByLocator(
      "#exchange-offices-article-button-small-screen"
    );
    expect(exchangeOfficesBtn).toBe(1);
    const paymentBtn = await landingPage.getElementsCountByLocator("#payment-institutions-article-button-small-screen");
    expect(paymentBtn).toBe(1);

    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById(
      "#payment-institutions-article-button-small-screen"
    );
    expect(newPageURL).toBe(`${baseURL}/aml-dla-instytucji-platniczych/`);
  });
  test("is cennik button working in small screen", async ({ landingPage }) => {
    await landingPage.clickButtonById("#open-layout-menu-small-screen");
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#price-list-buton-small-screen");
    expect(newPageURL).toBe(`${baseURL}/produkty/cennik/`);
  });

  test("is kompendium button working in small screen", async ({ landingPage }) => {
    await landingPage.clickButtonById("#open-layout-menu-small-screen");
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#compendium-button-small-screen");
    expect(newPageURL).toBe(`${baseURL}/kompendium/`);
  });

  test("is uslugi button working in small screen", async ({ landingPage }) => {
    await landingPage.clickButtonById("#open-layout-menu-small-screen");
    await landingPage.clickButtonById("#services-button-small-screen");
    const sanctionsBtn = await landingPage.getElementsCountByLocator("#sanction-lists-button-small-screen");
    expect(sanctionsBtn).toBe(1);
    const proceduresBtn = await landingPage.getElementsCountByLocator("#aml-procedures-button-small-screen");
    expect(proceduresBtn).toBe(1);
    const ppvBtn = await landingPage.getElementsCountByLocator("#aml-quick-scan-ppv-button-small-screen");
    expect(ppvBtn).toBe(1);

    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#aml-quick-scan-ppv-button-small-screen");
    expect(newPageURL).toBe(`${baseURL}/produkty/sprawdzenie-aml/`);
  });

  test("is contact button working in small screen", async ({ landingPage }) => {
    await landingPage.clickButtonById("#open-layout-menu-small-screen");
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#contact-button-small-screen");
    expect(newPageURL).toBe(`${baseURL}/kontakt/`);
  });

  test("is cart button working on small screen", async ({ landingPage }) => {
    let newPageURL = await landingPage.getPageUrlAfterClickingButtonById("#cart-button-small-screen");
    expect(newPageURL).toBe(`${baseURL}/koszyk/`);
  });

});
