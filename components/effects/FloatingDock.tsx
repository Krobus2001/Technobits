"use client";

import Link from "next/link";
import {
  House,
  BookOpen,
  MessageCircle,
  CalendarDays,
  Wrench,
} from "lucide-react";

const items = [
  {
    icon: House,
    href: "/",
    label: "Home",
  },
  {
    icon: BookOpen,
    href: "/tutorials",
    label: "Tutorials",
  },
  {
    icon: MessageCircle,
    href: "/discussions",
    label: "Community",
  },
  {
    icon: CalendarDays,
    href: "/events",
    label: "Events",
  },
  {
    icon: Wrench,
    href: "/services",
    label: "Services",
  },
];

export default function FloatingDock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 lg:hidden">

      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#07182F]/80 px-4 py-3 backdrop-blur-xl shadow-2xl">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl p-3 text-slate-300 transition hover:bg-cyan-500/20 hover:text-cyan-400"
            >
              <Icon size={22} />
            </Link>
          );
        })}

      </div>

    </div>
  );
}