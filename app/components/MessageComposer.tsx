type MessageComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function MessageComposer({ value, onChange, onSubmit }: MessageComposerProps) {
  return (
    <div className="border-t border-slate-200 bg-white/90 p-3 backdrop-blur-sm sm:p-4">
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-3 shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder="What&apos;s on your mind?"
          rows={3}
          className="w-full resize-none border-0 bg-transparent px-2 py-2 text-[15px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
          <div className="flex items-center gap-2 text-xl text-slate-500 sm:gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
              aria-label="Attach photo"
            >
              📷
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
              aria-label="Add link"
            >
              🔗
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
              aria-label="Add emoji"
            >
              😊
            </button>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.35)] transition hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
