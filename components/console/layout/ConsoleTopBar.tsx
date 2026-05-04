type ConsoleTopBarProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export function ConsoleTopBar({ isDarkMode, onToggleDarkMode }: ConsoleTopBarProps) {
  const topBarTheme = isDarkMode ? 'bg-[#15151A] text-[#FFF7E8]' : 'bg-[#FFFDF8] text-[#101014]';
  const searchTheme = isDarkMode ? 'bg-[#09090B] text-white' : 'bg-white text-[#101014]';

  return (
    <header className={`mb-3 flex items-center gap-3 rounded-[28px] border-[3px] border-black px-3 py-3 shadow-[7px_7px_0px_#000] ${topBarTheme}`}>
      <div className="min-w-52 px-2">
        <p className="text-[9px] font-black uppercase tracking-[0.22em] opacity-60">RHYTHM</p>
        <h1 className="text-base font-black tracking-[-0.03em]">Platform Console</h1>
      </div>

      <button className="hidden rounded-2xl border-[3px] border-black bg-[#A3FF12] px-4 py-2 text-[11px] font-black uppercase text-black shadow-[4px_4px_0px_#000] md:inline-flex">
        PT Demo Indonesia ▾
      </button>

      <div className="hidden flex-1 px-1 lg:block">
        <div className={`rounded-2xl border-[3px] border-black px-4 py-3 text-[12px] font-bold opacity-95 shadow-[4px_4px_0px_#000] ${searchTheme}`}>
          Ask RHYTHM or search workspace, package, agent, or command...
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 px-2">
        <button className="rounded-xl border-[3px] border-black bg-[#FF4FB8] px-3 py-2 text-[11px] font-black text-black shadow-[4px_4px_0px_#000]">3</button>
        <button
          type="button"
          aria-label="Toggle dark mode"
          aria-pressed={isDarkMode}
          onClick={onToggleDarkMode}
          className={`flex h-10 w-[78px] items-center rounded-full border-[3px] border-black p-1 shadow-[4px_4px_0px_#000] transition-colors ${isDarkMode ? 'justify-end bg-[#A66BFF]' : 'justify-start bg-[#FFE600]'}`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border-[3px] border-black bg-white text-xs font-black text-black">
            {isDarkMode ? '☾' : '☀'}
          </span>
        </button>
        <button className="rounded-xl border-[3px] border-black bg-[#00D4FF] px-3 py-2 text-[11px] font-black uppercase text-black shadow-[4px_4px_0px_#000]">Sabil</button>
      </div>
    </header>
  );
}
