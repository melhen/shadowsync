// bot/handlers/obedienceHandler.js

import { logRitualResponse } from '../../services/ritual/responseService.js'
import {
  updateShadowCompliance,
  getCurrentRitualId,
} from '../../services/shadow/shadowService.js'
import { evaluateTrophies } from '../../services/trophies/trophyService.js'

export async function handleObedience(bot, msg) {
  const choice = msg.text.toUpperCase()
  const userId = msg.from.id.toString()

  if (!['OBEY', 'NEGOTIATE', 'DEFY'].includes(choice)) return

  console.log(`User ${userId} chose ${choice}`)

  // Fetch the current ritual ID
  const ritualId = await getCurrentRitualId(userId)

  // 1. Log the response (correct ritual ID)
  await logRitualResponse(userId, {
    ritualId: ritualId || 'unknown',
    status: choice,
    timestamp: new Date().toISOString(),
  })

  // 2. Update their Shadow state
  const shadowState = await updateShadowCompliance(userId, choice)
  console.log(`Updated Shadow for ${userId}:`, shadowState)

  // 3. Confirm to user
  await bot.sendMessage(
    msg.chat.id,
    `Your choice has been logged.\n\nCurrent streaks:\n🖤 Obedience: ${shadowState.complianceStreak}\n🔥 Defiance: ${shadowState.resistanceStreak}`,
  )

  // 4. Evaluate trophies
  const trophies = await evaluateTrophies(userId, shadowState)

  if (trophies.length > 0) {
    for (const trophy of trophies) {
      await bot.sendMessage(
        msg.chat.id,
        `🏆 *Trophy Unlocked: ${trophy.title}*\n\nYour Shadow has marked you.`,
        { parse_mode: 'Markdown' },
      )
    }
  }
}
