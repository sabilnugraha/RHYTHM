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
  const shellTheme = isDarkMode ? 'bg-[#080A0F] text-[#F7F2E8]' : 'bg-[#F6F1E8] text-[#111216]';
  const contentTheme = isDarkMode ? 'border-black bg-[#141720] shadow-[3px_3px_0px_#000]' : 'border-black bg-[#FFFDF8] shadow-[3px_3px_0px_#000]';

  return (
    <main className={`min-h-screen overflow-hidden ${shellTheme}`}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#00000012_1px,transparent_1px),linear-gradient(90deg,#00000012_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute right-6 top-20 h-10 w-10 rounded-full border-2 border-black bg-[#A3FF12] shadow-[3px_3px_0px_#000]" />

      <div className="relative z-10 flex min-h-screen">
        <ConsoleSidebar activeSection={activeSection} isDarkMode={isDarkMode} onOpenTab={onOpenTab} />
        <section className="flex min-w-0 flex-1 flex-col p-2 pl-0">
          <ConsoleTopBar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
          <ConsoleTabBar tabs={tabs} activeTabId={activeTabId} isDarkMode={isDarkMode} onSelectTab={onSelectTab} onCloseTab={onCloseTab} />
          <div className={`min-h-0 flex-1 overflow-auto rounded-b-xl rounded-tr-xl border-2 p-2.5 ${contentTheme}`}>{children}</div>
        </section>
      </div>
      <RhythmDock />
    </main>
  );
}
