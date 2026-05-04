const suggestions = [
  'Package Builder Agent found 2 incomplete workflow rules.',
  'SLA Watcher detected response risk on XYZ Logistics.',
  'Workspace Health Agent flagged ABC Group setup delay.',
];

export function AgentSuggestions() {
  return (
    <section className="rounded-xl border-2 border-black bg-[#A3FF12] p-2.5 text-black shadow-[2px_2px_0px_#000]">
      <h3 className="mb-2 text-[10px] font-black uppercase tracking-wide">Agent Suggestions</h3>
      <div className="space-y-1.5">
        {suggestions.map((item) => (
          <div key={item} className="rounded-lg border border-black bg-[#FFFDF8] p-2 text-[10px] font-bold leading-4 shadow-[1.5px_1.5px_0px_#000]">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
