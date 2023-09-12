export default async function achievementPlay(page, url) {
  await page.click("#play");
  if (url == page.url()) {
    console.log('Play to button returns to home page✅');
    return {result: true, function: 'achievementPlay'}
  } else {
    console.log("Check play button in achievement❌");
    return {result: false, function: 'achievementPlay'}
  }
}