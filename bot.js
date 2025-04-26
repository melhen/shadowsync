// bot.js

require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const { routeCommand } = require('./bot/commandRouter')
const { handleObedience } = require('./bot/handlers/obedienceHandler.cjs')

// Create the Telegram bot instance
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })

// Listen for any incoming message
bot.on('message', async (msg) => {
  const text = msg.text?.trim()

  if (!text) return

  // Check if it's a known command first
  if (text.startsWith('/')) {
    await routeCommand(bot, msg)
    return
  }

  // Otherwise assume it's a ritual response (OBEY, NEGOTIATE, DEFY)
  await handleObedience(bot, msg)
})

// Error handling for polling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message)
})
