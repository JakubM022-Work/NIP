import { test, expect, request } from '@playwright/test';


test("delete all transactions API", async ({ browser }) => {
  test.setTimeout(300000);
  const context = await browser.newContext({
    storageState: "./auth.json"
  });
  const page = await context.newPage();

  await page.goto("https:/systemaml.pl/dashboard/transactions/");
  await page.waitForLoadState('networkidle');

  const collectTransactionCodes = async () => {
    let transactionCodes = new Set();
    let currentPage = 1;

    while (true) {
      console.log(`Processing page: ${currentPage}`);

      const rows = page.locator('tbody tr');
      const rowCount = await rows.count();

      console.log(`Found ${rowCount} transactions on page ${currentPage}`);
      if (rowCount === 0) {
        break;
      }

      const currentPageCodes = await rows.locator('td:nth-of-type(1).css-3ncitq')
        .evaluateAll(cells => cells.map(cell => cell.textContent?.trim()));

      currentPageCodes.forEach(code => {
        if (code) transactionCodes.add(code);
      });

      const nextPageButton = page.locator('[aria-label="Go to next page"]:not([disabled])');
      const nextPageExists = await nextPageButton.isVisible();

      if (nextPageExists) {
        await nextPageButton.click();
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
        currentPage++;
      } else {
        break;
      }
    }
    return Array.from(transactionCodes);
  };

  const transactionCodes = await collectTransactionCodes();
  console.log("Collected transaction codes:", transactionCodes);

  const apiContext = await request.newContext({
    baseURL: 'https://api.systemaml.pl',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_SECRET_KEY}`,
      'Api-Key': `${process.env.API_KEY}`
    }
  });

  for (const code of transactionCodes) {
    const response = await apiContext.delete(`/1.0/transactions/${code}`);
    console.log(`Deleting transaction code: ${code}, Response status: ${response.status()}`);

    if (!response.ok()) {
      console.error(`Failed to delete transaction code: ${code}, Response: ${await response.text()}`);
    }
  }

  await page.goto("https:/www.systemaml.pl/dashboard/transactions/");
  await page.waitForLoadState('networkidle');

  const remainingTransactions = await page.locator('tbody tr').count();
  expect(remainingTransactions).toBe(0);

  await apiContext.dispose();
  await context.close();
});