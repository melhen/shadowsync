// bot/handlers/startHandler.js

export async function handleStart(bot, msg) {
  const welcomeMessage = `Welcome to ShadowSync.

Your rituals await.

You can use:
/ritual - to receive your daily ritual
/trophy - to view your trophies
/containment - for emergency protocols`

  await bot.sendMessage(msg.chat.id, welcomeMessage)
}
