type Profile = {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt?: string;
};

type ProfileCardProps = {
  profile: Profile;
  onClose: () => void;
};

export function ProfileCard({ profile, onClose }: ProfileCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 sm:items-center sm:p-6">
      <div className="w-full max-w-md overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.26)] sm:rounded-[32px]">
        <div className="flex items-center justify-end border-b border-slate-100 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-600 transition hover:bg-slate-200"
            aria-label="Close profile"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-blue-500/30">
              {profile.avatar?.startsWith("data:image") ? (
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                profile.avatar
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-2xl font-semibold text-slate-900">{profile.name}</h3>
            <p className="mt-1 text-sm text-slate-500">@{profile.username}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">{profile.bio ?? "Founder & entrepreneur"}</p>
            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>{profile.location ?? "Athens, Greece"}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🗓️</span>
                <span>{profile.joinedAt ?? "Joined Greek Founders"}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🌐</span>
                <span>{profile.website ?? "nikospapadopoulos.com"}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,99,235,0.26)] transition hover:bg-blue-500"
            >
              Message
            </button>
            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
