const activities = [
  'Joko entered ABC Group workspace.',
  'HRIS Basic package updated to draft v1.1.',
  'New platform user 0000000004 created.',
  'SLA Watcher Agent completed daily scan.',
];

export function RecentActivity() {
  return (
    <section className="rounded-xl border-2 border-black bg-[#FFFDF8] p-2.5 shadow-[2px_2px_0px_#000]">
      <h3 className="mb-2 text-[10px] font-black uppercase tracking-wide">Recent Activity</h3>
      <div className="space-y-1.5">
        {activities.map((item) => (
          <div key={item} className="flex gap-2 rounded-lg border border-black bg-[#F6F1E8] p-2 text-[10px] font-bold leading-4 shadow-[1.5px_1.5px_0px_#000]">
            <span className="mt-0.5 h-2.5 w-2.5 shrink-0 border border-black bg-[#00C2FF]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
