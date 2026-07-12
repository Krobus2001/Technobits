"use client";

import { useState } from "react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { useReplies } from "./RepliesProvider";

type Props = {
  questionId: string;

  profile: {
    account_status: string;
    moderation_reason: string | null;
    muted_until: string | null;
  } | null;
};

export default function ReplyForm({
  questionId,
  profile,
}: Props) {
  const { addReply } = useReplies();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const muteStillActive =
  profile?.account_status === "Muted" &&
  profile.muted_until &&
  new Date(profile.muted_until) > new Date();

  async function submitReply() {
    if (!content.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/questions/${questionId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ?? "Failed to post reply."
        );
      }

      addReply(data);

      setContent("");
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
  return (
    <div className="mt-12">

      {muteStillActive ? (

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">

          <h2 className="text-2xl font-bold text-yellow-300">
            Discussion Participation Disabled
          </h2>

          <p className="mt-4 text-yellow-100">
            Your account is currently muted.
          </p>

          {profile.moderation_reason && (

            <div className="mt-5">

              <p className="font-semibold text-white">
                Reason
              </p>

              <p className="text-yellow-100">
                {profile.moderation_reason}
              </p>

            </div>

          )}

          {profile.muted_until && (

            <div className="mt-5">

              <p className="font-semibold text-white">
                You can participate again
              </p>

              <p className="text-cyan-300">
                {new Date(
                  profile.muted_until
                ).toLocaleString([], {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>

            </div>

          )}

        </div>

      ) : (

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          💬 Reply
        </button>

      )}

    </div>
  );
}

  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-[#07182F] p-6">

      <RichTextEditor
        value={content}
        onChange={setContent}
        compact
        placeholder="Write your reply..."
      />

      {error && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="font-semibold text-red-400">
            Unable to post reply
          </p>

          <p className="mt-2 text-sm text-red-200">
            {error}
          </p>
        </div>
      )}

      <div className="mt-6 flex gap-3">

        <button
          type="button"
          onClick={submitReply}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Reply"}
        </button>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setContent("");
            setError("");
          }}
          className="rounded-lg border border-white/10 px-6 py-3 text-white transition hover:bg-white/10"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}