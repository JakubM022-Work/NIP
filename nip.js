const { chromium } = require("playwright");
const fs = require("fs");

const visitedPagesPath = "visited_pages.txt";
const nipsFilePath = "numery_nip_z_lombardow.txt";

const saveVisitedPage = (url) => {
  fs.appendFileSync(visitedPagesPath, `${url}\n`);
};

const isVisited = (url) => {
  if (fs.existsSync(visitedPagesPath)) {
    const visited = fs.readFileSync(visitedPagesPath, "utf-8");
    return visited.includes(url);
  }
  return false;
};

const saveNipsToFile = (nips) => {
  if (fs.existsSync(nipsFilePath)) {
    const existingNips = JSON.parse(fs.readFileSync(nipsFilePath));
    const updatedNips = [...existingNips, ...nips];
    fs.writeFileSync(nipsFilePath, JSON.stringify(updatedNips, null, 2));
  } else {
    fs.writeFileSync(nipsFilePath, JSON.stringify(nips, null, 2));
  }
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  const baseUrl = "https://panoramafirm.pl/lombardy";
  let currentPage = 1;
  const allNips = new Set();

  while (true) {
    try {
      const url = `${baseUrl}/firmy,${currentPage}.html`;

      if (!isVisited(url)) {
        await page.goto(url);
        saveVisitedPage(url);

        const links = await page.$$eval(".company-name", (links) =>
          links.map((link) => link.getAttribute("href").split("?")[0])
        );

        for (const link of links) {
          if (!isVisited(link)) {
            await page.goto(link);
            saveVisitedPage(link);

            const nipValue = await page.$eval(
              ".row.contact-item .col-lg-4.font-weight-bold",
              (nipLabel) => {
                const label = nipLabel.textContent.trim();
                if (label === "NIP") {
                  const nipElement =
                    nipLabel.nextElementSibling;
                  return nipElement.textContent.trim();
                }
                return null;
              }
            );

            if (nipValue) {
              console.log(`Link: ${link}, NIP: ${nipValue}`);
              allNips.add(nipValue);
            } else {
              console.error(`Nie można znaleźć numeru NIP dla linku: ${link}`);
            }
          }
        }
      }

      currentPage++;

      const paginationItems = await page.$$(
        ".pagination-item.pagination-page"
      );
      const lastPage = parseInt(
        await paginationItems[paginationItems.length - 1].innerText()
      );

      if (currentPage > lastPage) {
        console.log("Osiągnięto ostatnią stronę, proces zakończony.");
        break;
      }
    } catch (error) {
      console.error(`Błąd podczas przetwarzania strony ${currentPage}`, error);
      await page.close();
      page = await context.newPage();
    }
  }

  const uniqueNipsArray = Array.from(allNips);
  saveNipsToFile(uniqueNipsArray);
  console.log("Numery NIP zostały zapisane do pliku numery_nip_z_lombardow.txt");

  await browser.close();
})();

