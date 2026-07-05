import { createClient } from "@/lib/supabase-server";
import StatCard from "@/components/admin/StatCard";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: members },
    { count: active },
    { count: muted },
    { count: banned },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("account_status", "Active"),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("account_status", "Muted"),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("account_status", "Banned"),
  ]);

  const { data: recentMembers } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      avatar_url,
      account_status,
      created_at
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="mb-10 text-4xl font-black text-white">
        Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Members"
          value={members ?? 0}
          color="#06B6D4"
        />

        <StatCard
          title="Active"
          value={active ?? 0}
          color="#22C55E"
        />

        <StatCard
          title="Muted"
          value={muted ?? 0}
          color="#F59E0B"
        />

        <StatCard
          title="Banned"
          value={banned ?? 0}
          color="#EF4444"
        />

      </div>

      {/* Recent Members */}

      <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Recent Members
        </h2>

        <div className="space-y-4">

          {recentMembers?.map((member) => (

            <div
              key={member.id}
              className="flex items-center justify-between rounded-lg bg-white/5 p-4 transition hover:bg-white/10"
            >

              <div className="flex items-center gap-4">

                <img
                  src={member.avatar_url}
                  alt={member.full_name}
                  className="h-14 w-14 rounded-full border border-white/10"
                />

                <div>

                  <h3 className="font-semibold text-white">
                    {member.full_name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {member.email}
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  member.account_status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : member.account_status === "Muted"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {member.account_status}
              </span>

            </div>

          ))}

          {recentMembers?.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              No members have registered yet.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}