'use client';

import { useState } from 'react';

import type { ConsoleTab } from '../ConsoleOverviewPage';

const menu = [
  { id: 'overview', label: 'Overview', section: 'Overview' },
  {
    id: 'workspace-lobby',
    label: 'Workspace Lobby',
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
    section: 'Agent Studio',
    children: [
      { id: 'agents', label: 'All Agents' },
      { id: 'agent-sla', label: 'SLA Watcher' },
      { id: 'agent-package', label: 'Package Builder' },
    ],
  },
  { id: 'sla', label: 'SLA & Performance', section: 'SLA & Performance' },
  { id: 'platform-users', label: 'Platform Users', section: 'Platform Users' },
  {
    id: 'package-studio',
    label: 'Package Studio',
    section: 'Package Studio',
    children: [
      { id: 'packages', label: 'All Packages' },
      { id: 'package-hris', label: 'HRIS Basic' },
      { id: 'package-mobile', label: 'Mobile Attendance' },
    ],
  },
  { id: 'audit-logs', label: 'Audit Logs', section: 'Audit Logs' },
  { id: 'settings', label: 'Settings', section: 'Settings' },
];

type ConsoleSidebarProps = {
  activeSection: string;
  onOpenTab: (tab: ConsoleTab) => void;
};

export function ConsoleSidebar({ activeSection, onOpenTab }: ConsoleSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Workspace Lobby': true,
    'Agent Studio': true,
  });

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r-2 border-black bg-[#FFFDF8] p-3 lg:block">
      <button
        className="mb-3 w-full border-2 border-black bg-[#18A999] px-3 py-3 text-left text-white shadow-[3px_3px_0px_#000]"
        onClick={() => onOpenTab({ id: 'overview', label: 'Overview', section: 'Overview', pinned: true })}
      >
        <div className="text-xl font-black tracking-[-0.04em]">RHYTHM</div>
        <div className="text-[9px] font-black uppercase tracking-[0.2em]">Console</div>
      </button>
      <nav className="space-y-1.5">
        {menu.map((item) => {
          const isActive = activeSection === item.section;
          const isOpen = openSections[item.section];

          return (
            <div key={item.id}>
              <div className={`flex border-2 border-black text-[11px] font-black uppercase tracking-wider ${isActive ? 'bg-[#A7C7FF]' : 'bg-[#F6F1E8]'}`}>
                <button className="flex-1 px-3 py-2 text-left" onClick={() => onOpenTab({ id: item.id, label: item.label, section: item.section, pinned: item.id === 'overview' })}>
                  {item.label}
                </button>
                {item.children ? (
                  <button className="border-l-2 border-black px-2" onClick={() => toggleSection(item.section)}>
                    {isOpen ? '^' : 'v'}
                  </button>
                ) : null}
              </div>
              {item.children && isOpen ? (
                <div className="ml-3 space-y-1 border-l-2 border-black py-1 pl-3">
                  {item.children.map((child) => (
                    <button key={child.id} className="flex w-full items-center justify-between py-1 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-700 hover:text-black" onClick={() => onOpenTab({ id: child.id, label: child.label, section: item.section, badge: child.badge })}>
                      <span>{child.label}</span>
                      {child.badge ? <span className="border-2 border-black bg-[#FFD6A5] px-1 text-[9px] font-black">{child.badge}</span> : null}
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
