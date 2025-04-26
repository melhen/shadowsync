// bot/handlers/containmentHandler.js

const {
  getContainmentProtocol,
} = require('../../services/ritual/containmentProtocols')

function handleContainment(bot, msg) {
  const protocol = getContainmentProtocol()

  bot.sendMessage(msg.chat.id, `Containment Protocol Activated:\n\n${protocol}`)
}

module.exports = {
  handleContainment,
}
