"use client";

import { useState } from "react";
import type { CountryEntry } from "../lib/types";

type CountryGridProps = {
  countries: CountryEntry[];
  onJoinWaitlist: (country: string) => void;
};

export function CountryGrid({ countries, onJoinWaitlist }: CountryGridProps) {
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleJoin = (country: string) => {
    setJoined((prev) => new Set([...prev, country]));
    onJoinWaitlist(country);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Global Launch Status</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">The Founders Network</h2>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">🇬🇷 Greece is live</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {countries.map((c) => {
          const pct = Math.min(100, Math.round((c.current / c.target) * 100));
          const isJoined = joined.has(c.country);
          const isExpanded = expanded === c.country;

          if (c.status === "open") {
            return (
              <div key={c.country} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Live</span>
                </div>
                <p className="mt-3 font-semibold text-slate-900">{c.country}</p>
                <p className="mt-0.5 text-xs text-slate-500">{c.description}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1.5 text-xs font-medium text-emerald-700">
                  {c.current.toLocaleString()} / {c.target.toLocaleString()} members
                </p>
              </div>
            );
          }

          return (
            <div key={c.country} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{c.flag}</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">Waitlist</span>
              </div>
              <p className="mt-3 font-semibold text-slate-900">{c.country}</p>
              <p className="mt-0.5 text-xs text-slate-500">Not open yet.</p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {c.current.toLocaleString()} people are waiting.
              </p>

              {/* Progress bar */}
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-700"
                  style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-500">{pct}% of {c.target.toLocaleString()} needed to open</p>

              {!isExpanded ? (
                <button type="button" onClick={() => setExpanded(c.country)}
                  className={`mt-3 w-full rounded-xl py-2.5 text-xs font-semibold transition ${
                    isJoined
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700 cursor-default"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                  disabled={isJoined}>
                  {isJoined ? "✓ You're on the waitlist" : "Join waitlist"}
                </button>
              ) : (
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs font-semibold text-slate-700">Enter your email</p>
                  <input type="email" placeholder="you@email.com"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-400"
                    onKeyDown={(e) => { if (e.key === "Enter") { handleJoin(c.country); setExpanded(null); } }}
                  />
                  <button type="button" onClick={() => { handleJoin(c.country); setExpanded(null); }}
                    className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-500">
                    Confirm →
                  </button>
                  <p className="mt-2 text-center text-[10px] text-slate-400">Invite 3 friends to help open {c.country} faster.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
