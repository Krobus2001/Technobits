"use client";

import { deleteQuestion } from "@/app/admin/questions/actions";

export default function DeleteQuestionButtonClient({
  id,
}: {
  id: string;
}) {
  return (
    <button
      type="button"
      onClick={async () => {
        const confirmed = confirm(
          "Delete this question?"
        );

        if (!confirmed) return;

        await deleteQuestion(id);
      }}
      className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
    >
      Delete
    </button>
  );
}