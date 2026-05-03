type ChartPanelProps = {
  title: string;
  type: 'line' | 'donut' | 'bar' | 'bars';
  metric: string;
  detail: string;
};

export function ChartPanel({ title, type, metric, detail }: ChartPanelProps) {
  return (
    <div className="border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider">{title}</h3>
          <p className="mt-1 text-xs font-bold text-neutral-600">{detail}</p>
        </div>
        <div className="border-2 border-black bg-[#FFFDF8] px-3 py-1 text-xl font-black shadow-[3px_3px_0px_#000]">{metric}</div>
      </div>
      <div className="h-36 border-2 border-black bg-[#FFFDF8] p-4 shadow-[3px_3px_0px_#000]">
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
      <div className="absolute bottom-2 left-0 h-1 w-full bg-black" />
      <div className="absolute left-2 top-20 h-2 w-2 border-2 border-black bg-[#18A999]" />
      <div className="absolute left-[22%] top-12 h-2 w-2 border-2 border-black bg-[#18A999]" />
      <div className="absolute left-[42%] top-16 h-2 w-2 border-2 border-black bg-[#18A999]" />
      <div className="absolute left-[62%] top-8 h-2 w-2 border-2 border-black bg-[#18A999]" />
      <div className="absolute left-[82%] top-14 h-2 w-2 border-2 border-black bg-[#18A999]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 120" preserveAspectRatio="none">
        <polyline points="10,82 75,45 140,62 205,28 270,55" fill="none" stroke="black" strokeWidth="4" />
      </svg>
    </div>
  );
}

function DonutChartMock() {
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-[16px] border-[#18A999] bg-[#FFFDF8] shadow-[4px_4px_0px_#000]">
        <div className="h-8 w-8 rounded-full border-2 border-black bg-[#FFFDF8]" />
      </div>
      <div className="space-y-2 text-xs font-black uppercase tracking-wider">
        <div>Healthy 12</div>
        <div>Setup 4</div>
        <div>Issues 2</div>
      </div>
    </div>
  );
}

function BarChartMock() {
  const bars = ['h-14', 'h-20', 'h-24', 'h-12', 'h-28', 'h-16', 'h-22'];
  return (
    <div className="flex h-full items-end gap-3">
      {bars.map((height, index) => (
        <div key={index} className={`${height} flex-1 border-2 border-black bg-[#A7C7FF] shadow-[2px_2px_0px_#000]`} />
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
    <div className="space-y-3">
      {rows.map(([label, width]) => (
        <div key={label}>
          <div className="mb-1 text-[10px] font-black uppercase tracking-wider">{label}</div>
          <div className="h-5 border-2 border-black bg-[#F6F1E8]">
            <div className={`${width} h-full border-r-2 border-black bg-[#FFD6A5]`} />
          </div>
        </div>
      ))}
    </div>
  );
}
