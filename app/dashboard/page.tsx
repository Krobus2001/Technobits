import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
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
      club_positions(
        title,
        badge_color
      )
    `)
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/complete-profile");
  }

  const isAdmin = profile.website_role_id !== 3;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">

      {/* Header */}

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

        <div>

          <h1 className="text-5xl font-black text-white">
            Dashboard
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Welcome back,
            <span className="font-bold text-cyan-400">
              {" "}
              {profile.full_name}
            </span>
          </p>

        </div>

        <Link
          href="/"
          className="rounded-xl border border-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/10"
        >
          ← Go to Homepage
        </Link>

      </div>

      {/* Profile Card */}

      <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-[#07182F] to-[#0A2545] p-10 shadow-2xl">

        <div className="flex flex-col gap-8 md:flex-row md:items-center">

          {/* Avatar */}

          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="h-32 w-32 rounded-full border-4 border-cyan-500 object-cover shadow-xl"
          />

          {/* Info */}

          <div className="flex-1">

            <h2 className="text-3xl font-black text-white">
              {profile.full_name}
            </h2>

            <p className="mt-2 text-slate-400">
              {profile.email}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
                {profile.website_roles?.name}
              </span>

              <span
                className="rounded-full px-4 py-2 text-sm font-bold text-white"
                style={{
                  backgroundColor:
                    profile.club_positions?.badge_color
                      ? `${profile.club_positions.badge_color}33`
                      : "#374151",
                  color:
                    profile.club_positions?.badge_color ??
                    "#ffffff",
                }}
              >
                {profile.club_positions?.title ??
                  "Member"}
              </span>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            href="/dashboard/profile"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
          >
            Edit Profile
          </Link>

          <Link
            href="/dashboard/bookings"
            className="rounded-xl border border-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/10"
          >
            My Bookings
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-xl border border-cyan-500 px-6 py-3 font-bold text-cyan-400 transition hover:bg-cyan-500/10"
            >
              Admin Dashboard
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}