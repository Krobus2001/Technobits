"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function updateTutorial(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  const status = formData.get("status") as string;

  const { error } = await supabase
    .from("tutorials")
    .update({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      content: formData.get("content"),
      thumbnail_url: formData.get("thumbnail_url"),
      youtube_url: formData.get("youtube_url"),
      category: formData.get("category"),
      reading_time: Number(formData.get("reading_time")),
      featured: formData.get("featured") === "on",
      status,
      published_at:
        status === "Published"
          ? new Date().toISOString()
          : null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/tutorials");
}