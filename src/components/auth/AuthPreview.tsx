export function AuthPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-10 hidden overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 sm:block"
    >
      <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative space-y-3">
        <div className="h-2 w-24 rounded-full bg-blue-400/50" />
        <div className="h-2 w-full rounded-full bg-white/10" />
        <div className="h-2 w-3/4 rounded-full bg-white/10" />
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-16 rounded-lg border border-white/10 bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  )
}
