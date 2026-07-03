"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/Supabase";
import GoogleLoginButton from "./GoogleLoginButton";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <GoogleLoginButton />;
  }

  return (
    <div className="flex items-center gap-3">

      <Image
        src={user.user_metadata.avatar_url}
        alt="Profile"
        width={42}
        height={42}
        className="rounded-full border border-cyan-400"
      />

      <div className="hidden md:block">
        <p className="font-semibold text-white">
          {user.user_metadata.full_name}
        </p>

        <p className="text-xs text-slate-400">
          {user.email}
        </p>
      </div>

      <button
        onClick={() => supabase.auth.signOut()}
        className="rounded-lg border border-red-400/30 px-3 py-2 text-red-300 transition hover:bg-red-500/10"
      >
        Logout
      </button>

    </div>
  );
}