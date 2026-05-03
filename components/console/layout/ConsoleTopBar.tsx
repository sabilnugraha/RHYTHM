export function ConsoleTopBar() {
  return (
    <header className="flex items-center justify-between border-2 border-black bg-[#FFFDF8] px-5 py-4 shadow-[5px_5px_0px_#000]">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">RHYTHM</p>
        <h1 className="text-xl font-black tracking-[-0.03em]">Platform Console</h1>
      </div>
      <div className="hidden flex-1 px-8 lg:block">
        <div className="border-2 border-black bg-[#F6F1E8] px-4 py-3 text-sm font-bold text-neutral-500 shadow-[3px_3px_0px_#000]">
          Search workspace, package, agent, or command...
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="border-2 border-black bg-[#FFD6A5] px-3 py-2 text-sm font-black shadow-[3px_3px_0px_#000]">3</button>
        <button className="border-2 border-black bg-[#CDEFD7] px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0px_#000]">Sabil</button>
      </div>
    </header>
  );
}
