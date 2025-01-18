import { Page } from "@playwright/test";

export class CreatePartyPage {
  readonly page: Page;
  readonly page1: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCreatePartyPage(baseUrl: string) {
    await this.page.goto(`${baseUrl}/dashboard/parties/create/`);
    await this.page.waitForLoadState("networkidle");
  }

  // USUNIĘCIE PODMIOTU

  async partyDelete() {
    await this.page.locator('button[name="moreOptions"]').click();
    await this.page.locator('li[name="delete-party-btn"]').click();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator('button[id="confirm-delete"]').click();
    await this.page.waitForSelector('svg[data-testid="SuccessOutlinedIcon"]', {
      timeout: 10000,
    });
  }

  // WYBÓR TYPU PODMIOTU

  async selectIndividual() {
    await this.page.locator('input[value="individual"]').check();
    await this.page.locator('button[type="submit"]').click();
  }

  async selectSoleProprietorship() {
    await this.page.locator('input[value="sole_proprietorship"]').check();
    await this.page.locator('button[type="submit"]').click();
  }

  async selectCompany() {
    await this.page.locator('input[value="company"]').check();
    await this.page.locator('button[type="submit"]').click();
  }

  // UZUPEŁNIANIE DANYCH FIRMY
  // BEZ NUMERU PESEL

