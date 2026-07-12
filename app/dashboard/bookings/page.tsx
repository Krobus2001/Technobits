import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function MyBookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookings } = await supabase
    .from("service_bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

      <div>

        <h1 className="text-5xl font-black text-white">
          My Bookings
        </h1>

        <p className="mt-3 text-slate-400">
          View the status of your service requests.
        </p>

      </div>

      <div className="flex flex-wrap gap-3">

        <Link
          href="/services"
          className="rounded-lg bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          + Book Service
        </Link>

        <Link
          href="/dashboard"
          className="rounded-lg border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          ← Dashboard
        </Link>

      </div>

    </div>

      {bookings?.length === 0 ? (

        <div className="mt-16 rounded-2xl border border-dashed border-white/10 py-20 text-center">

          <h2 className="text-3xl font-bold text-white">
            No Bookings Yet
          </h2>

          <p className="mt-3 text-slate-400">
            You haven't booked any services yet.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
          >
            Book a Service
          </Link>

        </div>

      ) : (

        <div className="mt-12 space-y-6">

          {bookings?.map((booking) => (

            <Link
              key={booking.id}
              href={`/dashboard/bookings/${booking.id}`}
              className="block rounded-2xl border border-white/10 bg-[#07182F] p-6 transition hover:border-cyan-400 hover:bg-[#0b2140]"
            >

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {booking.device_brand}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {booking.problem_description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-400">

                    <span>
                      📅 {booking.appointment_date}
                    </span>

                    <span>
                      🕒 {booking.appointment_time}
                    </span>

                    <span>
                      💻 {booking.device_type}
                    </span>

                  </div>

                </div>

                <div>

                  <span
                    className={`rounded-full px-5 py-2 text-sm font-bold ${
                      booking.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : booking.status === "Cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {booking.status}
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}