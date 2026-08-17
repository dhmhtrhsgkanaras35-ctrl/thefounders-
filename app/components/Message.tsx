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

type MessageProps = {
  message: MessageItem;
  onOpenProfile: (profile: Profile) => void;
  onReact: (messageId: string, reaction: string) => void;
};

const reactions = ["👍", "🔥", "🎉", "💡"];

export function Message({ message, onOpenProfile, onReact }: MessageProps) {
  const { author } = message;

  return (
    <article className="flex gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-50/80 sm:px-3">
      <button
        type="button"
        onClick={() => onOpenProfile(author)}
        className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white shadow-md transition hover:scale-[1.02]"
        aria-label={`Open profile for ${author.name}`}
      >
        {author.avatar}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenProfile(author)}
            className="text-sm font-semibold text-slate-900 hover:text-blue-600"
          >
            {author.name}
          </button>
          <span className="text-xs text-slate-500">@{author.username}</span>
          <span className="text-[11px] text-slate-400">{message.timestamp}</span>
        </div>

        <p className="mt-1 whitespace-pre-line text-[15px] leading-7 text-slate-700">{message.content}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {reactions.map((reaction) => (
            <button
              key={reaction}
              type="button"
              onClick={() => onReact(message.id, reaction)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              <span>{reaction}</span>
              <span>{message.reactions[reaction] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
