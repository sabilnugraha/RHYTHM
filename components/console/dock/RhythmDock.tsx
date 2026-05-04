'use client';

import { useState } from 'react';

export function RhythmDock() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-2xl bg-[#151515] px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_16px_34px_rgba(20,20,20,0.22)]"
        onClick={() => setIsOpen(true)}
      >
        RHYTHM Dock
        <span className="rounded-full bg-[#F8B4B4] px-2 py-0.5 text-black">5</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[340px] rounded-3xl border border-black/15 bg-[#FFFDF8]/95 p-4 shadow-[0_18px_45px_rgba(20,20,20,0.18)] backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-3">
        <button className="min-w-0 text-left" onClick={() => setIsOpen(false)}>
          <div className="text-sm font-black uppercase tracking-wider">RHYTHM Dock</div>
          <div className="text-xs font-bold text-neutral-600">Inbox • Agent • Alerts • Tasks</div>
        </button>
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-[#F8B4B4] px-2 py-1 text-xs font-black ring-1 ring-black/10">5</div>
          <button className="rounded-xl bg-[#F4EFE7] px-2 py-1 text-xs font-black ring-1 ring-black/10" onClick={() => setIsOpen(false)}>
            −
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-[10px] font-black uppercase tracking-wider">
        {['Inbox', 'Agent', 'Alerts', 'Tasks'].map((item, index) => (
          <button key={item} className={`rounded-xl px-2 py-2 ring-1 ring-black/10 ${index === 0 ? 'bg-[#151515] text-white' : 'bg-[#F4EFE7] text-[#151515]'}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <button className="w-full rounded-2xl bg-[#CDEFD7] p-3 text-left text-xs font-bold ring-1 ring-black/10">ABC Group: Payroll setup issue</button>
        <button className="w-full rounded-2xl bg-[#A7C7FF] p-3 text-left text-xs font-bold ring-1 ring-black/10">Agent: 2 workflow rules need review</button>
      </div>
    </div>
  );
}
