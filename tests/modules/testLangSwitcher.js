export default async function testLangSwitcher(page, coordinates, url, language, languagesOrder) {
  await page.goto(url);
  await page.waitForSelector('canvas')
  await page.evaluate(() => {
    scrollTo(0, 0)
  })
  await page.waitForSelector('#loadingOverlay')
  await page.click('#loadingOverlay')
  let somethingWrong = false
  for (let i = 0; i < languagesOrder.length; i++) {
    await page.mouse.click(coordinates.X + 5, coordinates.Y + 5)
    await page.click(`.langBtn:nth-of-type(${i + 1})`)
    await page.waitForSelector('canvas')
    await page.evaluate(() => {
      scrollTo(0, 0)
    })
    await page.waitForSelector('#loadingOverlay')
    await page.click('#loadingOverlay')
    let currentScreenshotPath = `./reports/${language}/lang switcher ${languagesOrder[i]}.png`
    await page.screenshot({ path: currentScreenshotPath });
    console.log(currentScreenshotPath)
    let currentLang = await page.evaluate(() => {
      return lang.currentLang
    });
    if (currentLang == languagesOrder[i]) {
      console.log(`Lang switcher ${languagesOrder[i]}✅`)
    } else {
      console.log(`Lang switcher ${languagesOrder[i]}❌`)
      somethingWrong = true
    }
  }
  return !somethingWrong
}