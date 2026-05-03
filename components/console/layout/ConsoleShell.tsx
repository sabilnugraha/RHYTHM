import { ReactNode } from 'react';

import { ConsoleSidebar } from './ConsoleSidebar';
import { ConsoleTopBar } from './ConsoleTopBar';
import { ConsoleTabBar } from './ConsoleTabBar';
import { RhythmDock } from '../dock/RhythmDock';

type ConsoleShellProps = {
  children: ReactNode;
};

export function ConsoleShell({ children }: ConsoleShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F1E8] text-[#151515]">
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#15151518_1px,transparent_1px),linear-gradient(90deg,#15151518_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="relative z-10 flex min-h-screen">
        <ConsoleSidebar />
        <section className="flex min-w-0 flex-1 flex-col p-4">
          <ConsoleTopBar />
          <ConsoleTabBar />
          <div className="mt-4 min-h-0 flex-1 overflow-auto border-2 border-black bg-[#FFFDF8] p-5 shadow-[6px_6px_0px_#000]">
            {children}
          </div>
        </section>
      </div>
      <RhythmDock />
    </main>
  );
}
