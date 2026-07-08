import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import DeleteQuestionButton from "@/components/questions/DeleteQuestionButton";

export default async function QuestionsPage() {
  const supabase = await createClient();

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  const totalQuestions = questions?.length ?? 0;

  const publishedQuestions =
    questions?.filter((question) => question.published).length ?? 0;

  const draftQuestions =
    questions?.filter((question) => !question.published).length ?? 0;

  const featuredQuestions =
    questions?.filter((question) => question.featured).length ?? 0;

  return (
    <div>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">
            Question Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all Ask TECHNOBITS questions.
          </p>
        </div>

        <Link
          href="/admin/questions/new"
          className="rounded-lg bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          + New Question
        </Link>
      </div>

      {/* Statistics */}

      <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-[#132742] p-6">
          <p className="text-slate-400">
            Total Questions
          </p>

          <h2 className="mt-2 text-5xl font-black text-white">
            {totalQuestions}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-900/30 p-6">
          <p className="text-emerald-400">
            Published
          </p>

          <h2 className="mt-2 text-5xl font-black text-white">
            {publishedQuestions}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-900/20 p-6">
          <p className="text-yellow-400">
            Drafts
          </p>

          <h2 className="mt-2 text-5xl font-black text-white">
            {draftQuestions}
          </h2>
        </div>

        <div className="rounded-2xl bg-cyan-900/30 p-6">
          <p className="text-cyan-400">
            Featured
          </p>

          <h2 className="mt-2 text-5xl font-black text-white">
            {featuredQuestions}
          </h2>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="p-5 text-left text-white">
                Title
              </th>

              <th className="text-left text-white">
                Category
              </th>

              <th className="text-left text-white">
                Status
              </th>

              <th className="text-left text-white">
                Views
              </th>

              <th className="text-left text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {questions?.map((question) => (
              <tr
                key={question.id}
                className="border-t border-white/10"
              >
                <td className="p-5 text-white">
                  {question.title}
                </td>

                <td className="text-slate-300">
                  {question.category}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      question.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {question.published
                      ? "Published"
                      : "Draft"}
                  </span>
                </td>

                <td className="text-slate-300">
                  {question.views}
                </td>

                <td className="flex gap-3 p-4">
                  <Link
                    href={`/admin/questions/${question.id}`}
                    className="rounded bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400"
                  >
                    Edit
                  </Link>

                  <DeleteQuestionButton
                    id={question.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}