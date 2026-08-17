"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import type { ProfileForm } from "../lib/types";

type ProfileSetupProps = {
  form: ProfileForm;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onPhotoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
};

export function ProfileSetup({ form, onFieldChange, onSubmit, onPhotoUpload, onClose }: ProfileSetupProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const initials = form.fullName.trim().split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "GF";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🇬🇷</span>
            <span className="font-semibold text-slate-800">
              {onClose ? "Edit your profile" : "Create your profile"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className={`h-1.5 w-8 rounded-full transition-all ${step === 1 ? "bg-blue-600" : "bg-slate-200"}`} />
              <div className={`h-1.5 w-8 rounded-full transition-all ${step === 2 ? "bg-blue-600" : "bg-slate-200"}`} />
            </div>
            {onClose && (
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 hover:bg-slate-200">✕</button>
            )}
          </div>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {step === 1 ? (
            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Step 1 of 2 — Identity</p>

              {/* Photo */}
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-lg">
                    {form.photo ? <img src={form.photo} alt="Preview" className="h-full w-full object-cover" /> : initials}
                  </div>
                  <label className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs text-white shadow hover:bg-blue-500">
                    +<input type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Profile photo</p>
                  <p className="mt-0.5 text-xs text-slate-500">JPG, PNG. Max 5 MB.</p>
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
                    📷 Upload photo<input type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Full name *
                  <input value={form.fullName} onChange={(e) => onFieldChange("fullName", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    placeholder="Nikos Papadopoulos" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Username *
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">@</span>
                    <input value={form.username} onChange={(e) => onFieldChange("username", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-7 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      placeholder="nikos" />
                  </div>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Bio
                <textarea value={form.bio} onChange={(e) => onFieldChange("bio", e.target.value)} rows={3}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  placeholder="Building something interesting in Greece..." maxLength={160} />
                <span className="block text-right text-xs text-slate-400">{form.bio.length}/160</span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Location
                  <input value={form.location} onChange={(e) => onFieldChange("location", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    placeholder="Athens, Greece" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Country
                  <select value={form.country} onChange={(e) => onFieldChange("country", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100">
                    <option>Greece</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Spain</option>
                    <option>Italy</option>
                    <option>Netherlands</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <button type="button" onClick={() => setStep(2)}
                disabled={!form.fullName.trim() || !form.username.trim()}
                className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:bg-blue-500 disabled:opacity-40">
                Continue →
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Step 2 of 2 — Links</p>

              {[
                { label: "Website", field: "website", prefix: "🌐", placeholder: "https://yoursite.com" },
                { label: "LinkedIn", field: "linkedin", prefix: "in", placeholder: "linkedin.com/in/yourname", prefixClass: "text-[11px] font-bold text-blue-700" },
                { label: "X / Twitter", field: "twitter", prefix: "𝕏", placeholder: "x.com/yourhandle" },
                { label: "GitHub", field: "github", prefix: "⌥", placeholder: "github.com/yourname" },
              ].map(({ label, field, prefix, placeholder, prefixClass }) => (
                <label key={field} className="block text-sm font-medium text-slate-700">
                  {label}
                  <div className="relative mt-1.5">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${prefixClass ?? "text-slate-400"}`}>{prefix}</span>
                    <input value={form[field as keyof ProfileForm]} onChange={(e) => onFieldChange(field, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      placeholder={placeholder} />
                  </div>
                </label>
              ))}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  ← Back
                </button>
                <button type="button" onClick={onSubmit}
                  className="flex-1 rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:bg-blue-500">
                  {onClose ? "Save changes ✓" : "Join community 🇬🇷"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
