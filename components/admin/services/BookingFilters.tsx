"use client";

import { useMemo, useState } from "react";
import BookingStatusButton from "@/components/services/BookingStatusButton";

type Booking = {
  id: string;
  full_name: string;
  student_id: string;
  contact_number: string;
  device_type: string;
  device_brand: string;
  problem_description: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  services: {
    title: string;
  } | null;
};

const FILTERS = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function BookingFilters({
  bookings,
}: {
  bookings: Booking[];
}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Statistics
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      inProgress: bookings.filter((b) => b.status === "In Progress").length,
      completed: bookings.filter((b) => b.status === "Completed").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    };
  }, [bookings]);

  // Filtering + Search
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        filter === "All" || booking.status === filter;

      const term = search.toLowerCase();

      const matchesSearch =
        booking.full_name.toLowerCase().includes(term) ||
        booking.student_id.toLowerCase().includes(term) ||
        booking.contact_number.toLowerCase().includes(term) ||
        booking.device_brand.toLowerCase().includes(term) ||
        booking.device_type.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, filter, search]);

  return (
    <>
      {/* Statistics */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
          <p className="text-sm text-slate-400">Total</p>
          <h2 className="mt-2 text-3xl font-black text-cyan-400">
            {stats.total}
          </h2>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
          <p className="text-sm text-slate-400">Pending</p>
          <h2 className="mt-2 text-3xl font-black text-yellow-400">
            {stats.pending}
          </h2>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
          <p className="text-sm text-slate-400">Confirmed</p>
          <h2 className="mt-2 text-3xl font-black text-blue-400">
            {stats.confirmed}
          </h2>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
          <p className="text-sm text-slate-400">In Progress</p>
          <h2 className="mt-2 text-3xl font-black text-purple-400">
            {stats.inProgress}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
          <p className="text-sm text-slate-400">Completed</p>
          <h2 className="mt-2 text-3xl font-black text-green-400">
            {stats.completed}
          </h2>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
          <p className="text-sm text-slate-400">Cancelled</p>
          <h2 className="mt-2 text-3xl font-black text-red-400">
            {stats.cancelled}
          </h2>
        </div>

      </div>

      {/* Status Filter */}
      <div className="mt-8 flex flex-wrap gap-3">
        {FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-5 py-2 font-semibold transition ${
              filter === status
                ? "bg-cyan-500 text-black"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by name, Student ID, phone, or device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#07182F] px-5 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      {/* Booking List */}
      <div className="mt-10 space-y-6">
        {filteredBookings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-slate-400">
            No bookings found.
          </div>
        )}

        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-white/10 bg-[#07182F] p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {booking.full_name}
                </h2>

                <p className="mt-2 text-cyan-400">
                  {booking.services?.title}
                </p>

                <p className="mt-4 text-slate-400">
                  {booking.device_type}
                </p>

                <p className="text-slate-400">
                  {booking.device_brand}
                </p>

                <p className="mt-4 text-white">
                  {booking.problem_description}
                </p>

                <div className="mt-6 text-sm text-slate-400">
                  <p>
                    📅{" "}
                    {new Date(booking.appointment_date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>

                  <p>
                    🕒{" "}
                    {new Date(
                      `2000-01-01T${booking.appointment_time}`
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>

                  <p>🎓 {booking.student_id}</p>
                  <p>📱 {booking.contact_number}</p>
                </div>
              </div>

              <BookingStatusButton booking={booking} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}