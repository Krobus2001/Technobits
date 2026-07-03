"use client";

import {
  Laptop,
  HardDrive,
  BrushCleaning,
  Download,
  Printer,
  Gauge,
} from "lucide-react";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import ScrollReveal from "../effects/ScrollReveal";

const services = [
  {
    title: "Windows Installation",
    description: "Professional Windows installation and setup.",
    icon: Laptop,
  },
  {
    title: "Formatting",
    description: "Clean formatting while preserving important files.",
    icon: HardDrive,
  },
  {
    title: "Laptop Cleaning",
    description: "Internal cleaning and maintenance.",
    icon: BrushCleaning,
  },
  {
    title: "Software Installation",
    description: "Install essential software safely.",
    icon: Download,
  },
  {
    title: "Printer Setup",
    description: "Printer installation and troubleshooting.",
    icon: Printer,
  },
  {
    title: "PC Optimization",
    description: "Improve your computer's performance.",
    icon: Gauge,
  },
];

export default function Services() {
  return (
    <section className="bg-[#081A31] py-24">
      <Container>
        <SectionTitle
          badge="SERVICES"
          title="What We Offer"
          subtitle="Affordable technology services for students."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <ScrollReveal
                key={service.title}
                delay={index * 0.08}
              >
                <GlassCard>
                  <Icon
                    className="mb-5 text-cyan-400"
                    size={42}
                  />

                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {service.title}
                  </h3>

                  <p className="text-slate-300">
                    {service.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}