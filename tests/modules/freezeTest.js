import isPlayerfrozen from "./isPlayerFozen.js";
export default async function freezeTest(page, coordinates, language, mode, playerTofreeze = 'first') {
  if (mode != 'single' && mode != 'multi') {
    return false
  }
  if (playerTofreeze != 'first' && playerTofreeze != 'second') {
    return false
  }
  let playerToShootX;
  let playerTofreezeX;
  if (playerTofreeze == 'first') {
    playerTofreezeX = 60;
    playerToShootX = 585;
  } else {
    playerTofreezeX = 585;
    playerToShootX = 60;
  }
  if (mode == 'single') {
    await page.mouse.click(coordinates.X + 225, coordinates.Y + 125);
  } else {
    await page.mouse.click(coordinates.X + 425, coordinates.Y + 125);
  }
  await page.waitForFunction('remainingTimer < 150');
  await page.mouse.click(coordinates.X + playerTofreezeX, coordinates.Y + 125);
  let currentScreenshotPath = `./reports/${language}/countdown ${mode} frozen ${playerTofreeze}.png`
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  await page.waitForFunction('remainingTimer < 0');
  await page.mouse.click(coordinates.X + playerToShootX, coordinates.Y + 125);
  await page.waitForFunction('!players.first.moving && !players.second.moving && currentScreen.name == "end"')
  let frozenResult = await isPlayerfrozen(page, 'first')
  currentScreenshotPath = `./reports/${language}/end ${mode} frozen ${playerTofreeze}.png`
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  await page.mouse.click(coordinates.X + 225, coordinates.Y + 125);
  if (frozenResult) {
    console.log(`${playerTofreeze} player in mode ${mode} is frozen as expected✅`);
    return true
  } else {
    console.log(`${playerTofreeze} player in mode ${mode} is not frozen❌`);
    return false
  }
}