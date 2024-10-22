import { test, expect } from "@playwright/test";
import { selectRandomOptionFromDropdownOtherTransaction } from "../fakeDataGeneration";

test("creating purchase transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
  await page.locator('input[value="buyer"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="amount"]').fill("1000");
  await page.locator('div[id="paymentMethod"]').click();
  await page.locator('li[data-value="cash"]').click();
  await page.locator('button.MuiButton-outlinedSecondary').click();
  await page.locator('input[name="withoutEntityCode"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="firstName"]').fill("Jan");
  await page.locator('input[name="lastName"]').fill("Nowak");
  await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
  await page.locator('input[name="description"]').fill("handel rzeczami używanymi");
  await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="title"]').fill("Rata za samochód");
  await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('button[name="createNewButton"]').click();
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating sale transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
  await page.locator('input[value="seller"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="amount"]').fill("1000");
  await page.locator('div[id="paymentMethod"]').click();
  await page.locator('li[data-value="cash"]').click();
  await page.locator('button.MuiButton-outlinedSecondary').click();
  await page.locator('input[name="withoutEntityCode"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="firstName"]').fill("Jan");
  await page.locator('input[name="lastName"]').fill("Nowak");
  await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
  await page.locator('input[name="description"]').fill("handel rzeczami używanymi");
  await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="title"]').fill("Rata za samochód");
  await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('button[name="createNewButton"]').click();
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating transfer transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
  await page.locator('input[value="transfer"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="amount"]').fill("1000");
  await page.locator('div[id="paymentMethod"]').click();
  await page.locator('li[data-value="cash"]').click();
  await page.locator('button.MuiButton-outlinedSecondary').first().click();
  await page.locator('input[name="withoutEntityCode"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="firstName"]').fill("Jan");
  await page.locator('input[name="lastName"]').fill("Nowak");
  await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
  await page.locator('input[name="description"]').fill("handel rzeczami używanymi");
  await page.waitForLoadState('networkidle');
  await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
  await page.locator('button.MuiButton-outlinedSecondary').last().click();
  await page.locator('input[name="withoutEntityCode"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="firstName"]').fill("Adam");
  await page.locator('input[name="lastName"]').fill("Kowalski");
  await page.locator('input[name="companyName"]').fill("Młoty Kowalski");
  await page.locator('input[name="description"]').fill("handel młotami pneumatycznymi");
  await page.waitForLoadState('networkidle');
  await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="title"]').fill("Rata za samochód");
  await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('button[name="createNewButton"]').click();
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating buyer crypto transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
  await page.locator('input[value="buyer_crypto"]').check();
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
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating seller crypto transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
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
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating exchange fiat transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
  await page.locator('input[value="exchange_fiat"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="amount"]').first().fill("4000");
  await page.locator('div[id="paymentMethod"]').click();
  await page.locator('li[data-value="cash"]').click();
  await page.locator('input[name="amount"]').last().fill("1000");
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
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating other transaction positive", async ({ browser }) => {
  const context = await browser.newContext({
      storageState: "./auth_cranky.json"
  })
  const page = await context.newPage();
  const successAlert = page.locator('.MuiAlert-standardSuccess');
  const errorAlert = page.locator('.MuiAlert-standardError');

  await page.goto("/dashboard/transactions/create/");
  await page.waitForLoadState('networkidle');
  await page.locator('input[value="other"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="amount"]').fill("1000");
  await page.locator('div[id="paymentMethod"]').click();
  await page.locator('li[data-value="cash"]').click();
  await page.locator('button.MuiButton-outlinedSecondary').click();
  await page.locator('input[name="withoutEntityCode"]').check();
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="firstName"]').fill("Jan");
  await page.locator('input[name="lastName"]').fill("Nowak");
  await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
  await page.locator('input[name="description"]').fill("handel rzeczami używanymi");

    // Randomly select an option from the dropdown list
    await selectRandomOptionFromDropdownOtherTransaction(page, 'div[id="type"]', 'ul[role="listbox"]', "pośrednik" );

  await page.waitForLoadState('networkidle');
  await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
  await page.locator('button[name="nextButton"]').click();
  await page.locator('input[name="title"]').fill("Rata za samochód");
  await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
  await page.locator('button[name="nextButton"]').click();
  await page.locator('button[name="createNewButton"]').click();
  await expect(successAlert).toBeVisible({ timeout: 30000 });
  await expect(errorAlert).not.toBeVisible();
});

