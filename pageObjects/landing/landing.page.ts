import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLandingPage(baseUrl: string) {
    await this.page.goto(`${baseUrl}/`);
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

  async getContainerChildren(containerId: string, childTag: string) {
    const container = this.page.locator(`${containerId}`);
    return await container.locator(`${childTag}`).elementHandles();
  }
}
