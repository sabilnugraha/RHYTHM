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
    color: 'bg-[#FF4D1D]',
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

  const sidebarTheme = isDarkMode ? 'bg-[#15151A] text-[#FFF7E8]' : 'bg-[#FFFDF8] text-[#101014]';
  const inactiveTheme = isDarkMode ? 'bg-[#25252C] text-[#FFF7E8]' : 'bg-white text-[#101014]';

  return (
    <aside className={`hidden shrink-0 p-3 transition-all duration-200 lg:block ${isExpanded ? 'w-72' : 'w-24'}`}>
      <div className={`h-full rounded-[30px] border-[3px] border-black p-3 shadow-[8px_8px_0px_#000] ${sidebarTheme}`}>
        <div className="mb-4 flex items-center justify-between gap-2">
          <button
            className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border-[3px] border-black bg-[#FFE600] px-2 py-2 text-left text-black shadow-[4px_4px_0px_#000]"
            onClick={() => onOpenTab({ id: 'overview', label: 'Overview', section: 'Overview', pinned: true })}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-black bg-white text-lg font-black text-black">R</span>
            {isExpanded ? (
              <span>
                <span className="block text-sm font-black tracking-[-0.02em]">RHYTHM</span>
                <span className="block text-[9px] font-black uppercase tracking-[0.22em]">Console</span>
              </span>
            ) : null}
          </button>
          <button
            className="rounded-xl border-[3px] border-black bg-[#00D4FF] px-2 py-1 text-xs font-black text-black shadow-[3px_3px_0px_#000]"
            onClick={() => setIsExpanded((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {isExpanded ? '‹' : '›'}
          </button>
        </div>

        {isExpanded ? (
          <div className="mb-4 rounded-[24px] border-[3px] border-black bg-[#FF4D1D] p-3 text-black shadow-[4px_4px_0px_#000]">
            <p className="text-[9px] font-black uppercase tracking-[0.18em]">Control Room</p>
            <p className="mt-1 text-sm font-black leading-5">Operate, build, and govern from one console.</p>
          </div>
        ) : null}

        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = activeSection === item.section;
            const isOpen = openSections[item.section];

            return (
              <div key={item.id}>
                <div className={`group flex items-center rounded-2xl border-[3px] border-black text-[11px] font-black uppercase tracking-wide shadow-[4px_4px_0px_#000] transition ${isActive ? `${item.color} text-black` : inactiveTheme}`}>
                  <button
                    className={`flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left ${!isExpanded ? 'justify-center' : ''}`}
                    onClick={() => onOpenTab({ id: item.id, label: item.label, section: item.section, pinned: item.id === 'overview' })}
                    title={item.label}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-[2px] border-black bg-white text-sm text-black">{item.icon}</span>
                    {isExpanded ? <span className="truncate">{item.label}</span> : null}
                  </button>
                  {item.children && isExpanded ? (
                    <button className="px-3 py-2 text-xs" onClick={() => toggleSection(item.section)}>
                      {isOpen ? '−' : '+'}
                    </button>
                  ) : null}
                </div>

                {item.children && isOpen && isExpanded ? (
                  <div className="ml-6 mt-2 space-y-1.5 border-l-[3px] border-black pl-3">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`flex w-full items-center justify-between rounded-xl border-[2px] border-black px-3 py-2 text-left text-[11px] font-black uppercase tracking-wide shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5 ${isDarkMode ? 'bg-[#25252C] text-[#FFF7E8]' : 'bg-[#FFFDF8] text-[#101014]'}`}
                        onClick={() => onOpenTab({ id: child.id, label: child.label, section: item.section, badge: child.badge })}
                      >
                        <span className="truncate">{child.label}</span>
                        {child.badge ? <span className="ml-2 rounded-lg border-2 border-black bg-[#FFE600] px-1.5 py-0.5 text-[9px] font-black text-black">{child.badge}</span> : null}
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
