"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function createReply(
  questionId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("question_replies")
    .insert({
      question_id: questionId,
      author_id: user.id,
      parent_reply_id:
        formData.get("parent_reply_id") || null,
      content: formData.get("content"),
    });

  if (error) {
    throw new Error(error.message);
  }
}

export async function toggleHelpful(replyId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: existing } = await supabase
    .from("question_reply_likes")
    .select("id")
    .eq("reply_id", replyId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("question_reply_likes")
      .delete()
      .eq("id", existing.id);

    await supabase.rpc("decrement_reply_likes", {
      reply_uuid: replyId,
    });

    return;
  }

  await supabase
    .from("question_reply_likes")
    .insert({
      reply_id: replyId,
      user_id: user.id,
    });

  await supabase.rpc("increment_reply_likes", {
    reply_uuid: replyId,
  });
}