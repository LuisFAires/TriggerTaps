import isPlayerstuck from "./isPlayerStuck.js";
export default async function stuckTest(page, coordinates, language, mode, playerTostuck = 'first') {
  if (mode != 'single' && mode != 'multi') {
    return false
  }
  if (playerTostuck != 'first' && playerTostuck != 'second') {
    return false
  }
  let playerToShootX;
  let playerTostuckX;
  if (playerTostuck == 'first') {
    playerTostuckX = 60;
    playerToShootX = 585;
  } else {
    playerTostuckX = 585;
    playerToShootX = 60;
  }
  if (mode == 'single') {
    await page.mouse.click(coordinates.X + 225, coordinates.Y + 125);
  } else {
    await page.mouse.click(coordinates.X + 425, coordinates.Y + 125);
  }
  await page.waitForFunction('remainingTimer < 150');
  await page.mouse.click(coordinates.X + playerTostuckX, coordinates.Y + 125);
  let currentScreenshotPath = `./reports/${language}/countdown ${mode} stuck ${playerTostuck}.png`
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  await page.waitForFunction('remainingTimer < 0');
  await page.mouse.click(coordinates.X + playerToShootX, coordinates.Y + 125);
  await page.waitForFunction('!players.first.moving && !players.second.moving && currentScreen.name == "end"')
  let stuckResult = await isPlayerstuck(page, 'first')
  currentScreenshotPath = `./reports/${language}/end ${mode} stuck ${playerTostuck}.png`
  await page.screenshot({ path: currentScreenshotPath });
  console.log(currentScreenshotPath);
  await page.mouse.click(coordinates.X + 225, coordinates.Y + 125);
  if (stuckResult) {
    console.log(`${playerTostuck} player in mode ${mode} is stuck as expected✅`);
    return {result: true, function:'stuckTest'}
  } else {
    console.log(`${playerTostuck} player in mode ${mode} is not stuck❌`);
    return {result: false, function:'stuckTest'}
  }
}