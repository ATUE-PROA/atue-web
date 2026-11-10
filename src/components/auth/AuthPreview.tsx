export function AuthPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-10 hidden overflow-hidden rounded-2xl border border-blue-300/60 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-6 sm:block dark:border-white/10 dark:from-neutral-900 dark:via-neutral-950 dark:to-black"
    >
      <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl dark:bg-blue-500/20" />
      <div className="relative space-y-3">
        <div className="h-2 w-24 rounded-full bg-white/80 dark:bg-blue-400/50" />
        <div className="h-2 w-full rounded-full bg-white/40 dark:bg-white/10" />
        <div className="h-2 w-3/4 rounded-full bg-white/40 dark:bg-white/10" />
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-16 rounded-lg border border-white/40 bg-white/20 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
