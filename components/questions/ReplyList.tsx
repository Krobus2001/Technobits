"use client";

import ReplyCard from "./ReplyCard";
import { Position } from "./types";
import { useReplies } from "./RepliesProvider";

type Props = {
  questionId: string;
  positions: Position[];
  canReply: boolean;
};

export default function ReplyList({
  positions,
  questionId,
  canReply,
}: Props) {

  const { replies } = useReplies();

console.log("ReplyList render:", replies.length);

  const rootReplies = replies
    .filter((reply) => !reply.parent_reply_id)
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    );

  if (rootReplies.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
        <h3 className="text-2xl font-bold text-white">
          No Replies Yet
        </h3>

        <p className="mt-3 text-slate-400">
          Be the first to help answer this question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rootReplies.map((reply) => (
        <ReplyCard
          key={reply.id}
          reply={reply}
          replies={replies}
          positions={positions}
          questionId={questionId}
          canReply={canReply}
        />
      ))}
    </div>
  );
}