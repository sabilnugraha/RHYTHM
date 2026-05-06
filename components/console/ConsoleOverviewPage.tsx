'use client';

import { useState } from 'react';

import { ConsoleShell } from './layout/ConsoleShell';
import { OverviewContent } from './overview/OverviewContent';
import { PackageStudioCompactContent } from './pages/PackageStudioCompactContent';
import { PlaceholderContent } from './pages/PlaceholderContent';
import { TeamOperationsContent } from './pages/TeamOperationsContent';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  function renderTabContent(tab: ConsoleTab) {
    if (tab.id === 'overview') {
      return <OverviewContent />;
    }

    if (tab.section === 'Package Studio') {
      return <PackageStudioCompactContent tab={tab} />;
    }

    if (tab.section === 'Team Operations') {
      return <TeamOperationsContent tab={tab} />;
    }

    return <PlaceholderContent tab={tab} />;
  }

  return (
    <ConsoleShell
      tabs={tabs}
      activeTabId={activeTabId}
      activeSection={activeTab.section}
      isDarkMode={isDarkMode}
      onToggleDarkMode={() => setIsDarkMode((value) => !value)}
      onOpenTab={openTab}
      onSelectTab={setActiveTabId}
      onCloseTab={closeTab}
    >
      {renderTabContent(activeTab)}
    </ConsoleShell>
  );
}
