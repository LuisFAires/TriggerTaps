export default async function isPlayerstuck(page, player) {
    let result = await page.evaluate((player) => {
      return players[player].stuck
    }, player)
    return result
}