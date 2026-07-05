import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { completeProfile } from "./actions";

export default async function CompleteProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07182F] px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 shadow-xl backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-white">
          Complete Your Profile
        </h1>

        <p className="mt-3 text-slate-300">
          Before continuing, please confirm your full name.
        </p>

        <form action={completeProfile} className="mt-8">

          <label className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            defaultValue={user.user_metadata.full_name ?? ""}
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            Continue
          </button>

        </form>

      </div>
    </main>
  );
}