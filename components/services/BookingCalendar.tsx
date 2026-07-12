"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

export default function BookingCalendar({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#07182F] p-6">

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={{
          before: new Date(),
        }}
      />

    </div>
  );
}