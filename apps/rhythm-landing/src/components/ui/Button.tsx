export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-[#5B8CFF] text-white font-bold border-2 border-white px-6 py-3 shadow-[4px_4px_0px_#000] transition-none hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1">
      {children}
    </button>
  );
};
