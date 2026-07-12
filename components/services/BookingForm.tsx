"use client";

import { useState } from "react";

type Props = {
  serviceId: string;
  appointmentDate: Date;
  appointmentTime: string;
};

export default function BookingForm({
  serviceId,
  appointmentDate,
  appointmentTime,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    student_id: "",
    contact_number: "",
    device_type: "Laptop",
    device_brand: "",
    problem_description: "",
  });

  async function submitBooking() {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        appointment_date: appointmentDate
          .toISOString()
          .split("T")[0],
        appointment_time: appointmentTime,
        ...form,
      }),
    });

    setLoading(false);

    if (!res.ok) {
  const err = await res.json();

  console.log(err);

  alert(err.error);

  return;
}

    alert("Booking submitted successfully!");

    location.reload();
  }

  function update(
    key: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="mt-14 rounded-2xl border border-white/10 bg-[#07182F] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Booking Details
      </h2>

      <div className="grid gap-6">

        <input
          placeholder="Full Name"
          className="rounded-lg bg-[#061425] p-4 text-white"
          value={form.full_name}
          onChange={(e) =>
            update("full_name", e.target.value)
          }
        />

        <input
          placeholder="Student ID"
          className="rounded-lg bg-[#061425] p-4 text-white"
          value={form.student_id}
          onChange={(e) =>
            update("student_id", e.target.value)
          }
        />

        <input
          placeholder="Contact Number"
          className="rounded-lg bg-[#061425] p-4 text-white"
          value={form.contact_number}
          onChange={(e) =>
            update("contact_number", e.target.value)
          }
        />

        <select
          className="rounded-lg bg-[#061425] p-4 text-white"
          value={form.device_type}
          onChange={(e) =>
            update("device_type", e.target.value)
          }
        >
          <option>Laptop</option>
          <option>Desktop</option>
          <option>Printer</option>
          <option>Phone</option>
          <option>Other</option>
        </select>

        <input
          placeholder="Device Brand"
          className="rounded-lg bg-[#061425] p-4 text-white"
          value={form.device_brand}
          onChange={(e) =>
            update("device_brand", e.target.value)
          }
        />

        <textarea
          rows={5}
          placeholder="Describe the issue..."
          className="rounded-lg bg-[#061425] p-4 text-white"
          value={form.problem_description}
          onChange={(e) =>
            update(
              "problem_description",
              e.target.value
            )
          }
        />

      </div>

      <button
        onClick={submitBooking}
        disabled={loading}
        className="mt-8 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black"
      >
        {loading
          ? "Booking..."
          : "Book Appointment"}
      </button>

    </div>
  );
}