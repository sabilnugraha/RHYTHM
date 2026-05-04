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
  const shellTheme = isDarkMode ? 'bg-[#090A0F] text-[#F8F5EE]' : 'bg-[#F5F0E7] text-[#121216]';
  const contentTheme = isDarkMode ? 'border-black bg-[#15161D] shadow-[4px_4px_0px_#000]' : 'border-black bg-[#FFFDF8] shadow-[4px_4px_0px_#000]';

  return (
    <main className={`min-h-screen overflow-hidden ${shellTheme}`}>
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(#00000014_1px,transparent_1px),linear-gradient(90deg,#00000014_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none absolute right-8 top-24 h-14 w-14 rounded-full border-2 border-black bg-[#A3FF12] shadow-[4px_4px_0px_#000]" />
      <div className="pointer-events-none absolute bottom-8 right-72 h-16 w-16 -rotate-12 border-2 border-black bg-[#FF4FB8] shadow-[4px_4px_0px_#000]" />

      <div className="relative z-10 flex min-h-screen">
        <ConsoleSidebar activeSection={activeSection} isDarkMode={isDarkMode} onOpenTab={onOpenTab} />
        <section className="flex min-w-0 flex-1 flex-col p-3 pl-0">
          <ConsoleTopBar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
          <ConsoleTabBar tabs={tabs} activeTabId={activeTabId} isDarkMode={isDarkMode} onSelectTab={onSelectTab} onCloseTab={onCloseTab} />
          <div className={`min-h-0 flex-1 overflow-auto rounded-b-2xl rounded-tr-2xl border-2 p-3 ${contentTheme}`}>{children}</div>
        </section>
      </div>
      <RhythmDock />
    </main>
  );
}
