// bot.js

import dotenv from 'dotenv'
dotenv.config()

import TelegramBot from 'node-telegram-bot-api'
import { routeCommand } from './bot/commandRouter.js'
import { handleObedience } from './bot/handlers/obedienceHandler.js'

// Create the Telegram bot instance
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })

// Listen for any incoming message
bot.on('message', async (msg) => {
  const text = msg.text?.trim()

  if (!text) return

  // Known /commands routing
  if (text.startsWith('/')) {
    await routeCommand(bot, msg)
    return
  }

  // ✨ Ritual initiation flow
  if (text === 'Begin Ritual') {
    // First ritual flow
    const { handleRitual } = await import('./bot/handlers/ritualHandler.js')
    await handleRitual(bot, msg)
    return
  }

  // Otherwise assume it's an obedience response (OBEY / NEGOTIATE / DEFY)
  await handleObedience(bot, msg)
})

// Handle polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message)
})
