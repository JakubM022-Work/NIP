import {faker} from "@faker-js/faker";
import COUNTRY from "../constants/country";

export const generatePerson = () => ({
  firstName: faker.person.firstName(),
  middleName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  familyName: faker.person.lastName(),
  companyName: faker.company.name(),
})

export const generateAmount = () => ({
  amount: faker.finance.amount({min: 5, max: 10000}),
})

export const generateCryptoAddress = () => ({
  crypto: faker.finance.bitcoinAddress(),
})

export const generateWords = () => ({
  descriptions: [
    faker.word.words(5, 10),
    faker.word.words(5, 10),
    faker.word.words(5, 10),
    faker.word.words(5, 10),
  ],
})

const generatePhoneCountry = () => {
  const prefixes = COUNTRY.map(c => c.phone);
  const index = Math.floor(Math.random() * prefixes.length);
  return prefixes[index]
}

export const generateAddress = () => ({
  country: faker.location.countryCode({variant: 'alpha-2'}),
  city: faker.location.city(),
  postalCode: faker.location.zipCode(),
  street: faker.location.street(),
  houseNumber: faker.location.buildingNumber(),
  flatNumber: faker.string.numeric({length: {min: 1, max: 4}}),
  phoneCountry: generatePhoneCountry(),
  phoneNumber: faker.string.numeric({length: 9})
})

export const selectRandomOptionFromDropdown = async (page, inputSelector, dropdownSelector, elementIndex = 0) => {
  const inputElement = page.locator(inputSelector).nth(elementIndex);
  await inputElement.click(); // Click to activate the dropdown
  await page.waitForSelector(dropdownSelector); // Wait for the dropdown to appear
  const options = await page.locator(`${dropdownSelector} li`).all(); // Get all options
  const randomIndex = Math.floor(Math.random() * options.length); // Generate a random index
  await options[randomIndex].click(); // Click the random option
};

export const selectRandomOptionFromDropdownOtherTransaction = async (page, inputSelector, dropdownSelector, otherTypeValue) => {
  await page.locator(inputSelector).click();
  await page.waitForSelector(dropdownSelector);
  const options = await page.locator(`${dropdownSelector} li`).all();
  const randomIndex = Math.floor(Math.random() * options.length);
  const selectedOption = options[randomIndex];
  await selectedOption.click();
  const otherInputExists = await page.locator('input[name="typeOther"]').isVisible();

  // Handle the "other" option if selected
  if (otherInputExists) {
    const otherInput = page.locator('input[name="typeOther"]');
    await otherInput.fill(otherTypeValue);
  }
};
 export const generateDate = () => {
    // Tworzenie obiektów Date dla dat początkowej i końcowej
    const startDate = new Date('2000-02-02'); // Data początkowa
    const endDate = new Date('2020-02-02');   // Data końcowa

    // Generowanie losowej daty pomiędzy startDate a endDate
    const randomDate = faker.date.between(startDate, endDate);

    // Formatowanie daty w formacie YYYY-MM-DD
    const formattedDate = randomDate.toISOString().slice(0, 10);

    return formattedDate;
};

