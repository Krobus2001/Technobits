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
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("question_replies")
    .insert({
      question_id: id,
      parent_reply_id:
        body.parent_reply_id ?? null,
      author_id: user.id,
      content: body.content,
    })
    .select(`
      *,
      profiles!question_replies_author_id_fkey(
        id,
        full_name,
        club_position_id
      )
    `)
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(data);
}