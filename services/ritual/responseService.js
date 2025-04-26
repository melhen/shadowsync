// services/ritual/responseService.js
import { db } from '../../config/firebase.js';

export async function logRitualResponse(userId, response) {
  const taskLogsRef = db.collection('users').doc(userId).collection('taskLogs');
  await taskLogsRef.add(response);
}
