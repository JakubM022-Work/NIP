export function getExactByText(page, text, fallbackText) {
    const element = page.getByText(text, { exact: true });
    if (element.count() > 0) {
      return element;
    }
    return page.getByText(fallbackText, { exact: true });
  }
  
  