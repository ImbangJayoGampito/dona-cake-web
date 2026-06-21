interface Props {
  /** true saat sedang polling/loading */
  active?: boolean
}

export default function LiveUpdateBadge({ active = true }: Props) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
      <span
        className={`h-2 w-2 rounded-full ${
          active ? "animate-pulse bg-emerald-500" : "bg-muted-foreground"
        }`}
      />
      <span className="text-xs font-medium text-muted-foreground">
        Live Update
      </span>
    </div>
  )
}
