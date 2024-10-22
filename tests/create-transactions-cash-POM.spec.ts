import { test } from '@playwright/test';
import { CreateTransactionPage } from '../create-transactions.page';
import { TRANSACTION } from '../entityData';

const baseUrl = "https://test.systemaml.pl";
const email = "jakub.marciniak+okazja@inpay.pl";
const password = "inpay1234";

// test.beforeAll(async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto(baseUrl);

//   await page.getByRole('link', { name: 'Zaloguj' }).click();
//   await page.waitForLoadState('networkidle');
//   await page.locator('input[name="email"]',).fill(email);
//   await page.locator('input[name="password"]',).fill(password);
//   await page.locator('button[type="submit"]').first().click();
//   await page.waitForURL(`${baseUrl}/dashboard/`);

//   await context.storageState({ path: 'auth.json' });
//   await page.close();
// });

test('creating purchase transaction positive', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();

  const createTransactionPage = new CreateTransactionPage(page);

  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  await createTransactionPage.selectBuyer();
  await createTransactionPage.fillTransactionDetails(TRANSACTION);
  await createTransactionPage.fillBuyerInformation(TRANSACTION);
  await createTransactionPage.fillTitleAndDescription(TRANSACTION);
  await createTransactionPage.goToDetailsPage();
});

test("creating sale transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();

  const createTransactionPage = new CreateTransactionPage(page);
  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  await createTransactionPage.selectSeller();
  await createTransactionPage.fillTransactionDetails(TRANSACTION);
  await createTransactionPage.fillBuyerInformation(TRANSACTION);
  await createTransactionPage.fillTitleAndDescription(TRANSACTION);
  await createTransactionPage.goToDetailsPage();
});

test("creating transfer transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();

  const createTransactionPage = new CreateTransactionPage(page);
  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  await createTransactionPage.selectTransfer();
  await createTransactionPage.fillTransactionDetailsTransfer(TRANSACTION);
  await createTransactionPage.fillBuyerInformation(TRANSACTION, { skipOptionalFields: true });
  await createTransactionPage.fillSellerInformation(TRANSACTION);
  await createTransactionPage.fillTitleAndDescription(TRANSACTION);
  await createTransactionPage.goToDetailsPage();
});

test("creating buyer crypto transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();

  const createTransactionPage = new CreateTransactionPage(page);
  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  await createTransactionPage.selectBuyerCrypto();
  await createTransactionPage.fillTransactionDetailsCrypto(TRANSACTION);
  await createTransactionPage.fillBuyerInformation(TRANSACTION, { skipOptionalFields: true });
  await createTransactionPage.fillTitleAndDescription(TRANSACTION);
  await createTransactionPage.goToDetailsPage();
});

test("creating seller crypto transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();

  const createTransactionPage = new CreateTransactionPage(page);
  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  await page.locator('input[value="seller_crypto"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="amount"]').first().fill("1000");
  await page.locator('div[id="paymentMethod"]').click();
  await page.locator('li[data-value="cash"]').click();
  await page.locator('input[name="amount"]').last().fill("10");
  await page.locator('input[name="cryptoAddress"]').fill("1hDLhcXx3JYKJJFXamD7mcFHFuWzwWmPxNM6Cr");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="withoutEntityCode"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="firstName"]').fill("Jan");
  await page.locator('input[name="lastName"]').fill("Nowak");
  await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
  await page.locator('input[name="description"]').fill("handel rzeczami używanymi");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="title"]').fill("Rata za samochód");
  await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('button[name="createNewButton"]').click();
});
