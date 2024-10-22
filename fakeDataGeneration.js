
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

