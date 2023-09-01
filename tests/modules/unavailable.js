export default async function unavailable(page, url, language, deviceWidth, deviceHeight, data) {
  await page.goto(url + "unavailable.php");
  let currentScreenshotPath = `./reports/${language}/unavailable landscape.png`
  await page.screenshot({ path:currentScreenshotPath});
  console.log(currentScreenshotPath);
  await page.setViewport({ width: deviceHeight, height: deviceWidth });
  currentScreenshotPath = `./reports/${language}/unavailable portrait.png` 
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  await page.setViewport({ width: deviceWidth, height: deviceHeight });

  let noConnection = await page.evaluate(() => {
    return document.getElementById("noConnection").innerHTML
  })
  if (noConnection != data.noConnection) {
    return false
  }
  let tryAgain = await page.evaluate(() => {
    return document.getElementById("tryAgain").innerHTML
  })
  if (tryAgain != data.tryAgain) {
    return false
  }

  await page.click("#tryAgain");
  if (url != page.url()) {
    console.log("Try again button isn't working❌");
    return false
  }
  console.log('Try again button works✅');
  return true
}