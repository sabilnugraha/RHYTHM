export function RhythmDock() {
  return (
    <div className="fixed bottom-5 right-5 z-40 w-[340px] border-2 border-black bg-[#FFFDF8] p-4 shadow-[7px_7px_0px_#000]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-black uppercase tracking-wider">RHYTHM Dock</div>
          <div className="text-xs font-bold text-neutral-600">Inbox • Agent • Alerts • Tasks</div>
        </div>
        <div className="border-2 border-black bg-[#F8B4B4] px-2 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">5</div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-[10px] font-black uppercase tracking-wider">
        {['Inbox', 'Agent', 'Alerts', 'Tasks'].map((item) => (
          <button key={item} className="border-2 border-black bg-[#F6F1E8] px-2 py-2 shadow-[2px_2px_0px_#000]">
            {item}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <div className="border-2 border-black bg-[#CDEFD7] p-2 text-xs font-bold shadow-[2px_2px_0px_#000]">ABC Group: Payroll setup issue</div>
        <div className="border-2 border-black bg-[#A7C7FF] p-2 text-xs font-bold shadow-[2px_2px_0px_#000]">Agent: 2 workflow rules need review</div>
      </div>
    </div>
  );
}
