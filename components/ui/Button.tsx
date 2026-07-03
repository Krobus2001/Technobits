"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50"
            : "border border-cyan-400/40 bg-white/5 text-white backdrop-blur-xl hover:bg-cyan-500/10"
        }
        ${className}
      `}
    >
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}