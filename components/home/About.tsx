"use client";

import ScrollReveal from "../effects/ScrollReveal";
import {
  Target,
  Eye,
  Lightbulb,
  Users,
} from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";

const cards = [
  {
    title: "Mission",
    icon: Target,
    description:
      "The club aims to improve the ICT skills of its members by nurturing their creativity, programming and business skills, while sharpening their research and presentation abilities. It also promotes innovation by encouraging members to develop technological solutions for challenges both in school and in society.",
  },
  {
    title: "Vision",
    icon: Eye,
    description:
      "To enable ICT-proficient students to become more than observers of technological development, but creators and catalysts of innovation within our own community.",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "Encourage creativity, problem-solving, and real-world technology projects.",
  },
  {
    title: "Community",
    icon: Users,
    description:
      "Build a welcoming environment where everyone can learn, collaborate, and grow together.",
  },
];

export default function About() {
  return (
    <section className="bg-[#07182F] py-24">
      <Container>

        <SectionTitle
          badge="ABOUT US"
          title="Who is TECHNOBITS?"
          subtitle="TECHNOBITS is the official technology club dedicated to helping students explore programming, networking, cybersecurity, multimedia, and emerging technologies through collaboration, workshops, competitions, and real-world projects."
        />

        <div className="grid gap-6 md:grid-cols-2">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <ScrollReveal
                key={card.title}
                delay={index * 0.1}
              >
                <GlassCard>

                  <div className="flex items-start gap-5">

                    <div className="rounded-2xl bg-blue-500/10 p-4">
                      <Icon
                        size={34}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>

                      <h3 className="mb-3 text-2xl font-bold text-white">
                        {card.title}
                      </h3>

                      <p className="leading-7 text-slate-300">
                        {card.description}
                      </p>

                    </div>

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