'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { ConsoleTab } from '../ConsoleOverviewPage';

type Props = { tab: ConsoleTab };
type WorkspaceTab = { id: string; title: string; type: 'library' | 'package' | 'new'; packageId?: string; pinned?: boolean; dirty?: boolean };

type PackageItem = {
  id: string;
  name: string;
  domain: string;
  status: string;
  version: string;
  updated: string;
  s: number;
  o: number;
  c: number;
  ready: number;
};

const packages: PackageItem[] = [
  { id: 'hris-basic', name: 'HRIS Basic', domain: 'HR', status: 'Draft', version: 'v0.8.0', updated: 'Today', s: 18, o: 14, c: 9, ready: 72 },
  { id: 'inventory-basic', name: 'Inventory Basic', domain: 'Inventory', status: 'Published', version: 'v1.0.0', updated: 'Yesterday', s: 12, o: 10, c: 6, ready: 94 },
  { id: 'payroll-indonesia', name: 'Payroll Indonesia', domain: 'Payroll', status: 'Testing', version: 'v0.4.2', updated: '2d ago', s: 26, o: 12, c: 15, ready: 61 },
  { id: 'approval-engine', name: 'Approval Engine', domain: 'Workflow', status: 'Published', version: 'v1.2.0', updated: '5d ago', s: 8, o: 7, c: 18, ready: 98 },
];

const steps = ['Overview', 'Structure', 'Ops', 'Control', 'AI Meta', 'Validate'];
const components = [
  ['Employee Core', 'Object', 'Structural', 'Client Data'],
  ['Builder Page', 'Page', 'Operational', 'Runtime UI'],
  ['Role Matrix', 'Permission', 'Control', 'Policy'],
  ['AI Glossary', 'Metadata', 'AI Ready', 'Agent Context'],
];

function statusColor(status: string) {
  if (status === 'Published') return 'bg-[#9BFF00]';
  if (status === 'Testing') return 'bg-[#00B9F2]';
  return 'bg-[#FFE600]';
}

function layerColor(layer: string) {
  if (layer.includes('Operational')) return 'bg-[#9BFF00]';
  if (layer.includes('Control')) return 'bg-[#FF4E1F] text-white';
  if (layer.includes('AI')) return 'bg-[#FFE600]';
  return 'bg-[#00B9F2]';
}

function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`rounded border border-black px-1 py-0.5 text-[8px] font-black leading-none ${className}`}>{children}</span>;
}

function Action({ children, className = 'bg-[#FFFDF8]' }: { children: ReactNode; className?: string }) {
  return <button className={`rounded-md border border-black px-1.5 py-1 text-[8px] font-black leading-none ${className}`}>{children}</button>;
}

function WorkspaceTabs({ tabs, activeId, onSelect, onClose, onCreate }: { tabs: WorkspaceTab[]; activeId: string; onSelect: (id: string) => void; onClose: (id: string) => void; onCreate: () => void }) {
  return (
    <div className="mt-1 flex items-center gap-1 overflow-x-auto rounded-md border border-black/20 bg-[#F6F1E8]/70 px-1 py-0.5">
      {tabs.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`flex h-4 shrink-0 items-center gap-0.5 rounded px-1 text-[7px] leading-[10px] tracking-normal transition-colors ${isActive ? 'bg-[#111216] font-medium text-white' : 'font-medium text-neutral-600 hover:bg-[#FFFDF8] hover:text-[#111216]'}`}>
            <span className="whitespace-nowrap">{item.title}</span>
            {item.dirty ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFE600]" /> : null}
            {!item.pinned ? (
              <span role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); onClose(item.id); }} className="grid h-2.5 w-2.5 shrink-0 place-items-center rounded-sm bg-[#E5484D] text-[6px] leading-none text-white">×</span>
            ) : null}
          </button>
        );
      })}
      <button type="button" onClick={onCreate} className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-black bg-[#9BFF00] p-0 text-[7px] font-black leading-none" aria-label="Create package workspace"><span className="-translate-y-px">+</span></button>
    </div>
  );
}

