'use client';

import { useState } from 'react';

import { ConsoleShell } from './layout/ConsoleShell';
import { OverviewContent } from './overview/OverviewContent';
import { PlaceholderContent } from './pages/PlaceholderContent';

export type ConsoleTab = {
  id: string;
  label: string;
  section: string;
  pinned?: boolean;
  badge?: string;
};

const defaultTab: ConsoleTab = {
  id: 'overview',
  label: 'Overview',
  section: 'Overview',
  pinned: true,
};

export function ConsoleOverviewPage() {
  const [tabs, setTabs] = useState<ConsoleTab[]>([defaultTab]);
  const [activeTabId, setActiveTabId] = useState(defaultTab.id);

  function openTab(tab: ConsoleTab) {
    setTabs((currentTabs) => {
      const exists = currentTabs.some((item) => item.id === tab.id);
      return exists ? currentTabs : [...currentTabs, tab];
    });
    setActiveTabId(tab.id);
  }

  function closeTab(tabId: string) {
    setTabs((currentTabs) => {
      const nextTabs = currentTabs.filter((tab) => tab.id !== tabId || tab.pinned);
      if (activeTabId === tabId) {
        setActiveTabId(nextTabs[nextTabs.length - 1]?.id ?? defaultTab.id);
      }
      return nextTabs;
    });
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? defaultTab;

  return (
    <ConsoleShell
      tabs={tabs}
      activeTabId={activeTabId}
      activeSection={activeTab.section}
      onOpenTab={openTab}
      onSelectTab={setActiveTabId}
      onCloseTab={closeTab}
    >
      {activeTab.id === 'overview' ? <OverviewContent /> : <PlaceholderContent tab={activeTab} />}
    </ConsoleShell>
  );
}
