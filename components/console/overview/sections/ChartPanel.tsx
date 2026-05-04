type ChartPanelProps = {
  title: string;
  type: 'line' | 'donut' | 'bar' | 'bars';
  metric: string;
  detail: string;
};

export function ChartPanel({ title, type, metric, detail }: ChartPanelProps) {
  return (
    <div className="rounded-2xl border border-black/15 bg-[#F6F1E8] p-3 shadow-[0_10px_24px_rgba(20,20,20,0.07)]">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-wider">{title}</h3>
          <p className="mt-0.5 text-[10px] font-bold text-neutral-600">{detail}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-[#FFFDF8] px-2 py-0.5 text-lg font-black shadow-sm">{metric}</div>
      </div>
      <div className="h-24 rounded-xl border border-black/10 bg-[#FFFDF8] p-3">
        {type === 'line' ? <LineChartMock /> : null}
        {type === 'donut' ? <DonutChartMock /> : null}
        {type === 'bar' ? <BarChartMock /> : null}
        {type === 'bars' ? <AgentBarsMock /> : null}
      </div>
    </div>
  );
}

function LineChartMock() {
  return (
    <div className="relative h-full">
      <div className="absolute bottom-1 left-0 h-px w-full bg-black/30" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 90" preserveAspectRatio="none">
        <polyline points="10,65 75,32 140,48 205,20 270,42" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DonutChartMock() {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[10px] border-[#18A999] bg-[#FFFDF8] shadow-sm">
        <div className="h-5 w-5 rounded-full border border-black/20 bg-[#FFFDF8]" />
      </div>
      <div className="space-y-1 text-[10px] font-black uppercase tracking-wider">
        <div>Healthy 12</div>
        <div>Setup 4</div>
        <div>Issues 2</div>
      </div>
    </div>
  );
}

function BarChartMock() {
  const bars = ['h-8', 'h-12', 'h-14', 'h-7', 'h-16', 'h-10', 'h-13'];
  return (
    <div className="flex h-full items-end gap-2">
      {bars.map((height, index) => (
        <div key={index} className={`${height} flex-1 rounded-t-lg border border-black/20 bg-[#A7C7FF]`} />
      ))}
    </div>
  );
}

function AgentBarsMock() {
  const rows = [
    ['SLA Watcher', 'w-[85%]'],
    ['Package Builder', 'w-[62%]'],
    ['Support Triage', 'w-[48%]'],
  ];

  return (
    <div className="space-y-2">
      {rows.map(([label, width]) => (
        <div key={label}>
          <div className="mb-0.5 text-[9px] font-black uppercase tracking-wider">{label}</div>
          <div className="h-3 overflow-hidden rounded-full border border-black/20 bg-[#F6F1E8]">
            <div className={`${width} h-full rounded-full bg-[#FFD6A5]`} />
          </div>
        </div>
      ))}
    </div>
  );
}
