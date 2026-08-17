"use client";

import { useRef, useState } from "react";

type MessageComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAttachPhoto: (file?: File) => void;
  onAddLink: (url: string) => void;
  draftImage?: string;
  draftLinks?: string[];
  authorAvatar?: string;
};

export function MessageComposer({
  value, onChange, onSubmit, onAttachPhoto, onAddLink,
  draftImage, draftLinks = [], authorAvatar,
}: MessageComposerProps) {
  const [linkInput, setLinkInput] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLinkAdd = () => {
    if (linkInput.trim()) {
      onAddLink(linkInput.trim());
      setLinkInput("");
      setShowLinkInput(false);
    }
  };

  const isReady = value.trim() || draftImage || draftLinks.length > 0;

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-3 sm:px-5">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow">
          {authorAvatar?.startsWith("data:image")
            ? <img src={authorAvatar} alt="You" className="h-full w-full object-cover" />
            : (authorAvatar ?? "You")}
        </div>

        {/* Composer box */}
        <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); } }}
            placeholder="Share something with the community..."
            rows={2}
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />

          {/* Draft image preview */}
          {draftImage && (
            <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-slate-200">
              <img src={draftImage} alt="Preview" className="max-h-40 w-full object-cover" />
            </div>
          )}

          {/* Draft links */}
          {draftLinks.length > 0 && (
            <div className="mx-3 mb-3 flex flex-wrap gap-1.5">
              {draftLinks.map((link) => {
                let host = link;
                try { host = new URL(/^https?:\/\//i.test(link) ? link : `https://${link}`).hostname.replace("www.", ""); } catch {}
                return (
                  <span key={link} className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
                    🔗 {host}
                  </span>
                );
              })}
            </div>
          )}

          {/* Link input */}
          {showLinkInput && (
            <div className="mx-3 mb-3 flex gap-2">
              <input
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleLinkAdd(); if (e.key === "Escape") setShowLinkInput(false); }}
                placeholder="https://example.com"
                autoFocus
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-400"
              />
              <button type="button" onClick={handleLinkAdd}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500">
                Add
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2">
            <div className="flex items-center gap-1">
              <label className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700" title="Attach photo">
                📷
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onAttachPhoto(e.target.files?.[0])} />
              </label>
              <button type="button" onClick={() => setShowLinkInput((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700" title="Add link">
                🔗
              </button>
            </div>
            <button type="button" onClick={onSubmit} disabled={!isReady}
              className="rounded-full bg-blue-600 px-5 py-1.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition hover:bg-blue-500 disabled:opacity-40">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
