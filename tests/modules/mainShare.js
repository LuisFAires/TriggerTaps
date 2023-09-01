import replaceShare from "./replaceShare.js";
import getSharedData from "./getSharedData.js";

export default async function mainShare(page, coordinates, data) {
  await replaceShare(page)
  await page.mouse.click(coordinates.X + 640, coordinates.Y + 10)
  let menuSharedData = await getSharedData(page);
  if(!menuSharedData.title.startsWith(data.title)){
    return false
  }
  if(menuSharedData.text != data.text){
    return false
  }
  if(menuSharedData.url != data.url){
    return false
  }
  console.log('menu shared data✅')
  return true
}