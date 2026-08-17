"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Header } from "./components/Header";
import { Message } from "./components/Message";
import { MessageComposer } from "./components/MessageComposer";
import { MobileNavigation } from "./components/MobileNavigation";
import { ProfileCard } from "./components/ProfileCard";
import { ProfileSetup } from "./components/ProfileSetup";
import { Sidebar } from "./components/Sidebar";

type Profile = {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt?: string;
};

type MessageItem = {
  id: string;
  content: string;
  timestamp: string;
  reactions: Record<string, number>;
  author: Profile;
};

type ProfileForm = {
  photo: string;
  fullName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
};

const STORAGE_KEYS = {
  profile: "greek-founders-profile",
  messages: "greek-founders-messages",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const currentUserProfile: Profile = {
  name: "Nikos Papadopoulos",
  username: "nikos",
  avatar: "NP",
  bio: "Founder & entrepreneur",
  location: "Athens, Greece",
  website: "nikospapadopoulos.com",
  joinedAt: "Joined May 2025",
};

const sampleMessages: MessageItem[] = [
  {
    id: "1",
    author: {
      name: "Nikos Papadopoulos",
      username: "nikos",
      avatar: "NP",
      bio: "Founder & entrepreneur",
      location: "Athens, Greece",
      website: "nikospapadopoulos.com",
      joinedAt: "Joined May 2025",
    },
    content: "Καλησπέρα σε όλους! 👋 Is anyone here building something in AI?",
    timestamp: "9:12 AM",
    reactions: { "👍": 6, "🔥": 2, "🎉": 1, "💡": 4 },
  },
  {
    id: "2",
    author: {
      name: "Maria Georgiou",
      username: "maria",
      avatar: "MG",
      bio: "AI product builder",
      location: "Heraklion, Greece",
      website: "mariageorgiou.io",
      joinedAt: "Joined April 2025",
    },
    content: "Yes! I'm working on an AI tool for Greek hotels. Would love to connect with other founders.",
    timestamp: "9:14 AM",
    reactions: { "👍": 11, "🔥": 4, "🎉": 2, "💡": 8 },
  },
  {
    id: "3",
    author: {
      name: "Giorgos",
      username: "giorgos",
      avatar: "G",
      bio: "Building e-commerce products",
      location: "Thessaloniki, Greece",
      website: "giorgos.dev",
      joinedAt: "Joined January 2025",
    },
    content: "Nice! I'm working on an e-commerce startup in Thessaloniki 🚀",
    timestamp: "9:18 AM",
    reactions: { "👍": 9, "🔥": 3, "🎉": 5, "💡": 2 },
  },
  {
    id: "4",
    author: {
      name: "Elena Kostopoulou",
      username: "elena",
      avatar: "EK",
      bio: "Product strategist",
      location: "Patras, Greece",
      website: "elenakost.com",
      joinedAt: "Joined March 2025",
    },
    content: "Would love to hear more about the AI hotel workflow. Anyone open to a quick intro call?",
    timestamp: "9:20 AM",
    reactions: { "👍": 5, "🔥": 1, "🎉": 0, "💡": 6 },
  },
];

const defaultForm: ProfileForm = {
  photo: "",
  fullName: currentUserProfile.name,
  username: currentUserProfile.username,
  bio: currentUserProfile.bio ?? "",
  location: currentUserProfile.location ?? "",
  website: currentUserProfile.website ?? "",
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>(sampleMessages);
  const [draft, setDraft] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [form, setForm] = useState<ProfileForm>(defaultForm);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEYS.profile);
      const storedMessages = localStorage.getItem(STORAGE_KEYS.messages);

      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile) as Partial<Profile>;
        const normalizedProfile: Profile = {
          name: parsedProfile.name ?? currentUserProfile.name,
          username: parsedProfile.username ?? currentUserProfile.username,
          avatar: parsedProfile.avatar ?? currentUserProfile.avatar,
          bio: parsedProfile.bio ?? currentUserProfile.bio ?? "",
          location: parsedProfile.location ?? currentUserProfile.location ?? "",
          website: parsedProfile.website ?? currentUserProfile.website ?? "",
          joinedAt: parsedProfile.joinedAt ?? currentUserProfile.joinedAt,
        };

        setProfile(normalizedProfile);
        setForm({
          photo: normalizedProfile.avatar.startsWith("data:image") ? normalizedProfile.avatar : "",
          fullName: normalizedProfile.name,
          username: normalizedProfile.username,
          bio: normalizedProfile.bio ?? "",
          location: normalizedProfile.location ?? "",
          website: normalizedProfile.website ?? "",
        });
      }

      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch {
      setProfile(null);
      setForm(defaultForm);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFieldChange = (field: string, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setForm((previous) => ({ ...previous, photo: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProfile = () => {
    const name = form.fullName.trim() || currentUserProfile.name;
    const username = form.username.trim() || currentUserProfile.username;
    const avatar = form.photo || getInitials(name);

    const nextProfile: Profile = {
      name,
      username,
      avatar,
      bio: form.bio.trim() || "Founder building in Greece.",
      location: form.location.trim() || "Athens, Greece",
      website: form.website.trim() || "yourwebsite.com",
      joinedAt: `Joined ${new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })}`,
    };

    const formState: ProfileForm = {
      photo: form.photo,
      fullName: name,
      username,
      bio: nextProfile.bio ?? "Founder building in Greece.",
      location: nextProfile.location ?? "Athens, Greece",
      website: nextProfile.website ?? "yourwebsite.com",
    };

    setProfile(nextProfile);
    setForm(formState);
    setShowSetup(false);
  };

  const handleSendMessage = () => {
    if (!draft.trim() || !profile) return;

    const message: MessageItem = {
      id: `${Date.now()}`,
      author: profile,
      content: draft.trim(),
      timestamp: "Just now",
      reactions: { "👍": 0, "🔥": 0, "🎉": 0, "💡": 0 },
    };

    setMessages((previous) => [...previous, message]);
    setDraft("");
  };

  const handleReact = (messageId: string, reaction: string) => {
    setMessages((previous) =>
      previous.map((message) => {
        if (message.id !== messageId) return message;

        return {
          ...message,
          reactions: {
            ...message.reactions,
            [reaction]: (message.reactions[reaction] ?? 0) + 1,
          },
        };
      }),
    );
  };

  if (!profile && !showSetup) {
    return (
      <ProfileSetup
        form={form}
        onFieldChange={handleFieldChange}
        onPhotoUpload={handlePhotoUpload}
        onSubmit={handleCreateProfile}
      />
    );
  }

  if (showSetup && profile) {
    return (
      <ProfileSetup
        form={form}
        onFieldChange={handleFieldChange}
        onPhotoUpload={handlePhotoUpload}
        onSubmit={handleCreateProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar profile={profile} />

        <div className="relative flex min-w-0 flex-1 flex-col bg-[#f8fafc]">
          <div className="lg:hidden">
            <MobileNavigation
              menuOpen={mobileMenuOpen}
              onToggleMenu={() => setMobileMenuOpen((previous) => !previous)}
            />
          </div>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden">
              <div className="h-full w-[80%] max-w-xs bg-[#0b1220] p-4 text-slate-100 shadow-xl">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-lg">🇬🇷</div>
                  <span className="font-semibold">Greek Founders</span>
                </div>
                <div className="space-y-2">
                  {[
                    "Community Chat",
                    "Members",
                    "Settings",
                  ].map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className={[
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium",
                        index === 0 ? "bg-slate-800 text-white" : "text-slate-300",
                      ].join(" ")}
                    >
                      <span>{index === 0 ? "💬" : index === 1 ? "👥" : "⚙️"}</span>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Header
            title="Greek Founders"
            subtitle="The community for people building in Greece"
            onlineLabel="Online"
          />

          <div className="flex justify-end border-b border-slate-200 bg-white px-4 py-2 sm:px-6">
            <button
              type="button"
              onClick={() => setShowSetup(true)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Edit profile
            </button>
          </div>

          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-4 lg:px-6">
              <div className="mx-auto max-w-4xl space-y-2">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    onOpenProfile={setSelectedProfile}
                    onReact={handleReact}
                  />
                ))}
                <div ref={endOfMessagesRef} />
              </div>
            </div>

            <MessageComposer
              value={draft}
              onChange={setDraft}
              onSubmit={handleSendMessage}
            />
          </main>
        </div>
      </div>

      {selectedProfile && (
        <ProfileCard
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
