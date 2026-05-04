import type { ConsoleTab } from '../ConsoleOverviewPage';

type ConsoleTabBarProps = {
  tabs: ConsoleTab[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
};

export function ConsoleTabBar({ tabs, activeTabId, onSelectTab, onCloseTab }: ConsoleTabBarProps) {
  return (
    <div className="flex overflow-x-auto pl-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            className={`-ml-1 flex shrink-0 items-center gap-2 rounded-t-2xl border border-b-0 border-black/15 px-3 py-2 text-[10px] font-black uppercase tracking-wide transition ${
              isActive ? 'bg-[#FFFDF8] text-black shadow-[0_-4px_16px_rgba(20,20,20,0.06)]' : 'bg-[#E8E0D3] text-neutral-500 hover:bg-[#EFE8DC]'
            }`}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.pinned ? <span className="text-[9px]">●</span> : null}
            <span>{tab.label}</span>
            {tab.badge ? <span className="rounded bg-[#FFD6A5] px-1.5 py-0.5 text-[9px] text-black">{tab.badge}</span> : null}
            {!tab.pinned ? (
              <span
                className="text-neutral-400 hover:text-black"
                onClick={(event) => {
                  event.stopPropagation();
                  onCloseTab(tab.id);
                }}
              >
                ×
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
