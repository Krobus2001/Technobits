import { createClient } from "@/lib/supabase-server";
import { updateSchedule } from "./actions";

export default async function SchedulePage() {
  const supabase = await createClient();

    const { data: schedule, error } = await supabase
    .from("service_schedule")
    .select("*")
    .order("day_of_week");

    console.log(schedule);
    console.log(error);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>

      <h1 className="mb-10 text-4xl font-black text-white">
        Service Schedule
      </h1>

      <div className="space-y-5">

        {schedule?.map((day) => (

                <form
        key={day.id}
        action={updateSchedule}
        className="rounded-2xl border border-white/10 bg-[#07182F] p-6"
        >
        <input
            type="hidden"
            name="id"
            value={day.id}
        />

        <div className="flex items-center justify-between">

            <div>

            <h2 className="text-2xl font-bold text-white">
                {days[day.day_of_week]}
            </h2>

            <div className="mt-5 flex items-center gap-4">

                <label className="flex items-center gap-2 text-white">

                <input
                    type="checkbox"
                    name="is_open"
                    defaultChecked={day.is_open}
                />

                Open

                </label>

                <input
                type="time"
                name="open_time"
                defaultValue={day.open_time ?? ""}
                className="rounded-lg bg-[#0b223d] px-3 py-2 text-white"
                />

                <span className="text-slate-400">
                to
                </span>

                <input
                type="time"
                name="close_time"
                defaultValue={day.close_time ?? ""}
                className="rounded-lg bg-[#0b223d] px-3 py-2 text-white"
                />

            </div>

            </div>

            <button
            className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black"
            >
            Save
            </button>

        </div>
        </form>
        ))}

      </div>

    </div>
  );
}