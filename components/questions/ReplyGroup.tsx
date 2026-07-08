"use client";

import { useState } from "react";

export default function ReplyGroup({
  children,
  count,
}: {
  children: React.ReactNode;
  count: number;
}) {
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <div className="mt-5">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
      >
        {open
          ? `▲ Hide Replies`
          : `▼ View ${count} ${count === 1 ? "Reply" : "Replies"}`}
      </button>

      {open && (
        <div className="mt-5 ml-8 space-y-5 border-l border-white/10 pl-6">
          {children}
        </div>
      )}

    </div>
  );
}