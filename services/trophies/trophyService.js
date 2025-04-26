// services/trophies/trophyService.js
import { db } from '../../config/firebase.js';

const TROPHY_DEFINITIONS = [
  {
    id: 'trophy_first_ritual',
    title: 'You Have Been Seen',
    condition: (shadow, taskCount) => taskCount === 1,
  },
  {
    id: 'trophy_obey_3',
    title: 'Obedience Initiate',
    condition: (shadow) => shadow.complianceStreak >= 3,
  },
  {
    id: 'trophy_defy_3',
    title: 'Corruption Rising',
    condition: (shadow) => shadow.resistanceStreak >= 3,
  },
];

export async function evaluateTrophies(userId, shadowState) {
  const trophiesRef = db.collection('users').doc(userId).collection('trophies');
  const existingSnap = await trophiesRef.get();
  const existingIds = new Set(existingSnap.docs.map((doc) => doc.id));

  const taskLogsRef = db.collection('users').doc(userId).collection('taskLogs');
  const taskCountSnap = await taskLogsRef.get();
  const taskCount = taskCountSnap.size;

  const unlocked = [];

  for (const trophy of TROPHY_DEFINITIONS) {
    console.log(`Checking trophy: ${trophy.id}`);

    if (existingIds.has(trophy.id)) {
      console.log(`Already unlocked: ${trophy.id}`);
      continue;
    }

    const eligible = trophy.condition(shadowState, taskCount);
    console.log(`Eligibility for ${trophy.id}: ${eligible}`);

    if (eligible) {
      console.log(`🏆 UNLOCKING: ${trophy.id}`);

      await trophiesRef.doc(trophy.id).set({
        title: trophy.title,
        unlockedAt: new Date().toISOString(),
      });

      unlocked.push(trophy);
    }
  }

  console.log('Trophies unlocked in this run:', unlocked.map(t => t.id));
  return unlocked;
}
