const suggestions = [
  'Package Builder Agent found 2 incomplete workflow rules.',
  'SLA Watcher detected response risk on XYZ Logistics.',
  'Workspace Health Agent flagged ABC Group setup delay.',
];

export function AgentSuggestions() {
  return (
    <section className="border-2 border-black bg-[#CDEFD7] p-4 shadow-[4px_4px_0px_#000]">
      <h3 className="mb-3 text-sm font-black uppercase tracking-wider">Agent Suggestions</h3>
      <div className="space-y-3">
        {suggestions.map((item) => (
          <div key={item} className="border-2 border-black bg-[#FFFDF8] p-3 text-sm font-bold shadow-[3px_3px_0px_#000]">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
