const actions = ['Open Lobby', 'Open Dock', 'Create User', 'Create Package'];

export function QuickActions() {
  return (
    <section className="mt-2 rounded-xl border-2 border-black bg-[#FFE600] p-2.5 text-black shadow-[2px_2px_0px_#000]">
      <h3 className="mb-2 text-[10px] font-black uppercase tracking-wide">Quick Actions</h3>
      <div className="flex flex-wrap gap-1.5">
        {actions.map((action) => (
          <button key={action} className="rounded-lg border border-black bg-[#FFFDF8] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wide shadow-[1.5px_1.5px_0px_#000] transition-transform hover:-translate-y-0.5">
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
