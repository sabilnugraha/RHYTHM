'use client';

import { useMemo, useState } from 'react';

import type { ConsoleTab } from '../ConsoleOverviewPage';

type PackageStudioContentProps = {
  tab: ConsoleTab;
};

type PackageWorkspaceTab = {
  id: string;
  title: string;
  type: 'library' | 'package' | 'new-package';
  packageId?: string;
  isPinned?: boolean;
  isDirty?: boolean;
};

const packages = [
  {
    id: 'hris-basic',
    name: 'HRIS Basic',
    domain: 'Human Resource',
    status: 'Draft',
    version: 'v0.8.0',
    updated: 'Today',
    structural: 18,
    operational: 14,
    control: 9,
    readiness: 72,
  },
  {
    id: 'inventory-basic',
    name: 'Inventory Basic',
    domain: 'Inventory',
    status: 'Published',
    version: 'v1.0.0',
    updated: 'Yesterday',
    structural: 12,
    operational: 10,
    control: 6,
    readiness: 94,
  },
  {
    id: 'payroll-indonesia',
    name: 'Payroll Indonesia',
    domain: 'Payroll',
    status: 'Testing',
    version: 'v0.4.2',
    updated: '2 days ago',
    structural: 26,
    operational: 12,
    control: 15,
    readiness: 61,
  },
  {
    id: 'approval-engine',
    name: 'Approval Engine',
    domain: 'Core Workflow',
    status: 'Published',
    version: 'v1.2.0',
    updated: '5 days ago',
    structural: 8,
    operational: 7,
    control: 18,
    readiness: 98,
  },
];

const builderSteps = [
  { name: 'Overview', layer: 'Package', status: 'Ready' },
  { name: 'Structural Design', layer: 'Structural', status: 'Objects' },
  { name: 'Operational Experience', layer: 'Operational', status: 'Runtime' },
  { name: 'Control & Governance', layer: 'Control', status: 'Guardrail' },
  { name: 'Intelligence Metadata', layer: 'AI Ready', status: 'Context' },
  { name: 'Validation', layer: 'Publish Gate', status: 'Issues' },
];

const packageComponents = [
  { name: 'Employee Core Object', type: 'Business Object', layer: 'Structural', deploy: 'Client Data Structure' },
  { name: 'Package Builder Page', type: 'Runtime Page', layer: 'Operational', deploy: 'Operational Layer UI' },
  { name: 'Role Boundary Matrix', type: 'Permission Set', layer: 'Control', deploy: 'Control Policy Runtime' },
  { name: 'AI Field Glossary', type: 'Metadata', layer: 'Structural + AI', deploy: 'Agent Context' },
];

function LayerBadge({ layer }: { layer: string }) {
  const color = layer.includes('Operational')
    ? 'bg-[#9BFF00]'
    : layer.includes('Control')
      ? 'bg-[#FF4E1F] text-white'
      : layer.includes('AI')
        ? 'bg-[#FFE600]'
        : 'bg-[#00B9F2]';

  return <span className={`rounded-full border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${color}`}>{layer}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const color = status === 'Published' ? 'bg-[#9BFF00]' : status === 'Testing' ? 'bg-[#00B9F2]' : 'bg-[#FFE600]';
  return <span className={`rounded-full border-2 border-black px-2 py-1 text-[9px] font-black uppercase ${color}`}>{status}</span>;
}

