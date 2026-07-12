"use client";

import ReplyGroup from "./ReplyGroup";
import NestedReplyForm from "./NestedReplyForm";
import { Reply, Position } from "./types";
import { useReplies } from "./RepliesProvider";

type Props = {
  reply: Reply;
  replies: Reply[];
  positions: Position[];
  questionId: string;
  canReply: boolean;
};

export default function ReplyCard({
  reply,
  replies,
  positions,
  questionId,
  canReply,
}: Props) {

  const { toggleHelpful } = useReplies();

  const position = positions.find(
    (p) =>
      p.id ===
      reply.profiles?.club_position_id
  );

  const children = replies.filter(
    (r) => r.parent_reply_id === reply.id
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#07182F] p-6">

      {reply.is_solution && (
        <div className="mb-5">
          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
            ✅ Accepted Solution
          </span>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <h4 className="font-bold text-white">
            {reply.profiles?.full_name ?? "Unknown User"}
          </h4>

          {position && (
            <span
              className="text-xs font-bold uppercase"
              style={{
                color: position.badge_color,
              }}
            >
              · {position.title}
            </span>
          )}

        </div>

        <span className="text-sm text-slate-500">
          {new Date(reply.created_at).toLocaleString()}
        </span>

      </div>

      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: reply.content,
        }}
      />

      <div className="mt-6 flex items-center gap-6">

        <button
          type="button"
          onClick={() => toggleHelpful(reply.id)}
          className="text-sm text-slate-400 transition hover:text-cyan-400"
        >
          👍 {reply.likes} Helpful
        </button>

      </div>

      <NestedReplyForm
        questionId={questionId}
        parentReplyId={reply.id}
        canReply={canReply}
      />

      <ReplyGroup count={children.length}>

        {children.map((child) => (
          <ReplyCard
          key={child.id}
          reply={child}
          replies={replies}
          positions={positions}
          questionId={questionId}
          canReply={canReply}
        />
        ))}

      </ReplyGroup>

    </div>
  );
}