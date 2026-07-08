import TutorialForm from "@/components/tutorials/TutorialForm";

export default function NewTutorialPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="mb-8 text-4xl font-black text-white">
        Create Tutorial
      </h1>

      <TutorialForm />
    </div>
  );
}