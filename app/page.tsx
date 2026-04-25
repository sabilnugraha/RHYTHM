export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-white">
      <section className="min-h-screen px-6 py-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between border-2 border-white bg-[#121826] px-5 py-4 shadow-[6px_6px_0px_#000]">
            <div className="text-2xl font-black tracking-tight">RHYTHM</div>
            <div className="hidden gap-8 text-sm font-bold uppercase tracking-wider text-gray-300 md:flex">
              <span>Layers</span>
              <span>System</span>
              <span>Demo</span>
            </div>
            <button className="border-2 border-white bg-[#5B8CFF] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_#000]">Early Access</button>
          </nav>

          <div className="grid min-h-[calc(100vh-120px)] items-center gap-12 py-20 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex border-2 border-white bg-[#00FFD1] px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#0B0F1A] shadow-[4px_4px_0px_#000]">Intelligent ERP Platform</div>
              <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-8xl">
                Your Business Has A Rhythm.
                <span className="block text-[#5B8CFF]">RHYTHM Learns It.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">Stop forcing your business into rigid software. RHYTHM adapts to your structure, workflow, and daily operations.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button className="border-2 border-white bg-[#5B8CFF] px-7 py-4 text-sm font-black uppercase tracking-wider shadow-[6px_6px_0px_#000]">Start Building</button>
                <button className="border-2 border-white bg-[#161D2F] px-7 py-4 text-sm font-black uppercase tracking-wider shadow-[6px_6px_0px_#000]">Watch Demo</button>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="border border-white bg-[#0B0F1A] px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Flow Ready</span>
                <span className="border border-white bg-[#0B0F1A] px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Real Time</span>
                <span className="border border-white bg-[#0B0F1A] px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Adaptive</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 -top-5 h-full w-full border-2 border-white bg-[#A259FF] shadow-[10px_10px_0px_#000]" />
              <div className="relative border-2 border-white bg-[#161D2F] p-5 shadow-[10px_10px_0px_#000]">
                <div className="mb-5 flex items-center justify-between border-b-2 border-white pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00FFD1]">Live System Map</p>
                    <h2 className="mt-1 text-2xl font-black uppercase">Business Flow</h2>
                  </div>
                  <div className="border-2 border-white bg-[#00FFD1] px-3 py-2 text-xs font-black text-[#0B0F1A] shadow-[3px_3px_0px_#000]">ONLINE</div>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-white bg-[#0B0F1A] p-4 shadow-[5px_5px_0px_#000]"><div className="text-xs font-black text-[#00FFD1]">01</div><div className="mt-1 text-xl font-black uppercase">Structure Layer</div><div className="mt-1 text-sm text-gray-400">Objects and fields</div></div>
                  <div className="border-2 border-white bg-[#0B0F1A] p-4 shadow-[5px_5px_0px_#000]"><div className="text-xs font-black text-[#00FFD1]">02</div><div className="mt-1 text-xl font-black uppercase">Control Layer</div><div className="mt-1 text-sm text-gray-400">Rules and workflows</div></div>
                  <div className="border-2 border-white bg-[#0B0F1A] p-4 shadow-[5px_5px_0px_#000]"><div className="text-xs font-black text-[#00FFD1]">03</div><div className="mt-1 text-xl font-black uppercase">Operational Layer</div><div className="mt-1 text-sm text-gray-400">Daily execution</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
