"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07182F]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-blue-400/30 bg-white/5 shadow-lg shadow-blue-500/30">
            <Image
              src="/logo/technobitslogo.png"
              alt="TECHNOBITS Logo"
              fill
              priority
              className="object-contain p-1"
            />
          </div>

          <div>
            <h1 className="font-black tracking-wider text-white">
              TECHNOBITS
            </h1>

            <p className="text-xs text-slate-400">
              CCS Technology Club
            </p>
          </div>

        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-300 transition hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-300 transition hover:text-blue-400"
          >
            Community
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-300 transition hover:text-blue-400"
          >
            Tutorials
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-300 transition hover:text-blue-400"
          >
            Events
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-300 transition hover:text-blue-400"
          >
            About
          </Link>
        </nav>

        {/* Join Button */}
        <button className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition duration-300 hover:scale-105 hover:shadow-blue-500/50">
          Join Club
        </button>

      </div>
    </header>
  );
}