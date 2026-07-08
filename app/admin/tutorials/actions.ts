"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

export async function createTutorial(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const status = formData.get("status") as string;

  const { error } = await supabase
    .from("tutorials")
    .insert({
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
      author_id: user.id,
      published_at:
        status === "Published"
          ? new Date().toISOString()
          : null,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/tutorials");
  revalidatePath("/tutorials");

  redirect("/admin/tutorials");
}

export async function deleteTutorial(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tutorials")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/tutorials");
  revalidatePath("/tutorials");

  redirect("/admin/tutorials");
}