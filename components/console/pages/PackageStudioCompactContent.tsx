'use client';

import { useMemo, useState } from 'react';
import type { ConsoleTab } from '../ConsoleOverviewPage';

type Props = { tab: ConsoleTab };
type WorkspaceTab = { id: string; title: string; type: 'library' | 'package' | 'new'; packageId?: string; pinned?: boolean; dirty?: boolean };

const packages = [
  { id: 'hris-basic', name: 'HRIS Basic', domain: 'Human Resource', status: 'Draft', version: 'v0.8.0', updated: 'Today', s: 18, o: 14, c: 9, ready: 72 },
  { id: 'inventory-basic', name: 'Inventory Basic', domain: 'Inventory', status: 'Published', version: 'v1.0.0', updated: 'Yesterday', s: 12, o: 10, c: 6, ready: 94 },
  { id: 'payroll-indonesia', name: 'Payroll Indonesia', domain: 'Payroll', status: 'Testing', version: 'v0.4.2', updated: '2 days ago', s: 26, o: 12, c: 15, ready: 61 },
  { id: 'approval-engine', name: 'Approval Engine', domain: 'Core Workflow', status: 'Published', version: 'v1.2.0', updated: '5 days ago', s: 8, o: 7, c: 18, ready: 98 },
];

const steps = ['Overview', 'Structural', 'Operational', 'Control', 'AI Metadata', 'Validation'];
const components = [
  ['Employee Core Object', 'Business Object', 'Structural', 'Client Data'],
  ['Package Builder Page', 'Runtime Page', 'Operational', 'Runtime UI'],
  ['Role Boundary Matrix', 'Permission Set', 'Control', 'Policy Runtime'],
  ['AI Field Glossary', 'Metadata', 'Structural + AI', 'Agent Context'],
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

function Pill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`rounded-full border-2 border-black px-1.5 py-0.5 text-[8px] font-black uppercase ${className}`}>{children}</span>;
}

export function PackageStudioCompactContent({ tab }: Props) {
  const [tabs, setTabs] = useState<WorkspaceTab[]>([{ id: 'all-packages', title: 'All Packages', type: 'library', pinned: true }]);
  const [activeId, setActiveId] = useState('all-packages');
  const [query, setQuery] = useState('');

  const active = tabs.find((item) => item.id === activeId) ?? tabs[0];
  const activePackage = packages.find((item) => item.id === active.packageId) ?? packages[0];
  const searchPlaceholder = active.type === 'package' ? `Search in ${activePackage.name}...` : active.type === 'new' ? 'Search in new package...' : 'Search package...';
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
    setTabs((current) => [...current, { id: workspaceId, title: 'New Package', type: 'new', dirty: true }]);
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
    <div className="min-h-full rounded-lg bg-[#FFFDF8] text-[#111216]">
      <header className="sticky top-0 z-30 mb-2 border-b-2 border-black bg-[#FFFDF8]/95 px-2.5 py-2 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-black leading-none tracking-[-0.05em]">Package Studio</h1>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <label className="flex h-8 min-w-[210px] items-center gap-2 rounded-lg border-2 border-black bg-[#FFFDF8] px-2 shadow-[2px_2px_0px_#000]">
              <span className="text-xs font-black">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-[11px] font-bold outline-none placeholder:text-neutral-500" />
            </label>
            <button type="button" onClick={createPackage} className="rounded-lg border-2 border-black bg-[#FFE600] px-2.5 py-1.5 text-[11px] font-black uppercase shadow-[2px_2px_0px_#000]">+ Create Package</button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-0.5">
          {tabs.map((item) => (
            <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`flex max-w-[150px] shrink-0 items-center gap-1 rounded-full border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] ${activeId === item.id ? 'bg-[#111216] text-white' : 'bg-[#FFFDF8] text-[#111216]'}`}>
              <span className="truncate">{item.title}</span>
              {item.dirty ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFE600]" /> : null}
              {!item.pinned ? <span role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); closeTab(item.id); }} className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-[#FF4E1F] text-[8px] leading-none text-white">×</span> : null}
            </button>
          ))}
          <button type="button" onClick={createPackage} className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-black bg-[#9BFF00] text-[10px] font-black shadow-[1px_1px_0px_#000]">+</button>
        </div>
      </header>

      {active.type === 'library' ? <Library packages={filtered} onOpen={openPackage} onCreate={createPackage} /> : active.type === 'new' ? <NewPackage /> : <Builder pkg={activePackage} />}
    </div>
  );
}

