import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getHeadingText() {
    return await this.page.locator("h1").innerText();
  }

  async getElementsCountByLocator(locator: string) {
    return await this.page.locator(locator).count();
  }

  // waitForNavigation is marked as deprecated but  working fine
  // is deprecated but according to playwright its not gonna be removed
  // https://github.com/microsoft/playwright/issues/20853
  async getPageUrlAfterClickingButtonById(buttonId: string, $withWait: boolean = true) {
    await this.page.locator(`${buttonId}`).click();
    if ($withWait) {
      await this.page.waitForNavigation({ waitUntil: "networkidle" });
    }
    return this.page.url();
  }

  async clickButtonById(buttonId: string) {
    await this.page.locator(`${buttonId}`).click();
  }

  async isLocatorVisible(id: string) {
    return await this.page.locator(`${id}`).isVisible();
  }

  async isLocatorDisabled(id: string) {
    let isEnabled = await this.page.locator(`${id}`).isEnabled();
    return !isEnabled;
  }

  async goToPage(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }

  async getPageUrl() {
    return this.page.url();
  }
}