  async fillCompanyInformation(ENTITY: any) {
    await this.page.locator('input[name="withoutTaxIdNumber"]').click();
    await this.page.locator('input[role="combobox"]').fill("pol");
    await this.page.locator('input[role="combobox"]').press("Enter");
    await this.page
      .locator('input[name="companyIdentifier"]')
      .fill(ENTITY.companyIdentifier);
    await this.page.locator('input[name="references"]').fill(ENTITY.references);
    await this.page.evaluate(() => {
      const dateInput = document.getElementById(
        "create-party-birth-date-picker"
      );
      if (dateInput) {
        dateInput.removeAttribute("readonly");
      }
    });
    // await this.page
    //   .locator('input[id="create-party-economic-relation-start-date-picker"]')
    //   .fill(ENTITY.businessRelations);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[name="companyName"]')
      .fill(ENTITY.companyName);
    await this.page.locator('input[name="tradeName0"]').fill(ENTITY.tradeName);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async fillCompanyNip(ENTITY: any) {
    await this.page.locator('input[name="taxIdNumber"]').click();
    await this.page.keyboard.press('Control+V');
    await this.page.locator('input[name="references"]').fill(ENTITY.references);
    await this.page.evaluate(() => {
      const dateInput = document.getElementById(
        "create-party-birth-date-picker"
      );
      if (dateInput) {
        dateInput.removeAttribute("readonly");
      }
    });
    await this.page.locator('input[role="combobox"]').fill("pol");
    await this.page.locator('input[role="combobox"]').press("Enter");
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[name="companyName"]')
      .fill(ENTITY.companyName);
    await this.page.locator('input[name="tradeName0"]').fill(ENTITY.tradeName);
    await this.page.locator('textarea[role="combobox"]').last().fill("45.11");
    await this.page.locator('textarea[role="combobox"]').last().press("Enter");
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async activityType() {
    await this.page.locator('input[name="businessActivityForm"]').fill('Spółka akcyjna');
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillPersonalInformation(
    ENTITY: any,
    options: { skipOptionalFields?: boolean } = {}
  ) {
    await this.page.locator('input[name="firstName"]').fill(ENTITY.firstName);
    await this.page.locator('input[name="middleName"]').fill(ENTITY.middleName);
    await this.page.locator('input[name="lastName"]').fill(ENTITY.lastName);
    await this.page.locator('input[name="familyName"]').fill(ENTITY.familyName);
    await this.page
      .locator('input[name="withoutPersonalIdentityNumber"]')
      .click();
    await this.page.evaluate(() => {
      const dateInput = document.getElementById(
        "create-party-birth-date-picker"
      );
      if (dateInput) {
        dateInput.removeAttribute("readonly");
      }
    });
    // await this.page
    //   .locator('input[id="base-date-picker"]')
    //   .fill("2000-01-01");

    await this.page.locator('input[role="combobox"]').first().fill("pol");
    await this.page.locator('input[role="combobox"]').first().press("Enter");

    // Sprawdzenie, czy wypełniać opcjonalne pola
    if (!options.skipOptionalFields) {
      await this.page
        .locator('input[name="references"]')
        .fill(ENTITY.references);
      await this.page.evaluate(() => {
        const dateInput = document.getElementById(
          "create-party-economic-relation-start-date-picker"
        );
        if (dateInput) {
          dateInput.removeAttribute("readonly");
        }
      });
      await this.page
        .locator('input[id="create-party-economic-relation-start-date-picker"]')
        .fill(ENTITY.businessRelations);
    }
  }

  async fillPersonalDocument(ENTITY: any) {
    await this.page.locator('input[name="documentType"]').fill("pas");
    await this.page.locator('input[name="documentType"]').press("Enter");
    await this.page
      .locator('input[name="documentNumber"]')
      .fill(ENTITY.documentNumber);
    await this.page.evaluate(() => {
      const dateInput = document.getElementById(
        "create-party-document-expiration-date-picker"
      );
      if (dateInput) {
        dateInput.removeAttribute("readonly");
      }
    });
    await this.page
      .locator('input[id="create-party-document-expiration-date-picker"]')
      .fill(ENTITY.documentExpirationDate);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async fillCitizenData(ENTITY: any) {
    await this.page.locator('input[role="combobox"]').first().fill("pol");
    await this.page.locator('input[role="combobox"]').first().press("Enter");
    await this.page.locator('input[name="birthCity"]').fill(ENTITY.birthCity);
    await this.page.locator('input[role="combobox"]').last().fill("stu");
    await this.page.locator('input[role="combobox"]').last().press("Enter");
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async fillContact(ENTITY: any) {
    await this.page
      .locator('input[name="emailAdress"]')
      .fill(ENTITY.emailAdress);
    await this.page.locator('input[name="phoneCountry"]').fill("+48");
    await this.page.locator('input[name="phoneCountry"]').press("Enter");
    await this.page
      .locator('input[name="phoneNumber"]')
      .fill(ENTITY.phoneNumber);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  // BENEFICJENT + REPREZENTANT

  async addBeneficiary() {
    await this.page.getByRole("button", { name: "Dodaj beneficjenta" }).click();
  }

  async addRepresentatives() {
    await this.page
      .getByRole("button", { name: "Dodaj reprezentanta" })
      .click();
  }

  async fillBeneficiary() {
    if ((await this.page.getByLabel("Bezpośrednie uprawnienia").count()) > 0) {
      await this.page.getByLabel("Bezpośrednie uprawnienia").fill("xxx");
    } else if ((await this.page.getByLabel("Direct rights").count()) > 0) {
      await this.page.getByLabel("Direct rights").first().fill("xxx");
    }

    await this.page.getByRole("button", { name: "Dodaj" }).click();
  }

  async fillRepresentative() {
    if ((await this.page.getByLabel("Pełniona rola").count()) > 0) {
      await this.page.getByLabel("Pełniona rola").fill("Prokurent");
      await this.page.getByLabel("Pełniona rola").first().press("Enter");
    } else if ((await this.page.getByLabel("Role performed").count()) > 0) {
      await this.page.getByLabel("Role performed").first().fill("Board member");
      await this.page.getByLabel("Role performed").first().press("Enter");
    }

    await this.page
      .getByRole("button", { name: "Dodaj reprezentanta" })
      .click();
  }

  async fillPEP() {
    if ((await this.page.getByLabel("Nie jest").count()) > 0) {
      await this.page.getByLabel("Nie jest").first().check();
    } else if ((await this.page.getByLabel("Is not").count()) > 0) {
      await this.page.getByLabel("Is not").first().check();
    }

    if ((await this.page.getByLabel("Nie jest").count()) > 0) {
      await this.page.getByLabel("Nie jest").nth(1).check();
    } else if ((await this.page.getByLabel("Is not").count()) > 0) {
      await this.page.getByLabel("Is not").nth(1).check();
    }

    if ((await this.page.getByLabel("Nie jest").count()) > 0) {
      await this.page.getByLabel("Nie jest").nth(2).check();
    } else if ((await this.page.getByLabel("Is not").count()) > 0) {
      await this.page.getByLabel("Is not").nth(2).check();
    }
  }

  // EDYCJA PODMIOTU

  async openEdit() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(2500);
    await this.page.locator('button[name="moreOptions"]').click();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator('li[name="edit-party-btn"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async individualEdit(ENTITY: any) {
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[name="firstName"]')
      .fill(ENTITY.firstNameEdited);
    await this.page
      .locator('input[name="middleName"]')
      .fill(ENTITY.middleNameEdited);
    await this.page
      .locator('input[name="lastName"]')
      .fill(ENTITY.lastNameEdited);
    await this.page
      .locator('input[name="familyName"]')
      .fill(ENTITY.familyNameEdited);
    // await this.page
    //   .locator('input[value="2000-01-01"]')
    //   .fill(ENTITY.birthDateEdited);
    await this.page
      .locator('input[name="documentNumber"]')
      .fill(ENTITY.documentNumberEdited);
    // await this.page
    //   .locator('input[value="2030-01-01"]')
    //   .fill(ENTITY.documentExpirationDateEdited);
  }

  async companyEdit(ENTITY: any) {
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[name="companyIdentifier"]')
      .fill(ENTITY.companyIdentifierEdited);
  }

  async overallEdit(ENTITY: any) {
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[name="references"]')
      .fill(ENTITY.referencesEdited);
    // await this.page
    //   .locator('input[placeholder="yyyy-mm-dd"]')
    //   .last()
    //   .fill(ENTITY.businessRelationsEdited);
  }

  async saveEdit() {
    await this.page.getByRole("button", { name: "Zapisz" }).click();
    await this.page.waitForLoadState("networkidle");
  }

  // OPERACJE OGÓLNE

  async submit() {
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async skip() {
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  // ZAKOŃCZENIE TESTU

  async confirmPartyCreation() {
    await this.page.locator('button[name="createNewButton"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async goToDetailsPage() {
    await this.page
      .locator('a[href^="/dashboard/parties/"][href*="?tab-primary=data"]')
      .click();
    await this.page.waitForLoadState("networkidle");
  }

  async positiveEnding() {
    await this.page.waitForSelector('svg[data-testid="SuccessOutlinedIcon"]', {
      timeout: 10000,
    });
  }
}
