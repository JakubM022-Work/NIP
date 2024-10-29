const {expect} = require("@playwright/test");
exports.SignUpPage = class SignUpPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.uri = '/user/register';
    this.emailInput = page.locator('input[id="email"]');
    this.passwordInput = page.locator('input[id="new-password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.signUpButton = page.locator('button[name="createNewButton"]');
    this.loginLink = page.locator('a[href="/user/login/"]');

    this.partyTypeRadioInput = {
      company: page.locator('input[name="partyType"][value="company"]'),
      sole_proprietorship: page.locator('input[name="partyType"][value="sole_proprietorship"]'),
      individual: page.locator('input[name="partyType"][value="individual"]'),
    }

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.postalCodeInput = page.locator('input[name="postalCode"]');
    this.countryInput = page.locator('input[role="combobox"]');
    this.cityInput = page.locator('input[name="city"]');
    this.streetInput = page.locator('input[name="street"]');
    this.houseNumberInput = page.locator('input[name="houseNumber"]');
    this.flatNumberInput = page.locator('input[name="flatNumber"]');
    this.phoneCountryInput = page.locator('input[name="phoneCountry"]');
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]');

    this.regulationsCheckbox = page.locator('input[type="checkbox"][name="regulations"]');
    this.privacyPolicyCheckbox = page.locator('input[type="checkbox"][name="politics"]');
    this.marketingConsentCheckbox = page.locator('input[type="checkbox"][name="marketingConsent"]');
  }

  async goto() {
    await this.page.goto(this.uri);
  }

  async fillEmailAndPassword(email, password) {
    await this.page.getByLabel('Email *').fill(email);
    await this.page.getByLabel('Password *').fill(password);
  }

  async selectPartyType(partyType) {
    this.partyTypeRadioInput[partyType].click();
  }

  async fillIndividualPartyData(
    firstName, lastName,
    phoneCountry, phoneNumber,
    postalCode, country, city, street, houseNumber, flatNumber,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.countryInput.fill(country);
    await this.countryInput.press('Enter');
    await this.cityInput.fill(city);
    await this.streetInput.fill(street);
    await this.houseNumberInput.fill(houseNumber);
    await this.flatNumberInput.fill(flatNumber);
    await this.phoneCountryInput.fill(phoneCountry);
    await this.phoneNumberInput.fill(phoneNumber);
  }

  async submit() {
    const submitButton = await this.page.locator('button[type="submit"]');
    await submitButton.click();
  }
};
