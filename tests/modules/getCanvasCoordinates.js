//this function loads the main page, skips the tutorial and return the canvas coordinates
export default async function getCanvasCoordinates(page, url, language) {
  console.log('Loading page');
  await page.goto(url);
  await page.waitForSelector('canvas');
  await page.evaluate((language) => {
    document.cookie = `lang=${language};`
    document.cookie = "tutorial=done;";
    location.reload()
  }, language)
  await page.waitForNetworkIdle();
  await page.waitForSelector('canvas');
  await page.evaluate(() => {
    scrollTo(0, 0)
  })
  await page.waitForSelector('#loadingOverlay')
  await page.click('#loadingOverlay')

  let canvasX = await page.evaluate(() => {
    let boundingClientRect = canvas.getBoundingClientRect()
    return boundingClientRect.x
  })
  let canvasY = await page.evaluate(() => {
    let boundingClientRect = canvas.getBoundingClientRect()
    return boundingClientRect.y
  })
  console.log(`Canvas coordinates: X:`,  { X: canvasX, Y: canvasY });
  if (canvasX >= 0 & canvasY >= 0) {
    return {result: true, function: 'getCanvasCoordinates', coordinates: { X: canvasX, Y: canvasY }}
  } else {
    return {result: false, function: 'getCanvasCoordinates', coordinates: false}
  }
}

