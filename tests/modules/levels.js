export default async function levels(page, coordinates, language) {
  await page.mouse.click(coordinates.X + 225, coordinates.Y + 125);
  await page.waitForFunction('remainingTimer == 3000');
  let currentScreenshotPath = `./reports/${language}/countdown 3.png`
  await page.screenshot({ path: `./reports/${language}/countdown 3.png` });
  console.log(currentScreenshotPath);
  await page.waitForFunction('remainingTimer == 2000');
  currentScreenshotPath = `./reports/${language}/countdown 2.png`
  await page.screenshot({ path: `./reports/${language}/countdown 2.png` });
  console.log(currentScreenshotPath);
  await page.waitForFunction('remainingTimer == 1000');
  currentScreenshotPath = `./reports/${language}/countdown 1.png`
  await page.screenshot({ path: `./reports/${language}/countdown 1.png` });
  console.log(currentScreenshotPath);
  await page.waitForFunction('remainingTimer < 0');
  currentScreenshotPath = `./reports/${language}/countdown 0 shoot.png`
  await page.screenshot({ path: `./reports/${language}/countdown 0 shoot.png` });
  console.log(currentScreenshotPath);

  //levels
  await page.mouse.click(coordinates.X + 60, coordinates.Y + 125);
  let lvl = 1;
  await page.waitForFunction('!players.first.moving && !players.second.moving && currentScreen.name == "end"')
  let isPlayerDead = await page.evaluate(() => {
    return players.second.status == 'dead';
  })
  if (isPlayerDead) {
    console.log('Player 2 is dead as expected✅');
  } else {
    console.log('Players 2 is alive he must dead❌');
    return false
  }
  do {
    currentScreenshotPath = `./reports/${language}/end level ${lvl}.png`
    await page.screenshot({ path: `./reports/${language}/end level ${lvl}.png` });
    console.log(currentScreenshotPath);
    await page.evaluate(() => {
      currentLevel++;
      currentScreen.update();
    })
    lvl++
  } while (lvl != 10)

  //game completed
  currentScreenshotPath = `./reports/${language}/end level 10 game completed.png`
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  return true
}