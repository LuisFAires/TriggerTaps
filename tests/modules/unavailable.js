export default async function unavailable(page, url, language, deviceWidth, deviceHeight, data) {
  await page.goto(url + "unavailable");
  let currentScreenshotPath = `./reports/${language}/unavailable landscape.png`
  await page.screenshot({ path:currentScreenshotPath});
  console.log(currentScreenshotPath);
  await page.setViewport({ width: deviceHeight, height: deviceWidth });
  currentScreenshotPath = `./reports/${language}/unavailable portrait.png` 
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  await page.setViewport({ width: deviceWidth, height: deviceHeight });

  await page.click("#tryAgain");
  if (url != page.url()) {
    console.log("Try again button isn't working❌");
    return {result: false, function: 'unavailable'}
  }
  console.log('Try again button works✅');
  return {result: true, function: 'unavailable'}
}