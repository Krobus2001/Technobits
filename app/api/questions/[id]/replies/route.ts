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

  // ------------------------------------
  // Check account status
  // ------------------------------------

  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      account_status,
      muted_until,
      moderation_reason
    `)
    .eq("id", user.id)
    .single();

  if (profile?.account_status === "Muted") {

    // Temporary mute
    if (profile.muted_until) {

      const muteExpired =
        new Date(profile.muted_until) <= new Date();

      if (muteExpired) {

        await supabase
          .from("profiles")
          .update({
            account_status: "Active",
            muted_until: null,
            moderation_reason: null,
          })
          .eq("id", user.id);

      } else {

        return NextResponse.json(
          {
            error:
              profile.moderation_reason ??
              "Your account is currently muted.",
          },
          {
            status: 403,
          }
        );

      }

    } else {

      // Permanent mute

      return NextResponse.json(
        {
          error:
            profile.moderation_reason ??
            "Your account is currently muted.",
        },
        {
          status: 403,
        }
      );

    }

  }

  // ------------------------------------
  // Create Reply
  // ------------------------------------

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