import { AgentSuggestions } from './sections/AgentSuggestions';
import { AttentionCards } from './sections/AttentionCards';
import { ChartPanel } from './sections/ChartPanel';
import { QuickActions } from './sections/QuickActions';
import { RecentActivity } from './sections/RecentActivity';

export function OverviewContent() {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-neutral-500">Overview</p>
          <h2 className="text-xl font-black tracking-[-0.04em]">Good morning, Sabil.</h2>
        </div>
        <p className="hidden text-[10px] font-bold text-neutral-500 md:block">Items that need attention today.</p>
      </div>
      <AttentionCards />
      <div className="mt-2 grid gap-2 lg:grid-cols-2">
        <ChartPanel title="SLA Trend" type="line" metric="94%" detail="7d avg • -3%" />
        <ChartPanel title="Workspace Status" type="donut" metric="18" detail="12 healthy • 2 issues" />
      </div>
      <div className="mt-2 grid gap-2 lg:grid-cols-2">
        <ChartPanel title="Client Requests" type="bar" metric="27" detail="5 unread • 3 waiting" />
        <ChartPanel title="Agent Activity" type="bars" metric="32" detail="12 checks • 8 reviews" />
      </div>
      <div className="mt-2 grid gap-2 xl:grid-cols-2">
        <AgentSuggestions />
        <RecentActivity />
      </div>
      <QuickActions />
    </div>
  );
}