function Library({ packages: packageList, onOpen, onCreate }: { packages: typeof packages; onOpen: (id: string) => void; onCreate: () => void }) {
  return (
    <section className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_230px]">
      <main className="space-y-2">
        <section className="grid gap-2 md:grid-cols-3">
          <button type="button" onClick={onCreate} className="rounded-xl border-2 border-black bg-[#FFE600] p-3 text-left shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.18em]">Start blank</p><h2 className="mt-1 text-xl font-black tracking-[-0.05em]">Create Package</h2><p className="mt-1 text-[10px] font-black uppercase leading-4">New business package.</p></button>
          <article className="rounded-xl border-2 border-black bg-[#9BFF00] p-3 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.18em]">Template</p><h2 className="mt-1 text-xl font-black tracking-[-0.05em]">Use Blueprint</h2><p className="mt-1 text-[10px] font-black uppercase leading-4">HR, approval, inventory, payroll kits.</p></article>
          <article className="rounded-xl border-2 border-black bg-[#00B9F2] p-3 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.18em]">Open workspaces</p><h2 className="mt-1 text-xl font-black tracking-[-0.05em]">Multitask</h2><p className="mt-1 text-[10px] font-black uppercase leading-4">Edit packages side by side.</p></article>
        </section>

        <section className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[3px_3px_0px_#000]">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><div><p className="text-xs font-black uppercase">All Packages</p><p className="text-[10px] font-bold text-neutral-600">Open package as workspace tab.</p></div><div className="flex gap-1.5"><Pill>All</Pill><Pill className="bg-[#FFE600]">Draft</Pill><Pill className="bg-[#9BFF00]">Published</Pill></div></div>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {packageList.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} onOpen={() => onOpen(pkg.id)} />)}
          </div>
        </section>
      </main>
      <aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-2.5 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-600">Studio Guide</p><h3 className="mt-1 text-lg font-black tracking-[-0.04em]">Package Workspaces</h3><p className="mt-1 text-[10px] font-bold leading-4 text-neutral-700">Inner tabs keep package builders open.</p><div className="mt-3 space-y-1.5"><Info title="1. Library" text="Search & open." /><Info title="2. Workspace" text="Build per tab." /><div className="rounded-lg border-2 border-black bg-[#111216] p-2 text-white"><p className="text-[8px] font-black uppercase text-white/70">Rule</p><p className="text-xs font-black">Main tab = area. Inner tab = package.</p></div></div></aside>
    </section>
  );
}

function PackageCard({ pkg, onOpen }: { pkg: (typeof packages)[number]; onOpen: () => void }) {
  return <article className="rounded-xl border-2 border-black bg-[#FFFDF8] p-2.5 shadow-[2px_2px_0px_#000]"><div className="flex items-start justify-between gap-2"><div><h3 className="text-base font-black tracking-[-0.04em]">{pkg.name}</h3><p className="text-[9px] font-black uppercase text-neutral-600">{pkg.domain} • {pkg.version}</p></div><Pill className={statusColor(pkg.status)}>{pkg.status}</Pill></div><div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[8px] font-black uppercase"><LayerCount label="Struct" value={pkg.s} color="bg-[#00B9F2]" /><LayerCount label="Ops" value={pkg.o} color="bg-[#9BFF00]" /><LayerCount label="Ctrl" value={pkg.c} color="bg-[#FF4E1F] text-white" /></div><div className="mt-2 flex items-center justify-between text-[8px] font-black uppercase text-neutral-600"><span>{pkg.updated}</span><span>{pkg.ready}% ready</span></div><button type="button" onClick={onOpen} className="mt-2 w-full rounded-lg border-2 border-black bg-[#111216] px-2 py-1.5 text-[10px] font-black uppercase text-white shadow-[2px_2px_0px_#000]">Open Workspace</button></article>;
}

function NewPackage() {
  return <section className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_230px]"><main className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.22em] text-neutral-600">New Package Workspace</p><h2 className="mt-1 text-2xl font-black tracking-[-0.05em]">Create Package</h2><p className="mt-1 max-w-2xl text-xs font-bold leading-5 text-neutral-700">Define identity before building structure, operations, and control.</p><div className="mt-3 grid gap-2 md:grid-cols-2">{['Package Name', 'Package Code', 'Domain / Module', 'Owner'].map((label) => <label key={label} className="block"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider">{label}</span><input className="w-full rounded-lg border-2 border-black bg-[#FFFDF8] px-2.5 py-2 text-xs font-bold outline-none shadow-[2px_2px_0px_#000]" placeholder={label} /></label>)}</div><label className="mt-2 block"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider">Description</span><textarea className="min-h-20 w-full rounded-lg border-2 border-black bg-[#FFFDF8] px-2.5 py-2 text-xs font-bold outline-none shadow-[2px_2px_0px_#000]" placeholder="What business process does this package provide?" /></label><div className="mt-3 flex gap-2"><button className="rounded-lg border-2 border-black bg-[#FFE600] px-3 py-1.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">Save Draft</button><button className="rounded-lg border-2 border-black bg-[#FFFDF8] px-3 py-1.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">Start From Template</button></div></main><aside className="rounded-xl border-2 border-black bg-[#FFE600] p-3 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.18em]">Dirty State</p><h3 className="mt-1 text-xl font-black tracking-[-0.05em]">New Package •</h3><p className="mt-1 text-[10px] font-black uppercase leading-4">Yellow dot means unsaved changes.</p></aside></section>;
}

function Builder({ pkg }: { pkg: (typeof packages)[number] }) {
  return <section className="grid gap-2 lg:grid-cols-[185px_minmax(0,1fr)_230px]"><aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-2.5 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-600">Builder Map</p><h2 className="mt-1 text-lg font-black tracking-[-0.04em]">{pkg.name}</h2><div className="mt-3 space-y-1.5">{steps.map((step) => <button key={step} className="w-full rounded-lg border-2 border-black bg-[#FFFDF8] p-1.5 text-left text-[9px] font-black uppercase shadow-[2px_2px_0px_#000]">{step}</button>)}</div></aside><main className="space-y-2"><header className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[3px_3px_0px_#000]"><div className="flex flex-wrap items-center justify-between gap-2"><div><div className="flex items-center gap-2"><p className="text-[8px] font-black uppercase tracking-[0.22em] text-neutral-600">Package Builder</p><Pill className={statusColor(pkg.status)}>{pkg.status}</Pill></div><h1 className="mt-1 text-2xl font-black leading-none tracking-[-0.05em]">{pkg.name}</h1></div><div className="flex gap-1.5"><Action>Preview</Action><Action className="bg-[#FFE600]">Validate</Action><Action className="bg-[#111216] text-white">Publish</Action></div></div></header><section className="grid gap-2 md:grid-cols-3"><LayerCard title="Structural" value={pkg.s} color="bg-[#00B9F2]" text="Tables, fields, relations" /><LayerCard title="Operational" value={pkg.o} color="bg-[#9BFF00]" text="Menus, forms, reports" /><LayerCard title="Control" value={pkg.c} color="bg-[#FF4E1F] text-white" text="Roles, approvals, audit" /></section><section className="grid gap-2 xl:grid-cols-[1fr_0.85fr]"><Panel title="Layer Deployment" badge={`${pkg.s + pkg.o + pkg.c}`}><div className="grid gap-2 md:grid-cols-3"><LayerList title="Structural" color="bg-[#00B9F2]" items={['Objects', 'Fields', 'Relations']} /><LayerList title="Operational" color="bg-[#9BFF00]" items={['Menus', 'Forms', 'Reports']} /><LayerList title="Control" color="bg-[#FF4E1F] text-white" items={['Roles', 'Permission', 'Audit']} /></div></Panel><Panel title="Publish Readiness" badge={`${pkg.ready}%`}><Readiness label="Structure" value={92} color="bg-[#9BFF00]" /><Readiness label="Operational" value={78} color="bg-[#00B9F2]" /><Readiness label="Control" value={54} color="bg-[#FF4E1F]" /></Panel></section><Panel title="Package Components"><div className="grid gap-1.5">{components.map(([name, type, layer, deploy]) => <div key={name} className="grid gap-1.5 rounded-lg border-2 border-black bg-[#FFFDF8] p-2 text-[10px] font-bold shadow-[2px_2px_0px_#000] md:grid-cols-[1fr_115px_80px_135px] md:items-center"><div><p className="text-xs font-black">{name}</p><p className="text-[8px] uppercase text-neutral-600">{type}</p></div><Pill className={layerColor(layer)}>{layer}</Pill><span className="font-black uppercase text-neutral-600">Deploys</span><span className="font-black uppercase">{deploy}</span></div>)}</div></Panel></main><aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-2.5 shadow-[3px_3px_0px_#000]"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-600">Inspector</p><h3 className="mt-1 text-lg font-black tracking-[-0.04em]">{pkg.name}</h3><p className="mt-1 text-[10px] font-bold leading-4 text-neutral-700">Blueprint for {pkg.domain.toLowerCase()} operations, forms, roles, and AI metadata.</p><div className="mt-3 space-y-1.5"><Info title="Runtime Visibility" text="Admin & end user" /><Info title="Client Configurable" text="Yes, limited" /><div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-2"><p className="text-[8px] font-black uppercase text-neutral-600">Risk Level</p><Pill className="bg-[#FFE600]">Medium</Pill></div><div className="rounded-lg border-2 border-black bg-[#111216] p-2 text-white"><p className="text-[8px] font-black uppercase text-white/70">Next action</p><p className="text-xs font-black">Review control issues.</p></div></div></aside></section>;
}

function LayerCount({ label, value, color }: { label: string; value: number; color: string }) { return <div className={`rounded-md border-2 border-black p-1.5 ${color}`}><p className="text-base leading-none">{value}</p><p>{label}</p></div>; }
function LayerCard({ title, value, color, text }: { title: string; value: number; color: string; text: string }) { return <article className={`rounded-xl border-2 border-black p-3 shadow-[3px_3px_0px_#000] ${color}`}><p className="text-[8px] font-black uppercase tracking-[0.16em]">{title} Layer</p><p className="mt-1 text-3xl font-black leading-none tracking-[-0.06em]">{value}</p><p className="mt-2 text-[10px] font-black uppercase leading-4">{text}</p></article>; }
function Panel({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) { return <section className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[3px_3px_0px_#000]"><div className="mb-2 flex items-center justify-between gap-2"><p className="text-xs font-black uppercase">{title}</p>{badge ? <Pill className="bg-[#FFE600]">{badge}</Pill> : null}</div>{children}</section>; }
function LayerList({ title, color, items }: { title: string; color: string; items: string[] }) { return <div className={`rounded-lg border-2 border-black p-2 ${color}`}><p className="text-[10px] font-black uppercase">{title}</p><ul className="mt-1.5 space-y-1 text-[10px] font-bold">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>; }
function Info({ title, text }: { title: string; text: string }) { return <div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-2"><p className="text-[8px] font-black uppercase text-neutral-600">{title}</p><p className="text-xs font-black">{text}</p></div>; }
function Action({ children, className = 'bg-[#FFFDF8]' }: { children: React.ReactNode; className?: string }) { return <button className={`rounded-lg border-2 border-black px-2 py-1.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] ${className}`}>{children}</button>; }
function Readiness({ label, value, color }: { label: string; value: number; color: string }) { return <div className="mb-1.5"><div className="mb-0.5 flex justify-between text-[8px] font-black uppercase"><span>{label}</span><span>{value}%</span></div><div className="h-2.5 overflow-hidden rounded-full border-2 border-black bg-[#FFFDF8]"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div></div>; }
