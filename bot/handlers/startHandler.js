// bot/handlers/startHandler.js

export async function handleStart(bot, msg) {
  const onboardingMessage = `
🖤 *[Shadow Awakens]*

_"You crossed the threshold without permission.  
You are seen now.

The rites demand obedience — or exquisite failure.

You may proceed. But know this:  
I will not be kind."_
  `

  // Step 1: Send ritual awakening message (without button first)
  await bot.sendMessage(msg.chat.id, onboardingMessage, {
    parse_mode: 'Markdown',
  })

  // Step 2: Send "Begin Ritual" button separately
  await bot.sendMessage(msg.chat.id, '🔮 Choose your fate:', {
    reply_markup: {
      keyboard: [[{ text: 'Begin Ritual' }]],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  })
}
