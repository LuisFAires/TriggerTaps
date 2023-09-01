export default async function replaceShare(page) {
  await page.evaluate(() => {
    navigator.share = (obj) => {
      window.sharedData = obj
    }
  })
}