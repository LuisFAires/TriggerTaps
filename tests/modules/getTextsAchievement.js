export default async function getTextsAchievement(page, userName) {
  
  console.log('getting texts from achievement page')
  let nameInsideAchievement = await page.evaluate(() => {
    return document.getElementById("name").innerHTML;
  })
  if (nameInsideAchievement == userName) {
    console.log('Achievement matches with user name✅');
  } else {
    console.log("Achievement doesn't match with user name❌");
  }

  let texts = {}

  //gets achievement text
  texts.achievement = await page.evaluate(() => {
    return document.getElementById("text").innerHTML
  })

  texts.achievementName = await page.evaluate(() => {
    return document.querySelector('head > meta[name="application-name"]').content
  })

  texts.achievementTitle = await page.evaluate(() => {
    return document.title
  })
  texts.achievementogtitle = await page.evaluate(() => {
    return document.querySelector('head > meta[property="og:title"]').content
  })

  texts.achievementdescription = await page.evaluate(() => {
    return document.querySelector('head > meta[name="description"]').content
  })
  texts.achievementogdescription = await page.evaluate(() => {
    return document.querySelector('head > meta[property="og:description"]').content
  })

  texts.play = await page.evaluate(() => {
    return document.getElementById('play').innerHTML
  })

  texts.share = await page.evaluate(() => {
    return document.getElementById('share').innerHTML
  })

  for(let key in texts){
    if (key == undefined) return false
  }
  return texts
}