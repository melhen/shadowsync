// services/shadow/shadowService.js

import { db } from '../../config/firebase.js'

export async function setCurrentRitualId(userId, ritualId) {
  const userRef = db.collection('users').doc(userId)
  const shadowRef = userRef.collection('shadow').doc('state')

  await shadowRef.set({ currentRitualId: ritualId }, { merge: true })
}

export async function updateShadowCompliance(userId, choice) {
  const shadowRef = db
    .collection('users')
    .doc(userId)
    .collection('shadow')
    .doc('state')

  const doc = await shadowRef.get()

  let data = {
    complianceStreak: 0,
    resistanceStreak: 0,
    lastResponse: choice,
    updatedAt: new Date().toISOString(),
  }

  if (doc.exists) {
    const prev = doc.data()
    if (choice === 'OBEY') {
      data.complianceStreak = (prev.complianceStreak || 0) + 1
      data.resistanceStreak = 0
    } else if (choice === 'DEFY') {
      data.resistanceStreak = (prev.resistanceStreak || 0) + 1
      data.complianceStreak = 0
    } else {
      data.complianceStreak = 0
      data.resistanceStreak = 0
    }
  }

  // ✨ Add escalation level AFTER calculating compliance
  data.escalationLevel = evaluateEscalationLevel(data)

  await shadowRef.set(data, { merge: true })

  return data
}

export async function getCurrentRitualId(userId) {
  const userRef = db.collection('users').doc(userId)
  const shadowRef = userRef.collection('shadow').doc('state')

  const shadowDoc = await shadowRef.get()

  if (!shadowDoc.exists) return null

  const data = shadowDoc.data()
  return data.currentRitualId || null
}

export function evaluateEscalationLevel(shadowState) {
  const {
    complianceStreak = 0,
    resistanceStreak = 0,
    lastResponse = '',
  } = shadowState

  if (complianceStreak >= 3) {
    return 'obedience'
  } else if (resistanceStreak >= 2) {
    return 'defiance'
  } else if (lastResponse === 'NEGOTIATE') {
    return 'negotiation'
  } else {
    return 'neutral'
  }
}
