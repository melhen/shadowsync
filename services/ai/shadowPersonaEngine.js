// services/ai/shadowPersonaEngine.js
import OpenAI from 'openai';
import { db } from '../../config/firebase.js';
import { SHADOW_ARCHETYPES } from './archetypeConfig.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRitualForUser(userId) {
  const userRef = db.collection('users').doc(userId);
  const shadowRef = userRef.collection('shadow').doc('state');
  const trophiesSnap = await userRef.collection('trophies').get();

  const [shadowSnap, userSnap] = await Promise.all([shadowRef.get(), userRef.get()]);
  const shadow = shadowSnap.data() || {};
  const user = userSnap.data() || {};
  const trophies = trophiesSnap.docs.map((doc) => doc.id);

  // 🧠 Choose Shadow Archetype
  const archetypeId = user.shadowPersonaId || 'Null';
  const persona = SHADOW_ARCHETYPES[archetypeId];

  // 💡 Style flavoring
  const styleOptions = ['ritualistic', 'poetic', 'strict', 'dreamlike', 'seductive'];
  const promptStyle = styleOptions[Math.floor(Math.random() * styleOptions.length)];

  const tone =
    shadow.complianceStreak >= 3
      ? 'obedient and ready'
      : shadow.resistanceStreak >= 3
      ? 'defiant and dissonant'
      : 'awaiting alignment';

  const prompt = `
User profile:
- Name: ${user.firstName || 'User'}
- Trophies: ${trophies.join(', ') || 'None'}
- Obedience streak: ${shadow.complianceStreak || 0}
- Defiance streak: ${shadow.resistanceStreak || 0}
- Last response: ${shadow.lastResponse || 'NONE'}

Write a ${promptStyle} ritual task in the voice of ${persona.name}.
Tone should be ${persona.tone}.
No more than 10 sentences.
The task should be realistic, sensory, with a bit of unhinged humour.

End with: "_Reply with OBEY, NEGOTIATE, or DEFY._"
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: persona.systemMessage },
      { role: 'user', content: prompt },
    ],
    temperature: 0.85,
    max_tokens: 500,
  });

  return res.choices[0].message.content;
}
