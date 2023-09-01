export default async function getTextsMainPage(page) {
  console.log('getting texts from main page')
  let texts = {}
  texts.mainPage = {}

  texts.lang = await page.evaluate(() => {
    return lang
  })
  texts.mainPage.title = await page.evaluate(() => {
    return document.title
  })
  texts.mainPage.name = await page.evaluate(() => {
    return document.querySelector('head > meta[name="application-name"]').content
  })
  texts.mainPage.ogtitle = await page.evaluate(() => {
    return document.querySelector('head > meta[property="og:title"]').content
  })
  texts.mainPage.description = await page.evaluate(() => {
    return document.querySelector('head > meta[name="description"]').content
  })
  texts.mainPage.keywords = await page.evaluate(() => {
    return document.querySelector('head > meta[name="keywords"]').content
  })
  texts.mainPage.ogdescription = await page.evaluate(() => {
    return document.querySelector('head > meta[property="og:description"]').content
  })

  for(let key in texts.lang){
    if (key == undefined) return false
  }
  for (let key in texts.mainPage) {
    if (key == undefined) return false
  }
  return texts
}