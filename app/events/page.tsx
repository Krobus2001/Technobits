import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("status", "Published")
    .order("start_date", {
      ascending: true,
    });

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

        <Link
          href="/"
          className="hover:text-cyan-400"
        >
          Home
        </Link>

        <span>/</span>

        <span className="text-white">
          Events
        </span>

      </div>

      {/* Hero */}

      <div className="mb-14 rounded-3xl border border-white/10 bg-gradient-to-r from-[#07182F] to-[#0A2545] p-10">

        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
          TECHNOBITS Events
        </span>

        <h1 className="mt-6 text-5xl font-black text-white">
          Upcoming Events
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-slate-400">
          Stay updated with seminars,
          workshops, tournaments,
          trainings and club activities.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {events?.map((event) => (

          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#07182F] transition hover:-translate-y-2 hover:border-cyan-400"
          >

            <img
              src={event.poster_url}
              className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="p-6">

              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400">
                {event.event_type}
              </span>

              <h2 className="mt-5 text-2xl font-bold text-white group-hover:text-cyan-400">
                {event.title}
              </h2>

              <p className="mt-3 text-slate-400 line-clamp-3">
                {event.description}
              </p>

              <div className="mt-8 space-y-2 text-sm text-slate-500">

                <p>
                  📅{" "}
                  {event.start_date &&
                    new Date(
                      event.start_date
                    ).toLocaleDateString()}
                </p>

                <p>
                  📍 {event.venue}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}