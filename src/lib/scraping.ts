"use server";
import puppeteer from "puppeteer";
import { delay } from "./utils";

export async function getPuntajesData(search: string) {
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  const result = [];

  let pageCounter = 1;
  let hasNextPage = true;

  const searchString = search.replace(/ /g, "+");

  while (hasNextPage) {

    const page = await browser.newPage();

    const website = await page.goto(
      `https://senescyt.com.ec/puntajes_referenciales/?pagina=${pageCounter}&kword=${searchString}`
    );

    console.log(`Page ${pageCounter} loaded`)

    await page.waitForSelector("tbody");

    if (!website?.ok()) {
      console.log(`Failed to load page ${pageCounter}`);
      await page.close();
      continue;
    }

    // Check if there is a next page
    hasNextPage = await page.evaluate(() => {
      const nextButton = document.querySelector('a[aria-label="Next"]');
      return nextButton !== null;
    });

    const pageResult = await page.evaluate(() => {
      const rows = document.getElementsByTagName("tr");
      if (rows.length < 3) {
        return [];
      } else {
        const rows2 = [...rows].slice(1);
        const data = [...rows2].map((row) => {
          const columns = row.getElementsByTagName("td");
          const universidad = columns[0].getElementsByTagName("a")[0].innerText;
          const carrera = columns[1].getElementsByTagName("a")[0].innerText;
          const campus = columns[2].getElementsByTagName("div")[0].innerText;
          const modalidad = columns[3].getElementsByTagName("div")[0].innerText;
          const jornada = columns[3].getElementsByTagName("div")[1].innerText;
          const puntaje = columns[4].innerText;
          return { universidad, carrera, campus, modalidad, jornada, puntaje };
        });
        return data;
      }
    });

    result.push(...pageResult);

    await page.close();

    await delay(500);

    console.log(`Page ${pageCounter} closed`);

    pageCounter++
  }

  await browser.close();

  return result;

  /* await page.goto("https://senescyt.com.ec/puntajes_referenciales/");
  await page.click('input[id="kword"]');
  await page.keyboard.type(search);
  await page.click('button[type="submit"]');
  await page.waitForSelector("tbody");

  const result = await page.evaluate(() => {
    const rows = document.getElementsByTagName("tr");
    if (rows.length < 3) {
      return [];
    } else {
      const rows2 = [...rows].slice(1);
      const data = [...rows2].map((row) => {
        const columns = row.getElementsByTagName("td");
        const universidad = columns[0].getElementsByTagName("a")[0].innerText;
        const carrera = columns[1].getElementsByTagName("a")[0].innerText;
        const campus = columns[2].getElementsByTagName("div")[0].innerText;
        const modalidad = columns[3].getElementsByTagName("div")[0].innerText;
        const jornada = columns[3].getElementsByTagName("div")[1].innerText;
        const puntaje = columns[4].innerText;
        return { universidad, carrera, campus, modalidad, jornada, puntaje };
      });
      return data;
    }
  });
  await browser.close();
    return result;*/
}
