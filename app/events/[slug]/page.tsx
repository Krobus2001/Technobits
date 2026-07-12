import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

        <Link
          href="/"
          className="hover:text-cyan-400"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          href="/events"
          className="hover:text-cyan-400"
        >
          Events
        </Link>

        <span>/</span>

        <span className="text-white">
          {event.title}
        </span>

      </div>

      {/* Poster */}

      <div className="mb-10 flex items-center justify-center rounded-3xl bg-[#051120] p-6">
      <img
        src={event.poster_url}
        alt={event.title}
        className="max-h-[900px] w-auto max-w-full rounded-2xl object-contain"
      />
    </div>

      {/* Event Type */}

      <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
        {event.event_type}
      </span>

      {/* Title */}

      <h1 className="mt-6 text-5xl font-black text-white">
        {event.title}
      </h1>

      {/* Description */}

      <p className="mt-6 text-xl leading-8 text-slate-400">
        {event.description}
      </p>

      {/* Info Cards */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">
            📅 Event Date
            </p>

            <p className="mt-2 font-bold text-white">
            {event.start_date
                ? new Date(event.start_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                : "TBA"}
            </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <p className="text-sm text-slate-400">
            🕒 Time
        </p>

        <p className="mt-2 font-bold text-white">

            {event.start_date
            ? new Date(event.start_date).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                })
            : "TBA"}

            {" - "}

            {event.end_date
            ? new Date(event.end_date).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                })
            : "TBA"}

        </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">
            Venue
          </p>

          <p className="mt-2 font-bold text-white">
            {event.venue}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">
            Eligibility
          </p>

          <p className="mt-2 font-bold text-white">
            {event.eligibility}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">
            Registration Fee
          </p>

          <p className="mt-2 font-bold text-cyan-400">
            {event.registration_fee}
          </p>
        </div>

      </div>

      {/* Register */}

      {event.registration_url && (

        <div className="mt-10">

          <a
            href={event.registration_url}
            target="_blank"
            className="inline-flex rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition hover:bg-cyan-400"
          >
            Register Now
          </a>

        </div>

      )}

      {/* Rich Text */}

      <article
        className="prose prose-invert mt-16 max-w-none"
        dangerouslySetInnerHTML={{
          __html: event.content,
        }}
      />

      {/* Back */}

      <div className="mt-16">

        <Link
          href="/events"
          className="inline-flex rounded-xl border border-white/10 px-6 py-3 text-white transition hover:border-cyan-400 hover:text-cyan-400"
        >
          ← Back to Events
        </Link>

      </div>

    </div>
  );
}