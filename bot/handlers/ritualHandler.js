// bot/handlers/ritualHandler.js

const { ritualCatalog } = require('../../data/ritualCatalog')
const { awardTrophy } = require('../../services/trophies/trophyService')

async function handleRitual(bot, msg) {
  const randomRitual =
    ritualCatalog[Math.floor(Math.random() * ritualCatalog.length)]

  bot.sendMessage(msg.chat.id, `Your Ritual:\n\n${randomRitual.description}`)

  // Optional: automatically track that a ritual was assigned, or wait for user confirmation before awarding
}

module.exports = {
  handleRitual,
}
