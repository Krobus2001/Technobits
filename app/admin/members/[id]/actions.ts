"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function updateMember(id: string, formData: FormData) {
  const supabase = await createClient();

  const website_role_id = Number(formData.get("website_role_id"));
  const club_position_id = Number(formData.get("club_position_id"));
  const account_status = formData.get("account_status") as string;
  const status_reason = formData.get("status_reason") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      website_role_id,
      club_position_id,
      account_status,
      status_reason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/members");
}