"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import Background from "../effects/Background";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-[#07182F] via-[#0F2D52] to-[#173C66]">

      <Background />

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-24 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="mb-6 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-md">
            🚀 Trusted by Future Innovators
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-semibold uppercase tracking-[0.35em] text-blue-400"
          >
            Empowering Students Through Technology
          </motion.p>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Learn.
            <br />
            Build.
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Innovate.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-xl text-lg leading-8 text-slate-300"
          >
            TECHNOBITS is a community of passionate students who love
            programming, networking, multimedia, and emerging technologies.
            Together, we learn, collaborate, and build solutions that make a
            difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button>
              Join Community
            </Button>

            <Button variant="secondary">
              Learn More
            </Button>
          </motion.div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >

          <motion.div
            animate={{
              y: [-12, 12, -12],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >

            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-[120px]" />

            <div className="absolute -inset-5 rounded-full border border-blue-400/20" />

            <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

              <Image
                src="/technobitslogo.png"
                alt="TECHNOBITS Logo"
                width={320}
                height={320}
                priority
                className="drop-shadow-[0_0_45px_rgba(59,130,246,0.8)]"
              />

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}