"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function updateMember(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  // Check logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Only Super Admin can update members
  const { data: currentUser } = await supabase
    .from("profiles")
    .select("website_role_id")
    .eq("id", user.id)
    .single();

  if (!currentUser || currentUser.website_role_id !== 1) {
    redirect("/admin");
  }

  const website_role_id = Number(
    formData.get("website_role_id")
  );

  const clubPosition = formData.get(
    "club_position_id"
  ) as string;

  const club_position_id =
    clubPosition === ""
      ? null
      : Number(clubPosition);

  const account_status =
    formData.get("account_status") as string;

  const moderation_reason =
    (formData.get("moderation_reason") as string) ||
    null;

  const muted_until = formData.get(
    "muted_until"
  ) as string;

  const banned_until = formData.get(
    "banned_until"
  ) as string;

  const mutedUntilISO = muted_until
    ? new Date(muted_until).toISOString()
    : null;

  const bannedUntilISO = banned_until
    ? new Date(banned_until).toISOString()
    : null;

  const { error } = await supabase
    .from("profiles")
    .update({
      website_role_id,
      club_position_id,
      account_status,
      moderation_reason,
      muted_until: mutedUntilISO,
      banned_until: bannedUntilISO,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/members");
}