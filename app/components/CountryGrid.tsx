"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import type { CountryEntry } from "../lib/types";

type CountryGridProps = {
  countries: CountryEntry[];
};

export function CountryGrid({ countries }: CountryGridProps) {
  // Real waitlist counts from Supabase, keyed by country
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [emailInputs, setEmailInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Load real counts from Supabase on mount
  useEffect(() => {
    async function loadCounts() {
      const { data, error } = await supabase
        .from("waitlist")
        .select("country");

      if (error || !data) return;

      const totals: Record<string, number> = {};
      for (const row of data) {
        totals[row.country] = (totals[row.country] ?? 0) + 1;
      }
      setCounts(totals);
    }

    loadCounts();

    // Realtime — update count when anyone new joins
    const channel = supabase
      .channel("waitlist-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "waitlist" }, (payload) => {
        const country = payload.new?.country as string;
        if (country) {
          setCounts((prev) => ({ ...prev, [country]: (prev[country] ?? 0) + 1 }));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleJoin = async (country: string) => {
    const email = (emailInputs[country] ?? "").trim();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(country);
    setError(null);

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email, country });

    setLoading(null);

    if (insertError) {
      // Duplicate email for this country
      if (insertError.code === "23505") {
        setJoined((prev) => new Set([...prev, country]));
        setExpanded(null);
      } else {
        setError("Something went wrong. Try again.");
      }
      return;
    }

    setJoined((prev) => new Set([...prev, country]));
    setExpanded(null);
    setEmailInputs((prev) => ({ ...prev, [country]: "" }));
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

      {error && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-xs font-medium text-red-600">{error}</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {countries.map((c) => {
          // Use real Supabase count for waitlist countries, static for open
          const realCount = c.status === "waitlist" ? (counts[c.country] ?? c.current) : c.current;
          const pct = Math.min(100, Math.round((realCount / c.target) * 100));
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
                  {realCount.toLocaleString()} / {c.target.toLocaleString()} members
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

              <p className="mt-2 text-sm font-bold text-slate-800">
                {realCount.toLocaleString()} people are waiting.
              </p>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-700"
                  style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {realCount.toLocaleString()} / {c.target.toLocaleString()} to open
              </p>

              {!isExpanded ? (
                <button
                  type="button"
                  onClick={() => {
                    setExpanded(c.country);
                    setTimeout(() => inputRefs.current[c.country]?.focus(), 50);
                  }}
                  disabled={isJoined}
                  className={`mt-3 w-full rounded-xl py-2.5 text-xs font-semibold transition ${
                    isJoined
                      ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}>
                  {isJoined ? "✓ You're on the waitlist" : "Join waitlist"}
                </button>
              ) : (
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs font-semibold text-slate-700">Enter your email</p>
                  <input
                    ref={(el) => { inputRefs.current[c.country] = el; }}
                    type="email"
                    placeholder="you@email.com"
                    value={emailInputs[c.country] ?? ""}
                    onChange={(e) => setEmailInputs((prev) => ({ ...prev, [c.country]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") handleJoin(c.country); if (e.key === "Escape") setExpanded(null); }}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleJoin(c.country)}
                    disabled={loading === c.country}
                    className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-60">
                    {loading === c.country ? "Joining..." : "Confirm →"}
                  </button>
                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    Invite 3 friends to help open {c.country} faster.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
