import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ReplyForm from "@/components/questions/ReplyForm";
import ReplyList from "@/components/questions/ReplyList";
import { Question } from "@/components/questions/types";
import { RepliesProvider } from "@/components/questions/RepliesProvider";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

        const { data: question } = await supabase
      .from("questions")
      .select(`
        *,
        profiles!questions_author_id_fkey (
          id,
          full_name,
          club_position_id
        ),
        question_replies (
          *,
          profiles!question_replies_author_id_fkey (
            id,
            full_name,
            club_position_id
          )
        )
      `)
      .eq("slug", slug)
      .eq("published", true)
      .single();

      const { data: positions } = await supabase
  .from("club_positions")
  .select("*");

  function getPosition(positionId: number | null) {
  if (!positionId) {
    return {
      title: "Member",
      badge_color: "#475569",
    };
  }

  return (
    positions?.find(
      (p) => p.id === positionId
    ) ?? {
      title: "Member",
      badge_color: "#475569",
    }
  );
}

  if (!question) {
    notFound();
  }

  (question as Question).question_replies.sort(
  (a, b) =>
    new Date(a.created_at).getTime() -
    new Date(b.created_at).getTime()
);

  question.question_replies.sort(
  (a: any, b: any) =>
    new Date(a.created_at).getTime() -
    new Date(b.created_at).getTime()
);

  // Increase views
  await supabase
    .from("questions")
    .update({
      views: (question.views ?? 0) + 1,
    })
    .eq("id", question.id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

        <Link
          href="/"
          className="transition hover:text-cyan-400"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          href="/ask"
          className="transition hover:text-cyan-400"
        >
          Ask TECHNOBITS
        </Link>

        <span>/</span>

        <span className="text-white">
          {question.title}
        </span>

      </div>

      {/* Status */}

      <div className="mb-6 flex flex-wrap gap-3">

        {question.pinned && (
          <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-bold text-yellow-400">
            📌 PINNED
          </span>
        )}

        {question.featured && (
          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
            ⭐ FEATURED
          </span>
        )}

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
          {question.category}
        </span>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
          {question.status}
        </span>

      </div>

      {/* Question Author */}

      {(() => {
        const position = getPosition(
          question.profiles?.club_position_id ?? null
        );

        return (
          <div className="mb-8 flex items-center justify-between">

            <div>

              <div className="flex items-center gap-2">

                <h3 className="text-xl font-bold text-white">
                  {question.profiles?.full_name ?? "Unknown User"}
                </h3>

                <span
                  className="text-sm font-bold uppercase tracking-wide"
                  style={{
                    color: position.badge_color,
                  }}
                >
                  · {position.title}
                </span>

              </div>

            </div>

            <div className="text-right text-sm text-slate-500">

              <p>
                Posted
              </p>

              <p>
                {new Date(
                  question.created_at
                ).toLocaleString()}
              </p>

            </div>

          </div>
        );
      })()}

      {/* Title */}

      <h1 className="text-5xl font-black text-white">
        {question.title}
      </h1>

      <p className="mt-6 text-xl text-slate-400">
        {question.description}
      </p>

      {/* Stats */}

      <div className="mt-8 flex flex-wrap gap-6 text-slate-500">

        <span>
          👁 {(question.views ?? 0) + 1} Views
        </span>

        <span>
          👍 {question.likes} Helpful
        </span>

        <span>
          {new Date(
            question.created_at
          ).toLocaleDateString()}
        </span>

      </div>

      {/* Divider */}

      <div className="my-12 h-px bg-white/10" />

      {/* Content */}

      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: question.content,
        }}
      />

          <RepliesProvider
      initialReplies={question.question_replies}
    >

      {!question.locked && (
        <ReplyForm
          questionId={question.id}
        />
      )}

      {question.locked && (
        <div className="mt-12 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-yellow-300">
          This discussion has been locked.
          New replies are disabled.
        </div>
      )}

      <div className="mt-20">

        <h2 className="mb-8 text-3xl font-black text-white">
          Replies ({question.question_replies?.length ?? 0})
        </h2>

        <ReplyList
          positions={positions ?? []}
          questionId={question.id}
        />

      </div>

    </RepliesProvider>

      {/* Back */}

      <div className="mt-16">

        <Link
          href="/ask"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          ← Back to Ask TECHNOBITS
        </Link>

      </div>

    </div>
  );
}