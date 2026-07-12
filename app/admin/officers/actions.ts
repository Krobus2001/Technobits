"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createOfficer(
  formData: FormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("officers")
    .insert({
      full_name: formData.get("full_name"),
      photo_url: formData.get("photo_url"),
      club_position_id: Number(
        formData.get("club_position_id")
      ),
      academic_year: formData.get(
        "academic_year"
      ),
      quote: formData.get("quote"),
      facebook_url: formData.get(
        "facebook_url"
      ),
      instagram_url: formData.get(
        "instagram_url"
      ),
      tiktok_url: formData.get(
        "tiktok_url"
      ),
      github_url: formData.get(
        "github_url"
      ),
      gmail: formData.get("gmail"),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/officers");

  redirect("/admin/officers");
}

export async function updateOfficer(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("officers")
    .update({
      full_name: formData.get("full_name"),
      photo_url: formData.get("photo_url"),
      club_position_id: Number(
        formData.get("club_position_id")
      ),
      academic_year: formData.get(
        "academic_year"
      ),
      quote: formData.get("quote"),
      facebook_url: formData.get(
        "facebook_url"
      ),
      instagram_url: formData.get(
        "instagram_url"
      ),
      tiktok_url: formData.get(
        "tiktok_url"
      ),
      github_url: formData.get(
        "github_url"
      ),
      gmail: formData.get("gmail"),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/officers");

  redirect("/admin/officers");
}

export async function deleteOfficer(
  id: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("officers")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/officers");
}