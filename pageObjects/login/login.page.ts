import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class LoginPage extends BasePage {
  readonly responseStatus: number | null;

  constructor(page: Page) {
    super(page);
    this.responseStatus = null;
  }
  async navigateToLoginPage(baseUrl: string) {
    //TODO clear local storage
    await this.page.goto(`${baseUrl}/user/login`);
    await this.page.waitForLoadState("networkidle");
    await this.page.locator('button[id="rcc-confirm-button"]').click();
  }

  async getHeadingBgColor() {
    const headingEl = this.page.locator("h1");
    const bgColor = await headingEl.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    return bgColor;
  }

  async fillLoginForm(data: { email: string; password: string }) {
    await this.page.locator("#email").fill(data.email);
    await this.page.locator("#current-password").fill(data.password);
  }
  // firefox and webkit zwracają poprawny text błędu ale po angielsku - po taki wysyłają header accept-language
  //https://github.com/microsoft/playwright/issues/23732
  async getLocatorTextById(errorId: string) {
    return await this.page.locator(`${errorId}`).innerText();
  }

}
