// This test should be started in the game completed screen
export default async function generateAchievement(page, coordinates, data, userName) {
  let achievementPromptTested = false
  let invalidTested = false
  page.on('dialog', async (dialog) => {
    if (!invalidTested) {
      if (dialog.message() == data.achievementPrompt) achievementPromptTested = true
      if (dialog.message() == data.invalid) invalidTested = true;
      await dialog.dismiss()
    } else {
      await dialog.accept(userName);
    }
  });
  console.log('Dialog listener setted✅')
  await page.mouse.click(coordinates.X + 325, coordinates.Y + 225);
  let navigationPromise = page.waitForNavigation()
  await new Promise((r) => {
    let timeout = setTimeout(() => {
      if (invalidTested && achievementPromptTested) {
        clearTimeout(timeout)
        r()
      }
    })
  })
  await page.mouse.click(coordinates.X + 325, coordinates.Y + 225);
  await navigationPromise
  console.log('Achievement page loaded✅')
  await page.off('dialog')
  console.log('Dialog listener removed✅')
  if(achievementPromptTested && invalidTested){
    console.log('Dialogs texts✅')
    return {result: true, function: 'generateAchievement'}
  }else{
    console.log('Dialogs texts❌')
    return {result: false, function: 'generateAchievement'}
  }
}