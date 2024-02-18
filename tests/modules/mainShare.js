import replaceShare from "./replaceShare.js";
import getSharedData from "./getSharedData.js";

export default async function mainShare(page, coordinates, dataToComparison) {
  await replaceShare(page)
  await page.mouse.click(coordinates.X + 640, coordinates.Y + 10)
  let menuSharedData = await getSharedData(page);
  console.log('menu shared data✅')
  if (menuSharedData.title == dataToComparison.title && menuSharedData.text == dataToComparison.text && menuSharedData.url == dataToComparison.url) {
    return { result: true, function: 'mainShare' }
  } else {
    return { result: false, function: 'mainShare' }
  }
}