"use client";

import Container from "../ui/Container";

export default function FooterCTA() {
  return (
    <footer className="border-t border-white/10 bg-[#07182F] py-10">
      <Container>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <div>

            <h2 className="text-2xl font-black text-white">
              TECHNOBITS
            </h2>

            <p className="text-slate-400">
              Empowering Students Through Technology
            </p>

          </div>

          <p className="text-slate-500">
            © {new Date().getFullYear()} TECHNOBITS. All rights reserved.
          </p>

        </div>

      </Container>
    </footer>
  );
}