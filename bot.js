// bot.js

require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const { routeCommand } = require('./bot/commandRouter')

// Create the Telegram bot instance
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })

// Listen for any incoming message
bot.on('message', async (msg) => {
  try {
    await routeCommand(bot, msg)
  } catch (error) {
    console.error('Command routing error:', error)
    bot.sendMessage(msg.chat.id, 'An error occurred processing your request.')
  }
})

// Error handling for polling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message)
})
