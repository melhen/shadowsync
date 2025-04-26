// bot/ritual/containmentProtocols.js
import { getRitualById } from './ritualService.js'
import { db } from '../../config/firebase.js'
import { generateRitualForUser } from '../ai/shadowPersonaEngine.js'

/**
 * Delivers a ritual to a user via the bot.
 * If ritualId is provided, tries to fetch and deliver it with gate checks.
 * If not, generates a ritual dynamically via GPT.
 */
export async function deliverRitual(bot, user, ritualId = null) {
  const chatId = parseInt(user.id)

  // === Adaptive GPT Ritual Mode ===
  if (!ritualId) {
    try {
      const ritualText = await generateRitualForUser(user.id)
      await bot.sendMessage(
        chatId,
        `🕯️ *Your Shadow speaks:*\n\n${ritualText}`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: [['OBEY', 'NEGOTIATE', 'DEFY']],
            one_time_keyboard: true,
            resize_keyboard: true,
          },
        },
      )
      console.log(`GPT ritual delivered to ${user.username || user.id}`)
      return
    } catch (err) {
      console.error('GPT ritual generation failed:', err.message)
      await bot.sendMessage(
        chatId,
        `⚠️ Shadow is silent. Something interfered with the ritual.`,
      )
      return
    }
  }

  // === Static Ritual Mode (with gating) ===
  try {
    const ritual = await getRitualById(ritualId)

    const [shadowSnap, trophiesSnap] = await Promise.all([
      db
        .collection('users')
        .doc(user.id)
        .collection('shadow')
        .doc('state')
        .get(),
      db.collection('users').doc(user.id).collection('trophies').get(),
    ])

    const shadow = shadowSnap.data() || {}
    const userTrophies = new Set(trophiesSnap.docs.map((doc) => doc.id))

    const requires = ritual.requiredTrophies || []
    const needsStreak = ritual.requiredStreak || 0

    const hasTrophies = requires.every((trophyId) => userTrophies.has(trophyId))
    const hasStreak = (shadow.complianceStreak || 0) >= needsStreak

    if (!hasTrophies || !hasStreak) {
      await bot.sendMessage(
        chatId,
        `⛔ You are not yet worthy of this ritual.\n\nReturn when your obedience is proven.`,
      )
      return
    }

    const message = `🕯️ *${ritual.title}*\n\n${ritual.prompt}\n\n_Reply with OBEY, NEGOTIATE, or DEFY._`

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [['OBEY', 'NEGOTIATE', 'DEFY']],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    })

    console.log(`Ritual ${ritualId} sent to ${user.username || user.id}`)
  } catch (error) {
    console.error('Failed to deliver ritual:', error.message)
    await bot.sendMessage(
      chatId,
      `❌ The ritual could not be delivered. Your Shadow retreats...`,
    )
  }
}
