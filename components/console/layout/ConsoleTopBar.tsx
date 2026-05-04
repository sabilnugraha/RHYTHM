type ConsoleTopBarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export function ConsoleTopBar({ isDarkMode, onToggleDarkMode }: ConsoleTopBarProps) {
  const searchTheme = isDarkMode
    ? 'border-white/15 bg-white/6 text-[#F7F2E8] placeholder:text-white/35'
    : 'border-black/15 bg-white/75 text-[#111216] placeholder:text-neutral-400';

  return (
    <header className="mb-1.5 flex items-center gap-2 px-1 py-1">
      <div className="min-w-0 flex-1">
        <div className={`flex h-8 items-center rounded-lg border px-3 text-[10px] font-semibold ${searchTheme}`}>
          <span className="truncate opacity-70">Ask RHYTHM or search command...</span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Toggle dark mode"
        aria-pressed={isDarkMode}
        onClick={onToggleDarkMode}
        className={`relative h-6 w-11 rounded-full border transition-colors ${
          isDarkMode ? 'border-white/15 bg-[#263244]' : 'border-black/15 bg-[#E9E1D2]'
        }`}
      >
        <span
          className={`absolute top-0.5 grid h-5 w-5 place-items-center rounded-full text-[9px] transition-all ${
            isDarkMode ? 'left-5 bg-[#00C2FF] text-black' : 'left-0.5 bg-[#FFE600] text-black'
          }`}
        >
          {isDarkMode ? '☾' : '☀'}
        </span>
      </button>

      <button
        type="button"
        aria-label="User profile"
        className={`grid h-8 w-8 place-items-center overflow-hidden rounded-full border text-[10px] font-black ${
          isDarkMode ? 'border-white/15 bg-[#1E2633] text-[#F7F2E8]' : 'border-black/15 bg-[#F0E8D8] text-[#111216]'
        }`}
      >
        SB
      </button>
    </header>
  );
}
