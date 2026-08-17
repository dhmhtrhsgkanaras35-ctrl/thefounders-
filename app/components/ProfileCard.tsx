import type { Profile } from "../lib/types";

type ProfileCardProps = {
  profile: Profile;
  onClose: () => void;
};

function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function hostname(url: string) {
  try { return new URL(normalizeUrl(url)).hostname.replace("www.", ""); }
  catch { return url; }
}

export function ProfileCard({ profile, onClose }: ProfileCardProps) {
  const links = [
    profile.website && { label: hostname(profile.website), href: normalizeUrl(profile.website), icon: "🌐" },
    profile.linkedin && { label: "LinkedIn", href: normalizeUrl(profile.linkedin), icon: "in" },
    profile.twitter && { label: "X", href: normalizeUrl(profile.twitter), icon: "𝕏" },
    profile.github && { label: "GitHub", href: normalizeUrl(profile.github), icon: "⌥" },
  ].filter(Boolean) as { label: string; href: string; icon: string }[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover + avatar */}
        <div className="relative h-24 bg-gradient-to-r from-blue-600 to-indigo-600">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm text-white backdrop-blur-sm hover:bg-white/30"
          >✕</button>
          <div className="absolute -bottom-10 left-6">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-blue-400 to-indigo-600 text-xl font-bold text-white shadow-lg">
              {profile.avatar?.startsWith("data:image")
                ? <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                : profile.avatar}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-14">
          {/* Name + username */}
          <div>
            <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
            <p className="text-sm text-slate-500">@{profile.username}</p>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{profile.bio}</p>
          )}

          {/* Meta */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.country && <span>🌍 {profile.country}</span>}
            {profile.joinedAt && <span>🗓 {profile.joinedAt}</span>}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
              <p className="text-lg font-bold text-slate-900">{(profile.profileViews ?? 0).toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Profile views</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
              <p className="text-lg font-bold text-slate-900">{(profile.followers ?? 0).toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Followers</p>
            </div>
          </div>

          {/* Links */}
          {links.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Links</p>
              <div className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                    <span className="text-[11px]">{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button"
              className="rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.26)] transition hover:bg-blue-500">
              Message
            </button>
            <button type="button"
              className="rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
