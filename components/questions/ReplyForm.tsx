"use client";

import { useState } from "react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { useReplies } from "./RepliesProvider";

type Props = {
  questionId: string;
};

export default function ReplyForm({
  questionId,
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
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to post reply.");
      }

      const newReply = await res.json();

      addReply(newReply);

      console.log("Reply added.");

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
      <div className="mt-12">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          💬 Reply
        </button>
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

      <div className="mt-6 flex gap-3">

        <button
          type="button"
          onClick={submitReply}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Reply"}
        </button>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setContent("");
          }}
          className="rounded-lg border border-white/10 px-6 py-3 text-white hover:bg-white/10"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}