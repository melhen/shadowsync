// services/ritual/ritualService.js
import { db } from '../../config/firebase.js';

const ritualsRef = db.collection('rituals');

export async function createTestRitual() {
  const ritual = {
    id: 'test-init',
    title: 'Submit to Stillness',
    prompt: 'Breathe in for 4. Hold for 4. Exhale for 4. You will not touch your phone until this completes.',
    module: 'MODULE://HAVEN',
    runtimeTags: ['RUNTIME://PARASYMPATHETIC'],
    conditions: {
      requiresShadow: true,
    },
    tier: 'free',
    createdAt: new Date().toISOString(),
  };

  const ritualRef = ritualsRef.doc(ritual.id);
  await ritualRef.set(ritual);

  return ritual;
}

export async function getRitualById(id) {
  const doc = await ritualsRef.doc(id).get();
  if (!doc.exists) throw new Error(`Ritual ${id} not found`);
  return doc.data();
}
