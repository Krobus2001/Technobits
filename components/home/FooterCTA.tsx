"use client";

import Link from "next/link";
import Container from "../ui/Container";

export default function FooterCTA() {
  return (
    <footer className="border-t border-white/10 bg-[#07182F] py-10">
      <Container>

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Left */}

          <div className="text-center md:text-left">

            <h2 className="text-2xl font-black text-white">
              TECHNOBITS
            </h2>

            <p className="mt-2 text-slate-400">
              Empowering Students Through Technology
            </p>

          </div>

          {/* Right */}

          <div className="text-center md:pr-20 md:text-right">

            <p className="text-slate-500">
              © {new Date().getFullYear()} TECHNOBITS.
              All rights reserved.
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Designed & Developed by{" "}
              <Link
                href="/developer"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Blaise Tyrel Daga
              </Link>
            </p>

          </div>

        </div>

      </Container>
    </footer>
  );
}