import { createClient } from "@/lib/supabase-server";
import { updateAcademicYear } from "../actions";
import Link from "next/link";

export default async function OfficerSettingsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("website_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="mx-auto max-w-xl">

      <Link
        href="/admin/officers"
        className="mb-8 inline-block rounded-xl border border-white/10 px-5 py-3 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
      >
        ← Back
      </Link>

      <h1 className="mb-8 text-4xl font-black text-white">
        Academic Year
      </h1>

      <form
        action={updateAcademicYear}
        className="space-y-6 rounded-2xl bg-[#07182F] p-8"
      >

        <input
          name="academic_year"
          defaultValue={data?.academic_year}
          className="w-full rounded-xl bg-[#091f39] p-4 text-white"
        />

        <button className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-black">
          Save
        </button>

      </form>

    </div>
  );
}