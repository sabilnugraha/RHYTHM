import type { ConsoleTab } from '../ConsoleOverviewPage';

type PlaceholderContentProps = {
  tab: ConsoleTab;
};

export function PlaceholderContent({ tab }: PlaceholderContentProps) {
  return (
    <div className="grid min-h-[420px] place-items-center border-2 border-dashed border-black bg-[#F6F1E8] p-8 text-center">
      <div className="max-w-lg">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">{tab.section}</p>
        <h2 className="text-2xl font-black tracking-[-0.04em]">{tab.label}</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
          Dummy tab content. Later this area will render the selected feature, workspace, package, or agent.
        </p>
      </div>
    </div>
  );
}