test("creating purchase transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="buyer"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').fill("1000000000000");
    await page.locator('div[id="paymentMethod"]').click();
    await page.locator('li[data-value="cash"]').click();
    await page.locator('button.MuiButton-outlinedSecondary').click();
    await page.locator('input[name="withoutEntityCode"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="firstName"]').fill("Jan");
    await page.locator('input[name="lastName"]').fill("Nowak");
    await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
    await page.locator('input[name="description"]').fill("handel rzeczami używanymi");


    await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="title"]').fill("Rata za samochód");
    await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
    await page.locator('button[name="nextButton"]').click();
    await page.locator('button[name="createNewButton"]').click();
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });

  test("creating sale transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="seller"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').fill("1000000000000");
    await page.locator('div[id="paymentMethod"]').click();
    await page.locator('li[data-value="cash"]').click();
    await page.locator('button.MuiButton-outlinedSecondary').click();
    await page.locator('input[name="withoutEntityCode"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="firstName"]').fill("Jan");
    await page.locator('input[name="lastName"]').fill("Nowak");
    await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
    await page.locator('input[name="description"]').fill("handel rzeczami używanymi");

    await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="title"]').fill("Rata za samochód");
    await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
    await page.locator('button[name="nextButton"]').click();
    await page.locator('button[name="createNewButton"]').click();
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });

  test("creating transfer transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="transfer"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').fill("1000000000000");
    await page.locator('div[id="paymentMethod"]').click();
    await page.locator('li[data-value="cash"]').click();
    await page.locator('button.MuiButton-outlinedSecondary').first().click();
    await page.locator('input[name="withoutEntityCode"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="firstName"]').fill("Jan");
    await page.locator('input[name="lastName"]').fill("Nowak");
    await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
    await page.locator('input[name="description"]').fill("handel rzeczami używanymi");

    await page.waitForLoadState('networkidle');
    await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await page.locator('button.MuiButton-outlinedSecondary').last().click();
    await page.locator('input[name="withoutEntityCode"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="firstName"]').fill("Adam");
    await page.locator('input[name="lastName"]').fill("Kowalski");
    await page.locator('input[name="companyName"]').fill("Młoty Kowalski");
    await page.locator('input[name="description"]').fill("handel młotami pneumatycznymi");

    await page.waitForLoadState('networkidle');
    await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="title"]').fill("Rata za samochód");
    await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
    await page.locator('button[name="nextButton"]').click();
    await page.locator('button[name="createNewButton"]').click();
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });

  test("creating buyer crypto transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="buyer_crypto"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').first().fill("1000000000000");
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
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });

  test("creating seller crypto transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="seller_crypto"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').first().fill("1000000000000");
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
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });

  test("creating exchange fiat transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="exchange_fiat"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').first().fill("4000");
    await page.locator('div[id="paymentMethod"]').click();
    await page.locator('li[data-value="cash"]').click();
    await page.locator('input[name="amount"]').last().fill("1000000000000");
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
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });

  test("creating other transaction negative", async ({ browser }) => {
    const context = await browser.newContext({
        storageState: "./auth_cranky.json"
    })
    const page = await context.newPage();
    const successAlert = page.locator('.MuiAlert-standardSuccess');
    const errorAlert = page.locator('.MuiAlert-standardError');

    await page.goto("/dashboard/transactions/create/");
    await page.waitForLoadState('networkidle');
    await page.locator('input[value="other"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="amount"]').fill("1000000000000");
    await page.locator('div[id="paymentMethod"]').click();
    await page.locator('li[data-value="cash"]').click();
    await page.locator('button.MuiButton-outlinedSecondary').click();
    await page.locator('input[name="withoutEntityCode"]').check();
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="firstName"]').fill("Jan");
    await page.locator('input[name="lastName"]').fill("Nowak");
    await page.locator('input[name="companyName"]').fill("Spółka Jan Nowak");
    await page.locator('input[name="description"]').fill("handel rzeczami używanymi");


      // Randomly select an option from the dropdown list
      await selectRandomOptionFromDropdownOtherTransaction(page, 'div[id="type"]', 'ul[role="listbox"]', "pośrednik" );

    await page.waitForLoadState('networkidle');
    await page.locator('button.MuiButton-contained.MuiButton-containedSecondary').last().click();
    await page.locator('button[name="nextButton"]').click();
    await page.locator('input[name="title"]').fill("Rata za samochód");
    await page.locator('input[name="description"]').fill("Siódma rata Jan Nowak");
    await page.locator('button[name="nextButton"]').click();
    await page.locator('button[name="createNewButton"]').click();
    await expect(errorAlert).toBeVisible({ timeout: 30000 });
    await expect(successAlert).not.toBeVisible();
  });