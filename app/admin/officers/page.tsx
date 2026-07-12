import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { deleteOfficer } from "./actions";

export default async function OfficersPage() {
  const supabase = await createClient();

  const { data: officers } = await supabase
    .from("officers")
    .select(`
      *,
      club_positions (
        id,
        title,
        category
      )
    `)
    .order("club_position_id");

  return (
    <div>
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black text-white">
            Officers
          </h1>

          <p className="mt-2 text-slate-400">
            Manage the officers displayed on the Officers page.
          </p>
        </div>

        <div className="flex gap-4">

          <Link
            href="/admin/officers/new"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
          >
            + Add Officer
          </Link>

          <Link
            href="/admin/officers/settings"
            className="rounded-xl bg-white/10 px-6 py-3 font-bold text-white"
          >
            Academic Year
          </Link>

        </div>

      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">

        <table className="w-full">

          <thead className="bg-white/5">
            <tr>
              <th className="p-5 text-left text-white">
                Officer
              </th>

              <th className="text-left text-white">
                Position
              </th>

              <th className="text-left text-white">
                Academic Year
              </th>

              <th className="text-right text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {officers?.map((officer) => (

              <tr
                key={officer.id}
                className="border-t border-white/10"
              >

                <td className="p-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={officer.photo_url}
                      alt={officer.full_name}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div>

                      <p className="font-bold text-white">
                        {officer.full_name}
                      </p>

                      <p className="text-sm text-slate-400">
                        {officer.quote || "No quote"}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="text-white">
                  {officer.club_positions?.title}
                </td>

                <td className="text-slate-400">
                  {officer.academic_year}
                </td>

                <td className="pr-5">

                  <div className="flex justify-end gap-3">

                    <Link
                      href={`/admin/officers/${officer.id}`}
                      className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black"
                    >
                      Edit
                    </Link>

                    <form
                      action={deleteOfficer.bind(
                        null,
                        officer.id
                      )}
                    >
                      <button
                        className="rounded-lg bg-red-500 px-5 py-2 font-bold text-white hover:bg-red-400"
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