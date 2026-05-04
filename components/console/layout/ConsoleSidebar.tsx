'use client';

import { FormEvent, useState } from 'react';

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
  onToggleDarkMode: () => void;
  onOpenTab: (tab: ConsoleTab) => void;
};

export function ConsoleSidebar({ activeSection, isDarkMode, onToggleDarkMode, onOpenTab }: ConsoleSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Workspace Lobby': true,
    'Agent Studio': true,
    'Package Studio': false,
  });

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchValue.trim();

    if (!query) {
      return;
    }

    onOpenTab({
      id: `search-${query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || Date.now()}`,
      label: `Search: ${query}`,
      section: 'Search',
    });
  }

  const sidebarTheme = isDarkMode ? 'bg-[#10131B] text-[#F7F2E8]' : 'bg-[#FFFDF8] text-[#111216]';
  const subtleText = isDarkMode ? 'text-[#AEB4C0]' : 'text-neutral-500';
  const hoverTheme = isDarkMode ? 'hover:bg-white/7 hover:text-[#F7F2E8]' : 'hover:bg-black/5 hover:text-[#111216]';
  const activeTheme = isDarkMode ? 'bg-[#1E2633] text-[#F7F2E8]' : 'bg-[#F0E8D8] text-[#111216]';
  const controlTheme = isDarkMode ? 'bg-white/5 text-[#F7F2E8]' : 'bg-black/[0.03] text-[#111216]';

  return (
    <aside className={`sticky top-0 hidden h-screen shrink-0 pr-2 transition-all duration-200 lg:block ${isExpanded ? 'w-56' : 'w-16'}`}>
      <div className={`flex h-full max-h-screen flex-col rounded-r-xl border-y border-r border-black/25 p-2 ${sidebarTheme}`}>
        <div className="shrink-0">
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

          <form onSubmit={submitSearch} className="mb-2">
            {isExpanded ? (
              <label className={`flex h-7 items-center gap-1.5 rounded-lg border border-black/10 px-2 ${controlTheme}`}>
                <span className={`text-[10px] ${subtleText}`}>⌕</span>
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search..."
                  className="min-w-0 flex-1 bg-transparent text-[9px] font-medium outline-none placeholder:text-current placeholder:opacity-45"
                />
              </label>
            ) : (
              <button
                type="button"
                className={`grid h-7 w-full place-items-center rounded-lg border border-black/10 ${controlTheme}`}
                aria-label="Search"
                title="Search"
              >
                ⌕
              </button>
            )}
          </form>

          {isExpanded ? (
            <div className={`mb-2 rounded-lg border border-black/10 px-2 py-1.5 ${controlTheme}`}>
              <p className={`text-[7px] font-black uppercase tracking-[0.14em] ${subtleText}`}>Control Room</p>
              <p className="mt-0.5 text-[10px] font-semibold leading-3.5">Operate, build, and govern.</p>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <nav className="h-full space-y-0.5 overflow-y-auto pr-0.5">
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
                          className={`flex w-full items-center justify-between rounded-md px-2 py-0.5 text-left text-[9px] font-medium normal-case leading-3 tracking-normal transition ${hoverTheme}`}
                          style={{ fontSize: '9px', lineHeight: '12px' }}
                          onClick={() => onOpenTab({ id: child.id, label: child.label, section: item.section, badge: child.badge })}
                        >
                          <span className="truncate">{child.label}</span>
                          {child.badge ? <span className="ml-1 rounded bg-[#FFE600] px-1 text-[7px] font-black leading-3 text-black">{child.badge}</span> : null}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>

        <div className={`mt-2 shrink-0 border-t pt-2 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`rounded-lg px-1.5 py-1.5 ${controlTheme} ${isExpanded ? 'flex items-center justify-between gap-2' : 'flex flex-col items-center gap-2'}`}>
            <button
              type="button"
              aria-label="Toggle dark mode"
              aria-pressed={isDarkMode}
              onClick={onToggleDarkMode}
              className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${
                isDarkMode ? 'border-white/15 bg-[#263244]' : 'border-black/15 bg-[#E9E1D2]'
              }`}
            >
              <span
                className={`absolute top-0.5 grid h-4 w-4 place-items-center rounded-full text-[8px] transition-all ${
                  isDarkMode ? 'left-4 bg-[#00C2FF] text-black' : 'left-0.5 bg-[#FFE600] text-black'
                }`}
              >
                {isDarkMode ? '☾' : '☀'}
              </span>
            </button>

            <div className={`flex min-w-0 items-center ${isExpanded ? 'gap-1.5' : 'flex-col gap-1'}`}>
              <button
                type="button"
                aria-label="User profile"
                className={`grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full text-[8px] font-black ${
                  isDarkMode ? 'bg-[#1E2633] text-[#F7F2E8]' : 'bg-[#F0E8D8] text-[#111216]'
                }`}
              >
                SB
              </button>

              {isExpanded ? <span className={`min-w-0 truncate text-[9px] font-semibold ${subtleText}`}>Sabil</span> : null}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
