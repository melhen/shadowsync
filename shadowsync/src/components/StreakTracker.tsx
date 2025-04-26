// src/components/StreakTracker.tsx

interface StreakTrackerProps {
  complianceStreak: number
  resistanceStreak: number
}

export default function StreakTracker({
  complianceStreak,
  resistanceStreak,
}: StreakTrackerProps) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-2xl font-semibold text-emerald-400">
        🖤 Obedience Streak: {complianceStreak}
      </div>
      <div className="text-2xl font-semibold text-rose-400 mt-2">
        🔥 Defiance Streak: {resistanceStreak}
      </div>
    </div>
  )
}
