'use client';

import { useState } from 'react';
import type { ConsoleTab } from '../ConsoleOverviewPage';

type Props = { tab: ConsoleTab };

type SectionId = 'overview' | 'my-dashboard' | 'people' | 'teams' | 'work-orchestration' | 'activity' | 'work-health' | 'bottleneck' | 'intervention' | 'audit';

type GroupId = 'Core' | 'Operations' | 'Intelligence';
type Member = {
  name: string;
  email: string;
  phone: string;
  photo: string;
  birthDate: string;
  role: string;
  team: string;
  availability: string;
  workload: string;
  active: number;
  blocked: number;
  overdue: number;
  health: string;
  risk: string;
};

const menuGroups: { id: GroupId; items: { id: SectionId; label: string; badge?: string }[] }[] = [
  { id: 'Core', items: [{ id: 'overview', label: 'Overview' }, { id: 'my-dashboard', label: 'My Dashboard', badge: '3' }] },
  { id: 'Operations', items: [{ id: 'people', label: 'People' }, { id: 'teams', label: 'Teams' }, { id: 'work-orchestration', label: 'Work Orchestration', badge: '12' }, { id: 'activity', label: 'Activity Timeline' }] },
  { id: 'Intelligence', items: [{ id: 'work-health', label: 'Work Health' }, { id: 'bottleneck', label: 'Bottleneck Radar', badge: '5' }, { id: 'intervention', label: 'Intervention' }, { id: 'audit', label: 'Audit Trail' }] },
];

const initialMembers: Member[] = [
  { name: 'Adit', email: 'adit@rhythm.local', phone: '+62 812 0000 1001', photo: '', birthDate: '1995-03-12', role: 'Backend Dev', team: 'Engineering', availability: 'Full-time', workload: '145%', active: 12, blocked: 3, overdue: 4, health: 'At Risk', risk: 'High' },
  { name: 'Joko', email: 'joko@rhythm.local', phone: '+62 812 0000 1002', photo: '', birthDate: '1992-08-24', role: 'Business Analyst', team: 'Implementation', availability: 'Full-time', workload: '88%', active: 7, blocked: 1, overdue: 1, health: 'Stable', risk: 'Low' },
  { name: 'Bella', email: 'bella@rhythm.local', phone: '+62 812 0000 1003', photo: '', birthDate: '1997-01-18', role: 'UI/UX', team: 'Product', availability: 'Full-time', workload: '73%', active: 5, blocked: 0, overdue: 0, health: 'Healthy', risk: 'Low' },
  { name: 'Nina', email: 'nina@rhythm.local', phone: '+62 812 0000 1004', photo: '', birthDate: '1994-11-06', role: 'Support', team: 'Customer Success', availability: 'On-call', workload: '112%', active: 9, blocked: 2, overdue: 2, health: 'Watch', risk: 'Medium' },
];

const tasks = [
  { title: 'Build Inventory Package', client: 'Sumber Waras', owner: 'Adit', stage: 'On Development', next: 'Submit to Testing', artifact: 'Package Studio' },
  { title: 'Payroll UAT Fix', client: 'ABC Group', owner: 'Adit', stage: 'Bug Fixing', next: 'Resolve Bug', artifact: 'Package Studio' },
  { title: 'Configure SSO', client: 'XYZ Logistics', owner: 'Joko', stage: 'Delivered', next: 'Start UAT', artifact: 'Control' },
  { title: 'Support Case Review', client: 'Demo Client', owner: 'Nina', stage: 'Reopened', next: 'Open Assist Mode', artifact: 'Assist Workspace' },
];

const events = ['Task assigned', 'Package draft created', 'Development started', 'Test started', 'Bug reported', 'Bug fixed', 'Delivered', 'UAT started', 'Go live', 'Assist session opened'];

const radar = [
  ['By Member', 'Adit overloaded 145%', 'Rebalance backend tasks'],
  ['By Stage', 'Inventory Sumber Waras stuck in testing 4 days', 'Escalate reviewer'],
  ['By Client', 'ABC Group UAT fix reopened', 'Open assist workspace'],
  ['By SLA', '6 overdue tasks', 'Prioritize next actions'],
];

function chipColor(value: string) {
  if (value.includes('High') || value.includes('Risk') || value.includes('Reopened') || value.includes('Bug')) return 'bg-[#FF4E1F] text-white';
  if (value.includes('Watch') || value.includes('Medium') || value.includes('Testing')) return 'bg-[#FFE600] text-black';
  if (value.includes('Healthy') || value.includes('Low') || value.includes('Stable')) return 'bg-[#9BFF00] text-black';
  return 'bg-[#00B9F2] text-black';
}

