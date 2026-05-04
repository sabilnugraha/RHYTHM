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
    <div className="flex overflow-x-auto pl-2">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTabId;
        const inactiveTheme = isDarkMode ? 'bg-[#25252C] text-[#FFF7E8]' : 'bg-[#EDE3D1] text-[#101014]';
        const activeColors = ['bg-[#A3FF12]', 'bg-[#00D4FF]', 'bg-[#FFE600]', 'bg-[#FF4FB8]'];

        return (
          <button
            key={tab.id}
            className={`-ml-1 flex shrink-0 items-center gap-2 rounded-t-2xl border-[3px] border-b-0 border-black px-4 py-2 text-[10px] font-black uppercase tracking-wide shadow-[4px_-3px_0px_#000] transition ${
              isActive ? `${activeColors[index % activeColors.length]} text-black` : inactiveTheme
            }`}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.pinned ? <span className="text-[9px]">●</span> : null}
            <span>{tab.label}</span>
            {tab.badge ? <span className="rounded-lg border-2 border-black bg-[#FFE600] px-1.5 py-0.5 text-[9px] text-black">{tab.badge}</span> : null}
            {!tab.pinned ? (
              <span
                className="text-black/50 hover:text-black"
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
