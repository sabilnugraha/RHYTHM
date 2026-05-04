type ChartPanelProps = {
  title: string;
  type: 'line' | 'donut' | 'bar' | 'bars';
  metric: string;
  detail: string;
};

export function ChartPanel({ title, type, metric, detail }: ChartPanelProps) {
  return (
    <div className="rounded-xl border-2 border-black bg-[#F6F1E8] p-2 shadow-[2px_2px_0px_#000]">
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[9px] font-black uppercase tracking-wide">{title}</h3>
          <p className="mt-0.5 text-[8px] font-bold text-neutral-600">{detail}</p>
        </div>
        <div className="rounded-lg border border-black bg-[#FFFDF8] px-1.5 py-0.5 text-sm font-black">{metric}</div>
      </div>
      <div className="h-20 overflow-hidden rounded-lg border border-black bg-[#FFFDF8] p-2">
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
      <div className="absolute bottom-1 left-0 h-px w-full bg-black/25" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 90" preserveAspectRatio="none">
        <polyline points="10,65 75,32 140,48 205,20 270,42" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DonutChartMock() {
  return (
    <div className="flex h-full items-center justify-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-[8px] border-[#A3FF12] bg-[#FFFDF8]">
        <div className="h-4 w-4 rounded-full border border-black bg-[#FFFDF8]" />
      </div>
      <div className="space-y-0.5 text-[8px] font-black uppercase tracking-wide">
        <div>Healthy 12</div>
        <div>Setup 4</div>
        <div>Issues 2</div>
      </div>
    </div>
  );
}

function BarChartMock() {
  const bars = ['h-6', 'h-9', 'h-10', 'h-5', 'h-12', 'h-8', 'h-10'];
  return (
    <div className="flex h-full items-end gap-1.5 overflow-hidden">
      {bars.map((height, index) => (
        <div key={index} className={`${height} min-w-0 flex-1 rounded-t-md border border-black bg-[#00C2FF]`} />
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
    <div className="flex h-full flex-col justify-center gap-1 overflow-hidden">
      {rows.map(([label, width]) => (
        <div key={label} className="min-h-0">
          <div className="mb-0.5 truncate text-[7px] font-black uppercase leading-3 tracking-wide">{label}</div>
          <div className="h-2 overflow-hidden rounded-full border border-black bg-[#F6F1E8]">
            <div className={`${width} h-full max-w-full rounded-full bg-[#FF5A1F]`} />
          </div>
        </div>
      ))}
    </div>
  );
}
