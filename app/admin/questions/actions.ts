"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function createQuestion(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const published =
    formData.get("published") === "on";

  const { error } = await supabase
    .from("questions")
    .insert({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      content: formData.get("content"),

      category: formData.get("category"),

      featured:
        formData.get("featured") === "on",

      pinned:
        formData.get("pinned") === "on",

      locked:
        formData.get("locked") === "on",

      published,

      author_id: user.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/questions");
}

export async function updateQuestion(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  const published =
    formData.get("published") === "on";

  const { error } = await supabase
    .from("questions")
    .update({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      content: formData.get("content"),

      category: formData.get("category"),

      featured:
        formData.get("featured") === "on",

      pinned:
        formData.get("pinned") === "on",

      locked:
        formData.get("locked") === "on",

      published,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/questions");
}

export async function deleteQuestion(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/questions");
}