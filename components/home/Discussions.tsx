"use client";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";

export default function Discussions() {
  return (
    <section className="bg-[#07182F] py-24">
      <Container>

        <SectionTitle
          badge="COMMUNITY"
          title="Latest Discussions"
          subtitle="Join conversations with fellow members."
        />

        <div className="space-y-5">

          <GlassCard>
            <h3 className="text-xl text-white font-bold">
              How do I start learning React?
            </h3>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl text-white font-bold">
              Best free IDE for programming?
            </h3>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl text-white font-bold">
              Windows vs Linux for students
            </h3>
          </GlassCard>

        </div>

      </Container>
    </section>
  );
}