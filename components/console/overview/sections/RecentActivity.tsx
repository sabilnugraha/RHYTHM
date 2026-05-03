const activities = [
  'Joko entered ABC Group workspace.',
  'HRIS Basic package updated to draft v1.1.',
  'New platform user 0000000004 created.',
  'SLA Watcher Agent completed daily scan.',
];

export function RecentActivity() {
  return (
    <section className="border-2 border-black bg-[#FFFDF8] p-4 shadow-[4px_4px_0px_#000]">
      <h3 className="mb-3 text-sm font-black uppercase tracking-wider">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item} className="flex gap-3 border-2 border-black bg-[#F6F1E8] p-3 text-sm font-bold shadow-[3px_3px_0px_#000]">
            <span className="h-3 w-3 shrink-0 border-2 border-black bg-[#18A999]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
