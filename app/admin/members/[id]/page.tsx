import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { updateMember } from "./actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  // Get Member
  const { data: member } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) {
    notFound();
  }

  // Get Website Roles
  const { data: websiteRoles } = await supabase
    .from("website_roles")
    .select("*")
    .order("id");

  // Get Club Positions
  const { data: clubPositions } = await supabase
    .from("club_positions")
    .select("*")
    .order("display_order");

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-4xl font-black text-white">
        Edit Member
      </h1>

      <form
        action={updateMember.bind(null, id)}
        className="rounded-xl bg-white/5 p-8"
      >
        <div className="flex items-center gap-6">
          <img
            src={member.avatar_url}
            alt={member.full_name}
            className="h-24 w-24 rounded-full"
          />

          <div>
            <h2 className="text-2xl font-bold text-white">
              {member.full_name}
            </h2>

            <p className="text-slate-400">
              {member.email}
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6">

          {/* Website Role */}

          <div>
            <label className="mb-2 block text-white">
              Website Role
            </label>

            <select
              name="website_role_id"
              defaultValue={member.website_role_id}
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              {websiteRoles?.map((role) => (
                <option
                  key={role.id}
                  value={role.id}
                >
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Club Position */}

          <div>
            <label className="mb-2 block text-white">
              Club Position
            </label>

            <select
              name="club_position_id"
              defaultValue={member.club_position_id}
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              {clubPositions?.map((position) => (
                <option
                  key={position.id}
                  value={position.id}
                >
                  {position.title}
                </option>
              ))}
            </select>
          </div>

          {/* Account Status */}

          <div>
            <label className="mb-2 block text-white">
              Account Status
            </label>

            <select
              name="account_status"
              defaultValue={member.account_status}
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              <option value="Active">Active</option>
              <option value="Muted">Muted</option>
              <option value="Banned">Banned</option>
            </select>
          </div>

          {/* Status Reason */}

          <div>
            <label className="mb-2 block text-white">
              Status Reason
            </label>

            <textarea
              name="status_reason"
              defaultValue={member.status_reason ?? ""}
              placeholder="Reason for mute or ban..."
              className="h-32 w-full rounded-lg bg-[#07182F] p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
          >
            Save Changes
          </button>

        </div>
      </form>
    </div>
  );
}