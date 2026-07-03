"use client";

import ScrollReveal from "../effects/ScrollReveal";
import {
  Users,
  FolderKanban,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";

const stats = [
  {
    title: "Members",
    value: "0+",
    icon: Users,
  },
  {
    title: "Projects",
    value: "0+",
    icon: FolderKanban,
  },
  {
    title: "Tutorials",
    value: "0+",
    icon: BookOpen,
  },
  {
    title: "Events",
    value: "0+",
    icon: CalendarDays,
  },
];

export default function Stats() {
  return (
    <section className="bg-[#081A31] py-24">
      <Container>

        <SectionTitle
          badge="TECHNOBITS"
          title="By The Numbers"
          subtitle="Building a stronger technology community one student at a time."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <ScrollReveal
                key={stat.title}
                delay={index * 0.08}
              >
                <GlassCard>

                  <div className="flex flex-col items-center text-center">

                    <div className="mb-5 rounded-2xl bg-blue-500/10 p-4 transition-all duration-300 group-hover:bg-cyan-500/20">
                      <Icon
                        size={38}
                        className="text-cyan-400"
                      />
                    </div>

                    <h2 className="text-5xl font-black text-white">
                      {stat.value}
                    </h2>

                    <p className="mt-3 text-slate-400">
                      {stat.title}
                    </p>

                  </div>

                </GlassCard>
              </ScrollReveal>
            );
          })}

        </div>

      </Container>
    </section>
  );
}