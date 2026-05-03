import type { ConsoleTab } from '../ConsoleOverviewPage';

type ConsoleTabBarProps = {
  tabs: ConsoleTab[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
};

export function ConsoleTabBar({ tabs, activeTabId, onSelectTab, onCloseTab }: ConsoleTabBarProps) {
  return (
    <div className="flex overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            className={`flex shrink-0 items-center gap-2 border-2 border-b-0 border-black px-3 py-2 text-[11px] font-black uppercase tracking-wider ${
              isActive ? 'bg-[#FFFDF8]' : 'bg-[#EDE7DB] text-neutral-600'
            }`}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.pinned ? '📌' : null}
            <span>{tab.label}</span>
            {tab.badge ? <span className="bg-[#FFD6A5] px-1">{tab.badge}</span> : null}
            {!tab.pinned ? (
              <span
                className="text-neutral-500 hover:text-black"
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
