type ConsoleTopBarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export function ConsoleTopBar({ isDarkMode, onToggleDarkMode }: ConsoleTopBarProps) {
  const topBarTheme = isDarkMode ? 'bg-[#15161D] text-[#F8F5EE]' : 'bg-[#FFFDF8] text-[#121216]';
  const searchTheme = isDarkMode ? 'bg-[#090A0F] text-white' : 'bg-white text-[#121216]';

  return (
    <header className={`mb-2 flex items-center gap-2 rounded-2xl border-2 border-black px-2.5 py-2 shadow-[4px_4px_0px_#000] ${topBarTheme}`}>
      <div className="min-w-44 px-1.5">
        <p className="text-[8px] font-black uppercase tracking-[0.18em] opacity-60">RHYTHM</p>
        <h1 className="text-sm font-black tracking-[-0.03em]">Platform Console</h1>
      </div>

      <button className="hidden rounded-xl border-2 border-black bg-[#A3FF12] px-3 py-1.5 text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000] md:inline-flex">
        PT Demo Indonesia ▾
      </button>

      <div className="hidden flex-1 px-1 lg:block">
        <div className={`rounded-xl border-2 border-black px-3 py-2 text-[11px] font-bold opacity-95 shadow-[2px_2px_0px_#000] ${searchTheme}`}>
          Ask RHYTHM or search workspace, package, agent, or command...
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5 px-1">
        <button className="rounded-lg border-2 border-black bg-[#FF4FB8] px-2.5 py-1.5 text-[10px] font-black text-black shadow-[2px_2px_0px_#000]">3</button>
        <button
          type="button"
          aria-label="Toggle dark mode"
          aria-pressed={isDarkMode}
          onClick={onToggleDarkMode}
          className={`flex h-8 w-[64px] items-center rounded-full border-2 border-black p-1 shadow-[2px_2px_0px_#000] transition-colors ${isDarkMode ? 'justify-end bg-[#A66BFF]' : 'justify-start bg-[#FFE600]'}`}
        >
          <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-black bg-white text-[10px] font-black text-black">
            {isDarkMode ? '☾' : '☀'}
          </span>
        </button>
        <button className="rounded-lg border-2 border-black bg-[#00D4FF] px-2.5 py-1.5 text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">Sabil</button>
      </div>
    </header>
  );
}
