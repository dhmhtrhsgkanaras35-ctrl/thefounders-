import type { ChangeEvent } from "react";

type ProfileSetupProps = {
  form: {
    photo: string;
    fullName: string;
    username: string;
    bio: string;
    location: string;
    website: string;
  };
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onPhotoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileSetup({
  form,
  onFieldChange,
  onSubmit,
  onPhotoUpload,
}: ProfileSetupProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f8fbff,_#eef4ff_42%,_#edf2f7)] px-4 py-10">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-[0_16px_26px_rgba(37,99,235,0.25)]">
            🇬🇷
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome to Greek Founders 🇬🇷</h1>
          <p className="mt-3 text-sm text-slate-500">Create your profile to join the conversation.</p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-semibold text-white shadow-md">
              {form.photo ? (
                form.photo.startsWith("data:image") ? (
                  <img src={form.photo} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  form.photo
                )
              ) : (
                "NP"
              )}
            </div>
            <label className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
              Upload profile photo
              <input type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Full name
              <input
                value={form.fullName}
                onChange={(event) => onFieldChange("fullName", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder="Nikos Papadopoulos"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Username
              <input
                value={form.username}
                onChange={(event) => onFieldChange("username", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder="nikos"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Short bio
            <textarea
              value={form.bio}
              onChange={(event) => onFieldChange("bio", event.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
              placeholder="Founder building AI tools for Greek SMEs"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Location
              <input
                value={form.location}
                onChange={(event) => onFieldChange("location", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder="Athens, Greece"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Website
              <input
                value={form.website}
                onChange={(event) => onFieldChange("website", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder="https://example.com"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="mt-2 w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-base font-semibold text-white shadow-[0_18px_28px_rgba(37,99,235,0.25)] transition hover:bg-blue-500"
          >
            Join the community
          </button>
        </div>
      </div>
    </div>
  );
}
