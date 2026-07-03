"use client";

import { supabase } from "@/lib/Supabase";
import Button from "../ui/Button";

export default function GoogleLoginButton() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Button onClick={login}>
      Sign in with Google
    </Button>
  );
}