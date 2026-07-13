"use client";

import Link from "next/link";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";

const discussions = [
  {
    title: "💡 Website Improvement Suggestions",
  },
  {
    title: "🎮 What activity would you like TECHNOBITS to organize next?",
  },
  {
    title: "❓ Ask TECHNOBITS",
  },
];

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

          {discussions.map((discussion) => (
            <Link
              key={discussion.title}
              href="/ask"
            >
              <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">

                <GlassCard>

                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                    {discussion.title}
                  </h3>

                </GlassCard>

              </div>
            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
}