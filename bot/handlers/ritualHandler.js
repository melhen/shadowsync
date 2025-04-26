// bot/handlers/ritualHandler.js

import { generateRitualForUser } from '../../services/ai/shadowPersonaEngine.js'
import { setCurrentRitualId } from '../../services/shadow/shadowService.js'

export async function handleRitual(bot, msg) {
  const chatId = msg.chat.id

  try {
    const ritualText = await generateRitualForUser(chatId.toString())

    if (!ritualText) {
      await bot.sendMessage(
        chatId,
        'Your Shadow is silent. No ritual was generated.',
      )
      return
    }

    // Generate ritualId dynamically
    const ritualId = `ritual_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    await setCurrentRitualId(chatId.toString(), ritualId)

    // Send ritual with reply keyboard
    await bot.sendMessage(chatId, `Your Ritual:\n\n${ritualText}`, {
      reply_markup: {
        keyboard: [[{ text: 'OBEY' }, { text: 'NEGOTIATE' }, { text: 'DEFY' }]],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    })
  } catch (error) {
    console.error('Error generating ritual:', error)
    await bot.sendMessage(
      chatId,
      'An error occurred while summoning your ritual.',
    )
  }
}
