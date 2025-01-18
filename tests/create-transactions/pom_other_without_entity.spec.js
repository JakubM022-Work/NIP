import { test } from '@playwright/test';
import { CreateTransactionPage } from '../../pageObjects/create-transactions.page.ts';
import { TRANSACTION } from '../../testingData/entityData';
import { BASE_URL } from '../../constants';

const baseUrl = BASE_URL;

async function setupPage(browser) {
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();
  const createTransactionPage = new CreateTransactionPage(page);
  await createTransactionPage.navigateToCreateTransactionPage(baseUrl);
  return createTransactionPage;
}

test.describe('Transaction Creation Tests Without Entity Payment Method Other', () => {
  test('creating purchase transaction positive', async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectBuyer();
    await createTransactionPage.fillTransactionDetailsOther(TRANSACTION);
    await createTransactionPage.fillBuyerInformation(TRANSACTION);
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating sale transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectSeller();
    await createTransactionPage.fillTransactionDetailsOther(TRANSACTION);
    await createTransactionPage.fillBuyerInformation(TRANSACTION);
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating transfer transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransfer();
    await createTransactionPage.fillTransactionDetailsTransferOther(TRANSACTION);
    await createTransactionPage.fillBuyerInformation(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillSellerInformation(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating buyer crypto transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectBuyerCrypto();
    await createTransactionPage.fillTransactionDetailsCryptoOther(TRANSACTION);
    await createTransactionPage.fillBuyerInformation(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating seller crypto transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectSellerCrypto();
    await createTransactionPage.fillTransactionDetailsCryptoOther(TRANSACTION);
    await createTransactionPage.fillBuyerInformation(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating exchange fiat transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectExchangeFiat();
    await createTransactionPage.fillTransactionDetailsCryptoOther(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillBuyerInformation(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating other transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectOther();
    await createTransactionPage.fillTransactionDetailsOther(TRANSACTION);
    await createTransactionPage.fillBuyerInformationOther(TRANSACTION, { skipOptionalFields: true });
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });
});
