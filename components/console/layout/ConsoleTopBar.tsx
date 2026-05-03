export function ConsoleTopBar() {
  return (
    <header className="mb-2 flex items-center rounded-3xl border border-black/15 bg-[#FFFDF8]/95 px-3 py-2 shadow-[0_14px_35px_rgba(20,20,20,0.08)] backdrop-blur">
      <div className="min-w-52 px-2">
        <p className="text-[8px] font-black uppercase tracking-[0.22em] text-neutral-500">RHYTHM</p>
        <h1 className="text-base font-black tracking-[-0.03em]">Platform Console</h1>
      </div>
      <div className="hidden flex-1 px-3 lg:block">
        <div className="rounded-2xl border border-black/10 bg-[#F4EFE7] px-3 py-2 text-[11px] font-semibold text-neutral-500">
          Search workspace, package, agent, or command...
        </div>
      </div>
      <div className="flex items-center gap-2 px-2">
        <button className="rounded-xl bg-[#FFD6A5] px-2.5 py-1.5 text-[11px] font-black ring-1 ring-black/10">3</button>
        <button className="rounded-xl bg-[#CDEFD7] px-3 py-1.5 text-[11px] font-black uppercase ring-1 ring-black/10">Sabil</button>
      </div>
    </header>
  );
}
