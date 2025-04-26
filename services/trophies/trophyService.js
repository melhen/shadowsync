// services/trophies/trophyService.js

import { db } from '../../config/firebase.js'

const TROPHIES = [
  {
    id: 'first-ritual-completed',
    title: 'First Step Taken',
    description: 'Completed your first ritual.',
    condition: (shadowState) => shadowState.complianceStreak >= 1,
  },
  {
    id: 'obedience-three',
    title: 'Trained Mind',
    description: 'Obeyed three rituals in a row.',
    condition: (shadowState) => shadowState.complianceStreak >= 3,
  },
  {
    id: 'defiance-three',
    title: 'Unruly Spirit',
    description: 'Defied three rituals in a row.',
    condition: (shadowState) => shadowState.resistanceStreak >= 3,
  },
]

export async function evaluateTrophies(userId, shadowState) {
  const userRef = db.collection('users').doc(userId)
  const trophyRef = userRef.collection('trophies')

  const unlockedSnap = await trophyRef.get()
  const unlockedIds = unlockedSnap.docs.map((doc) => doc.id)

  const newlyUnlocked = []

  for (const trophy of TROPHIES) {
    if (!unlockedIds.includes(trophy.id) && trophy.condition(shadowState)) {
      await trophyRef.doc(trophy.id).set({
        title: trophy.title,
        description: trophy.description,
        unlockedAt: new Date().toISOString(),
      })
      newlyUnlocked.push(trophy)
    }
  }

  return newlyUnlocked
}

export async function getUserTrophies(userId) {
  const userRef = db.collection('users').doc(userId)
  const trophiesSnap = await userRef.collection('trophies').get()

  return trophiesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
