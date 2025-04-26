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

  if (text.startsWith('/')) {
    await routeCommand(bot, msg)
    return
  }

  await handleObedience(bot, msg)
})

// Handle polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message)
})