function getSectionLabel(id: SectionId) {
  return menuGroups.flatMap((group) => group.items).find((item) => item.id === id)?.label ?? 'Overview';
}

function normalizeSectionId(tabId: string): SectionId {
  const sectionId = tabId.replace('team-ops-', '') as SectionId;
  return menuGroups.some((group) => group.items.some((item) => item.id === sectionId)) ? sectionId : 'overview';
}

function Panel({ title, children, badge, action }: { title: string; children: React.ReactNode; badge?: string; action?: React.ReactNode }) {
  return (
    <section className="rounded-lg border-2 border-black bg-[#F6F1E8] p-1.5 shadow-[1.5px_1.5px_0px_#000]">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <p className="text-[9px] font-black uppercase tracking-normal">{title}</p>
        <div className="flex items-center gap-1">
          {badge ? <span className="rounded border border-black bg-[#FFE600] px-1 text-[8px] font-black leading-3">{badge}</span> : null}
          {action}
        </div>
      </div>
      {children}
    </section>
  );
}

function SmallButton({ children, dark, onClick, type = 'button', variant = 'default', className = '' }: { children: React.ReactNode; dark?: boolean; onClick?: () => void; type?: 'button' | 'submit'; variant?: 'default' | 'soft' | 'ghost'; className?: string }) {
  const tone = variant === 'ghost'
    ? 'bg-[#FFFDF8] text-[#111216] shadow-[2px_2px_0px_#000]'
    : dark
      ? 'bg-[#111216] text-white shadow-[2px_2px_0px_#000]'
      : 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]';

  return <button type={type} onClick={onClick} className={`h-6 rounded-md border-2 border-black px-2 text-[8px] font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 ${tone} ${className}`}>{children}</button>;
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg className="h-3 w-3" viewBox="0 0 12 12" aria-hidden="true">
      <path d={collapsed ? 'M4.5 2.5 8 6l-3.5 3.5' : 'M7.5 2.5 4 6l3.5 3.5'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function TeamMenuIcon({ id }: { id: SectionId }) {
  const common = 'fill-none stroke-current';
  const icons: Record<SectionId, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="6" height="6" rx="1" className={common} strokeWidth="1.7" /><path d="M3 5.2h6M5.2 3v6" className={common} strokeWidth="1.7" strokeLinecap="round" /></>,
    'my-dashboard': <><path d="M2.5 8.5 5 6l1.5 1.5 3-4" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.5 9.5h7" className={common} strokeWidth="1.7" strokeLinecap="round" /></>,
    people: <><circle cx="4.4" cy="4.2" r="1.5" className={common} strokeWidth="1.7" /><path d="M2.2 9c.4-1.5 1.2-2.2 2.2-2.2S6.2 7.5 6.6 9M7.2 4.1c.9.1 1.5.7 1.5 1.5" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>,
    teams: <><circle cx="4" cy="4.4" r="1.3" className={common} strokeWidth="1.7" /><circle cx="8" cy="4.4" r="1.3" className={common} strokeWidth="1.7" /><path d="M2.2 9c.4-1.3 1-2 1.8-2s1.4.7 1.8 2M6.2 9C6.6 7.7 7.2 7 8 7s1.4.7 1.8 2" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>,
    'work-orchestration': <><rect x="2.5" y="2.5" width="7" height="7" rx="1.2" className={common} strokeWidth="1.7" /><path d="M4 5h4M4 7h2.8" className={common} strokeWidth="1.7" strokeLinecap="round" /></>,
    activity: <path d="M2.5 6h2l1-2.5 1.4 5 1-2.5h1.6" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    'work-health': <path d="M6 9.5S2.8 7.6 2.8 4.8A1.9 1.9 0 0 1 6 3.4a1.9 1.9 0 0 1 3.2 1.4C9.2 7.6 6 9.5 6 9.5Z" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    bottleneck: <path d="M3 2.5h6L6.8 5.4v3.1L5.2 9.5V5.4L3 2.5Z" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    intervention: <><path d="M6 2.5v3M6 9.5v-3M2.5 6h3M9.5 6h-3" className={common} strokeWidth="1.7" strokeLinecap="round" /><circle cx="6" cy="6" r="1" className={common} strokeWidth="1.7" /></>,
    audit: <><path d="M3.5 2.5h4L9 4v5.5H3V2.5h.5Z" className={common} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 6h3M4.5 8h2" className={common} strokeWidth="1.7" strokeLinecap="round" /></>,
  };

  return <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" aria-hidden="true">{icons[id]}</svg>;
}

