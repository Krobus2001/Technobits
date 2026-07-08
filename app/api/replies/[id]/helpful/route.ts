import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data: existing } = await supabase
    .from("question_reply_likes")
    .select("id")
    .eq("reply_id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("question_reply_likes")
      .delete()
      .eq("id", existing.id);

    await supabase.rpc("decrement_reply_likes", {
      reply_uuid: id,
    });

    return NextResponse.json({
      liked: false,
    });
  }

  await supabase
    .from("question_reply_likes")
    .insert({
      reply_id: id,
      user_id: user.id,
    });

  await supabase.rpc("increment_reply_likes", {
    reply_uuid: id,
  });

  return NextResponse.json({
    liked: true,
  });
}