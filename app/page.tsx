export default function Home() {
  return (
    <main className="min-h-screen px-10 py-20 bg-[#0B0F1A] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            YOUR BUSINESS
            <br />
            HAS A RHYTHM.
            <br />
            RHYTHM LEARNS IT.
          </h1>

          <p className="mt-6 text-gray-400">
            Adaptive system that understands your flow, not forces it.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-[#5B8CFF] border-2 border-white px-6 py-3 shadow-[4px_4px_0px_#000] font-bold hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1">
              Start Building
            </button>
            <button className="bg-[#5B8CFF] border-2 border-white px-6 py-3 shadow-[4px_4px_0px_#000] font-bold hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="border-2 border-white h-80 flex items-center justify-center">
            FLOW VISUAL
          </div>

          <div className="absolute bottom-0 left-0 flex gap-2 mt-4 text-xs">
            <span className="border px-2 py-1">AI ACTIVE</span>
            <span className="border px-2 py-1">FLOW DETECTED</span>
            <span className="border px-2 py-1">REAL-TIME</span>
          </div>
        </div>

      </div>
    </main>
  );
}
