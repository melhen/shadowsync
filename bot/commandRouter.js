// bot/commandRouter.js

import { handleStart } from './handlers/startHandler.js'
import { handleRitual } from './handlers/ritualHandler.js'
import { handleTrophy } from './handlers/trophyHandler.js'
import { handleContainment } from './handlers/containmentHandler.js'
import { handleUnknownCommand } from './handlers/unknownCommandHandler.js'

const commandRouter = {
  '/start': handleStart,
  '/ritual': handleRitual,
  '/trophy': handleTrophy,
  '/containment': handleContainment,
}

export function routeCommand(bot, msg) {
  const text = msg.text ? msg.text.trim().split(' ')[0] : ''
  const handler = commandRouter[text] || handleUnknownCommand
  return handler(bot, msg)
}
