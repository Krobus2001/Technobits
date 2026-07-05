import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User is not logged in
  if (!user) {
    redirect("/login");
  }

  // Check if the user already has a profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  // First time login
  if (!profile) {
    redirect("/complete-profile");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07182F] text-white">
      <div className="text-center">
        <img
          src={user.user_metadata.avatar_url}
          alt="Avatar"
          className="mx-auto mb-6 h-32 w-32 rounded-full"
        />

        <h1 className="text-4xl font-bold">
          Welcome
        </h1>

        <p className="mt-4">
          {user.user_metadata.full_name}
        </p>

        <p className="text-slate-400">
          {user.email}
        </p>
      </div>
    </main>
  );
}