// src/pages/asisten/components/QuickReplies.tsx

interface QuickRepliesProps {
  chips: string[]
  onSelect: (chip: string) => void
  disabled?: boolean
}

export default function QuickReplies({
  chips,
  onSelect,
  disabled = false,
}: QuickRepliesProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => !disabled && onSelect(chip)}
          disabled={disabled}
          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground shadow-sm transition-colors hover:border-[#8B5E3C]/40 hover:text-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
