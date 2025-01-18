import { test } from "@playwright/test";
import { BASE_URL, EMAIL, PASSWORD } from "../constants";
const baseUrl = BASE_URL;
const email = EMAIL;
const password = PASSWORD;

// test służy do stworzenia pliku auth.json w oparciu o dane logowania z enva
// nalezy go uruchomic przed testami, które wymagają zalogowania 

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseUrl);
  console.log(baseUrl);

  await page.getByRole("link", { name: "Zaloguj" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL(`${baseUrl}/dashboard/`);

  await context.storageState({ path: "auth.json" });
  await page.close();
});

test("login test to dashboard", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json",
  });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/dashboard/`);
});
