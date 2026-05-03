const items = [
  { label: 'Overdue Requests', value: '3', tone: 'bg-[#FFD6A5]' },
  { label: 'Workspace Issues', value: '2', tone: 'bg-[#F8B4B4]' },
  { label: 'My SLA', value: '94%', tone: 'bg-[#CDEFD7]' },
  { label: 'Unread Inbox', value: '5', tone: 'bg-[#A7C7FF]' },
];

export function AttentionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={`${item.tone} border-2 border-black p-4 shadow-[4px_4px_0px_#000]`}>
          <div className="text-3xl font-black tracking-[-0.04em]">{item.value}</div>
          <div className="mt-1 text-xs font-black uppercase tracking-wider text-neutral-700">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
