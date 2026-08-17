type HeaderProps = {
  title: string;
  subtitle: string;
  onlineLabel?: string;
};

export function Header({ title, subtitle, onlineLabel = "Online" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-sm sm:px-6">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-2xl">{title}</h1>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {onlineLabel}
          </div>
        </div>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Search"
        >
          🔍
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Members"
        >
          👥
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="More actions"
        >
          ⋯
        </button>
      </div>
    </header>
  );
}
