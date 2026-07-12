"use client";

type Props = {
  openTime: string;
  closeTime: string;
  slotDuration: number;

  bookedTimes: string[];

  selected: string | null;

  onSelect: (time: string) => void;
};

type TimeSlot = {
  value: string;
  label: string;
};

export default function TimeSlots({
  openTime,
  closeTime,
  slotDuration,
  bookedTimes,
  selected,
  onSelect,
}: Props) {

  function generateSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];

    const [oh, om] = openTime.split(":").map(Number);
    const [ch, cm] = closeTime.split(":").map(Number);

    let minutes = oh * 60 + om;
    const end = ch * 60 + cm;

    while (minutes < end) {

      const h = Math.floor(minutes / 60);
      const m = minutes % 60;

      const time24 = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

      const displayTime = new Date(
        `2000-01-01T${time24}`
      ).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      slots.push({
        value: time24,
        label: displayTime,
      });

      minutes += slotDuration;
    }

    return slots;
  }

  return (
    <div className="mt-12">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Available Time Slots
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

        {generateSlots().map((slot) => {

        const booked = bookedTimes.includes(slot.value);

        return (

            <button
            key={slot.value}
            disabled={booked}
            onClick={() => onSelect(slot.value)}
            className={`rounded-xl border p-4 font-bold transition ${
                booked
                ? "cursor-not-allowed border-red-500/30 bg-red-500/10 text-red-300 opacity-60"
                : selected === slot.value
                ? "border-cyan-400 bg-cyan-500 text-black"
                : "border-white/10 bg-[#07182F] text-white hover:border-cyan-500"
            }`}
            >

            {slot.label}

            {booked && (
                <div className="mt-1 text-xs">
                Booked
                </div>
            )}

            </button>

        );

        })}

      </div>

    </div>
  );
}