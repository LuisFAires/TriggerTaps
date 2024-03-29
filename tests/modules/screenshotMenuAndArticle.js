export default async function screenshotMenuAndArticle(page, coordinates, keyboard, language) {
  await page.evaluate((keyboard) => {
    physicalKeyboard = keyboard;
    currentScreen.update()
  }, keyboard)
  let currentScreenshotPath = `./reports/${language}/menu keyboard ${keyboard.toString()}.png`
  await page.screenshot({ path: currentScreenshotPath })
  console.log(currentScreenshotPath)

  await page.mouse.click(coordinates.X + 15, coordinates.Y + 15);
  currentScreenshotPath = `./reports/${language}/article keyboard ${keyboard.toString()}.png`
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath)

  await page.click('#backToGame')
  return {result: true, function: 'screenshotMenuAndArticle'}
}