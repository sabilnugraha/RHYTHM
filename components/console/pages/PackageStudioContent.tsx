import type { ConsoleTab } from '../ConsoleOverviewPage';

type PackageStudioContentProps = {
  tab: ConsoleTab;
};

const layers = [
  {
    name: 'Structural',
    count: 18,
    color: 'bg-[#00B9F2]',
    label: 'Tables, fields, relations, master data',
  },
  {
    name: 'Operational',
    count: 14,
    color: 'bg-[#9BFF00]',
    label: 'Menus, forms, pages, reports, dashboards',
  },
  {
    name: 'Control',
    count: 9,
    color: 'bg-[#FF4E1F]',
    label: 'Roles, permissions, approvals, audit',
  },
];

const builderSteps = [
  { name: 'Overview', layer: 'Package', status: 'Ready' },
  { name: 'Structural Design', layer: 'Structural', status: '18 items' },
  { name: 'Operational Experience', layer: 'Operational', status: '14 items' },
  { name: 'Control & Governance', layer: 'Control', status: '9 items' },
  { name: 'Intelligence Metadata', layer: 'AI Ready', status: '72%' },
  { name: 'Validation', layer: 'Publish Gate', status: '3 issues' },
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

export function PackageStudioContent({ tab }: PackageStudioContentProps) {
  return (
    <div className="min-h-full rounded-lg bg-[#FFFDF8] text-[#111216]">
      <section className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="rounded-xl border-2 border-black bg-[#F6F1E8] p-3 shadow-[4px_4px_0px_#000]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">Package Studio</p>
          <h2 className="mt-1 text-xl font-black tracking-[-0.04em]">Builder Map</h2>

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
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">{tab.section}</p>
                <h1 className="mt-1 text-3xl font-black tracking-[-0.05em]">Package Studio</h1>
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
                <span className="rounded-full border-2 border-black bg-[#9BFF00] px-3 py-1 text-xs font-black">41</span>
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
                <span className="rounded-full border-2 border-black bg-[#FFE600] px-3 py-1 text-xs font-black">72%</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="mb-1 flex justify-between text-[10px] font-black uppercase">
                    <span>Structure</span>
                    <span>Ready</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border-2 border-black bg-[#FFFDF8]">
                    <div className="h-full w-[92%] bg-[#9BFF00]" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-[10px] font-black uppercase">
                    <span>Operational UI</span>
                    <span>Good</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border-2 border-black bg-[#FFFDF8]">
                    <div className="h-full w-[78%] bg-[#00B9F2]" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-[10px] font-black uppercase">
                    <span>Control</span>
                    <span>3 Issues</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full border-2 border-black bg-[#FFFDF8]">
                    <div className="h-full w-[54%] bg-[#FF4E1F]" />
                  </div>
                </div>
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
          <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">HRIS Basic</h3>
          <p className="mt-2 text-xs font-bold leading-5 text-neutral-700">Reusable package blueprint for HR core operation, employee data, forms, roles, and AI-ready metadata.</p>

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
              <p className="mt-1 text-sm font-black">Fix 3 control issues before publish.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
