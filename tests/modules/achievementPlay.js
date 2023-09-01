export default async function achievementPlay(page, url) {
  await page.click("#play");
  if (url == page.url()) {
    console.log('Play to button returns to home page✅');
    return true
  } else {
    console.log("Check play button in achievement❌");
    return false
  }
}