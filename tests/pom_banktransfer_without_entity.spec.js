import { test } from "@playwright/test";
import { CreateTransactionPage } from "../../pageObjects/create-transaction.page";
import { TRANSACTION } from "../../testingData/entityData";
import { BASE_URL } from "../../constants";

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

test.describe("Transaction Creation Tests Without Entity Payment Method Bank Transfer", () => {
  test("creating purchase transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectBuyer();
    await createTransactionPage.fillTransactionDetailsBank(TRANSACTION);
    await createTransactionPage.fillBuyerInformationBank(TRANSACTION);
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating sale transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectSeller();
    await createTransactionPage.fillTransactionDetailsBank(TRANSACTION);
    await createTransactionPage.fillBuyerInformationBank(TRANSACTION);
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating transfer transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectTransfer();
    await createTransactionPage.fillTransactionDetailsTransferBank(TRANSACTION);
    await createTransactionPage.fillBuyerInformationBank(TRANSACTION, {skipOptionalFields: true,});
    await createTransactionPage.fillSellerInformation(TRANSACTION);
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating buyer crypto transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectBuyerCrypto();
    await createTransactionPage.fillTransactionDetailsCryptoBank(TRANSACTION);
    await createTransactionPage.fillBuyerInformationBank(TRANSACTION, {skipOptionalFields: true,});
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating seller crypto transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectSellerCrypto();
    await createTransactionPage.fillTransactionDetailsCryptoBank(TRANSACTION);
    await createTransactionPage.fillBuyerInformationBank(TRANSACTION, {skipOptionalFields: true,});
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating exchange fiat transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectExchangeFiat();
    await createTransactionPage.fillTransactionDetailsCryptoBank(TRANSACTION, {skipOptionalFields: true,});
    await createTransactionPage.fillBuyerInformationBank(TRANSACTION, {skipOptionalFields: true,});
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });

  test("creating other transaction positive", async ({ browser }) => {
    const createTransactionPage = await setupPage(browser);
    await createTransactionPage.selectOther();
    await createTransactionPage.fillTransactionDetailsBank(TRANSACTION);
    await createTransactionPage.fillBuyerInformationOther(TRANSACTION);
    await createTransactionPage.fillTitleAndDescription(TRANSACTION);
    await createTransactionPage.goToDetailsPage();
  });
});