export function PackageStudioCompactContent({ tab }: Props) {
  const [tabs, setTabs] = useState<WorkspaceTab[]>([{ id: 'all-packages', title: 'All', type: 'library', pinned: true }]);
  const [activeId, setActiveId] = useState('all-packages');
  const [query, setQuery] = useState('');

  const active = tabs.find((item) => item.id === activeId) ?? tabs[0];
  const activePackage = packages.find((item) => item.id === active.packageId) ?? packages[0];
  const searchPlaceholder = active.type === 'package' ? `Search ${activePackage.name}...` : active.type === 'new' ? 'Search new package...' : 'Search package...';
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? packages.filter((item) => `${item.name} ${item.domain} ${item.status}`.toLowerCase().includes(q)) : packages;
  }, [query]);

  function openPackage(packageId: string) {
    const pkg = packages.find((item) => item.id === packageId);
    if (!pkg) return;
    const workspaceId = `package-${pkg.id}`;
    setTabs((current) => current.some((item) => item.id === workspaceId) ? current : [...current, { id: workspaceId, title: pkg.name, type: 'package', packageId: pkg.id }]);
    setActiveId(workspaceId);
  }

  function createPackage() {
    const workspaceId = `new-${Date.now()}`;
    setTabs((current) => [...current, { id: workspaceId, title: 'New', type: 'new', dirty: true }]);
    setActiveId(workspaceId);
  }

  function closeTab(workspaceId: string) {
    setTabs((current) => {
      if (current.find((item) => item.id === workspaceId)?.pinned) return current;
      const next = current.filter((item) => item.id !== workspaceId);
      if (activeId === workspaceId) setActiveId(next[next.length - 1]?.id ?? 'all-packages');
      return next;
    });
  }

  return (
    <div className="min-h-full bg-[#FFFDF8] text-[#111216]">
      <header className="sticky top-0 z-30 mb-1.5 rounded-b-lg border-b border-black bg-[#FFFDF8]/95 px-2 py-1 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-500">{tab.section}</p>
            <h1 className="text-[9px] font-black leading-3 tracking-normal">Package Studio</h1>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1">
            <label className="flex h-6 min-w-[170px] items-center gap-1.5 rounded-md border border-black bg-[#FFFDF8] px-1.5 shadow-[1px_1px_0px_#000]">
              <span className="text-[8px] font-black">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-[8px] font-semibold outline-none placeholder:text-neutral-500" />
            </label>
            <button type="button" onClick={createPackage} className="h-6 rounded-md border border-black bg-[#FFE600] px-1.5 text-[8px] font-black leading-none shadow-[1px_1px_0px_#000]">+ Package</button>
          </div>
        </div>
        <WorkspaceTabs tabs={tabs} activeId={activeId} onSelect={setActiveId} onClose={closeTab} onCreate={createPackage} />
      </header>

      <div className="px-1.5 pb-1.5">
        {active.type === 'library' ? <Library packages={filtered} onOpen={openPackage} onCreate={createPackage} /> : active.type === 'new' ? <NewPackage /> : <Builder pkg={activePackage} />}
      </div>
    </div>
  );
}

function Library({ packages: packageList, onOpen, onCreate }: { packages: PackageItem[]; onOpen: (id: string) => void; onCreate: () => void }) {
  return (
    <section className="grid gap-1.5 lg:grid-cols-[minmax(0,1fr)_180px]">
      <main className="space-y-1.5">
        <section className="grid gap-1.5 md:grid-cols-3">
          <button type="button" onClick={onCreate} className="rounded-lg border-2 border-black bg-[#FFE600] p-1.5 text-left shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.1em]">Blank</p><h2 className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">Create Package</h2><p className="mt-0.5 text-[8px] font-medium leading-3">New business package.</p></button>
          <article className="rounded-lg border-2 border-black bg-[#9BFF00] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.1em]">Template</p><h2 className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">Blueprint</h2><p className="mt-0.5 text-[8px] font-medium leading-3">HR, approval, inventory.</p></article>
          <article className="rounded-lg border-2 border-black bg-[#00B9F2] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.1em]">Workspace</p><h2 className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">Multitask</h2><p className="mt-0.5 text-[8px] font-medium leading-3">Edit side by side.</p></article>
        </section>

        <section className="rounded-lg border-2 border-black bg-[#F6F1E8] p-1.5 shadow-[1.5px_1.5px_0px_#000]">
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5"><div><p className="text-[9px] font-black uppercase">All Packages</p><p className="text-[8px] font-medium text-neutral-600">Open as tab.</p></div><div className="flex gap-1"><Pill>All</Pill><Pill className="bg-[#FFE600]">Draft</Pill><Pill className="bg-[#9BFF00]">Pub</Pill></div></div>
          <div className="grid gap-1.5 md:grid-cols-2 xl:grid-cols-3">
            {packageList.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} onOpen={() => onOpen(pkg.id)} />)}
          </div>
        </section>
      </main>
      <aside className="rounded-lg border-2 border-black bg-[#F6F1E8] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-600">Guide</p><h3 className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">Package Workspaces</h3><p className="text-[8px] font-medium leading-3 text-neutral-700">Inner tabs keep builders open.</p><div className="mt-1.5 space-y-1"><Info title="Library" text="Search & open." /><Info title="Workspace" text="Build per tab." /><div className="rounded-md border border-black bg-[#111216] p-1.5 text-white"><p className="text-[8px] font-black text-white/70">Rule</p><p className="text-[8px] font-semibold leading-3">Main tab = area.</p></div></div></aside>
    </section>
  );
}

