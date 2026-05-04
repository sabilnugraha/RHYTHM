import { ReactNode } from 'react';

import type { ConsoleTab } from '../ConsoleOverviewPage';
import { RhythmDock } from '../dock/RhythmDock';
import { ConsoleSidebar } from './ConsoleSidebar';
import { ConsoleTabBar } from './ConsoleTabBar';
import { ConsoleTopBar } from './ConsoleTopBar';

type ConsoleShellProps = {
  children: ReactNode;
  tabs: ConsoleTab[];
  activeTabId: string;
  activeSection: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenTab: (tab: ConsoleTab) => void;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
};

export function ConsoleShell({
  children,
  tabs,
  activeTabId,
  activeSection,
  isDarkMode,
  onToggleDarkMode,
  onOpenTab,
  onSelectTab,
  onCloseTab,
}: ConsoleShellProps) {
  const shellTheme = isDarkMode ? 'bg-[#09090B] text-[#FFF7E8]' : 'bg-[#F7F0E3] text-[#101014]';
  const contentTheme = isDarkMode ? 'border-black bg-[#15151A] shadow-[8px_8px_0px_#000]' : 'border-black bg-[#FFFDF8] shadow-[8px_8px_0px_#000]';

  return (
    <main className={`min-h-screen overflow-hidden ${shellTheme}`}>
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(#00000018_1px,transparent_1px),linear-gradient(90deg,#00000018_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none absolute -left-12 top-28 h-36 w-36 rotate-12 rounded-[34px] border-[3px] border-black bg-[#00D4FF] shadow-[8px_8px_0px_#000]" />
      <div className="pointer-events-none absolute right-8 top-24 h-20 w-20 rounded-full border-[3px] border-black bg-[#A3FF12] shadow-[7px_7px_0px_#000]" />
      <div className="pointer-events-none absolute bottom-10 right-72 h-24 w-24 -rotate-12 border-[3px] border-black bg-[#FF4FB8] shadow-[8px_8px_0px_#000]" />

      <div className="relative z-10 flex min-h-screen">
        <ConsoleSidebar activeSection={activeSection} isDarkMode={isDarkMode} onOpenTab={onOpenTab} />
        <section className="flex min-w-0 flex-1 flex-col p-3">
          <ConsoleTopBar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
          <ConsoleTabBar tabs={tabs} activeTabId={activeTabId} isDarkMode={isDarkMode} onSelectTab={onSelectTab} onCloseTab={onCloseTab} />
          <div className={`min-h-0 flex-1 overflow-auto rounded-b-[28px] rounded-tr-[28px] border-[3px] p-4 ${contentTheme}`}>{children}</div>
        </section>
      </div>
      <RhythmDock />
    </main>
  );
}
