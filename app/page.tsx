export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#151515]">
      <section className="relative min-h-screen overflow-hidden px-6 py-6 md:px-10">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#15151518_1px,transparent_1px),linear-gradient(90deg,#15151518_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute -left-20 top-4 h-36 w-36 -rotate-6 border-2 border-black bg-[#BFE8FF] shadow-[7px_7px_0px_#000]" />
        <div className="absolute right-12 top-28 h-16 w-16 rotate-3 border-2 border-black bg-[#FFD6A5] shadow-[6px_6px_0px_#000]" />
        <div className="absolute -right-12 bottom-20 h-40 w-40 -rotate-6 border-2 border-black bg-[#CDEFD7] shadow-[7px_7px_0px_#000]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="flex items-center justify-between border-2 border-black bg-[#FFFDF8] px-5 py-4 shadow-[6px_6px_0px_#000]">
            <div className="text-xl font-black tracking-tight">RHYTHM</div>
            <div className="hidden gap-6 text-sm font-bold uppercase tracking-wider text-neutral-700 md:flex">
              <span>Layers</span>
              <span>System</span>
              <span>Demo</span>
            </div>
            <button className="border-2 border-black bg-[#A7C7FF] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_#000]">Early Access</button>
          </nav>

          <div className="grid min-h-[calc(100vh-92px)] items-center gap-10 py-8 lg:grid-cols-2 lg:py-10">
            <div>
              <div className="mb-5 inline-flex border-2 border-black bg-[#CDEFD7] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-[4px_4px_0px_#000]">Intelligent ERP Platform</div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
                Your Business Has A Rhythm.
                <span className="block text-[#18A999]">RHYTHM Learns It.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-700 md:text-lg">Stop forcing your business into rigid software. RHYTHM adapts to your process, not the other way around.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="border-2 border-black bg-[#A7C7FF] px-5 py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_#000]">Book a Demo</button>
                <button className="border-2 border-black bg-[#FFFDF8] px-5 py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_#000]">Explore Features →</button>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="border-2 border-black bg-[#FFFDF8] px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Flow Ready</span>
                <span className="border-2 border-black bg-[#FFD6A5] px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Real Time</span>
                <span className="border-2 border-black bg-[#CDEFD7] px-3 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">Adaptive</span>
              </div>
            </div>

            <div className="relative flex min-h-[580px] items-center justify-center overflow-visible">
              <div className="absolute bottom-10 left-1/2 h-[430px] w-[520px] -translate-x-1/2 rounded-[3.5rem] rounded-b-[8rem] border-[3px] border-black bg-[#FF6ACD] shadow-[14px_14px_0px_#000] [background-image:radial-gradient(#151515_2px,transparent_2px)] [background-size:24px_24px]" />

              <img
                src="/rithbot.png"
                alt="RHYTHM Bot"
                className="relative z-10 w-full max-w-[840px] object-contain transition duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