function TeamSidebar({ active, setActive }: { active: SectionId; setActive: (id: SectionId) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState<Record<GroupId, boolean>>({ Core: true, Operations: true, Intelligence: true });

  return (
    <aside className={`shrink-0 border-r-2 border-black bg-[#F6F1E8] ${collapsed ? 'w-10' : 'w-44'}`}>
      <div className="flex items-center justify-between border-b border-black/20 p-1.5">
        {!collapsed ? <p className="text-[9px] font-black uppercase tracking-[0.12em] text-neutral-600">Team Ops</p> : null}
        <button className="grid h-5 w-5 place-items-center rounded border border-black bg-[#FFFDF8] text-[#111216]" onClick={() => setCollapsed((v) => !v)} aria-label={collapsed ? 'Expand team operations sidebar' : 'Collapse team operations sidebar'}>
          <CollapseIcon collapsed={collapsed} />
        </button>
      </div>
      <div className="space-y-1 p-1.5">
        {menuGroups.map((group) => <div key={group.id}>{!collapsed ? <button className="mb-0.5 flex w-full items-center justify-between rounded px-1 py-0.5 text-[9px] font-black uppercase text-neutral-500" onClick={() => setOpen((current) => ({ ...current, [group.id]: !current[group.id] }))}>{group.id}<span className="grid h-3.5 w-3.5 place-items-center text-[9px]">{open[group.id] ? '-' : '+'}</span></button> : null}{(collapsed || open[group.id]) ? group.items.map((item) => <button key={item.id} className={`mb-0.5 flex h-6 w-full items-center gap-1.5 rounded-md px-1.5 text-left text-[9px] font-medium ${active === item.id ? 'bg-[#111216] text-white' : 'text-neutral-600 hover:bg-black/5'}`} onClick={() => setActive(item.id)} title={item.label}><TeamMenuIcon id={item.id} /><span className="min-w-0 flex-1 truncate">{collapsed ? item.label.slice(0, 1) : item.label}</span>{!collapsed && item.badge ? <span className="rounded bg-[#FFE600] px-1 text-[7px] font-black text-black">{item.badge}</span> : null}</button>) : null}</div>)}
      </div>
    </aside>
  );
}

function Stats() {
  const items = [['Team Health', '82%'], ['Active Tasks', '42'], ['Blocked', '6'], ['Overdue', '8'], ['High Risk', '3'], ['Auto Pilot', '11']];
  return <div className="grid gap-1.5 md:grid-cols-3 xl:grid-cols-6">{items.map(([label, value], index) => <div key={label} className={`rounded-lg border-2 border-black p-1.5 shadow-[1.5px_1.5px_0px_#000] ${index === 0 ? 'bg-[#9BFF00]' : index === 4 ? 'bg-[#FF4E1F] text-white' : 'bg-[#FFFDF8]'}`}><p className="text-[8px] font-black uppercase">{label}</p><p className="text-[12px] font-black leading-4">{value}</p></div>)}</div>;
}

function MemberTable({ members, compact = false }: { members: Member[]; compact?: boolean }) {
  const columns = compact
    ? 'md:grid-cols-[90px_110px_85px_70px_60px_50px_50px_50px_64px_54px]'
    : 'md:grid-cols-[110px_130px_110px_84px_70px_64px_56px_56px_70px_60px]';

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px] space-y-1">
        <div className={`grid gap-1 rounded-md border border-black bg-[#111216] p-1.5 text-[8px] font-black uppercase text-white ${columns}`}>
          <span>Name</span>
          <span>Role</span>
          <span>Team</span>
          <span>Availability</span>
          <span>Workload</span>
          <span>Active</span>
          <span>Blocked</span>
          <span>Overdue</span>
          <span>Health</span>
          <span>Risk</span>
        </div>
        {members.map((m) => (
          <div key={`${m.name}-${m.role}`} className={`grid gap-1 rounded-md border border-black bg-[#FFFDF8] p-1.5 text-[8px] font-medium ${columns} md:items-center`}>
            <b className="text-[9px]">{m.name}</b>
            <span>{m.role}</span>
            <span>{m.team}</span>
            <span>{m.availability}</span>
            <span>{m.workload}</span>
            <span>{m.active} act</span>
            <span>{m.blocked} blk</span>
            <span>{m.overdue} due</span>
            <span className={`rounded border border-black px-1 text-center font-black ${chipColor(m.health)}`}>{m.health}</span>
            <span className={`rounded border border-black px-1 text-center font-black ${chipColor(m.risk)}`}>{m.risk}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeoplePanel({ members, onAddMember }: { members: Member[]; onAddMember: (member: Member) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<Member>({
    name: '',
    email: '',
    phone: '',
    photo: '',
    birthDate: '',
    role: 'Unassigned',
    team: 'Unassigned',
    availability: 'Full-time',
    workload: '0%',
    active: 0,
    blocked: 0,
    overdue: 0,
    health: 'Healthy',
    risk: 'Low',
  });

  function updateDraft(key: keyof Member, value: string) {
    setDraft((current) => ({
      ...current,
      [key]: key === 'active' || key === 'blocked' || key === 'overdue' ? Number(value || 0) : value,
    }));
  }

  function submitMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.email.trim() || !draft.phone.trim() || !draft.birthDate.trim()) return;
    onAddMember({ ...draft, name: draft.name.trim(), email: draft.email.trim(), phone: draft.phone.trim(), photo: draft.photo.trim(), birthDate: draft.birthDate.trim() });
    setDraft({ name: '', email: '', phone: '', photo: '', birthDate: '', role: 'Unassigned', team: 'Unassigned', availability: 'Full-time', workload: '0%', active: 0, blocked: 0, overdue: 0, health: 'Healthy', risk: 'Low' });
    setIsOpen(false);
  }

  return (
    <>
      <Panel title="People" action={<SmallButton onClick={() => setIsOpen(true)} className="h-7 px-3 text-[10px]">+ People</SmallButton>}>
        <MemberTable members={members} />
      </Panel>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-3 backdrop-blur-[1px]">
          <form onSubmit={submitMember} className="w-full max-w-xl overflow-hidden rounded-xl border-2 border-black bg-[#F6F1E8] shadow-[8px_8px_0px_#000]">
            <div className="flex items-center justify-between gap-2 border-b-2 border-black bg-[#FFFDF8] px-3 py-2">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-500">Team Operations</p>
                <h2 className="text-[13px] font-black leading-4">Add People</h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg border-2 border-black bg-[#111216] text-[12px] font-black leading-none text-white shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5">x</button>
            </div>
            <div className="grid gap-2 border-b border-black/20 bg-[#F6F1E8] px-3 py-3 md:grid-cols-2">
              <FormField label="Full Name" value={draft.name} onChange={(value) => updateDraft('name', value)} required />
              <FormField label="Email" type="email" value={draft.email} onChange={(value) => updateDraft('email', value)} required />
              <FormField label="Phone Number" type="tel" value={draft.phone} onChange={(value) => updateDraft('phone', value)} required />
              <FormField label="Birth Date" type="date" value={draft.birthDate} onChange={(value) => updateDraft('birthDate', value)} required />
              <FormField label="Profile Photo" type="file" value={draft.photo} onChange={(value) => updateDraft('photo', value)} className="md:col-span-2" accept="image/*" />
            </div>
            <div className="flex justify-end gap-2 bg-[#FFFDF8] px-3 py-2">
              <SmallButton variant="ghost" onClick={() => setIsOpen(false)} className="h-8 px-3 text-[10px]">Cancel</SmallButton>
              <SmallButton type="submit" className="h-8 px-3 text-[10px]">Save People</SmallButton>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

function FormField({ label, value, onChange, type = 'text', required, className = '', accept }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; className?: string; accept?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-0.5 block text-[8px] font-black uppercase text-neutral-600">{label}</span>
      <input
        type={type}
        required={required}
        value={type === 'file' ? undefined : value}
        accept={accept}
        onChange={(event) => onChange(type === 'file' ? event.target.files?.[0]?.name ?? '' : event.target.value)}
        className="h-8 w-full rounded-md border-2 border-black bg-[#FFFDF8] px-2 text-[9px] font-medium shadow-[2px_2px_0px_#000] outline-none file:mr-2 file:h-6 file:rounded-md file:border-2 file:border-black file:bg-[#FFE600] file:px-2 file:text-[8px] file:font-black file:shadow-[1px_1px_0px_#000]"
      />
      {type === 'file' && value ? <span className="mt-0.5 block truncate text-[8px] font-medium text-neutral-600">{value}</span> : null}
    </label>
  );
}

function TaskList() {
  return <div className="grid gap-1">{tasks.map((task) => <div key={task.title} className="grid gap-1 rounded-md border border-black bg-[#FFFDF8] p-1.5 text-[8px] font-medium md:grid-cols-[1fr_92px_58px_90px_100px_90px] md:items-center"><b className="text-[9px]">{task.title}</b><span>{task.client}</span><span>{task.owner}</span><span className={`rounded border border-black px-1 text-center font-black ${chipColor(task.stage)}`}>{task.stage}</span><span>{task.next}</span><span>{task.artifact}</span></div>)}</div>;
}

function TeamOpsTabs({ tabs, active, onSelect, onClose }: { tabs: SectionId[]; active: SectionId; onSelect: (id: SectionId) => void; onClose: (id: SectionId) => void }) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-1 text-[8px] font-medium">
      {tabs.map((id) => {
        const isActive = active === id;
        return (
          <button key={id} type="button" onClick={() => onSelect(id)} className={`flex h-[19px] items-center gap-1 rounded border border-black px-2 ${isActive ? 'bg-[#111216] text-white' : 'bg-[#F6F1E8] text-[#111216]'}`}>
            <span>{getSectionLabel(id)}</span>
            {id !== 'overview' ? (
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onClose(id);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.stopPropagation();
                    onClose(id);
                  }
                }}
                className="grid h-3 w-3 place-items-center rounded-sm bg-[#FF4E1F] text-[7px] font-black leading-none text-white"
                aria-label={`Close ${getSectionLabel(id)} tab`}
              >
                x
              </span>
            ) : null}
          </button>
        );
      })}
      <span className="h-[19px] rounded border border-black bg-[#FF4E1F] px-2 py-0.5 text-white">No drag Kanban</span>
    </div>
  );
}

