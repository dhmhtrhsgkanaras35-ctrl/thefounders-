import type { MessageItem, Profile } from "../lib/types";

type MessageProps = {
  message: MessageItem;
  onOpenProfile: (profile: Profile) => void;
  onReact: (messageId: string, reaction: string) => void;
};

const REACTIONS = ["👍", "🔥", "🎉", "💡"];

function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function Message({ message, onOpenProfile, onReact }: MessageProps) {
  const { author } = message;

  return (
    <article className="group flex gap-3 rounded-2xl px-3 py-3 transition hover:bg-white hover:shadow-sm">
      <button
        type="button"
        onClick={() => onOpenProfile(author)}
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow transition hover:scale-105"
        aria-label={`View ${author.name}'s profile`}
      >
        {author.avatar?.startsWith("data:image")
          ? <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
          : author.avatar}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <button type="button" onClick={() => onOpenProfile(author)}
            className="text-sm font-semibold text-slate-900 hover:text-blue-600">
            {author.name}
          </button>
          <span className="text-xs text-slate-400">@{author.username}</span>
          {author.country && (
            <span className="text-xs text-slate-400">· {author.country}</span>
          )}
          <span className="text-[11px] text-slate-400">{message.timestamp}</span>
        </div>

        <p className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-slate-700">{message.content}</p>

        {message.image && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
            <img src={message.image} alt="Attached" className="max-h-72 w-full object-cover" />
          </div>
        )}

        {message.links && message.links.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {message.links.map((link) => {
              const href = normalizeUrl(link);
              let host = link;
              try { host = new URL(href).hostname.replace("www.", ""); } catch {}
              return (
                <a key={link} href={href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100">
                  🔗 {host}
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {REACTIONS.map((r) => (
            <button key={r} type="button" onClick={() => onReact(message.id, r)}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition hover:scale-105 ${
                (message.reactions[r] ?? 0) > 0
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}>
              <span>{r}</span>
              {(message.reactions[r] ?? 0) > 0 && <span className="font-medium">{message.reactions[r]}</span>}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
