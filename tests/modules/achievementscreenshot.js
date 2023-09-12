export default async function achievementScreenshot(page, language, deviceWidth, deviceHeight) {
    //screenshot achievement in both orientations
    let currentScreenshotPath = `./reports/${language}/achievement landscape.png`
    await page.screenshot({ path: currentScreenshotPath});
    console.log(currentScreenshotPath);
    await page.setViewport({ width: deviceHeight, height: deviceWidth });
    currentScreenshotPath = `./reports/${language}/achievement portrait.png`
    await page.screenshot({ path: currentScreenshotPath });
    console.log(currentScreenshotPath);
    await page.setViewport({ width: deviceWidth, height: deviceHeight });
    return {result: true, function: 'achievementScreenshot'}
}