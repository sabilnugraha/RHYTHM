import type { ConsoleTab } from '../ConsoleOverviewPage';

type PlaceholderContentProps = {
  tab: ConsoleTab;
};

export function PlaceholderContent({ tab }: PlaceholderContentProps) {
  return (
    <div className="grid min-h-[220px] place-items-center rounded-xl border border-dashed border-black/45 bg-[#F6F1E8] p-4 text-center">
      <div className="max-w-sm">
        <p className="mb-1 text-[8px] font-black uppercase tracking-[0.16em] text-neutral-500">{tab.section}</p>
        <h2 className="text-sm font-black tracking-[-0.03em]">{tab.label}</h2>
        <p className="mt-1.5 text-[10px] font-semibold leading-4 text-neutral-500">
          Content placeholder for selected feature, workspace, package, or agent.
        </p>
      </div>
    </div>
  );
}
