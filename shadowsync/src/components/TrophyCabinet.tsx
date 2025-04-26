// src/components/TrophyCabinet.tsx

interface Trophy {
  id: string
  title: string
  unlocked: boolean
}

interface TrophyCabinetProps {
  trophies: Trophy[]
}

export default function TrophyCabinet({ trophies }: TrophyCabinetProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {trophies.map((trophy) => (
        <div
          key={trophy.id}
          className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all
                     ${trophy.unlocked ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-gray-600 text-gray-600 opacity-40'}`}
        >
          <div className="text-4xl">{trophy.unlocked ? '🏆' : '🔒'}</div>
          <div className="mt-2 text-center font-semibold">{trophy.title}</div>
        </div>
      ))}
    </div>
  )
}
