export default async function getSharedData(page) {
    let test = await page.waitForFunction('window.sharedData')
    let sharedData = await page.evaluate(() => {
      return window.sharedData
    })
    return sharedData
}