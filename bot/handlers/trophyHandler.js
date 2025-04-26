// bot/handlers/trophyHandler.js

const { getUserTrophies } = require('../../services/trophies/trophyService')

async function handleTrophy(bot, msg) {
  const chatId = msg.chat.id

  try {
    const trophies = await getUserTrophies(chatId)

    if (!trophies.length) {
      bot.sendMessage(
        chatId,
        "You haven't earned any trophies yet. Complete rituals to unlock them!",
      )
      return
    }

    const trophyList = trophies
      .map((trophy) => `🏆 ${trophy.name}: ${trophy.description}`)
      .join('\n\n')

    bot.sendMessage(chatId, `Your Trophies:\n\n${trophyList}`)
  } catch (error) {
    console.error('Error fetching trophies:', error)
    bot.sendMessage(chatId, 'Unable to fetch your trophies right now.')
  }
}

module.exports = {
  handleTrophy,
}
