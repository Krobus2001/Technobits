"use client";

import { useEffect, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import TimeSlots from "./TimeSlots";
import BookingForm from "./BookingForm";

type ScheduleDay = {
  id: number;
  day_of_week: number;
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
  slot_duration: number;
};

type Props = {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    estimated_duration: number;
  };

  schedule: ScheduleDay[];
};

export default function ServiceBookingClient({
  service,
  schedule,
}: Props) {
  const [selectedDate, setSelectedDate] =
    useState<Date>();

  const [selectedTime, setSelectedTime] =
    useState<string | null>(null);

  const [bookedTimes, setBookedTimes] =
    useState<string[]>([]);

  const selectedSchedule =
    selectedDate
      ? schedule.find(
          (day) =>
            day.day_of_week === selectedDate.getDay()
        )
      : null;

  useEffect(() => {
    if (!selectedDate) {
      setBookedTimes([]);
      return;
    }

    const date = selectedDate
      .toISOString()
      .split("T")[0];

    fetch(
      `/api/services/${service.id}/bookings?date=${date}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookedTimes(
          data.map(
            (booking: any) =>
              booking.appointment_time.slice(0, 5)
          )
        );
      });
  }, [selectedDate, service.id]);

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        {service.title}
      </h1>

      <p className="mt-6 text-xl text-slate-400">
        {service.description}
      </p>

      <div className="mt-10 flex gap-8">

        <div className="rounded-xl border border-white/10 bg-[#07182F] px-6 py-4">

          <p className="text-slate-400">
            Price
          </p>

          <p className="text-2xl font-bold text-cyan-400">
            ₱{service.price}
          </p>

        </div>

        <div className="rounded-xl border border-white/10 bg-[#07182F] px-6 py-4">

          <p className="text-slate-400">
            Duration
          </p>

          <p className="text-2xl font-bold text-white">
            {service.estimated_duration} mins
          </p>

        </div>

      </div>

      <div className="mt-16">

        <BookingCalendar
          selected={selectedDate}
          onSelect={setSelectedDate}
        />

      </div>

      {selectedDate && (

        <>
          <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">

            <h2 className="text-2xl font-bold text-white">
              Selected Date
            </h2>

            <p className="mt-2 text-cyan-400">
              {selectedDate.toDateString()}
            </p>

          </div>

        {selectedSchedule?.is_open ? (

            <>

                <TimeSlots
                openTime={selectedSchedule.open_time!}
                closeTime={selectedSchedule.close_time!}
                slotDuration={selectedSchedule.slot_duration}
                bookedTimes={bookedTimes}
                selected={selectedTime}
                onSelect={setSelectedTime}
                />

                {selectedTime && (
                <BookingForm
                    serviceId={service.id}
                    appointmentDate={selectedDate}
                    appointmentTime={selectedTime}
                />
                )}

            </>

            ) : (

            <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">

                <h2 className="text-2xl font-bold text-yellow-300">
                Club Closed
                </h2>

                <p className="mt-2 text-yellow-200">
                TECHNOBITS is not accepting bookings on this day.
                </p>

            </div>

            )}
        </>

      )}
    </>
  );
}