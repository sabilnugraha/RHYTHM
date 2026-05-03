const actions = ['Open Lobby', 'Open Dock', 'Create User', 'Create Package'];

export function QuickActions() {
  return (
    <section className="mt-5 border-2 border-black bg-[#FFD6A5] p-4 shadow-[4px_4px_0px_#000]">
      <h3 className="mb-3 text-sm font-black uppercase tracking-wider">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <button key={action} className="border-2 border-black bg-[#FFFDF8] px-4 py-3 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5">
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
