"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function updateSchedule(formData: FormData) {
  const supabase = await createClient();

  const id = Number(formData.get("id"));

  const { error } = await supabase
    .from("service_schedule")
    .update({
      is_open: formData.get("is_open") === "on",
      open_time: formData.get("open_time") || null,
      close_time: formData.get("close_time") || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services/schedule");
}