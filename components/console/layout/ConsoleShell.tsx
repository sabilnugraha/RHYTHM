import { ReactNode } from 'react';

import type { ConsoleTab } from '../ConsoleOverviewPage';
import { ConsoleSidebar } from './ConsoleSidebar';
import { ConsoleTopBar } from './ConsoleTopBar';
import { ConsoleTabBar } from './ConsoleTabBar';
import { RhythmDock } from '../dock/RhythmDock';

type ConsoleShellProps = {
  children: ReactNode;
  tabs: ConsoleTab[];
  activeTabId: string;
  activeSection: string;
  onOpenTab: (tab: ConsoleTab) => void;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
};

export function ConsoleShell({ children, tabs, activeTabId, activeSection, onOpenTab, onSelectTab, onCloseTab }: ConsoleShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F1E8] text-[#151515]">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#15151514_1px,transparent_1px),linear-gradient(90deg,#15151514_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative z-10 flex min-h-screen">
        <ConsoleSidebar activeSection={activeSection} onOpenTab={onOpenTab} />
        <section className="flex min-w-0 flex-1 flex-col p-3">
          <ConsoleTopBar />
          <ConsoleTabBar tabs={tabs} activeTabId={activeTabId} onSelectTab={onSelectTab} onCloseTab={onCloseTab} />
          <div className="min-h-0 flex-1 overflow-auto border-2 border-black bg-[#FFFDF8] p-4 shadow-[4px_4px_0px_#000]">
            {children}
          </div>
        </section>
      </div>
      <RhythmDock />
    </main>
  );
}
