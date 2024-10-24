import { Page } from '@playwright/test';

export class CreateTransactionPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectRandomOptionFromDropdownOtherTransaction(inputSelector: string, dropdownSelector: string, TRANSACTION: any) {
    await this.page.locator(inputSelector).click();
    await this.page.waitForSelector(dropdownSelector);
    const options = await this.page.locator(`${dropdownSelector} li`).all();
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    await selectedOption.click();
    const otherInputExists = await this.page.locator('input[name="typeOther"]').isVisible();

    // Handle the "other" option if selected
    if (otherInputExists) {
      const otherInput = this.page.locator('input[name="typeOther"]');
      await otherInput.fill(TRANSACTION.otherType);
    }
  }

  async selectRandomOptionFromDropdown(inputSelector: string, dropdownSelector: string, elementIndex: number = 0) {
    const inputElement = this.page.locator(inputSelector).nth(elementIndex);
    await inputElement.click();
    await this.page.waitForSelector(dropdownSelector);
    const options = await this.page.locator(`${dropdownSelector} li`).all();
    const randomIndex = Math.floor(Math.random() * options.length);
    await options[randomIndex].click();
  }

  async navigateToCreateTransactionPage(baseUrl: string) {
    await this.page.goto(`${baseUrl}/dashboard/transactions/create/`);
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[id="rcc-confirm-button"]').click();
  }

  async selectBuyer() {
    await this.page.locator('input[value="buyer"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async selectSeller() {
    await this.page.locator('input[value="seller"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async selectTransfer() {
    await this.page.locator('input[value="transfer"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async selectBuyerCrypto() {
    await this.page.locator('input[value="buyer_crypto"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async selectSellerCrypto() {
    await this.page.locator('input[value="seller_crypto"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async selectExchangeFiat() {
    await this.page.locator('input[value="exchange_fiat"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async selectOther() {
    await this.page.locator('input[value="other"]').check();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('button[name="nextButton"]').click();
  }

  async fillTransactionDetailsCash(TRANSACTIONS: any) {
    await this.page.locator('input[name="amount"]').fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodCash}"]`).click();
    await this.page.locator('button.MuiButton-outlinedSecondary').click();
  }

  async fillTransactionDetailsBank(TRANSACTIONS: any) {
    await this.page.locator('input[name="amount"]').fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodBank}"]`).click();
    await this.page.locator('button.MuiButton-outlinedSecondary').click();
  }

  async fillTransactionDetailsOther(TRANSACTIONS: any) {
    await this.page.locator('input[name="amount"]').fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodOther}"]`).click();
    await this.page.locator('input[name="paymentMethodOther"]').fill(TRANSACTIONS.paymentMethodOtherType);
    await this.page.locator('button.MuiButton-outlinedSecondary').click();
  }

  async fillTransactionDetailsCryptoCash(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('input[name="amount"]').first().fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodCash}"]`).click();
    await this.page.locator('input[name="amount"]').last().fill(TRANSACTIONS.amountCrypto);
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="cryptoAddress"]').fill(TRANSACTIONS.cryptoAddress);
    }
    await this.page.locator('button[name="nextButton"]').click();
  }

  async fillTransactionDetailsCryptoBank(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('input[name="amount"]').first().fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodBank}"]`).click();
    await this.page.locator('input[name="amount"]').last().fill(TRANSACTIONS.amountCrypto);
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="cryptoAddress"]').fill(TRANSACTIONS.cryptoAddress);
    }
    await this.page.locator('button[name="nextButton"]').click();
  }

  async fillTransactionDetailsCryptoOther(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('input[name="amount"]').first().fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodOther}"]`).click();
    await this.page.locator('input[name="paymentMethodOther"]').fill(TRANSACTIONS.paymentMethodOtherType);
    await this.page.locator('input[name="amount"]').last().fill(TRANSACTIONS.amountCrypto);
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="cryptoAddress"]').fill(TRANSACTIONS.cryptoAddress);
    }
    await this.page.locator('button[name="nextButton"]').click();
  }

  async fillTransactionDetailsTransferCash(TRANSACTIONS: any) {
    await this.page.locator('input[name="amount"]').fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodCash}"]`).click();
    await this.page.locator('button.MuiButton-outlinedSecondary').first().click();
  }

  async fillTransactionDetailsTransferBank(TRANSACTIONS: any) {
    await this.page.locator('input[name="amount"]').fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodBank}"]`).click();
    await this.page.locator('button.MuiButton-outlinedSecondary').first().click();
  }

  async fillTransactionDetailsTransferOther(TRANSACTIONS: any) {
    await this.page.locator('input[name="amount"]').fill(TRANSACTIONS.amount);
    await this.page.locator('div[id="paymentMethod"]').click();
    await this.page.locator(`li[data-value="${TRANSACTIONS.paymentMethodOther}"]`).click();
    await this.page.locator('input[name="paymentMethodOther"]').fill(TRANSACTIONS.paymentMethodOtherType);
    await this.page.locator('button.MuiButton-outlinedSecondary').first().click();
  }

  async fillBuyerInformation(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('input[name="withoutEntityCode"]').check();
    await this.page.locator('input[name="firstName"]').fill(TRANSACTIONS.firstName);
    await this.page.locator('input[name="lastName"]').fill(TRANSACTIONS.lastName);
    await this.page.locator('input[name="companyName"]').fill(TRANSACTIONS.companyName);
    await this.page.locator('input[name="description"]').fill(TRANSACTIONS.description);
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    if (!options.skipOptionalFields) {
      await this.page.locator('button[name="nextButton"]').click();
    }
  }

  async fillBuyerInformationBank(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('input[name="withoutEntityCode"]').check();
    await this.page.locator('input[name="firstName"]').fill(TRANSACTIONS.firstName);
    await this.page.locator('input[name="lastName"]').fill(TRANSACTIONS.lastName);
    await this.page.locator('input[name="companyName"]').fill(TRANSACTIONS.companyName);
    await this.page.locator('input[name="description"]').fill(TRANSACTIONS.description);
    await this.page.locator('input[name="iban"]').fill(TRANSACTIONS.iban);
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    if (!options.skipOptionalFields) {
      await this.page.locator('button[name="nextButton"]').click();
    }
  }

  async fillBuyerInformationEntity( options: { skipOptionalFields?: boolean } = {}) {
    await this.selectRandomOptionFromDropdown('input[id="party-select"]', 'ul[role="listbox"]');
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    if (!options.skipOptionalFields) {
      await this.page.locator('button[name="nextButton"]').click();
    }
  }

  async fillBuyerInformationBankEntity(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.selectRandomOptionFromDropdown('input[id="party-select"]', 'ul[role="listbox"]');
    await this.page.locator('input[name="iban"]').fill(TRANSACTIONS.iban);
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    if (!options.skipOptionalFields) {
      await this.page.locator('button[name="nextButton"]').click();
    }
  }

  async fillSellerInformation(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('button.MuiButton-outlinedSecondary').last().click();
    await this.page.locator('input[name="withoutEntityCode"]').check();
    await this.page.locator('input[name="firstName"]').fill(TRANSACTIONS.firstNameSecond);
    await this.page.locator('input[name="lastName"]').fill(TRANSACTIONS.lastNameSecond);
    await this.page.locator('input[name="companyName"]').fill(TRANSACTIONS.companyNameSecond);
    await this.page.locator('input[name="description"]').fill(TRANSACTIONS.descriptionSecond);
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="iban"]').fill(TRANSACTIONS.ibanSeller);
    }
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await this.page.locator('button[name="nextButton"]').click();
  }

  async fillSellerInformationEntity(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('button.MuiButton-outlinedSecondary').last().click();
    await this.selectRandomOptionFromDropdown('input[id="party-select"]', 'ul[role="listbox"]');
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="iban"]').fill(TRANSACTIONS.ibanSeller);
    }
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await this.page.locator('button[name="nextButton"]').click();
  }


  async fillTitleAndDescription(TRANSACTIONS: any) {
    await this.page.locator('input[name="title"]').fill(TRANSACTIONS.title);
    await this.page.locator('input[name="description"]').fill(TRANSACTIONS.transactionDescription);
    await this.page.locator('button[name="nextButton"]').click();
    await this.page.locator('button[name="createNewButton"]').click();
  }

  async goToDetailsPage() {
    await this.page.locator('a[href^="/dashboard/transactions/"]:not([href="/dashboard/transactions/"])').click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillBuyerInformationOther(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.page.locator('input[name="withoutEntityCode"]').check();
    await this.page.locator('input[name="firstName"]').fill(TRANSACTIONS.firstName);
    await this.page.locator('input[name="lastName"]').fill(TRANSACTIONS.lastName);
    await this.page.locator('input[name="companyName"]').fill(TRANSACTIONS.companyName);
    await this.page.locator('input[name="description"]').fill(TRANSACTIONS.description);
    await this.selectRandomOptionFromDropdownOtherTransaction('div[id="type"]', 'ul[role="listbox"]', TRANSACTIONS);
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="iban"]').fill(TRANSACTIONS.ibanSeller);
    }
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await this.page.locator('button[name="nextButton"]').click();
  }

  async fillBuyerInformationOtherEntity(TRANSACTIONS: any, options: { skipOptionalFields?: boolean } = {}) {
    await this.selectRandomOptionFromDropdown('input[id="party-select"]', 'ul[role="listbox"]');
    await this.selectRandomOptionFromDropdownOtherTransaction('div[id="type"]', 'ul[role="listbox"]', TRANSACTIONS);
    if (!options.skipOptionalFields) {
      await this.page.locator('input[name="iban"]').fill(TRANSACTIONS.ibanSeller);
    }
    await this.page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await this.page.locator('button[name="nextButton"]').click();
  }

}