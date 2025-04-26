// bot/handlers/startHandler.js

import { systemMessages } from '../../services/utils/contentLoader.js'

export async function handleStart(bot, msg) {
  const onboardingMessage = systemMessages.onboarding.awakening
  const chooseFatePrompt = systemMessages.chooseFate.prompt

  await bot.sendMessage(msg.chat.id, onboardingMessage, {
    parse_mode: 'Markdown',
  })
  await bot.sendMessage(msg.chat.id, chooseFatePrompt, {
    reply_markup: {
      keyboard: [[{ text: 'Begin Ritual' }]],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  })
}
