// bot/handlers/trophyHandler.js

import { getUserTrophies } from '../../services/trophies/trophyService.js'

export async function handleTrophy(bot, msg) {
  const chatId = msg.chat.id

  try {
    const trophies = await getUserTrophies(chatId.toString())

    if (!trophies.length) {
      await bot.sendMessage(
        chatId,
        "You haven't earned any trophies yet. Complete rituals to unlock them!",
      )
      return
    }

    const trophyList = trophies
      .map((trophy) => `🏆 ${trophy.name}: ${trophy.description}`)
      .join('\n\n')

    await bot.sendMessage(chatId, `Your Trophies:\n\n${trophyList}`)
  } catch (error) {
    console.error('Error fetching trophies:', error)
    await bot.sendMessage(chatId, 'Unable to fetch your trophies right now.')
  }
}
