import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import slugify from "slugify";

async function createService(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const title = formData.get("title") as string;

  const slug = slugify(title, {
    lower: true,
    strict: true,
  });

  const { error } = await supabase
    .from("services")
    .insert({
      title,
      slug,
      description: formData.get("description"),
      price: Number(formData.get("price")),
      estimated_duration: Number(
        formData.get("estimated_duration")
      ),
      icon: formData.get("icon"),
      active: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/services");
}

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-10 text-4xl font-black text-white">
        Add Service
      </h1>

      <form
        action={createService}
        className="space-y-6"
      >

        <input
          name="title"
          placeholder="Service title"
          required
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <input
          name="estimated_duration"
          type="number"
          placeholder="Duration (minutes)"
          required
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <input
          name="icon"
          placeholder="Lucide icon name (optional)"
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <button
          className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-black"
        >
          Save Service
        </button>

      </form>

    </div>
  );
}