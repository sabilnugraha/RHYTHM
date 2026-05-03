'use client';

import { useState } from 'react';

import type { ConsoleTab } from '../ConsoleOverviewPage';

const menu = [
  { id: 'overview', label: 'Overview', icon: '⌂', section: 'Overview' },
  {
    id: 'workspace-lobby',
    label: 'Workspace Lobby',
    icon: '▦',
    section: 'Workspace Lobby',
    children: [
      { id: 'workspaces', label: 'All Workspaces' },
      { id: 'workspace-abc', label: 'ABC Group', badge: '!' },
      { id: 'workspace-xyz', label: 'XYZ Logistics', badge: '2' },
      { id: 'workspace-demo', label: 'Demo Client' },
    ],
  },
  {
    id: 'agent-studio',
    label: 'Agent Studio',
    icon: '✦',
    section: 'Agent Studio',
    children: [
      { id: 'agents', label: 'All Agents' },
      { id: 'agent-sla', label: 'SLA Watcher' },
      { id: 'agent-package', label: 'Package Builder' },
    ],
  },
  { id: 'sla', label: 'SLA & Performance', icon: '↗', section: 'SLA & Performance' },
  { id: 'platform-users', label: 'Platform Users', icon: '◎', section: 'Platform Users' },
  {
    id: 'package-studio',
    label: 'Package Studio',
    icon: '◈',
    section: 'Package Studio',
    children: [
      { id: 'packages', label: 'All Packages' },
      { id: 'package-hris', label: 'HRIS Basic' },
      { id: 'package-mobile', label: 'Mobile Attendance' },
    ],
  },
  { id: 'audit-logs', label: 'Audit Logs', icon: '☰', section: 'Audit Logs' },
  { id: 'settings', label: 'Settings', icon: '⚙', section: 'Settings' },
];

type ConsoleSidebarProps = {
  activeSection: string;
  onOpenTab: (tab: ConsoleTab) => void;
};

export function ConsoleSidebar({ activeSection, onOpenTab }: ConsoleSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Workspace Lobby': true,
    'Agent Studio': true,
  });

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  return (
    <aside className={`hidden shrink-0 bg-[#141414] p-3 text-[#F8F4EC] transition-all duration-200 lg:block ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl px-2 py-2 text-left"
          onClick={() => onOpenTab({ id: 'overview', label: 'Overview', section: 'Overview', pinned: true })}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#18A999] text-lg font-black text-white">R</span>
          {isExpanded ? (
            <span>
              <span className="block text-sm font-black tracking-[-0.02em]">RHYTHM</span>
              <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-white/50">Console</span>
            </span>
          ) : null}
        </button>
        <button
          className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs font-black text-white/70 hover:bg-white/10"
          onClick={() => setIsExpanded((value) => !value)}
          aria-label="Toggle sidebar"
        >
          {isExpanded ? '‹' : '›'}
        </button>
      </div>

      <nav className="space-y-1.5">
        {menu.map((item) => {
          const isActive = activeSection === item.section;
          const isOpen = openSections[item.section];

          return (
            <div key={item.id}>
              <div className={`group flex items-center rounded-xl text-[11px] font-bold uppercase tracking-wide transition ${isActive ? 'bg-[#F8F4EC] text-[#141414]' : 'text-white/62 hover:bg-white/8 hover:text-white'}`}>
                <button
                  className={`flex min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left ${!isExpanded ? 'justify-center' : ''}`}
                  onClick={() => onOpenTab({ id: item.id, label: item.label, section: item.section, pinned: item.id === 'overview' })}
                  title={item.label}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-current/20 text-sm">{item.icon}</span>
                  {isExpanded ? <span className="truncate">{item.label}</span> : null}
                </button>
                {item.children && isExpanded ? (
                  <button className="px-3 py-2 text-xs" onClick={() => toggleSection(item.section)}>
                    {isOpen ? '−' : '+'}
                  </button>
                ) : null}
              </div>

              {item.children && isOpen && isExpanded ? (
                <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-3">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-wide text-white/55 hover:bg-white/8 hover:text-white"
                      onClick={() => onOpenTab({ id: child.id, label: child.label, section: item.section, badge: child.badge })}
                    >
                      <span className="truncate">{child.label}</span>
                      {child.badge ? <span className="ml-2 rounded bg-[#FFD6A5] px-1.5 py-0.5 text-[9px] font-black text-black">{child.badge}</span> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
