import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function MembersPage() {
  const supabase = await createClient();

  // Check logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Only Super Admin can access this page
  const { data: profile } = await supabase
    .from("profiles")
    .select("website_role_id")
    .eq("id", user.id)
    .single();

  if (!profile || profile.website_role_id !== 1) {
    redirect("/admin");
  }

  // Get all members
  const { data: members, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  // Get website roles
  const {
    data: websiteRoles,
    error: websiteRolesError,
  } = await supabase
    .from("website_roles")
    .select("*");

  // Get club positions
  const {
    data: clubPositions,
    error: clubPositionsError,
  } = await supabase
    .from("club_positions")
    .select("*");

  if (error) {
    return (
      <div className="p-10 text-red-400">
        <h1 className="mb-4 text-3xl font-bold">
          Database Error
        </h1>

        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const membersWithRelations =
    members?.map((member) => ({
      ...member,
      websiteRole: websiteRoles?.find(
        (role) => role.id === member.website_role_id
      ),
      clubPosition: clubPositions?.find(
        (position) =>
          position.id === member.club_position_id
      ),
    })) ?? [];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">
            Members
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all registered TECHNOBITS members.
          </p>
        </div>

        <div className="rounded-lg bg-cyan-500 px-5 py-3 font-bold text-black">
          Total Members: {membersWithRelations.length}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="border-b border-white/10">
              <th className="p-5 text-left text-white">
                Avatar
              </th>
              <th className="text-left text-white">
                Name
              </th>
              <th className="text-left text-white">
                Club Position
              </th>
              <th className="text-left text-white">
                Website Role
              </th>
              <th className="text-left text-white">
                Status
              </th>
              <th className="text-left text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {membersWithRelations.map((member: any) => (
              <tr
                key={member.id}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                <td className="p-5">
                  <img
                    src={member.avatar_url}
                    alt={member.full_name}
                    className="h-12 w-12 rounded-full"
                  />
                </td>

                <td>
                  <p className="font-semibold text-white">
                    {member.full_name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {member.email}
                  </p>
                </td>

                <td>
                  <span
                    className="rounded-full px-3 py-1 text-sm font-semibold"
                    style={{
                      backgroundColor: `${
                        member.clubPosition
                          ?.badge_color ?? "#6B7280"
                      }20`,
                      color:
                        member.clubPosition
                          ?.badge_color ?? "#FFFFFF",
                    }}
                  >
                    {member.clubPosition?.title ??
                      "None"}
                  </span>
                </td>

                <td className="text-slate-300">
                  {member.websiteRole?.name ?? "-"}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      member.account_status ===
                      "Active"
                        ? "bg-green-500/20 text-green-400"
                        : member.account_status ===
                          "Muted"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {member.account_status}
                  </span>
                </td>

                <td>
                  <Link
                    href={`/admin/members/${member.id}`}
                    className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {membersWithRelations.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No members found.
          </div>
        )}
      </div>
    </div>
  );
}