// bot/handlers/unknownCommandHandler.js

function handleUnknownCommand(bot, msg) {
  bot.sendMessage(
    msg.chat.id,
    'Unknown command. Type /help for available options.',
  )
}

module.exports = {
  handleUnknownCommand,
}
