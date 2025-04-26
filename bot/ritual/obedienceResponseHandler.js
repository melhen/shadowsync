// bot/ritual/obedienceResponseHandler.js
import { logRitualResponse } from '../../services/ritual/responseService.js';
import { updateShadowCompliance } from '../../services/shadow/shadowService.js';
import { evaluateTrophies } from '../../services/trophies/trophyService.js';

/**
 * Handles OBEY, NEGOTIATE, DEFY responses
 */
export async function handleObedienceResponse(bot, msg) {
  const choice = msg.text.toUpperCase();
  const userId = msg.from.id.toString();

  if (!['OBEY', 'NEGOTIATE', 'DEFY'].includes(choice)) return;

  console.log(`User ${userId} chose ${choice}`);

  // 1. Log the response
  await logRitualResponse(userId, {
    ritualId: 'test-init',
    status: choice,
    timestamp: new Date().toISOString(),
  });

  // 2. Update their Shadow state
  const shadowState = await updateShadowCompliance(userId, choice);
  console.log(`Updated Shadow for ${userId}:`, shadowState);

  // 3. Confirm to user
  await bot.sendMessage(
    msg.chat.id,
    `Your choice has been logged.\n\nCurrent streaks:\n🖤 Obedience: ${shadowState.complianceStreak}\n🔥 Defiance: ${shadowState.resistanceStreak}`
  );

  // 4. Evaluate trophies
  const trophies = await evaluateTrophies(userId, shadowState);

  if (trophies.length > 0) {
    for (const trophy of trophies) {
      await bot.sendMessage(
        msg.chat.id,
        `🏆 *Trophy Unlocked: ${trophy.title}*\n\nYour Shadow has marked you.`,
        { parse_mode: 'Markdown' }
      );
    }
  }
}
