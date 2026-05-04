'use client';

import { useState } from 'react';

import type { ConsoleTab } from '../ConsoleOverviewPage';

const menu = [
  { id: 'overview', label: 'Overview', icon: '⌂', section: 'Overview', color: 'bg-[#FFE600]' },
  {
    id: 'operations',
    label: 'Operations',
    icon: '▦',
    section: 'Operations',
    color: 'bg-[#00D4FF]',
    children: [
      { id: 'employees', label: 'Employees' },
      { id: 'attendance', label: 'Attendance' },
      { id: 'leave', label: 'Leave', badge: '!' },
      { id: 'payroll', label: 'Payroll', badge: '2' },
    ],
  },
  {
    id: 'studio',
    label: 'Studio',
    icon: '✦',
    section: 'Studio',
    color: 'bg-[#FF5A1F]',
    children: [
      { id: 'data-model', label: 'Data Model' },
      { id: 'forms', label: 'Forms' },
      { id: 'workflows', label: 'Workflows' },
      { id: 'rules-logic', label: 'Rules & Logic' },
      { id: 'agents', label: 'Agents' },
    ],
  },
  { id: 'intelligence', label: 'Intelligence', icon: '●', section: 'Intelligence', color: 'bg-[#A3FF12]' },
  { id: 'governance', label: 'Governance', icon: '◎', section: 'Governance', color: 'bg-[#A66BFF]' },
  { id: 'settings', label: 'Settings', icon: '⚙', section: 'Settings', color: 'bg-[#FF4FB8]' },
];

type ConsoleSidebarProps = {
  activeSection: string;
  isDarkMode: boolean;
  onOpenTab: (tab: ConsoleTab) => void;
};

export function ConsoleSidebar({ activeSection, isDarkMode, onOpenTab }: ConsoleSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Operations: true,
    Studio: true,
  });

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  const sidebarTheme = isDarkMode ? 'bg-[#12131A] text-[#F8F5EE]' : 'bg-[#FFFDF8] text-[#121216]';
  const inactiveTheme = isDarkMode ? 'bg-[#1D1E27] text-[#EDE8DD]' : 'bg-white text-[#121216]';

  return (
    <aside className={`hidden shrink-0 pr-3 transition-all duration-200 lg:block ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className={`h-full rounded-r-2xl border-y-2 border-r-2 border-black p-2.5 shadow-[4px_4px_0px_#000] ${sidebarTheme}`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border-2 border-black bg-[#FFE600] px-2 py-1.5 text-left text-black shadow-[3px_3px_0px_#000]"
            onClick={() => onOpenTab({ id: 'overview', label: 'Overview', section: 'Overview', pinned: true })}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white text-sm font-black text-black">R</span>
            {isExpanded ? (
              <span>
                <span className="block text-xs font-black tracking-[-0.02em]">RHYTHM</span>
                <span className="block text-[8px] font-black uppercase tracking-[0.18em]">Console</span>
              </span>
            ) : null}
          </button>
          <button
            className="rounded-lg border-2 border-black bg-[#00D4FF] px-2 py-1 text-[10px] font-black text-black shadow-[2px_2px_0px_#000]"
            onClick={() => setIsExpanded((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {isExpanded ? '‹' : '›'}
          </button>
        </div>

        {isExpanded ? (
          <div className="mb-3 rounded-xl border-2 border-black bg-[#FF5A1F] p-2.5 text-black shadow-[3px_3px_0px_#000]">
            <p className="text-[8px] font-black uppercase tracking-[0.16em]">Control Room</p>
            <p className="mt-1 text-xs font-bold leading-4">Operate, build, and govern from one console.</p>
          </div>
        ) : null}

        <nav className="space-y-1.5">
          {menu.map((item) => {
            const isActive = activeSection === item.section;
            const isOpen = openSections[item.section];

            return (
              <div key={item.id}>
                <div className={`group flex items-center rounded-xl border-2 border-black text-[10px] font-black uppercase tracking-wide shadow-[3px_3px_0px_#000] transition ${isActive ? `${item.color} text-black` : inactiveTheme}`}>
                  <button
                    className={`flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left ${!isExpanded ? 'justify-center' : ''}`}
                    onClick={() => onOpenTab({ id: item.id, label: item.label, section: item.section, pinned: item.id === 'overview' })}
                    title={item.label}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-black bg-white text-xs text-black">{item.icon}</span>
                    {isExpanded ? <span className="truncate">{item.label}</span> : null}
                  </button>
                  {item.children && isExpanded ? (
                    <button className="px-2.5 py-2 text-[10px]" onClick={() => toggleSection(item.section)}>
                      {isOpen ? '−' : '+'}
                    </button>
                  ) : null}
                </div>

                {item.children && isOpen && isExpanded ? (
                  <div className="ml-4 mt-1.5 space-y-1 border-l-2 border-black pl-2">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`flex w-full items-center justify-between rounded-lg border-2 border-black px-2.5 py-1.5 text-left text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5 ${isDarkMode ? 'bg-[#1D1E27] text-[#F8F5EE]' : 'bg-[#FFFDF8] text-[#121216]'}`}
                        onClick={() => onOpenTab({ id: child.id, label: child.label, section: item.section, badge: child.badge })}
                      >
                        <span className="truncate">{child.label}</span>
                        {child.badge ? <span className="ml-2 rounded-md border-2 border-black bg-[#FFE600] px-1 py-0.5 text-[8px] font-black text-black">{child.badge}</span> : null}
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
