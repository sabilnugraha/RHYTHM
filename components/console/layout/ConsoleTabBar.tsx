const tabs = [
  { label: 'Overview', pinned: true, active: true },
  { label: 'ABC Group', badge: '!' },
  { label: 'Package Studio' },
];

export function ConsoleTabBar() {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex shrink-0 items-center gap-2 border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] ${
            tab.active ? 'bg-[#FFFDF8]' : 'bg-[#F6F1E8]'
          }`}
        >
          {tab.pinned ? '📌 ' : ''}{tab.label}
          {tab.badge ? <span className="bg-[#FFD6A5] px-1">{tab.badge}</span> : null}
          {!tab.pinned ? <span className="text-neutral-500">×</span> : null}
        </button>
      ))}
    </div>
  );
}
