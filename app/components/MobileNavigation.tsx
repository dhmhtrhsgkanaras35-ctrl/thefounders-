type MobileNavigationProps = {
  onToggleMenu: () => void;
  menuOpen: boolean;
};

export function MobileNavigation({ onToggleMenu, menuOpen }: MobileNavigationProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMenu}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg text-slate-700"
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-base shadow-sm">🇬🇷</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Greek Founders</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg text-slate-700"
        aria-label="Open search"
      >
        🔍
      </button>
    </header>
  );
}
