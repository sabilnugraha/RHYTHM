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
  isDarkMode: boolean;
  onOpenTab: (tab: ConsoleTab) => void;
};

export function ConsoleSidebar({ activeSection, isDarkMode, onOpenTab }: ConsoleSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Workspace Lobby': true,
    'Agent Studio': true,
    'Package Studio': false,
  });

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  const sidebarTheme = isDarkMode ? 'bg-[#10131B] text-[#F7F2E8]' : 'bg-[#FFFDF8] text-[#111216]';
  const subtleText = isDarkMode ? 'text-[#AEB4C0]' : 'text-neutral-500';
  const hoverTheme = isDarkMode ? 'hover:bg-white/7 hover:text-[#F7F2E8]' : 'hover:bg-black/5 hover:text-[#111216]';
  const activeTheme = isDarkMode ? 'bg-[#1E2633] text-[#F7F2E8]' : 'bg-[#F0E8D8] text-[#111216]';

  return (
    <aside className={`hidden shrink-0 pr-2 transition-all duration-200 lg:block ${isExpanded ? 'w-56' : 'w-16'}`}>
      <div className={`h-full rounded-r-xl border-y border-r border-black/25 p-2 ${sidebarTheme}`}>
        <div className="mb-2 flex items-center justify-between gap-1.5">
          <button
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1.5 py-1.5 text-left transition hover:bg-black/5"
            onClick={() => onOpenTab({ id: 'overview', label: 'Overview', section: 'Overview', pinned: true })}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#111216] text-xs font-black text-[#FFE600]">R</span>
            {isExpanded ? (
              <span>
                <span className="block text-[11px] font-black tracking-[-0.02em]">RHYTHM</span>
                <span className={`block text-[7px] font-black uppercase tracking-[0.16em] ${subtleText}`}>Console</span>
              </span>
            ) : null}
          </button>
          <button
            className={`rounded-md px-1.5 py-1 text-[10px] font-black transition ${subtleText} ${hoverTheme}`}
            onClick={() => setIsExpanded((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {isExpanded ? '‹' : '›'}
          </button>
        </div>

        {isExpanded ? (
          <div className={`mb-2 rounded-lg border border-black/10 px-2 py-1.5 ${isDarkMode ? 'bg-white/5' : 'bg-black/[0.03]'}`}>
            <p className={`text-[7px] font-black uppercase tracking-[0.14em] ${subtleText}`}>Control Room</p>
            <p className="mt-0.5 text-[10px] font-semibold leading-3.5">Operate, build, and govern.</p>
          </div>
        ) : null}

        <nav className="space-y-0.5">
          {menu.map((item) => {
            const isActive = activeSection === item.section;
            const isOpen = openSections[item.section];

            return (
              <div key={item.id}>
                <div className={`group flex items-center rounded-lg text-[9px] font-black uppercase tracking-wide transition ${isActive ? activeTheme : `${subtleText} ${hoverTheme}`}`}>
                  <button
                    className={`flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-left ${!isExpanded ? 'justify-center' : ''}`}
                    onClick={() => onOpenTab({ id: item.id, label: item.label, section: item.section, pinned: item.id === 'overview' })}
                    title={item.label}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] ${isActive ? 'bg-[#FFE600] text-black' : isDarkMode ? 'bg-white/8 text-[#AEB4C0]' : 'bg-black/5 text-neutral-500'}`}>{item.icon}</span>
                    {isExpanded ? <span className="truncate">{item.label}</span> : null}
                  </button>
                  {item.children && isExpanded ? (
                    <button className="px-2 py-1.5 text-[9px]" onClick={() => toggleSection(item.section)}>
                      {isOpen ? '−' : '+'}
                    </button>
                  ) : null}
                </div>

                {item.children && isOpen && isExpanded ? (
                  <div className={`ml-7 mt-0.5 space-y-0.5 ${isDarkMode ? 'text-[#AEB4C0]' : 'text-neutral-500'}`}>
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[9px] font-medium normal-case tracking-normal transition ${hoverTheme}`}
                        onClick={() => onOpenTab({ id: child.id, label: child.label, section: item.section, badge: child.badge })}
                      >
                        <span className="truncate">{child.label}</span>
                        {child.badge ? <span className="ml-1 rounded bg-[#FFE600] px-1 text-[7px] font-black text-black">{child.badge}</span> : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
