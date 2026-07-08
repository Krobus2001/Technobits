import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { deleteEvent } from "./actions";

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

    const totalEvents = events?.length ?? 0;

    const publishedEvents =
     events?.filter((event) => event.status === "Published").length ?? 0;

    const draftEvents =
    events?.filter((event) => event.status === "Draft").length ?? 0;

    const featuredEvents =
    events?.filter((event) => event.featured).length ?? 0;

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black text-white">
            Events
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all TECHNOBITS events.
          </p>

        </div>

        <Link
          href="/admin/events/new"
          className="rounded-lg bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          + New Event
        </Link>

      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-[#132742] p-6">
            <p className="text-slate-400">
            Total Events
            </p>

            <h2 className="mt-2 text-5xl font-black text-white">
            {totalEvents}
            </h2>
        </div>

        <div className="rounded-2xl bg-emerald-900/30 p-6">
            <p className="text-emerald-400">
            Published
            </p>

            <h2 className="mt-2 text-5xl font-black text-white">
            {publishedEvents}
            </h2>
        </div>

        <div className="rounded-2xl bg-yellow-900/20 p-6">
            <p className="text-yellow-400">
            Drafts
            </p>

            <h2 className="mt-2 text-5xl font-black text-white">
            {draftEvents}
            </h2>
        </div>

        <div className="rounded-2xl bg-cyan-900/30 p-6">
            <p className="text-cyan-400">
            Featured
            </p>

            <h2 className="mt-2 text-5xl font-black text-white">
            {featuredEvents}
            </h2>
        </div>

        </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>

              <th className="p-5 text-left text-white">
                Poster
              </th>

              <th className="text-left text-white">
                Title
              </th>

              <th className="text-left text-white">
                Type
              </th>

              <th className="text-left text-white">
                Date
              </th>

              <th className="text-left text-white">
                Status
              </th>

              <th className="text-left text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {events?.map((event) => (

              <tr
                key={event.id}
                className="border-t border-white/10"
              >

                <td className="p-5">

                  <img
                    src={event.poster_url}
                    alt={event.title}
                    className="h-16 w-24 rounded-lg object-cover"
                  />

                </td>

                <td className="font-semibold text-white">
                  {event.title}
                </td>

                <td className="text-slate-300">
                  {event.event_type}
                </td>

                <td className="text-slate-300">
                  {event.start_date
                    ? new Date(
                        event.start_date
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      event.status === "Published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {event.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-3">

                    <Link
                    href={`/admin/events/${event.id}`}
                    className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400"
                    >
                    Edit
                    </Link>

                   <form action={deleteEvent.bind(null, event.id)}>
                    <button
                        type="submit"
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
                    >
                        Delete
                    </button>
                    </form>

                </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}