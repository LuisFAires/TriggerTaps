import replaceShare from "./replaceShare.js";
import getSharedData from "./getSharedData.js";

export default async function mainShare(page, coordinates, data) {
  await replaceShare(page)
  await page.mouse.click(coordinates.X + 640, coordinates.Y + 10)
  let menuSharedData = await getSharedData(page);
  console.log('menuSharedData', menuSharedData)
  console.log('menu shared data✅')
  return {result: undefined, function: 'mainShare'}
}