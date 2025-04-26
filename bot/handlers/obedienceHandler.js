// bot/handlers/obedienceHandler.js

import { logRitualResponse } from '../../services/ritual/responseService.js'
import {
  updateShadowCompliance,
  getCurrentRitualId,
} from '../../services/shadow/shadowService.js'
import { evaluateTrophies } from '../../services/trophies/trophyService.js'
import { systemMessages } from '../../services/utils/contentLoader.js' // assuming you export loaded systemMessages

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
  const trophies = await evaluateTrophies(userId, shadowState, choice)

  if (trophies.length > 0) {
    const trophyTemplate = systemMessages.trophyUnlocked.template

    for (const trophy of trophies) {
      const trophyMessage = trophyTemplate
        .replace('{{title}}', trophy.title)
        .replace('{{description}}', trophy.description)

      await bot.sendMessage(msg.chat.id, trophyMessage, {
        parse_mode: 'Markdown',
      })
    }
  }
}
