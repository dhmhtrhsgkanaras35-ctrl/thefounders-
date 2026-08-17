"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { CountryGrid } from "./components/CountryGrid";
import { Header } from "./components/Header";
import { Message } from "./components/Message";
import { MessageComposer } from "./components/MessageComposer";
import { MobileNavigation } from "./components/MobileNavigation";
import { ProfileCard } from "./components/ProfileCard";
import { ProfileSetup } from "./components/ProfileSetup";
import { Sidebar } from "./components/Sidebar";
import { COUNTRIES, DEFAULT_PROFILE, SEED_MESSAGES } from "./lib/data";
import type { CountryEntry, MessageItem, Profile, ProfileForm } from "./lib/types";

const STORAGE = {
  profile: "tf-profile-v2",
  messages: "tf-messages-v2",
};

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "GF";
}

function makeEmptyForm(p?: Profile): ProfileForm {
  return {
    photo: p?.avatar?.startsWith("data:image") ? p.avatar : "",
    fullName: p?.name ?? "",
    username: p?.username ?? "",
    bio: p?.bio ?? "",
    location: p?.location ?? "",
    website: p?.website ?? "",
    twitter: p?.twitter ?? "",
    linkedin: p?.linkedin ?? "",
    github: p?.github ?? "",
    country: p?.country ?? "Greece",
  };
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>(SEED_MESSAGES);
  const [countries, setCountries] = useState<CountryEntry[]>(COUNTRIES);
  const [draft, setDraft] = useState("");
  const [draftImage, setDraftImage] = useState("");
  const [draftLinks, setDraftLinks] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [form, setForm] = useState<ProfileForm>(makeEmptyForm());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const endRef = useRef<HTMLDivElement | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE.profile);
      if (stored) {
        const p = JSON.parse(stored) as Profile;
        setProfile(p);
        setForm(makeEmptyForm(p));
      } else {
        setIsNewUser(true);
        setShowSetup(true);
      }
      const storedMsgs = localStorage.getItem(STORAGE.messages);
      if (storedMsgs) setMessages(JSON.parse(storedMsgs));
    } catch {
      setIsNewUser(true);
      setShowSetup(true);
    }
  }, []);

  // Persist profile
  useEffect(() => {
    if (profile) localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
  }, [profile]);

  // Persist messages
  useEffect(() => {
    if (messages.length > 0) localStorage.setItem(STORAGE.messages, JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFieldChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string")
        setForm((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    const name = form.fullName.trim() || DEFAULT_PROFILE.name;
    const username = form.username.trim() || DEFAULT_PROFILE.username;
    const avatar = form.photo || getInitials(name);

    const next: Profile = {
      name,
      username,
      avatar,
      bio: form.bio.trim(),
      location: form.location.trim(),
      website: form.website.trim(),
      twitter: form.twitter.trim(),
      linkedin: form.linkedin.trim(),
      github: form.github.trim(),
      country: form.country || "Greece",
      joinedAt: profile?.joinedAt ?? `Joined ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
      profileViews: profile?.profileViews ?? 0,
      followers: profile?.followers ?? 0,
    };

    setProfile(next);
    setForm(makeEmptyForm(next));
    setShowSetup(false);
    setIsNewUser(false);
  };

  const handleSendMessage = () => {
    if ((!draft.trim() && !draftImage && draftLinks.length === 0) || !profile) return;

    const msg: MessageItem = {
      id: `${Date.now()}`,
      author: profile,
      content: draft.trim() || "Shared an update.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      image: draftImage || undefined,
      links: draftLinks.length > 0 ? draftLinks : undefined,
      reactions: { "👍": 0, "🔥": 0, "🎉": 0, "💡": 0 },
    };

    setMessages((prev) => [...prev, msg]);
    setDraft("");
    setDraftImage("");
    setDraftLinks([]);
  };

  const handleReact = (id: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id !== id ? m : { ...m, reactions: { ...m.reactions, [reaction]: (m.reactions[reaction] ?? 0) + 1 } }
      )
    );
  };

  const handleDraftPhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setDraftImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddLink = (url: string) => {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    setDraftLinks((prev) => prev.includes(normalized) ? prev : [...prev, normalized]);
  };

  const handleJoinWaitlist = (country: string) => {
    setCountries((prev) =>
      prev.map((c) => c.country === country ? { ...c, current: c.current + 1 } : c)
    );
  };

  const totalWaitlist = countries.filter((c) => c.status === "waitlist").reduce((s, c) => s + c.current, 0);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar
        profile={profile}
        onEditProfile={() => setShowSetup(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <div className="lg:hidden">
          <MobileNavigation
            menuOpen={mobileMenuOpen}
            onToggleMenu={() => setMobileMenuOpen((v) => !v)}
          />
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="h-full w-72 max-w-[80vw] bg-[#0b1220] p-4 text-slate-100 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇬🇷</span>
                  <span className="font-semibold">The Founders</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">✕</button>
              </div>
              <div className="space-y-1">
                {[
                  { id: "chat", label: "Community Chat", icon: "💬" },
                  { id: "countries", label: "Countries", icon: "🌍" },
                  { id: "members", label: "Members", icon: "👥" },
                ].map((item) => (
                  <button key={item.id} type="button" onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${activeTab === item.id ? "bg-slate-800 text-white" : "text-slate-400"}`}>
                    <span>{item.icon}</span>{item.label}
                  </button>
                ))}
              </div>
              <button onClick={() => { setShowSetup(true); setMobileMenuOpen(false); }}
                className="mt-6 w-full rounded-xl border border-slate-700 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
                ✏️ Edit profile
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <Header
          title="The Founders"
          subtitle="The global network for country-based founder communities"
          onlineLabel="Greece Live"
        />

        {/* Stats bar */}
        <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Members", value: "2,310", sub: "+18% this month", color: "text-emerald-600" },
              { label: "Waitlist", value: totalWaitlist.toLocaleString(), sub: "Across 5 countries", color: "text-amber-600" },
              { label: "Countries", value: "1 live", sub: "5 coming soon", color: "text-blue-600" },
            ].map(({ label, value, sub, color }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-lg font-bold text-slate-900">{value}</p>
                <p className={`text-xs ${color}`}>{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 lg:px-6">
            <div className="mx-auto max-w-3xl space-y-4">

              {/* Countries tab */}
              {activeTab === "countries" && (
                <CountryGrid countries={countries} onJoinWaitlist={handleJoinWaitlist} />
              )}

              {/* Members tab */}
              {activeTab === "members" && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <p className="text-3xl">👥</p>
                  <p className="mt-3 font-semibold text-slate-800">Members directory coming soon</p>
                  <p className="mt-1 text-sm text-slate-500">Browse all 2,310 founders in the Greece community.</p>
                </div>
              )}

              {/* Chat tab */}
              {activeTab === "chat" && (
                <>
                  {/* Country cards pinned above chat */}
                  <CountryGrid countries={countries} onJoinWaitlist={handleJoinWaitlist} />

                  {/* Messages */}
                  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">🇬🇷 Greece — Community Chat</p>
                      <p className="text-xs text-slate-500">Open to all Greek founders</p>
                    </div>
                    <div className="divide-y divide-slate-100 px-2 py-2">
                      {messages.map((msg) => (
                        <Message key={msg.id} message={msg} onOpenProfile={setSelectedProfile} onReact={handleReact} />
                      ))}
                      <div ref={endRef} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Composer — only shown in chat */}
          {activeTab === "chat" && (
            <MessageComposer
              value={draft}
              onChange={setDraft}
              onSubmit={handleSendMessage}
              onAttachPhoto={handleDraftPhoto}
              onAddLink={handleAddLink}
              draftImage={draftImage}
              draftLinks={draftLinks}
              authorAvatar={profile?.avatar}
            />
          )}
        </main>
      </div>

      {/* Profile card modal */}
      {selectedProfile && (
        <ProfileCard profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}

      {/* Profile setup modal */}
      {showSetup && (
        <ProfileSetup
          form={form}
          onFieldChange={handleFieldChange}
          onPhotoUpload={handlePhotoUpload}
          onSubmit={handleSaveProfile}
          onClose={isNewUser ? undefined : () => setShowSetup(false)}
        />
      )}
    </div>
  );
}