function PackageCard({ pkg, onOpen }: { pkg: PackageItem; onOpen: () => void }) {
  return <article className="rounded-lg border-2 border-black bg-[#FFFDF8] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><div className="flex items-start justify-between gap-1.5"><div><h3 className="text-[9px] font-black leading-3 tracking-normal">{pkg.name}</h3><p className="text-[8px] font-medium uppercase leading-3 text-neutral-600">{pkg.domain} • {pkg.version}</p></div><Pill className={statusColor(pkg.status)}>{pkg.status}</Pill></div><div className="mt-1.5 grid grid-cols-3 gap-1 text-center text-[8px] font-black"><LayerCount label="S" value={pkg.s} color="bg-[#00B9F2]" /><LayerCount label="O" value={pkg.o} color="bg-[#9BFF00]" /><LayerCount label="C" value={pkg.c} color="bg-[#FF4E1F] text-white" /></div><div className="mt-1.5 flex items-center justify-between text-[8px] font-medium text-neutral-600"><span>{pkg.updated}</span><span>{pkg.ready}%</span></div><button type="button" onClick={onOpen} className="mt-1.5 h-6 w-full rounded-md border border-black bg-[#111216] px-2 text-[8px] font-black text-white shadow-[1px_1px_0px_#000]">Open</button></article>;
}

function NewPackage() {
  return <section className="grid gap-1.5 lg:grid-cols-[minmax(0,1fr)_180px]"><main className="rounded-lg border-2 border-black bg-[#F6F1E8] p-2 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-600">New Package</p><h2 className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">Create Package</h2><div className="mt-2 grid gap-1.5 md:grid-cols-2">{['Name', 'Code', 'Domain', 'Owner'].map((label) => <label key={label} className="block"><span className="mb-0.5 block text-[8px] font-black uppercase">{label}</span><input className="h-6 w-full rounded-md border border-black bg-[#FFFDF8] px-1.5 text-[8px] font-semibold outline-none" placeholder={label} /></label>)}</div><label className="mt-1.5 block"><span className="mb-0.5 block text-[8px] font-black uppercase">Description</span><textarea className="min-h-16 w-full rounded-md border border-black bg-[#FFFDF8] px-1.5 py-1 text-[8px] font-semibold outline-none" placeholder="Package purpose" /></label><div className="mt-1.5 flex flex-wrap gap-1"><button className="rounded-md border border-black bg-[#FFE600] px-1.5 py-1 text-[8px] font-black">Save</button><button className="rounded-md border border-black bg-[#FFFDF8] px-1.5 py-1 text-[8px] font-black">Template</button></div></main><aside className="rounded-lg border-2 border-black bg-[#FFE600] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase">Dirty</p><h3 className="text-[9px] font-black leading-3">New Package •</h3><p className="text-[8px] font-medium leading-3">Yellow dot = unsaved.</p></aside></section>;
}

function Builder({ pkg }: { pkg: PackageItem }) {
  return <section className="grid gap-1.5 lg:grid-cols-[145px_minmax(0,1fr)_180px]"><aside className="rounded-lg border-2 border-black bg-[#F6F1E8] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-600">Map</p><h2 className="text-[9px] font-black leading-3 tracking-normal">{pkg.name}</h2><div className="mt-1.5 space-y-1">{steps.map((step) => <button key={step} className="w-full rounded-md border border-black bg-[#FFFDF8] p-1 text-left text-[8px] font-medium">{step}</button>)}</div></aside><main className="space-y-1.5"><header className="rounded-lg border-2 border-black bg-[#F6F1E8] p-2 shadow-[1.5px_1.5px_0px_#000]"><div className="flex flex-wrap items-center justify-between gap-1.5"><div><div className="flex items-center gap-1"><p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-600">Builder</p><Pill className={statusColor(pkg.status)}>{pkg.status}</Pill></div><h1 className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">{pkg.name}</h1></div><div className="flex gap-1"><Action>Preview</Action><Action className="bg-[#FFE600]">Validate</Action><Action className="bg-[#111216] text-white">Publish</Action></div></div></header><section className="grid gap-1.5 md:grid-cols-3"><LayerCard title="Structural" value={pkg.s} color="bg-[#00B9F2]" text="Tables, fields" /><LayerCard title="Operational" value={pkg.o} color="bg-[#9BFF00]" text="Menus, forms" /><LayerCard title="Control" value={pkg.c} color="bg-[#FF4E1F] text-white" text="Roles, audit" /></section><section className="grid gap-1.5 xl:grid-cols-[1fr_0.85fr]"><Panel title="Deployment" badge={`${pkg.s + pkg.o + pkg.c}`}><div className="grid gap-1.5 md:grid-cols-3"><LayerList title="Structure" color="bg-[#00B9F2]" items={['Objects', 'Fields']} /><LayerList title="Ops" color="bg-[#9BFF00]" items={['Menus', 'Forms']} /><LayerList title="Control" color="bg-[#FF4E1F] text-white" items={['Roles', 'Audit']} /></div></Panel><Panel title="Readiness" badge={`${pkg.ready}%`}><Readiness label="Struct" value={92} color="bg-[#9BFF00]" /><Readiness label="Ops" value={78} color="bg-[#00B9F2]" /><Readiness label="Ctrl" value={54} color="bg-[#FF4E1F]" /></Panel></section><Panel title="Components"><div className="grid gap-1">{components.map(([name, type, layer, deploy]) => <div key={name} className="grid gap-1 rounded-md border border-black bg-[#FFFDF8] p-1.5 text-[8px] font-medium md:grid-cols-[1fr_84px_56px_100px] md:items-center"><div><p className="text-[9px] font-black leading-3">{name}</p><p className="text-[8px] text-neutral-600">{type}</p></div><Pill className={layerColor(layer)}>{layer}</Pill><span className="text-neutral-600">Deploy</span><span className="font-black">{deploy}</span></div>)}</div></Panel></main><aside className="rounded-lg border-2 border-black bg-[#F6F1E8] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.12em] text-neutral-600">Inspector</p><h3 className="text-[9px] font-black leading-3">{pkg.name}</h3><p className="text-[8px] font-medium leading-3 text-neutral-700">Blueprint for {pkg.domain.toLowerCase()}.</p><div className="mt-1.5 space-y-1"><Info title="Visibility" text="Admin & end user" /><Info title="Install" text="Per client" /><Info title="AI Context" text="DDL metadata only" /></div></aside></section>;
}

function LayerCount({ label, value, color }: { label: string; value: number; color: string }) { return <div className={`rounded border border-black p-1 ${color}`}><p className="text-[9px] leading-3 font-black">{value}</p><p>{label}</p></div>; }
function LayerCard({ title, value, color, text }: { title: string; value: number; color: string; text: string }) { return <article className={`rounded-lg border-2 border-black p-1.5 shadow-[1.5px_1.5px_0px_#000] ${color}`}><p className="text-[8px] font-black uppercase tracking-[0.1em]">{title}</p><p className="mt-0.5 text-[9px] font-black leading-3 tracking-normal">{value}</p><p className="mt-0.5 text-[8px] font-medium leading-3">{text}</p></article>; }
function Panel({ title, badge, children }: { title: string; badge?: string; children: ReactNode }) { return <section className="rounded-lg border-2 border-black bg-[#F6F1E8] p-1.5 shadow-[1.5px_1.5px_0px_#000]"><div className="mb-1.5 flex items-center justify-between gap-1.5"><p className="text-[9px] font-black uppercase">{title}</p>{badge ? <Pill className="bg-[#FFE600]">{badge}</Pill> : null}</div>{children}</section>; }
function LayerList({ title, color, items }: { title: string; color: string; items: string[] }) { return <div className={`rounded-md border border-black p-1.5 ${color}`}><p className="text-[8px] font-black uppercase">{title}</p><ul className="mt-1 space-y-0.5 text-[8px] font-medium leading-3">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>; }
function Info({ title, text }: { title: string; text: string }) { return <div className="rounded-md border border-black bg-[#FFFDF8] p-1.5"><p className="text-[8px] font-black text-neutral-600">{title}</p><p className="text-[8px] font-medium leading-3">{text}</p></div>; }
function Readiness({ label, value, color }: { label: string; value: number; color: string }) { return <div className="mb-1"><div className="mb-0.5 flex justify-between text-[8px] font-black"><span>{label}</span><span>{value}%</span></div><div className="h-2 overflow-hidden rounded-full border border-black bg-[#FFFDF8]"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div></div>; }
