"use client";

import { motion } from "framer-motion";

const particles = [
  { top: "8%", left: "12%", size: 4, duration: 5 },
  { top: "18%", left: "78%", size: 6, duration: 7 },
  { top: "28%", left: "35%", size: 5, duration: 6 },
  { top: "40%", left: "88%", size: 3, duration: 8 },
  { top: "52%", left: "18%", size: 6, duration: 5 },
  { top: "60%", left: "62%", size: 5, duration: 9 },
  { top: "72%", left: "82%", size: 4, duration: 6 },
  { top: "84%", left: "28%", size: 5, duration: 7 },
  { top: "90%", left: "55%", size: 4, duration: 5 },
  { top: "22%", left: "55%", size: 6, duration: 8 },
  { top: "12%", left: "92%", size: 3, duration: 6 },
  { top: "74%", left: "8%", size: 5, duration: 8 },
];

const lines = [
  { x1: "12%", y1: "8%", x2: "35%", y2: "28%" },
  { x1: "35%", y1: "28%", x2: "55%", y2: "22%" },
  { x1: "55%", y1: "22%", x2: "78%", y2: "18%" },
  { x1: "18%", y1: "52%", x2: "62%", y2: "60%" },
  { x1: "62%", y1: "60%", x2: "82%", y2: "72%" },
  { x1: "28%", y1: "84%", x2: "55%", y2: "90%" },
  { x1: "8%", y1: "74%", x2: "28%", y2: "84%" },
];

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        {lines.map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#38bdf8"
            strokeWidth="1"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          />
        ))}
      </svg>

      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-12, 12, -12],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[120px]" />

    </div>
  );
}