import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("website_role_id, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.website_role_id !== 1) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[#07182F]">

      {/* Sidebar */}

      <aside className="w-72 border-r border-white/10 bg-[#051120] p-6">

        <h1 className="mb-8 text-3xl font-black text-white">
          TECHNOBITS
        </h1>

        <nav className="flex flex-col gap-2">

          <Link href="/admin" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            📊 Dashboard
          </Link>

          <Link href="/admin/members" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            👥 Members
          </Link>

          <Link href="/admin/tutorials" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            📚 Tutorials
          </Link>

          <Link href="/admin/events" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            📅 Events
          </Link>

          <Link href="/admin/questions" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            ❓Ask
          </Link>

          <Link href="/admin/services" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            💻 Services
          </Link>

          <Link
            href="/admin/services/schedule"
            className="rounded-lg p-3 text-slate-300 hover:bg-white/10"
          >
            🕒 Service Schedule
          </Link>

          <Link href="/admin/officers" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            🏆 Officers
          </Link>

          <Link href="/admin/settings" className="rounded-lg p-3 text-slate-300 hover:bg-white/10">
            ⚙ Settings
          </Link>

        </nav>

      </aside>

      {/* Main */}

      <div className="flex-1">

        <header className="flex h-20 items-center justify-between border-b border-white/10 px-8">

          <h2 className="text-2xl font-bold text-white">
            Admin Panel
          </h2>

          <p className="text-slate-300">
            {profile.full_name}
          </p>

        </header>

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}