"use client";

import { useState } from "react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { useReplies } from "./RepliesProvider";

type Props = {
  questionId: string;
  parentReplyId: string;
};

export default function NestedReplyForm({
  questionId,
  parentReplyId,
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

      if (!res.ok) {
        throw new Error("Failed to post reply.");
      }

      const newReply = await res.json();

      addReply(newReply);

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
        onClick={() => setOpen(true)}
        className="mt-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
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
          onClick={submitReply}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-black disabled:opacity-50"
        >
          {loading ? "Posting..." : "Reply"}
        </button>

        <button
          onClick={() => {
            setOpen(false);
            setContent("");
          }}
          className="rounded-lg border border-white/10 px-5 py-2 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}