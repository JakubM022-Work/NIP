// const { chromium } = require("playwright");
// const fs = require("fs");
// (async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   const baseUrl = "https://panoramafirm.pl/lombardy";
//   let currentPage = 1;
//   const allNips = new Set();
//   while (true) {
//     try {
//       const url = `${baseUrl}/firmy,${currentPage}.html`;
//       await page.goto(url);
//       const links = await page.$$eval(".company-name", (links) =>
//         links.map((link) => link.getAttribute("href").split("?")[0])
//       );
//       for (const link of links) {
//         try {
//           await page.goto(link);
//           let nipValue = "";
//           const nipLabels = await page.$$(
//             ".row.contact-item .col-lg-4.font-weight-bold"
//           );
//           for (const nipLabel of nipLabels) {
//             const label = await nipLabel.textContent();
//             if (label.trim() === "NIP") {
//               const nipElement = await nipLabel.$("+ .col-lg-8");
//               nipValue = await nipElement.textContent();
//               console.log(`Link: ${link}, NIP: ${nipValue}`);
//               allNips.add(nipValue.trim());
//               break;
//             }
//           }
//           if (!nipValue) {
//             console.error(`Nie można znaleźć numeru NIP dla linku: ${link}`);
//           }
//         } catch (error) {
//           console.error(
//             `Błąd podczas pobierania danych dla linku: ${link}`,
//             error
//           );
//           await page.close();
//           page = await context.newPage();
//         }
//       }
//       currentPage++;

//       const paginationItems = await page.$$('.pagination-item.pagination-page');
//       const lastPage = parseInt(await paginationItems[paginationItems.length - 1].innerText());

//       if (currentPage > lastPage) {
//         console.log('Osiągnięto ostatnią stronę, proces zakończony.');
//         break;
//       } else {
//         console.log('Przechodzenie do następnej strony');
//         await page.goto(`${baseUrl}/firmy,${currentPage}.html`);
//       }

//     } catch (error) {
//       console.error(`Błąd podczas przetwarzania strony ${currentPage}`, error);
//       await page.close();
//       page = await context.newPage();
//     }
//   }
//   const uniqueNipsArray = Array.from(allNips);
//   fs.writeFileSync(
//     "numery_nip_z_lombardow.txt",
//     JSON.stringify(uniqueNipsArray, null, 2)
//   );
//   console.log(
//     "Numery NIP zostały zapisane do pliku numery_nip_z_lombardow.txt"
//   );
//   await browser.close();
// })();