"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function completeProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = formData.get("full_name")?.toString().trim();

  if (!fullName) {
    throw new Error("Full name is required.");
  }

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    full_name: fullName,
    email: user.email,
    avatar_url: user.user_metadata.avatar_url,

    // Default values
    website_role_id: 3,
    club_position_id: 12,
    account_status: "Active",
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/dashboard");
}