"use client";

import type { Profile } from "../lib/types";

type SidebarProps = {
  profile: Profile | null;
  onEditProfile: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const NAV = [
  { id: "chat", label: "Community Chat", icon: "💬" },
  { id: "countries", label: "Countries", icon: "🌍" },
  { id: "members", label: "Members", icon: "👥" },
];

export function Sidebar({ profile, onEditProfile, activeTab, onTabChange }: SidebarProps) {
  const isPhoto = profile?.avatar?.startsWith("data:image");

  return (
    <aside className="hidden h-screen w-60 flex-col border-r border-slate-800/60 bg-[#0b1220] text-slate-100 lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-lg">🇬🇷</div>
        <div>
          <p className="font-[family-name:var(--font-playfair)] text-[15px] font-bold italic text-white">The Founders</p>
          <p className="text-[10px] text-slate-500">Starting in Greece</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => (
          <button key={item.id} type="button" onClick={() => onTabChange(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
              activeTab === item.id
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            }`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="border-t border-slate-800 px-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-900 p-2.5 text-center">
            <p className="text-base font-bold text-white">2,310</p>
            <p className="text-[10px] text-slate-500">Members</p>
          </div>
          <div className="rounded-xl bg-slate-900 p-2.5 text-center">
            <p className="text-base font-bold text-white">816</p>
            <p className="text-[10px] text-slate-500">Waitlist</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="border-t border-slate-800 p-3">
        <button type="button" onClick={onEditProfile}
          className="flex w-full items-center gap-3 rounded-xl bg-slate-900/60 p-3 text-left transition hover:bg-slate-800">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white">
              {isPhoto ? <img src={profile?.avatar} alt={profile?.name ?? ""} className="h-full w-full object-cover" /> : (profile?.avatar ?? "GF")}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b1220] bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{profile?.name ?? "Set up profile"}</p>
            <p className="truncate text-xs text-slate-400">{profile?.username ? `@${profile.username}` : "Click to edit"}</p>
          </div>
          <span className="text-xs text-slate-500">✏️</span>
        </button>
      </div>
    </aside>
  );
}
