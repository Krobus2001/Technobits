"use client";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";

export default function Tutorials() {
  return (
    <section className="bg-[#081A31] py-24">
      <Container>

        <SectionTitle
          badge="TUTORIALS"
          title="Featured Tutorials"
          subtitle="Begin learning technology with our beginner-friendly guides."
        />

        <div className="grid gap-6 md:grid-cols-3">

          <GlassCard>
            <h3 className="text-white font-bold">HTML Basics</h3>
            <p className="mt-3 text-slate-300">
              Learn the fundamentals of web development.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="text-white font-bold">Python Basics</h3>
            <p className="mt-3 text-slate-300">
              Start programming with Python.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="text-white font-bold">Computer Networking</h3>
            <p className="mt-3 text-slate-300">
              Understand IP addresses and networking.
            </p>
          </GlassCard>

        </div>

      </Container>
    </section>
  );
}