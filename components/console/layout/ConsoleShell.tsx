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
  onOpenTab: (tab: ConsoleTab) => void;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
};

export function ConsoleShell({ children, tabs, activeTabId, activeSection, onOpenTab, onSelectTab, onCloseTab }: ConsoleShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F4EFE7] text-[#151515]">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(#15151510_1px,transparent_1px),linear-gradient(90deg,#15151510_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative z-10 flex min-h-screen">
        <ConsoleSidebar activeSection={activeSection} onOpenTab={onOpenTab} />
        <section className="flex min-w-0 flex-1 flex-col p-3">
          <ConsoleTopBar />
          <ConsoleTabBar tabs={tabs} activeTabId={activeTabId} onSelectTab={onSelectTab} onCloseTab={onCloseTab} />
          <div className="min-h-0 flex-1 overflow-auto rounded-b-3xl rounded-tr-3xl border border-black/20 bg-[#FFFDF8] p-4 shadow-[0_18px_45px_rgba(20,20,20,0.10)]">
            {children}
          </div>
        </section>
      </div>
      <RhythmDock />
    </main>
  );
}
