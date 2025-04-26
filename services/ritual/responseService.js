// services/ritual/responseService.js

import { db } from '../../config/firebase.js'

export async function logRitualResponse(userId, response) {
  const ritualLogsRef = db
    .collection('users')
    .doc(userId)
    .collection('ritualLogs')

  await ritualLogsRef.add(response)
}
