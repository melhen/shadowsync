interface Archetype {
  id: string
  name: string
  tone: string
  description: string
}

interface ArchetypeLoreRoomProps {
  archetype: Archetype
}

export default function ArchetypeLoreRoom({
  archetype,
}: ArchetypeLoreRoomProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-emerald-400">{archetype.name}</h2>
      <p className="text-gray-400 italic">{archetype.tone}</p>
      <p className="text-gray-500 text-center max-w-md">
        {archetype.description}
      </p>
    </div>
  )
}
