// src/components/SacredTerminalPromptButton.tsx

interface SacredTerminalPromptButtonProps {
  label: string
  onClick: () => void
}

export default function SacredTerminalPromptButton({
  label,
  onClick,
}: SacredTerminalPromptButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-[#E5E5E5] font-mono text-lg tracking-wide border border-[#6B7280] rounded-md py-2 px-6 mt-4
                 transition-all duration-500 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_10px_#D4AF37]"
    >
      {label}
    </button>
  )
}
