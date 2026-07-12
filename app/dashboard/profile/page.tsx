import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      *,
      website_roles(name),
      club_positions(title,badge_color)
    `)
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/complete-profile");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">

      <Link
        href="/dashboard"
        className="text-cyan-400 hover:text-cyan-300"
      >
        ← Back to Dashboard
      </Link>

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#07182F] p-10">

        <div className="flex flex-col items-center">

          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="h-32 w-32 rounded-full border-4 border-cyan-500 object-cover"
          />

          <h1 className="mt-6 text-4xl font-black text-white">
            {profile.full_name}
          </h1>

          <p className="mt-2 text-slate-400">
            {profile.email}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-300">
              {profile.website_roles?.name}
            </span>

            <span
              className="rounded-full px-4 py-2 text-sm font-bold"
              style={{
                backgroundColor:
                  `${profile.club_positions?.badge_color}20`,
                color:
                  profile.club_positions?.badge_color ??
                  "#94A3B8",
              }}
            >
              {profile.club_positions?.title ?? "Member"}
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                profile.account_status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : profile.account_status === "Muted"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {profile.account_status}
            </span>

          </div>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-white/5 p-5">

            <p className="text-sm text-slate-400">
              Full Name
            </p>

            <p className="mt-2 text-lg font-semibold text-white">
              {profile.full_name}
            </p>

          </div>

          <div className="rounded-xl bg-white/5 p-5">

            <p className="text-sm text-slate-400">
              Email
            </p>

            <p className="mt-2 text-lg font-semibold text-white break-all">
              {profile.email}
            </p>

          </div>

          <div className="rounded-xl bg-white/5 p-5">

            <p className="text-sm text-slate-400">
              Joined
            </p>

            <p className="mt-2 text-lg font-semibold text-white">
              {new Date(profile.created_at).toLocaleDateString()}
            </p>

          </div>

          <div className="rounded-xl bg-white/5 p-5">

            <p className="text-sm text-slate-400">
              Website Role
            </p>

            <p className="mt-2 text-lg font-semibold text-white">
              {profile.website_roles?.name}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}