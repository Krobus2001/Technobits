"use client";

import { motion } from "framer-motion";

const particles = [
  { top: "10%", left: "15%" },
  { top: "20%", left: "75%" },
  { top: "30%", left: "45%" },
  { top: "40%", left: "90%" },
  { top: "50%", left: "25%" },
  { top: "60%", left: "60%" },
  { top: "70%", left: "10%" },
  { top: "80%", left: "80%" },
  { top: "90%", left: "35%" },
  { top: "15%", left: "55%" },
  { top: "25%", left: "5%" },
  { top: "35%", left: "65%" },
  { top: "45%", left: "40%" },
  { top: "55%", left: "95%" },
  { top: "65%", left: "50%" },
  { top: "75%", left: "20%" },
  { top: "85%", left: "70%" },
  { top: "95%", left: "12%" },
];

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />

      {particles.map((particle, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + (index % 4),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-2 w-2 rounded-full bg-blue-400"
          style={{
            top: particle.top,
            left: particle.left,
          }}
        />
      ))}
    </div>
  );
}