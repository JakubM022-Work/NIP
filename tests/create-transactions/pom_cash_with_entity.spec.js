import { test } from '@playwright/test';
import { CreateTransactionPage } from '../../pageObjects/create-transactions.page.ts';
import { TRANSACTION } from '../../testingData/entityData';
import { BASE_URL } from '../../constants';

const baseUrl = BASE_URL;

async function setupPage(browser) {
  const context = await browser.newContext({
    storageState: "./auth.json",
  });
  const page = await context.newPage();
  const createTransactionPage = new CreateTransactionPage(page);
  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  return createTransactionPage;
}

test.describe("Transaction Creation Tests With Entity Payment Method Cash", () => {
  test('creating purchase transaction positive', async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('buyer');
    await createTransactionPage.fillTransactionDetailsCash(TRANSACTION);
    await createTransactionPage.fillBuyerInformationEntity();
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating sale transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('seller');
    await createTransactionPage.fillTransactionDetailsCash(TRANSACTION);
    await createTransactionPage.fillBuyerInformationEntity();
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating transfer transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('transfer');
    await createTransactionPage.fillTransactionDetailsTransferCash(TRANSACTION);
    await createTransactionPage.fillBuyerInformationEntity({ skipOptionalFields: true });
    await createTransactionPage.fillSellerInformationEntity(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating buyer crypto transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('buyer_crypto');
    await createTransactionPage.fillTransactionDetailsCryptoCash(TRANSACTION);
    await createTransactionPage.fillBuyerInformationEntity({ skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating seller crypto transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('seller_crypto');
    await createTransactionPage.fillTransactionDetailsCryptoCash(TRANSACTION);
    await createTransactionPage.fillBuyerInformationEntity({ skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating exchange fiat transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('exchange_fiat');
    await createTransactionPage.fillTransactionDetailsCryptoCash(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillBuyerInformationEntity({ skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating other transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransactionType('other');
    await createTransactionPage.fillTransactionDetailsCash(TRANSACTION);
    await createTransactionPage.fillBuyerInformationOtherEntity(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });
});