function MainContent({ active, members, onAddMember }: { active: SectionId; members: Member[]; onAddMember: (member: Member) => void }) {
  if (active === 'my-dashboard') return <div className="grid gap-1.5 xl:grid-cols-2"><Panel title="My Next Actions" badge="3"><TaskList /></Panel><Panel title="My Work Health"><div className="grid gap-1 text-[8px]"><p className="rounded border border-black bg-[#9BFF00] p-1.5 font-black">SLA 94% • ownership stable • contribution improving</p><p className="rounded border border-black bg-[#FFFDF8] p-1.5">Supportive note: focus on blockers first, not raw ranking.</p></div></Panel><Panel title="My Blockers"><p className="text-[8px] font-medium">Waiting reviewer on Payroll UAT Fix. Suggested: ask lead to reassign review.</p></Panel><Panel title="My Achievements"><p className="text-[8px] font-medium">2 packages delivered, 4 reopened cases resolved, 1 assist session completed.</p></Panel></div>;
  if (active === 'work-orchestration') return <div className="grid gap-1.5"><Panel title="Work Orchestration" badge="No drag Kanban"><TaskList /></Panel><Panel title="Lifecycle"><div className="flex flex-wrap gap-1 text-[8px] font-black">{['Assigned / Ready', 'On Development', 'On Testing', 'Bug Fixing', 'Delivered', 'UAT', 'Go Live', 'Reopened', 'Hypercare', 'Auto Pilot'].map((item) => <span key={item} className="rounded border border-black bg-[#FFFDF8] px-1.5 py-1">{item}</span>)}</div></Panel></div>;
  if (active === 'people') return <PeoplePanel members={members} onAddMember={onAddMember} />;
  if (active === 'teams') return <Panel title="Teams"><div className="grid gap-1.5 md:grid-cols-3">{['Engineering', 'Implementation', 'Customer Success'].map((team) => <div key={team} className="rounded border border-black bg-[#FFFDF8] p-1.5 text-[8px]"><b className="text-[9px]">{team}</b><p>Lead assigned • active tasks • workload • health score • bottleneck risk</p></div>)}</div></Panel>;
  if (active === 'activity') return <Panel title="Activity Timeline"><div className="grid gap-1">{events.map((event, index) => <p key={event} className="rounded border border-black bg-[#FFFDF8] p-1.5 text-[8px] font-medium">{index + 1}. {event} — work event, not mouse or idle tracking.</p>)}</div></Panel>;
  if (active === 'work-health') return <Panel title="Work Health"><div className="grid gap-1.5 md:grid-cols-4">{['Delivery', 'Quality', 'Responsiveness', 'Ownership', 'Collaboration', 'SLA', 'Reopen Rate', 'Workload Health'].map((item) => <div key={item} className="rounded border border-black bg-[#FFFDF8] p-1.5 text-[8px]"><b>{item}</b><p>Score with reason.</p></div>)}</div></Panel>;
  if (active === 'bottleneck') return <Panel title="Bottleneck Radar" badge="5"><div className="grid gap-1.5 md:grid-cols-2">{radar.map(([group, alert, action]) => <div key={alert} className="rounded border border-black bg-[#FFFDF8] p-1.5 text-[8px]"><b className="text-[9px]">{group}</b><p>{alert}</p><p className="mt-1 rounded bg-[#FFE600] px-1 py-0.5 font-black">Suggested: {action}</p></div>)}</div></Panel>;
  if (active === 'intervention') return <Panel title="Assist Mode / Intervention"><div className="grid gap-1.5 md:grid-cols-2"><input placeholder="Reason" className="h-6 rounded border border-black bg-[#FFFDF8] px-1.5 text-[8px]" /><input placeholder="Scope" className="h-6 rounded border border-black bg-[#FFFDF8] px-1.5 text-[8px]" /><input placeholder="Duration" className="h-6 rounded border border-black bg-[#FFFDF8] px-1.5 text-[8px]" /><input placeholder="Target workspace" className="h-6 rounded border border-black bg-[#FFFDF8] px-1.5 text-[8px]" /><textarea placeholder="Allowed actions. Everything audited." className="min-h-16 rounded border border-black bg-[#FFFDF8] p-1.5 text-[8px] md:col-span-2" /></div></Panel>;
  if (active === 'audit') return <Panel title="Audit Trail"><p className="text-[8px] font-medium">Assist sessions, scope changes, task transitions, package events, and approval actions are logged.</p></Panel>;
  return <div className="grid gap-1.5"><Stats /><div className="grid gap-1.5 xl:grid-cols-[1fr_0.9fr]"><Panel title="People Snapshot"><MemberTable members={members} compact /></Panel><Panel title="Bottleneck Watch" badge="5"><div className="grid gap-1">{radar.map(([group, alert]) => <p key={alert} className="rounded border border-black bg-[#FFFDF8] p-1.5 text-[8px]"><b>{group}</b> — {alert}</p>)}</div></Panel></div><Panel title="Read-only Board"><TaskList /></Panel></div>;
}

