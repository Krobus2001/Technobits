"use client";

import { useState } from "react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { useReplies } from "./RepliesProvider";

type Props = {
  questionId: string;
  parentReplyId: string;
  canReply: boolean;
};

export default function NestedReplyForm({
  questionId,
  parentReplyId,
  canReply,
}: Props) {
  const { addReply } = useReplies();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReply() {
    if (!content.trim() || loading) return;

    setLoading(true);

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
            parent_reply_id: parentReplyId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "Failed to post reply.");
        return;
      }

      addReply(data);

      setContent("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to post reply.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        disabled={!canReply}
        onClick={() => {
          if (canReply) {
            setOpen(true);
          }
        }}
        className={`mt-4 text-sm font-semibold transition ${
          canReply
            ? "text-cyan-400 hover:text-cyan-300"
            : "cursor-not-allowed text-slate-500"
        }`}
      >
        💬 Reply
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-[#07182F] p-4">
      <RichTextEditor
        value={content}
        onChange={setContent}
        compact
        placeholder="Write your reply..."
      />

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={submitReply}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Reply"}
        </button>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setContent("");
          }}
          className="rounded-lg border border-white/10 px-5 py-2 text-white hover:bg-white/10"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}