import SacredShellLayout from './components/SacredShellLayout'
import SacredTerminalPromptButton from './components/SacredTerminalPromptButton'
import StreakTracker from './components/StreakTracker'
import TrophyCabinet from './components/TrophyCabinet'
import { useState } from 'react'

export default function App() {
  const [screen, setScreen] = useState<
    'home' | 'trophies' | 'archetypes' | 'ritualLog'
  >('home')

  return (
    <SacredShellLayout>
      {screen === 'home' && (
        <>
          <h1 className="text-4xl font-bold text-emerald-400 mb-6">
            ShadowSync Altar
          </h1>

          {/* ✨ Streak Tracker */}
          <StreakTracker complianceStreak={3} resistanceStreak={1} />

          {/* ✨ Navigation Terminal Prompts */}
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
              <TrophyCabinet
                trophies={[
                  { id: 'obedience', title: 'Obedient One', unlocked: true },
                  { id: 'defiance', title: 'Defiant Soul', unlocked: false },
                  {
                    id: 'initiation',
                    title: 'Initiate of the Ritual',
                    unlocked: true,
                  },
                ]}
              />
            </>
          )}

          {screen === 'archetypes' && (
            <p className="text-xl text-gray-400 mb-6">
              🧩 Communing with Archetypes...
            </p>
          )}

          {screen === 'ritualLog' && (
            <p className="text-xl text-gray-400 mb-6">
              📜 Reviewing Ritual Memory...
            </p>
          )}

          {/* ✨ Always have a return button */}
          <SacredTerminalPromptButton
            label="Return to Sacred Altar"
            onClick={() => setScreen('home')}
          />
        </>
      )}
    </SacredShellLayout>
  )
}
