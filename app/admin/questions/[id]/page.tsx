import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import QuestionForm from "@/components/questions/QuestionForm";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: question } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (!question) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-8 text-4xl font-black text-white">
        Edit Question
      </h1>

      <QuestionForm
        question={question}
        questionId={id}
      />

    </div>
  );
}