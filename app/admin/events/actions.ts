"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const status = formData.get("status") as string;

  const { error } = await supabase
    .from("events")
    .insert({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      content: formData.get("content"),
      poster_url: formData.get("poster_url"),

      event_type: formData.get("event_type"),
      venue: formData.get("venue"),
      eligibility: formData.get("eligibility"),

      registration_fee: formData.get("registration_fee"),
      registration_url: formData.get("registration_url"),

      registration_deadline:
        formData.get("registration_deadline") || null,

      max_participants:
        formData.get("max_participants")
          ? Number(formData.get("max_participants"))
          : null,

      start_date:
        formData.get("start_date") || null,

      end_date:
        formData.get("end_date") || null,

      featured:
        formData.get("featured") === "on",

      status,

      author_id: user.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  const status = formData.get("status") as string;

  const { error } = await supabase
    .from("events")
    .update({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      content: formData.get("content"),
      poster_url: formData.get("poster_url"),

      event_type: formData.get("event_type"),
      venue: formData.get("venue"),
      eligibility: formData.get("eligibility"),

      registration_fee: formData.get("registration_fee"),
      registration_url: formData.get("registration_url"),

      registration_deadline: formData.get("registration_deadline")
            ? new Date(formData.get("registration_deadline") as string).toISOString()
            : null,

      max_participants:
        formData.get("max_participants")
          ? Number(formData.get("max_participants"))
          : null,

        start_date: formData.get("start_date")
            ? new Date(formData.get("start_date") as string).toISOString()
            : null,

        end_date: formData.get("end_date")
            ? new Date(formData.get("end_date") as string).toISOString()
            : null,

      featured:
        formData.get("featured") === "on",

      status,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/events");
}