// bot/handlers/ritualHandler.js

const {
  generateRitualForUser,
} = require('../../services/ai/shadowPersonaEngine')

async function handleRitual(bot, msg) {
  const chatId = msg.chat.id

  try {
    const ritualText = await generateRitualForUser(chatId.toString())

    if (!ritualText) {
      bot.sendMessage(chatId, 'Your Shadow is silent. No ritual was generated.')
      return
    }

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
    bot.sendMessage(chatId, 'An error occurred while summoning your ritual.')
  }
}

module.exports = {
  handleRitual,
}
