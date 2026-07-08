import QuestionForm from "@/components/questions/QuestionForm";

export default function NewQuestionPage() {
  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-8 text-4xl font-black text-white">
        New Question
      </h1>

      <QuestionForm />

    </div>
  );
}