import SacredShellLayout from './components/SacredShellLayout'
import SacredTerminalPromptButton from './components/SacredTerminalPromptButton'
import StreakTracker from './components/StreakTracker'
import TrophyCabinet from './components/TrophyCabinet'
import ArchetypeLoreRoom from './components/ArchetypeLoreRoom'
import RitualMemoryLog from './components/RitualMemoryLog'
import { db } from './firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function App() {
  const [screen, setScreen] = useState<
    'home' | 'trophies' | 'archetypes' | 'ritualLog'
  >('home')
  const [streaks, setStreaks] = useState({
    complianceStreak: 0,
    resistanceStreak: 0,
  })
  const [trophies, setTrophies] = useState<
    { id: string; title: string; unlocked: boolean }[]
  >([])
  const [ritualLogs, setRitualLogs] = useState<
    {
      id: string
      title: string
      status: 'OBEY' | 'NEGOTIATE' | 'DEFY'
      timestamp: string
    }[]
  >([])

  useEffect(() => {
    async function fetchAltarData() {
      const userId = 'demo-user' // TODO: replace later with real UID

      // Fetch shadow state
      const stateRef = doc(db, 'users', userId, 'shadow', 'state')
      const stateSnap = await getDoc(stateRef)
      if (stateSnap.exists()) {
        const data = stateSnap.data()
        setStreaks({
          complianceStreak: data.complianceStreak || 0,
          resistanceStreak: data.resistanceStreak || 0,
        })
      }

      // Fetch trophies
      const trophiesRef = collection(db, 'users', userId, 'trophies')
      const trophiesSnap = await getDocs(trophiesRef)
      const trophiesData = trophiesSnap.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        unlocked: true,
      }))
      setTrophies(trophiesData)

      // Fetch ritual logs
      const ritualsRef = query(
        collection(db, 'users', userId, 'ritualLogs'),
        orderBy('timestamp', 'desc'),
      )
      const ritualsSnap = await getDocs(ritualsRef)
      const ritualsData = ritualsSnap.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        status: doc.data().status,
        timestamp: doc.data().timestamp,
      }))
      setRitualLogs(ritualsData)
    }

    fetchAltarData()
  }, [])

  return (
    <SacredShellLayout>
      {screen === 'home' && (
        <>
          <h1 className="text-4xl font-bold text-emerald-400 mb-6">
            ShadowSync Altar
          </h1>

          <StreakTracker
            complianceStreak={streaks.complianceStreak}
            resistanceStreak={streaks.resistanceStreak}
          />

          <SacredTerminalPromptButton
            label="View Trophy Cabinet"
            onClick={() => setScreen('trophies')}
          />
          <SacredTerminalPromptButton
            label="Commune with Archetypes"
            onClick={() => setScreen('archetypes')}
          />
          <SacredTerminalPromptButton
            label="Review Ritual Memory"
            onClick={() => setScreen('ritualLog')}
          />
        </>
      )}

      {screen !== 'home' && (
        <>
          {screen === 'trophies' && (
            <>
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">
                Trophy Cabinet
              </h2>
              <TrophyCabinet trophies={trophies} />
            </>
          )}

          {screen === 'archetypes' && (
            <>
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">
                Archetype Lore Room
              </h2>
              <ArchetypeLoreRoom
                archetype={{
                  id: 'chaos_brat',
                  name: 'The Chaos Brat',
                  tone: 'Unstable. Provocative. Wild.',
                  description:
                    'You are a creature of impulse and disobedience, craving both control and destruction.',
                }}
              />
            </>
          )}

          {screen === 'ritualLog' && (
            <>
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">
                Ritual Memory Log
              </h2>
              <RitualMemoryLog entries={ritualLogs} />
            </>
          )}

          <SacredTerminalPromptButton
            label="Return to Sacred Altar"
            onClick={() => setScreen('home')}
          />
        </>
      )}
    </SacredShellLayout>
  )
}
