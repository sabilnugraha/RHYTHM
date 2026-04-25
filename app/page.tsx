export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0B0F1A]">
      <section className="min-h-screen px-6 py-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between border-2 border-black bg-white px-5 py-4 shadow-[6px_6px_0px_#000]">
            <div className="text-xl font-black tracking-tight">RHYTHM</div>
            <div className="hidden gap-6 text-sm font-bold uppercase tracking-wider text-slate-700 md:flex">
              <span>Layers</span>
              <span>System</span>
              <span>Demo</span>
            </div>
            <button className="border-2 border-black bg-[#5B8CFF] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_#000]">Early Access</button>
          </nav>

          <div className="grid min-h-[calc(100vh-92px)] items-center gap-10 py-10 lg:grid-cols-2 lg:py-12">
            <div>
              <div className="mb-5 inline-flex border-2 border-black bg-[#00FFD1] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-[4px_4px_0px_#000]">Intelligent ERP Platform</div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
                Your Business Has A Rhythm.
                <span className="block text-[#5B8CFF]">RHYTHM Learns It.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">Stop forcing your business into rigid software. RHYTHM adapts to your structure, workflow, and daily operations.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="border-2 border-black bg-[#5B8CFF] px-5 py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_#000]">Start Building</button>
                <button className="border-2 border-black bg-white px-5 py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_#000]">Watch Demo</button>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Flow Ready</span>
                <span className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Real Time</span>
                <span className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Adaptive</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border-2 border-black bg-[#A259FF] shadow-[8px_8px_0px_#000]" />
              <div className="relative border-2 border-black bg-white p-5 shadow-[8px_8px_0px_#000]">
                <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5B8CFF]">Live System Map</p>
                    <h2 className="mt-1 text-xl font-black uppercase">Business Flow</h2>
                  </div>
                  <div className="border-2 border-black bg-[#00FFD1] px-3 py-2 text-xs font-black shadow-[3px_3px_0px_#000]">ONLINE</div>
                </div>
                <div className="space-y-3">
                  <div className="border-2 border-black bg-[#F8FAFC] p-3 shadow-[4px_4px_0px_#000]"><div className="text-xs font-black text-[#5B8CFF]">01</div><div className="mt-1 text-lg font-black uppercase">Structure Layer</div><div className="mt-1 text-sm text-slate-600">Objects and fields</div></div>
                  <div className="border-2 border-black bg-[#F8FAFC] p-3 shadow-[4px_4px_0px_#000]"><div className="text-xs font-black text-[#5B8CFF]">02</div><div className="mt-1 text-lg font-black uppercase">Control Layer</div><div className="mt-1 text-sm text-slate-600">Rules and workflows</div></div>
                  <div className="border-2 border-black bg-[#F8FAFC] p-3 shadow-[4px_4px_0px_#000]"><div className="text-xs font-black text-[#5B8CFF]">03</div><div className="mt-1 text-lg font-black uppercase">Operational Layer</div><div className="mt-1 text-sm text-slate-600">Daily execution</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
