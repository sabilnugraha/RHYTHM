'use client';

import { useState } from 'react';

export function RhythmDock() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-2xl border-2 border-black bg-[#111216] px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-0.5"
        onClick={() => setIsOpen(true)}
      >
        RHYTHM Dock
        <span className="rounded-full border border-black bg-[#FF3B30] px-2 py-0.5 text-white">5</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[340px] rounded-3xl border-2 border-black bg-[#FFFDF8] p-4 shadow-[5px_5px_0px_#000]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <button className="min-w-0 text-left" onClick={() => setIsOpen(false)}>
          <div className="text-sm font-black uppercase tracking-wider text-[#111216]">RHYTHM Dock</div>
          <div className="text-xs font-bold text-neutral-700">Inbox • Agent • Alerts • Tasks</div>
        </button>
        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-black bg-[#FF3B30] px-2 py-1 text-xs font-black text-white">5</div>
          <button className="rounded-xl border border-black bg-[#FFE600] px-2 py-1 text-xs font-black text-black" onClick={() => setIsOpen(false)}>
            −
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-[10px] font-black uppercase tracking-wider">
        {['Inbox', 'Agent', 'Alerts', 'Tasks'].map((item, index) => (
          <button key={item} className={`rounded-xl border border-black px-2 py-2 ${index === 0 ? 'bg-[#111216] text-white' : 'bg-[#FFE600] text-[#111216]'}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <button className="w-full rounded-2xl border border-black bg-[#9BFF00] p-3 text-left text-xs font-black text-[#111216]">ABC Group: Payroll setup issue</button>
        <button className="w-full rounded-2xl border border-black bg-[#00B9F2] p-3 text-left text-xs font-black text-[#111216]">Agent: 2 workflow rules need review</button>
      </div>
    </div>
  );
}
