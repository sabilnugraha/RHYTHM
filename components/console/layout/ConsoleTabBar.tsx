import type { ConsoleTab } from '../ConsoleOverviewPage';

type ConsoleTabBarProps = {
  tabs: ConsoleTab[];
  activeTabId: string;
  isDarkMode: boolean;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
};

export function ConsoleTabBar({ tabs, activeTabId, isDarkMode, onSelectTab, onCloseTab }: ConsoleTabBarProps) {
  return (
    <div className="mt-2 flex overflow-x-auto pl-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const inactiveTheme = isDarkMode ? 'bg-[#171B24] text-[#AEB4C0]' : 'bg-[#E9E1D2] text-neutral-600';
        const activeTheme = isDarkMode ? 'bg-[#273140] text-[#F7F2E8]' : 'bg-[#FFFDF8] text-[#111216]';

        return (
          <button
            key={tab.id}
            className={`-ml-px flex h-6 shrink-0 items-center gap-1.5 rounded-t-md border border-b-0 border-black/45 px-2.5 text-[8px] font-semibold tracking-normal transition ${
              isActive ? activeTheme : inactiveTheme
            }`}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.pinned ? <span className="text-[6px] leading-none">●</span> : null}
            <span>{tab.label}</span>
            {tab.badge ? <span className="rounded bg-[#FFE600] px-1 text-[7px] text-black">{tab.badge}</span> : null}
            {!tab.pinned ? (
              <span
                className="ml-0.5 text-[9px] leading-none opacity-45 hover:opacity-100"
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
