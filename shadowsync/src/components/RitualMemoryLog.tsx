interface RitualEntry {
  id: string
  title: string
  status: 'OBEY' | 'NEGOTIATE' | 'DEFY'
  timestamp: string
}

interface RitualMemoryLogProps {
  entries: RitualEntry[]
}

export default function RitualMemoryLog({ entries }: RitualMemoryLogProps) {
  return (
    <div className="flex flex-col space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border-b pb-2">
          <div className="font-semibold text-emerald-400">{entry.title}</div>
          <div className="text-sm text-gray-500">
            {entry.status} • {new Date(entry.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )
}
