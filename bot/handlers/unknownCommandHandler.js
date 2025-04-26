// bot/handlers/unknownCommandHandler.js

export async function handleUnknownCommand(bot, msg) {
  await bot.sendMessage(
    msg.chat.id,
    'Unknown command. Type /start to see available options.',
  )
}
