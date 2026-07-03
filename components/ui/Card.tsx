import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#102C4E] p-8 shadow-xl transition hover:-translate-y-2 hover:border-blue-400/30">
      {children}
    </div>
  );
}