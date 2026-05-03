export function ConsoleTopBar() {
  return (
    <header className="mb-2 flex items-center border-2 border-black bg-[#FFFDF8] shadow-[4px_4px_0px_#000]">
      <div className="min-w-56 border-r-2 border-black px-4 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">RHYTHM</p>
        <h1 className="text-lg font-black tracking-[-0.03em]">Platform Console</h1>
      </div>
      <div className="hidden flex-1 px-3 lg:block">
        <div className="border-2 border-black bg-[#F6F1E8] px-3 py-2 text-xs font-bold text-neutral-500">
          Search workspace, package, agent, or command...
        </div>
      </div>
      <div className="flex items-center gap-2 border-l-2 border-black px-3 py-3">
        <button className="border-2 border-black bg-[#FFD6A5] px-2 py-1 text-xs font-black">3</button>
        <button className="border-2 border-black bg-[#CDEFD7] px-3 py-1 text-xs font-black uppercase">Sabil</button>
      </div>
    </header>
  );
}
