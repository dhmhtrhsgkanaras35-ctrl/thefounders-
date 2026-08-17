type Profile = {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
};

type SidebarProps = {
  profile: Profile | null;
};

const navItems = [
  { label: "Community Chat", icon: "💬", active: true },
  { label: "Members", icon: "👥", active: false },
  { label: "Settings", icon: "⚙️", active: false },
];

export function Sidebar({ profile }: SidebarProps) {
  const isImageAvatar = profile?.avatar?.startsWith("data:image");

  return (
    <aside className="hidden h-screen w-[250px] flex-col border-r border-slate-200 bg-[#0b1220] text-slate-100 lg:flex">
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-lg shadow-inner shadow-blue-500/20">
          🇬🇷
        </div>
        <div>
          <p className="text-[15px] font-semibold tracking-wide">Greek Founders</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-5">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={[
              "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-slate-800 text-white shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]"
                : "text-slate-300 hover:bg-slate-800/80 hover:text-white",
            ].join(" ")}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 p-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-semibold text-white shadow-md">
              {isImageAvatar ? (
                <img src={profile?.avatar} alt={profile?.name ?? "User avatar"} className="h-full w-full object-cover" />
              ) : (
                profile?.avatar ?? "GF"
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{profile?.name ?? "Guest User"}</p>
            <p className="truncate text-xs text-slate-400">@{profile?.username ?? "guest"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
