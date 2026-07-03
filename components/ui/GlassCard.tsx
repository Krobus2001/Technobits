"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function GlassCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      transition-all
      duration-300
      hover:border-cyan-400/40
      hover:shadow-[0_0_45px_rgba(34,211,238,.18)]
      "
    >
      <div
        className="
        absolute
        inset-0
        opacity-0
        transition
        duration-300
        group-hover:opacity-100
        bg-gradient-to-br
        from-cyan-500/10
        via-transparent
        to-blue-500/10
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}