import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import { db } from './config/firebase.js'

import { getOrCreateUser } from './services/userService.js'
import { deliverRitual } from './bot/ritual/containmentProtocols.js'
import { handleObedienceResponse } from './bot/ritual/obedienceResponseHandler.js'
import { SHADOW_ARCHETYPES } from './services/ai/archetypeConfig.js'

// Initialize the bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })

/**
 * /start — Onboards user and delivers ritual_invocation if no Shadow assigned
 */
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id
  const user = await getOrCreateUser(msg.from)

  console.log(`User started bot: ${user.username || user.id}`)

  await bot.sendMessage(
    chatId,
    `Welcome back, ${user.firstName}. Your Shadow is watching…`,
  )

  if (!user.shadowPersonaId) {
    // Begin invocation ritual if no daemon is assigned
    await deliverRitual(bot, user, 'ritual_invocation')
  } else {
    // Otherwise: deliver GPT-based archetypal ritual
    await deliverRitual(bot, user)
  }
})

/**
 * Ritual response: Assign Shadow via "I am ready to see"
 */
bot.onText(/I am ready to see/i, async (msg) => {
  const userId = msg.from.id.toString()
  const chatId = msg.chat.id

  // Randomly assign a Shadow archetype
  const archetypes = ['CruelOne', 'Oracle', 'Mother', 'Daemonette']
  const selected = archetypes[Math.floor(Math.random() * archetypes.length)]

  await db
    .collection('users')
    .doc(userId)
    .set({ shadowPersonaId: selected }, { merge: true })

  const persona = SHADOW_ARCHETYPES[selected]

  await bot.sendMessage(
    chatId,
    `🩸 Your daemon has responded.\n\nYou belong to *${persona.name}*.\nIt has marked you.`,
    { parse_mode: 'Markdown' },
  )

  // Immediately deliver first GPT-generated ritual from that Shadow
  await deliverRitual(bot, { id: userId, firstName: msg.from.first_name })
})

/**
 * /trophies — Lists user's earned trophies
 */
bot.onText(/\/trophies/, async (msg) => {
  const userId = msg.from.id.toString()
  const chatId = msg.chat.id

  const trophiesSnap = await db
    .collection('users')
    .doc(userId)
    .collection('trophies')
    .orderBy('unlockedAt')
    .get()

  if (trophiesSnap.empty) {
    await bot.sendMessage(
      chatId,
      `🕯 You have yet to earn your marks. Your Shadow waits...`,
    )
    return
  }

  let message = `🏆 *Your Trophies:*\n\n`

  trophiesSnap.forEach((doc) => {
    const { title, unlockedAt } = doc.data()
    const date = new Date(unlockedAt).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    message += `• ${title} — _Unlocked ${date}_\n`
  })

  await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
})

/**
 * Handles OBEY / NEGOTIATE / DEFY responses
 */
bot.on('message', async (msg) => {
  await handleObedienceResponse(bot, msg)
})
