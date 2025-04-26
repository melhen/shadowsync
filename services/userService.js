// services/userService.js
import { db } from '../config/firebase.js';

export async function getOrCreateUser(telegramUser) {
  const userId = telegramUser.id.toString();
  const userRef = db.collection('users').doc(userId);
  const userSnap = await userRef.get();

  if (userSnap.exists) {
    return userSnap.data();
  }

  const newUser = {
    id: userId,
    username: telegramUser.username || null,
    firstName: telegramUser.first_name || '',
    joinedAt: new Date().toISOString(),
    streak: 0,
    shadowPersonaId: null,
    trophies: [],
    runtimeFlags: {}, // like corrupted, booting, etc
  };

  await userRef.set(newUser);
  return newUser;
}
