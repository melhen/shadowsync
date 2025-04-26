// src/components/SacredShellLayout.tsx

export default function SacredShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#E5E5E5] flex flex-col items-center justify-center font-mono p-6">
      {children}
    </div>
  )
}
