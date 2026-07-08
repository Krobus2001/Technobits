import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import TutorialForm from "@/components/tutorials/TutorialForm";
import { updateTutorial } from "./actions";

export default async function EditTutorialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: tutorial } = await supabase
    .from("tutorials")
    .select("*")
    .eq("id", id)
    .single();

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="max-w-5xl">
      <h1 className="mb-8 text-4xl font-black text-white">
        Edit Tutorial
      </h1>

      <TutorialForm
        tutorial={tutorial}
        action={updateTutorial.bind(null, id)}
      />
    </div>
  );
}