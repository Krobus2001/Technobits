"use client";

import { supabase } from "@/lib/Supabase";
import Button from "../ui/Button";

export default function GoogleLoginButton() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  }

  return (
    <Button
      onClick={login}
      className="w-full justify-center"
    >
      Sign in with Google
    </Button>
  );
}