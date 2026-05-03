const menu = [
  { label: 'Overview', active: true },
  {
    label: 'Workspace Lobby',
    children: [
      { label: 'All Workspaces' },
      { label: 'ABC Group', badge: '!' },
      { label: 'XYZ Logistics', badge: '2' },
      { label: 'Demo Client' },
    ],
  },
  {
    label: 'Agent Studio',
    children: [
      { label: 'All Agents' },
      { label: 'SLA Watcher' },
      { label: 'Package Builder' },
    ],
  },
  { label: 'SLA & Performance' },
  { label: 'Platform Users' },
  {
    label: 'Package Studio',
    children: [
      { label: 'All Packages' },
      { label: 'HRIS Basic' },
      { label: 'Mobile Attendance' },
    ],
  },
  { label: 'Audit Logs' },
  { label: 'Settings' },
];

export function ConsoleSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r-2 border-black bg-[#FFFDF8] p-4 shadow-[6px_0px_0px_#000] lg:block">
      <div className="mb-6 border-2 border-black bg-[#18A999] px-4 py-3 text-white shadow-[4px_4px_0px_#000]">
        <div className="text-2xl font-black tracking-[-0.04em]">RHYTHM</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">Console</div>
      </div>
      <nav className="space-y-2">
        {menu.map((item) => (
          <div key={item.label}>
            <button className={`flex w-full items-center justify-between border-2 border-black px-3 py-2 text-left text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] ${item.active ? 'bg-[#A7C7FF]' : 'bg-[#F6F1E8]'}`}>
              <span>{item.label}</span>
              {item.children ? <span>⌄</span> : null}
            </button>
            {item.children ? (
              <div className="ml-4 mt-2 space-y-2 border-l-2 border-black pl-3">
                {item.children.map((child) => (
                  <button key={child.label} className="flex w-full items-center justify-between bg-transparent py-1 text-left text-xs font-black uppercase tracking-wider text-neutral-700 hover:text-black">
                    <span>{child.label}</span>
                    {child.badge ? <span className="border-2 border-black bg-[#FFD6A5] px-1 text-[10px]">{child.badge}</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
    </aside>
  );
}
