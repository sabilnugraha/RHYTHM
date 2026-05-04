const items = [
  { label: 'Overdue Requests', value: '3', tone: 'bg-[#FFE600]' },
  { label: 'Workspace Issues', value: '2', tone: 'bg-[#FF5A1F]' },
  { label: 'My SLA', value: '94%', tone: 'bg-[#A3FF12]' },
  { label: 'Unread Inbox', value: '5', tone: 'bg-[#00C2FF]' },
];

export function AttentionCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={`${item.tone} rounded-xl border-2 border-black p-2 text-black shadow-[2px_2px_0px_#000]`}>
          <div className="text-xl font-black tracking-[-0.04em]">{item.value}</div>
          <div className="mt-0.5 text-[8px] font-black uppercase tracking-wide">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
