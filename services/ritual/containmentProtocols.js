// services/ritual/containmentProtocols.js

const containmentProtocols = [
  'Ground yourself: 5-4-3-2-1 sensory reset.',
  'Focus: 10 slow breaths before action.',
  'Drink water, stabilize posture, minimal movement.',
  'Sit silently for 2 minutes and let the body settle.',
  'Anchor yourself: touch 3 nearby objects slowly and describe them aloud.',
]

export function getContainmentProtocol() {
  const randomIndex = Math.floor(Math.random() * containmentProtocols.length)
  return containmentProtocols[randomIndex]
}
