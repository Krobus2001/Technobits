"use client";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";

export default function Events() {
  return (
    <section className="bg-[#07182F] py-24">
      <Container>

        <SectionTitle
          badge="EVENTS"
          title="Upcoming Activities"
          subtitle="Workshops, seminars, competitions and club activities."
        />

        <div className="grid gap-6 lg:grid-cols-3">

          <GlassCard>
            <h3 className="text-xl font-bold text-white">
              Programming Workshop
            </h3>

            <p className="mt-3 text-slate-300">
              Learn web development with hands-on projects.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white">
              PC Cleaning Day
            </h3>

            <p className="mt-3 text-slate-300">
              Free maintenance for selected students.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white">
              Tech Quiz Bowl
            </h3>

            <p className="mt-3 text-slate-300">
              Test your technology knowledge and win prizes.
            </p>
          </GlassCard>

        </div>

      </Container>
    </section>
  );
}