import { AgentSuggestions } from './sections/AgentSuggestions';
import { AttentionCards } from './sections/AttentionCards';
import { ChartPanel } from './sections/ChartPanel';
import { QuickActions } from './sections/QuickActions';
import { RecentActivity } from './sections/RecentActivity';

export function OverviewContent() {
  return (
    <div>
      <div className="mb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Overview</p>
        <h2 className="text-3xl font-black tracking-[-0.04em]">Good morning, Sabil.</h2>
        <p className="mt-1 text-sm font-bold text-neutral-600">Here is what needs your attention today.</p>
      </div>
      <AttentionCards />
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <ChartPanel title="SLA Trend" type="line" metric="94%" detail="7d avg • -3% from last week" />
        <ChartPanel title="Workspace Status" type="donut" metric="18" detail="12 healthy • 4 setup • 2 issues" />
        <ChartPanel title="Client Requests" type="bar" metric="27" detail="5 unread • 3 waiting response" />
        <ChartPanel title="Agent Activity" type="bars" metric="32" detail="12 SLA checks • 8 package reviews" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <AgentSuggestions />
        <RecentActivity />
      </div>
      <QuickActions />
    </div>
  );
}
