import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";

export default async function Events() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("status", "Published")
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  return (
    <section className="bg-[#07182F] py-24">
      <Container>

        <SectionTitle
          badge="EVENTS"
          title="Upcoming Activities"
          subtitle="Stay updated with the latest TECHNOBITS activities and announcements."
        />

        <div className="grid gap-6 lg:grid-cols-3">

          {events?.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
            >
              <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">

                <GlassCard>

                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-slate-300">
                    {event.description}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-cyan-400">
                    {event.start_date &&
                      new Date(
                        event.start_date
                      ).toLocaleDateString()}
                  </p>

                </GlassCard>

              </div>
            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
}