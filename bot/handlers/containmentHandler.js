// bot/handlers/containmentHandler.js

import { getContainmentProtocol } from '../../services/ritual/containmentProtocols.js'

export async function handleContainment(bot, msg) {
  const protocol = getContainmentProtocol()

  await bot.sendMessage(
    msg.chat.id,
    `Containment Protocol Activated:\n\n${protocol}`,
  )
}
