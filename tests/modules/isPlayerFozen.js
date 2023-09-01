export default async function isPlayerfrozen(page, player) {
    let result = await page.evaluate((player) => {
      return players[player].frozen
    }, player)
    return result
}