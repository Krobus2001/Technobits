import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: booking } = await supabase
    .from("service_bookings")
    .select(`
      *,
      services (
        title
      )
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!booking) {
    notFound();
  }

  const statusColor =
    booking.status === "Completed"
      ? "bg-green-500/20 text-green-400"
      : booking.status === "Pending"
      ? "bg-yellow-500/20 text-yellow-400"
      : booking.status === "Cancelled"
      ? "bg-red-500/20 text-red-400"
      : "bg-cyan-500/20 text-cyan-400";

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        <div>

          <h1 className="text-5xl font-black text-white">
            Booking Details
          </h1>

          <p className="mt-3 text-slate-400">
            View the complete details of your booking.
          </p>

        </div>

        <Link
          href="/dashboard/bookings"
          className="rounded-lg border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          ← My Bookings
        </Link>

      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-[#07182F] p-8">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            {booking.device_brand}
          </h2>

          <span
            className={`rounded-full px-5 py-2 text-sm font-bold ${statusColor}`}
          >
            {booking.status}
          </span>

        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          <div>

            <h3 className="mb-3 text-lg font-bold text-white">
              Service
            </h3>

            <p className="text-slate-300">
              {booking.services?.title ?? "Service"}
            </p>

          </div>

          <div>

            <h3 className="mb-3 text-lg font-bold text-white">
              Appointment
            </h3>

            <p className="text-slate-300">
              {booking.appointment_date}
            </p>

            <p className="text-slate-300">
              {booking.appointment_time}
            </p>

          </div>

          <div>

            <h3 className="mb-3 text-lg font-bold text-white">
              Customer Information
            </h3>

            <p className="text-slate-300">
              <strong>Name:</strong> {booking.full_name}
            </p>

            <p className="text-slate-300">
              <strong>Student ID:</strong> {booking.student_id}
            </p>

            <p className="text-slate-300">
              <strong>Contact:</strong> {booking.contact_number}
            </p>

          </div>

          <div>

            <h3 className="mb-3 text-lg font-bold text-white">
              Device Information
            </h3>

            <p className="text-slate-300">
              <strong>Type:</strong> {booking.device_type}
            </p>

            <p className="text-slate-300">
              <strong>Brand:</strong> {booking.device_brand}
            </p>

          </div>

        </div>

        <div className="mt-10">

          <h3 className="mb-3 text-lg font-bold text-white">
            Problem Description
          </h3>

          <div className="rounded-xl border border-white/10 bg-[#061425] p-5 text-slate-300 whitespace-pre-wrap">
            {booking.problem_description}
          </div>

        </div>

        {booking.status === "Cancelled" &&
          booking.cancel_reason && (

            <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">

              <h3 className="text-xl font-bold text-red-300">
                Reason for Cancellation
              </h3>

              <p className="mt-4 whitespace-pre-wrap text-red-100">
                {booking.cancel_reason}
              </p>

            </div>

        )}

      </div>

    </div>
  );
}