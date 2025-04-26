// bot/handlers/startHandler.js

function handleStart(bot, msg) {
  const welcomeMessage = `Welcome to ShadowSync.

Your rituals await.

You can use:
/ritual - to receive your daily ritual
/trophy - to view your trophies
/containment - for emergency protocols`

  bot.sendMessage(msg.chat.id, welcomeMessage)
}

module.exports = {
  handleStart,
}