export function TeamOperationsContent({ tab }: Props) {
  const initialActive = normalizeSectionId(tab.id);
  const [active, setActive] = useState<SectionId>(initialActive);
  const [opsTabs, setOpsTabs] = useState<SectionId[]>(initialActive === 'overview' ? ['overview'] : ['overview', initialActive]);
  const [memberList, setMemberList] = useState<Member[]>(initialMembers);

  function selectSection(id: SectionId) {
    setActive(id);
    setOpsTabs((current) => current.includes(id) ? current : [...current, id]);
  }

  function closeOpsTab(id: SectionId) {
    setOpsTabs((current) => {
      const next = current.filter((item) => item !== id);
      if (active === id) {
        setActive(next[next.length - 1] ?? 'overview');
      }
      return next.length ? next : ['overview'];
    });
  }

  return (
    <div className="flex min-h-full bg-[#FFFDF8] text-[#111216]">
      <TeamSidebar active={active} setActive={selectSection} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b-2 border-black bg-[#FFFDF8]/95 px-2 py-1 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-500">RHYTHM Platform Console</p>
              <h1 className="text-[10px] font-black leading-3">Team Operations</h1>
            </div>
            <div className="flex items-center gap-1">
              <input className="h-6 w-44 rounded-md border border-black bg-[#FFFDF8] px-1.5 text-[8px] font-medium" placeholder="Search people, task, workspace..." />
              <SmallButton>+ Task</SmallButton>
              <SmallButton dark>Invite</SmallButton>
            </div>
          </div>
          <TeamOpsTabs tabs={opsTabs} active={active} onSelect={selectSection} onClose={closeOpsTab} />
        </header>
        <main className="p-1.5">
          <MainContent active={active} members={memberList} onAddMember={(member) => setMemberList((current) => [...current, member])} />
        </main>
      </div>
    </div>
  );
}
