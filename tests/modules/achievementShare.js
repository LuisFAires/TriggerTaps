import replaceShare from "./replaceShare.js";
import getSharedData from "./getSharedData.js";
export default async function achievementShare(page, language, data) {
  await replaceShare(page)
  await page.click('#share')
  let achievementSharedData = await getSharedData(page);
  let cookie = await page.evaluate(() => {
    let name = "achievement=";
    let ca = document.cookie.split(';');
    for (c of ca) {
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  })
  if (data.url+`achievement/?name=${cookie}&lang=${language}` != achievementSharedData.url) {
    return {result: false, function: 'achievementShare', error: 'url'}
  }
  if (data.title != achievementSharedData.title) {
    return {result: false, function: 'achievementShare', error: 'title'}
  }
  if (data.text != achievementSharedData.text) {
    return {result: false, function: 'achievementShare', error: 'text'}
  }
  console.log("Achievement shared data ✅")
  return {result: true, function: 'achievementShare'}
}