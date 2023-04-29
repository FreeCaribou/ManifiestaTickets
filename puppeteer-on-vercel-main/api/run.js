const chromium = require("@sparticuz/chromium")
const puppeteer = require("puppeteer-core")

export default async function handler(request, response) {
  response.status(200).json({
    body: request.body,
    r: request,
  })
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
    ],
    ignoreDefaultArgs: ["--disable-extensions"],
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage();


  // await page.goto("https://vercel.com/")
  // const title = await page.title()
  // const screenshot = await page.screenshot({ encoding: 'base64' });

  const orderCode = '';
  const status = await page.goto(
    `https://www.vivapayments.com/web2?ref=${orderCode}&paymentmethod=27`,
  ); // Replace this with the right link.
  await page.waitForTimeout(4000);
  const qrCode = await page.$('canvas');
  const screenshot = await qrCode.screenshot({ encoding: 'base64' });
  return {
    data: 'data:image/png;base64,' + screenshot,
    orderCode: orderCode,
  };


  await page.close()
  await browser.close()

  response.status(200).json({
    body: request.body,
    cookies: request.cookies,
    title,
    chromium: await chromium.executablePath,
    data: 'data:image/png;base64,' + screenshot,
  })
}
