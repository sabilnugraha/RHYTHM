type ConsoleTopBarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export function ConsoleTopBar({ isDarkMode, onToggleDarkMode }: ConsoleTopBarProps) {
  const topBarTheme = isDarkMode ? 'bg-[#141720] text-[#F7F2E8]' : 'bg-[#FFFDF8] text-[#111216]';
  const searchTheme = isDarkMode ? 'bg-[#080A0F] text-white' : 'bg-white text-[#111216]';

  return (
    <header className={`mb-1.5 flex items-center gap-1.5 rounded-xl border-2 border-black px-2 py-1.5 shadow-[3px_3px_0px_#000] ${topBarTheme}`}>
      <div className="min-w-40 px-1">
        <p className="text-[7px] font-black uppercase tracking-[0.16em] opacity-60">RHYTHM</p>
        <h1 className="text-xs font-black tracking-[-0.03em]">Platform Console</h1>
      </div>

      <button className="hidden rounded-lg border-2 border-black bg-[#A3FF12] px-2.5 py-1 text-[9px] font-black uppercase text-black shadow-[2px_2px_0px_#000] md:inline-flex">
        PT Demo ▾
      </button>

      <div className="hidden flex-1 px-0.5 lg:block">
        <div className={`rounded-lg border-2 border-black px-2.5 py-1.5 text-[10px] font-bold opacity-95 shadow-[2px_2px_0px_#000] ${searchTheme}`}>
          Ask RHYTHM or search command...
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1 px-0.5">
        <button className="rounded-md border-2 border-black bg-[#FF5A1F] px-2 py-1 text-[9px] font-black text-black shadow-[2px_2px_0px_#000]">3</button>
        <button
          type="button"
          aria-label="Toggle dark mode"
          aria-pressed={isDarkMode}
          onClick={onToggleDarkMode}
          className={`flex h-7 w-14 items-center rounded-full border-2 border-black p-0.5 shadow-[2px_2px_0px_#000] transition-colors ${isDarkMode ? 'justify-end bg-[#00C2FF]' : 'justify-start bg-[#FFE600]'}`}
        >
          <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-black bg-white text-[9px] font-black text-black">
            {isDarkMode ? '☾' : '☀'}
          </span>
        </button>
        <button className="rounded-md border-2 border-black bg-[#00C2FF] px-2 py-1 text-[9px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">Sabil</button>
      </div>
    </header>
  );
}
