import puppeteer from 'puppeteer'

const test = puppeteer

export async function scrapeNewsletter(url: string) {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto(url)
    page.waitForXPath
    console.log(url)
    const element = await page.$$eval('a[style*="color:#0446AB;text-decoration:underline"], h2', el => el.map((val) => val.textContent?.trim()));
    // const text = await element.getProperty('textContent')
    // const name = await text!.jsonValue() as string
    console.log(element)

    browser.close()

}

module.exports = {
    scrapeNewsletter,
}