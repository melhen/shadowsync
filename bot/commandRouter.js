// bot/commandRouter.js

const { handleStart } = require('./handlers/startHandler')
const { handleRitual } = require('./handlers/ritualHandler')
const { handleTrophy } = require('./handlers/trophyHandler')
const { handleContainment } = require('./handlers/containmentHandler')
const { handleUnknownCommand } = require('./handlers/unknownCommandHandler')

const commandRouter = {
  '/start': handleStart,
  '/ritual': handleRitual,
  '/trophy': handleTrophy,
  '/containment': handleContainment,
}

function routeCommand(bot, msg) {
  const text = msg.text ? msg.text.trim().split(' ')[0] : ''
  const handler = commandRouter[text] || handleUnknownCommand
  return handler(bot, msg)
}

module.exports = {
  routeCommand,
}
