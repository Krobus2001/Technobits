import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function AskPage() {
  const supabase = await createClient();

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("published", true)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  const totalQuestions = questions?.length ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

        <Link
          href="/"
          className="transition hover:text-cyan-400"
        >
          Home
        </Link>

        <span>/</span>

        <span className="text-white">
          Ask TECHNOBITS
        </span>

      </div>

      {/* Hero */}

      <div className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-r from-[#07182F] to-[#0A2545] p-10">

        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
          Student Community
        </span>

        <h1 className="mt-6 text-5xl font-black text-white">
          Ask TECHNOBITS
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Need help with programming, networking,
          hardware, Windows, cybersecurity, or your
          school projects? Ask the TECHNOBITS
          community and get help from fellow students.
        </p>

        <div className="mt-8 flex flex-wrap gap-6">

          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">

            <p className="text-2xl font-black text-cyan-400">
              {totalQuestions}
            </p>

            <p className="text-sm text-slate-300">
              Questions
            </p>

          </div>

        </div>

      </div>

      {/* Questions */}

      {questions && questions.length > 0 ? (

        <div className="space-y-6">

          {questions.map((question) => (

            <Link
              key={question.id}
              href={`/ask/${question.slug}`}
              className="block rounded-2xl border border-white/10 bg-[#07182F] p-6 transition hover:border-cyan-400 hover:-translate-y-1"
            >

              <div className="mb-4 flex items-center gap-3 flex-wrap">

                {question.pinned && (
                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-bold text-yellow-400">
                    📌 PINNED
                  </span>
                )}

                {question.featured && (
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400">
                    ⭐ FEATURED
                  </span>
                )}

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  {question.category}
                </span>

              </div>

              <h2 className="text-2xl font-bold text-white hover:text-cyan-400">
                {question.title}
              </h2>

              <p className="mt-4 line-clamp-2 text-slate-400">
                {question.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">

                <span>
                  👁 {question.views} Views
                </span>

                <span>
                  👍 {question.likes} Helpful
                </span>

                <span>
                  {question.status}
                </span>

                <span>
                  {new Date(
                    question.created_at
                  ).toLocaleDateString()}
                </span>

              </div>

            </Link>

          ))}

        </div>

      ) : (

        <div className="rounded-2xl border border-dashed border-white/10 py-24 text-center">

          <h2 className="text-3xl font-bold text-white">
            No Questions Yet
          </h2>

          <p className="mt-4 text-slate-400">
            Be the first student to ask a question.
          </p>

        </div>

      )}

    </div>
  );
}