export function PackageStudioContent({ tab }: PackageStudioContentProps) {
  const [workspaceTabs, setWorkspaceTabs] = useState<PackageWorkspaceTab[]>([
    { id: 'all-packages', title: 'All Packages', type: 'library', isPinned: true },
  ]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('all-packages');
  const [query, setQuery] = useState('');

  const activeWorkspace = workspaceTabs.find((workspace) => workspace.id === activeWorkspaceId) ?? workspaceTabs[0];
  const activePackage = packages.find((item) => item.id === activeWorkspace.packageId) ?? packages[0];

  const filteredPackages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return packages;
    }

    return packages.filter((item) => `${item.name} ${item.domain} ${item.status}`.toLowerCase().includes(normalizedQuery));
  }, [query]);

  function openPackageWorkspace(packageId: string) {
    const selectedPackage = packages.find((item) => item.id === packageId);
    if (!selectedPackage) {
      return;
    }

    const workspaceId = `package-${selectedPackage.id}`;
    setWorkspaceTabs((currentTabs) => {
      const exists = currentTabs.some((item) => item.id === workspaceId);
      return exists
        ? currentTabs
        : [
            ...currentTabs,
            {
              id: workspaceId,
              title: selectedPackage.name,
              type: 'package',
              packageId: selectedPackage.id,
            },
          ];
    });
    setActiveWorkspaceId(workspaceId);
  }

  function createNewPackageWorkspace() {
    const workspaceId = `new-package-${Date.now()}`;
    setWorkspaceTabs((currentTabs) => [
      ...currentTabs,
      {
        id: workspaceId,
        title: 'New Package',
        type: 'new-package',
        isDirty: true,
      },
    ]);
    setActiveWorkspaceId(workspaceId);
  }

  function closeWorkspace(workspaceId: string) {
    setWorkspaceTabs((currentTabs) => {
      const target = currentTabs.find((item) => item.id === workspaceId);
      if (target?.isPinned) {
        return currentTabs;
      }

      const nextTabs = currentTabs.filter((item) => item.id !== workspaceId);
      if (activeWorkspaceId === workspaceId) {
        setActiveWorkspaceId(nextTabs[nextTabs.length - 1]?.id ?? 'all-packages');
      }
      return nextTabs;
    });
  }

  return (
    <div className="min-h-full rounded-lg bg-[#FFFDF8] text-[#111216]">
      <header className="mb-3 rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[4px_4px_0px_#000]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">{tab.section}</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-0.05em]">Package Studio</h1>
            <p className="mt-1 max-w-2xl text-sm font-bold leading-6 text-neutral-700">
              Open multiple package workspaces inside this studio tab, then build, compare, validate, and publish without losing context.
            </p>
          </div>

          <div className="flex min-w-[260px] flex-wrap items-center justify-end gap-2">
            <label className="flex h-10 min-w-[220px] items-center gap-2 rounded-lg border-2 border-black bg-[#FFFDF8] px-3 shadow-[3px_3px_0px_#000]">
              <span className="text-sm font-black">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search package..."
                className="min-w-0 flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-neutral-500"
              />
            </label>
            <button
              type="button"
              onClick={createNewPackageWorkspace}
              className="rounded-lg border-2 border-black bg-[#FFE600] px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
            >
              + Create Package
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          {workspaceTabs.map((workspace) => {
            const isActive = activeWorkspaceId === workspace.id;
            return (
              <button
                key={workspace.id}
                type="button"
                onClick={() => setActiveWorkspaceId(workspace.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border-2 border-black px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] ${
                  isActive ? 'bg-[#111216] text-white' : 'bg-[#FFFDF8] text-[#111216]'
                }`}
              >
                <span>{workspace.title}</span>
                {workspace.isDirty ? <span className="h-2 w-2 rounded-full bg-[#FFE600]" /> : null}
                {!workspace.isPinned ? (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeWorkspace(workspace.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.stopPropagation();
                        closeWorkspace(workspace.id);
                      }
                    }}
                    className="grid h-4 w-4 place-items-center rounded-full bg-[#FF4E1F] text-[10px] text-white"
                    aria-label={`Close ${workspace.title}`}
                  >
                    ×
                  </span>
                ) : null}
              </button>
            );
          })}
          <button
            type="button"
            onClick={createNewPackageWorkspace}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-black bg-[#9BFF00] text-sm font-black shadow-[2px_2px_0px_#000]"
            aria-label="Create package workspace"
          >
            +
          </button>
        </div>
      </header>

      {activeWorkspace.type === 'library' ? (
        <PackageLibrary packages={filteredPackages} onOpenPackage={openPackageWorkspace} onCreatePackage={createNewPackageWorkspace} />
      ) : activeWorkspace.type === 'new-package' ? (
        <NewPackageWorkspace />
      ) : (
        <PackageBuilderWorkspace activePackage={activePackage} />
      )}
    </div>
  );
}

function PackageLibrary({
  packages: packageList,
  onOpenPackage,
  onCreatePackage,
}: {
  packages: typeof packages;
  onOpenPackage: (packageId: string) => void;
  onCreatePackage: () => void;
}) {
  return (
    <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
      <main className="space-y-3">
        <section className="grid gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={onCreatePackage}
            className="rounded-xl border-2 border-black bg-[#FFE600] p-4 text-left shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-0.5"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">Start blank</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.05em]">Create Package</h2>
            <p className="mt-2 text-xs font-black uppercase leading-5">Open a new workspace tab for a custom business package.</p>
          </button>
          <article className="rounded-xl border-2 border-black bg-[#9BFF00] p-4 shadow-[4px_4px_0px_#000]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">Template</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.05em]">Use Blueprint</h2>
            <p className="mt-2 text-xs font-black uppercase leading-5">HR Core, Approval Engine, Inventory Starter, and Payroll kits.</p>
          </article>
          <article className="rounded-xl border-2 border-black bg-[#00B9F2] p-4 shadow-[4px_4px_0px_#000]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">Open workspaces</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.05em]">Multitask</h2>
            <p className="mt-2 text-xs font-black uppercase leading-5">Open HRIS, Inventory, and Payroll packages side by side.</p>
          </article>
        </section>

        <section className="rounded-xl border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase">All Packages</p>
              <p className="text-xs font-bold text-neutral-600">Choose a package to open it as an inner workspace tab.</p>
            </div>
            <div className="flex gap-2 text-[10px] font-black uppercase">
              <span className="rounded-full border-2 border-black bg-[#FFFDF8] px-2 py-1">All</span>
              <span className="rounded-full border-2 border-black bg-[#FFE600] px-2 py-1">Draft</span>
              <span className="rounded-full border-2 border-black bg-[#9BFF00] px-2 py-1">Published</span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {packageList.map((item) => (
              <article key={item.id} className="rounded-xl border-2 border-black bg-[#FFFDF8] p-3 shadow-[3px_3px_0px_#000]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black tracking-[-0.04em]">{item.name}</h3>
                    <p className="text-[10px] font-black uppercase text-neutral-600">{item.domain} • {item.version}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-black uppercase">
                  <div className="rounded-lg border-2 border-black bg-[#00B9F2] p-2">
                    <p className="text-lg leading-none">{item.structural}</p>
                    <p>Struct</p>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-[#9BFF00] p-2">
                    <p className="text-lg leading-none">{item.operational}</p>
                    <p>Ops</p>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-[#FF4E1F] p-2 text-white">
                    <p className="text-lg leading-none">{item.control}</p>
                    <p>Ctrl</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-[10px] font-black uppercase text-neutral-600">
                  <span>Updated {item.updated}</span>
                  <span>{item.readiness}% ready</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenPackage(item.id)}
                  className="mt-3 w-full rounded-lg border-2 border-black bg-[#111216] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
                >
                  Open Workspace
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[4px_4px_0px_#000]">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">Studio Guide</p>
        <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">Package Workspaces</h3>
        <p className="mt-2 text-xs font-bold leading-5 text-neutral-700">
          Use the inner tabs to keep multiple package builders open while the main RHYTHM tab stays on Package Studio.
        </p>
        <div className="mt-4 space-y-2">
          <div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-3">
            <p className="text-[10px] font-black uppercase text-neutral-600">1. Library</p>
            <p className="mt-1 text-sm font-black">Search and open packages.</p>
          </div>
          <div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-3">
            <p className="text-[10px] font-black uppercase text-neutral-600">2. Workspace</p>
            <p className="mt-1 text-sm font-black">Build each package in its own tab.</p>
          </div>
          <div className="rounded-lg border-2 border-black bg-[#111216] p-3 text-white">
            <p className="text-[10px] font-black uppercase text-white/70">Rule</p>
            <p className="mt-1 text-sm font-black">Top tab = RHYTHM area. Inner tab = package work.</p>
          </div>
        </div>
      </aside>
    </section>
  );
}

function NewPackageWorkspace() {
  return (
    <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
      <main className="rounded-xl border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">New Package Workspace</p>
        <h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">Create Package</h2>
        <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-neutral-700">
          This is the first step before the tab becomes a real package workspace.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {['Package Name', 'Package Code', 'Domain / Module', 'Owner'].map((label) => (
            <label key={label} className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-wider">{label}</span>
              <input className="w-full rounded-lg border-2 border-black bg-[#FFFDF8] px-3 py-3 text-sm font-bold outline-none shadow-[3px_3px_0px_#000]" placeholder={label} />
            </label>
          ))}
        </div>

        <label className="mt-3 block">
          <span className="mb-2 block text-xs font-black uppercase tracking-wider">Description</span>
          <textarea className="min-h-28 w-full rounded-lg border-2 border-black bg-[#FFFDF8] px-3 py-3 text-sm font-bold outline-none shadow-[3px_3px_0px_#000]" placeholder="What business process does this package provide?" />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-lg border-2 border-black bg-[#FFE600] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000]">Save Draft</button>
          <button className="rounded-lg border-2 border-black bg-[#FFFDF8] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000]">Start From Template</button>
        </div>
      </main>

      <aside className="rounded-xl border-2 border-black bg-[#FFE600] p-4 shadow-[4px_4px_0px_#000]">
        <p className="text-[10px] font-black uppercase tracking-[0.18em]">Dirty State</p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">New Package •</h3>
        <p className="mt-2 text-xs font-black uppercase leading-5">The yellow dot on the workspace tab means this package has unsaved changes.</p>
      </aside>
    </section>
  );
}

function PackageBuilderWorkspace({ activePackage }: { activePackage: (typeof packages)[number] }) {
  const layers = [
    {
      name: 'Structural',
      count: activePackage.structural,
      color: 'bg-[#00B9F2]',
      label: 'Tables, fields, relations, master data',
    },
    {
      name: 'Operational',
      count: activePackage.operational,
      color: 'bg-[#9BFF00]',
      label: 'Menus, forms, pages, reports, dashboards',
    },
    {
      name: 'Control',
      count: activePackage.control,
      color: 'bg-[#FF4E1F]',
      label: 'Roles, permissions, approvals, audit',
    },
  ];

  return (
    <section className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
      <aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[4px_4px_0px_#000]">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">Builder Map</p>
        <h2 className="mt-1 text-xl font-black tracking-[-0.04em]">{activePackage.name}</h2>

        <div className="mt-4 space-y-2">
          {builderSteps.map((step) => (
            <button
              key={step.name}
              type="button"
              className="group w-full rounded-lg border-2 border-black bg-[#FFFDF8] p-2 text-left shadow-[3px_3px_0px_#000] transition-transform hover:-translate-y-0.5"
            >
              <span className="block text-[11px] font-black uppercase tracking-tight">{step.name}</span>
              <span className="mt-1 flex items-center justify-between gap-2 text-[9px] font-black uppercase text-neutral-600">
                <span>{step.layer}</span>
                <span>{step.status}</span>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <main className="space-y-3">
        <header className="rounded-xl border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">Package Builder</p>
                <StatusBadge status={activePackage.status} />
              </div>
              <h1 className="mt-1 text-3xl font-black tracking-[-0.05em]">{activePackage.name}</h1>
              <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-neutral-700">
                Build reusable business packages that deploy into RHYTHM Structural, Operational, and Control layers.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border-2 border-black bg-[#FFFDF8] px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000]">Preview</button>
              <button className="rounded-lg border-2 border-black bg-[#FFE600] px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_#000]">Validate</button>
              <button className="rounded-lg border-2 border-black bg-[#111216] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_#000]">Publish</button>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          {layers.map((layer) => (
            <article key={layer.name} className={`rounded-xl border-2 border-black ${layer.color} p-4 shadow-[4px_4px_0px_#000]`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em]">{layer.name} Layer</p>
                  <p className="mt-2 text-4xl font-black tracking-[-0.06em]">{layer.count}</p>
                </div>
                <span className="rounded-full border-2 border-black bg-[#FFFDF8] px-2 py-1 text-[9px] font-black uppercase">items</span>
              </div>
              <p className="mt-3 text-xs font-black uppercase leading-5">{layer.label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-3 xl:grid-cols-[1fr_0.9fr]">
          <article className="rounded-xl border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase">Layer Deployment View</p>
                <p className="text-xs font-bold text-neutral-600">What this package will create inside RHYTHM Client.</p>
              </div>
              <span className="rounded-full border-2 border-black bg-[#9BFF00] px-3 py-1 text-xs font-black">
                {activePackage.structural + activePackage.operational + activePackage.control}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border-2 border-black bg-[#00B9F2] p-3">
                <p className="text-xs font-black uppercase">Structural</p>
                <ul className="mt-3 space-y-2 text-xs font-bold">
                  <li>• Data objects</li>
                  <li>• Field metadata</li>
                  <li>• Relations</li>
                  <li>• Metric dictionary</li>
                </ul>
              </div>
              <div className="rounded-lg border-2 border-black bg-[#9BFF00] p-3">
                <p className="text-xs font-black uppercase">Operational</p>
                <ul className="mt-3 space-y-2 text-xs font-bold">
                  <li>• Menus & pages</li>
                  <li>• Forms</li>
                  <li>• Reports</li>
                  <li>• Dashboards</li>
                </ul>
              </div>
              <div className="rounded-lg border-2 border-black bg-[#FF4E1F] p-3 text-white">
                <p className="text-xs font-black uppercase">Control</p>
                <ul className="mt-3 space-y-2 text-xs font-bold">
                  <li>• Roles</li>
                  <li>• Permissions</li>
                  <li>• Workflow guardrails</li>
                  <li>• Audit rules</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="rounded-xl border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase">Publish Readiness</p>
                <p className="text-xs font-bold text-neutral-600">Validation before installing to client.</p>
              </div>
              <span className="rounded-full border-2 border-black bg-[#FFE600] px-3 py-1 text-xs font-black">{activePackage.readiness}%</span>
            </div>

            <div className="space-y-2">
              <ReadinessBar label="Structure" value={92} color="bg-[#9BFF00]" status="Ready" />
              <ReadinessBar label="Operational UI" value={78} color="bg-[#00B9F2]" status="Good" />
              <ReadinessBar label="Control" value={54} color="bg-[#FF4E1F]" status="3 Issues" />
            </div>
          </article>
        </section>

        <section className="rounded-xl border-2 border-black bg-[#F6F1E8] p-4 shadow-[4px_4px_0px_#000]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase">Package Components</p>
              <p className="text-xs font-bold text-neutral-600">Every component shows where it will appear or take effect.</p>
            </div>
            <div className="flex gap-2 text-[10px] font-black uppercase">
              <span className="rounded-full border-2 border-black bg-[#FFFDF8] px-2 py-1">All</span>
              <span className="rounded-full border-2 border-black bg-[#00B9F2] px-2 py-1">Structural</span>
              <span className="rounded-full border-2 border-black bg-[#9BFF00] px-2 py-1">Operational</span>
              <span className="rounded-full border-2 border-black bg-[#FF4E1F] px-2 py-1 text-white">Control</span>
            </div>
          </div>

          <div className="grid gap-2">
            {packageComponents.map((component) => (
              <div key={component.name} className="grid gap-2 rounded-lg border-2 border-black bg-[#FFFDF8] p-3 text-xs font-bold shadow-[3px_3px_0px_#000] md:grid-cols-[1fr_150px_160px_190px] md:items-center">
                <div>
                  <p className="text-sm font-black tracking-tight">{component.name}</p>
                  <p className="text-[10px] uppercase text-neutral-600">{component.type}</p>
                </div>
                <LayerBadge layer={component.layer} />
                <span className="font-black uppercase text-neutral-600">Deploys to</span>
                <span className="font-black uppercase">{component.deploy}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[4px_4px_0px_#000]">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">Inspector</p>
        <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">{activePackage.name}</h3>
        <p className="mt-2 text-xs font-bold leading-5 text-neutral-700">Reusable package blueprint for {activePackage.domain.toLowerCase()} operations, forms, roles, and AI-ready metadata.</p>

        <div className="mt-4 space-y-2">
          <div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-3">
            <p className="text-[10px] font-black uppercase text-neutral-600">Runtime Visibility</p>
            <p className="mt-1 text-sm font-black">Visible to admin & end user</p>
          </div>
          <div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-3">
            <p className="text-[10px] font-black uppercase text-neutral-600">Client Configurable</p>
            <p className="mt-1 text-sm font-black">Yes, limited by boundary</p>
          </div>
          <div className="rounded-lg border-2 border-black bg-[#FFFDF8] p-3">
            <p className="text-[10px] font-black uppercase text-neutral-600">Risk Level</p>
            <p className="mt-1 inline-flex rounded-full border-2 border-black bg-[#FFE600] px-2 py-1 text-xs font-black uppercase">Medium</p>
          </div>
          <div className="rounded-lg border-2 border-black bg-[#111216] p-3 text-white">
            <p className="text-[10px] font-black uppercase text-white/70">Next action</p>
            <p className="mt-1 text-sm font-black">Review control issues before publish.</p>
          </div>
        </div>
      </aside>
    </section>
  );
}

function ReadinessBar({ label, value, color, status }: { label: string; value: number; color: string; status: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] font-black uppercase">
        <span>{label}</span>
        <span>{status}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-2 border-black bg-[#FFFDF8]">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
