import { createClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import slugify from "slugify";

async function updateService(
  id: string,
  formData: FormData
) {
  "use server";

  const supabase = await createClient();

  const title = formData.get("title") as string;

  const slug = slugify(title, {
    lower: true,
    strict: true,
  });

  const { error } = await supabase
    .from("services")
    .update({
      title,
      slug,
      description: formData.get("description"),
      price: Number(formData.get("price")),
      estimated_duration: Number(
        formData.get("estimated_duration")
      ),
      icon: formData.get("icon"),
      active: formData.get("active") === "on",
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/services");
}

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-10 text-4xl font-black text-white">
        Edit Service
      </h1>

      <form
        action={updateService.bind(null, id)}
        className="space-y-6"
      >

        <input
          name="title"
          defaultValue={service.title}
          required
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <textarea
          name="description"
          defaultValue={service.description ?? ""}
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <input
          name="price"
          type="number"
          defaultValue={service.price}
          required
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <input
          name="estimated_duration"
          type="number"
          defaultValue={service.estimated_duration}
          required
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <input
          name="icon"
          defaultValue={service.icon ?? ""}
          className="w-full rounded-xl border border-white/10 bg-[#07182F] p-4 text-white"
        />

        <label className="flex items-center gap-3 text-white">

          <input
            type="checkbox"
            name="active"
            defaultChecked={service.active}
          />

          Active Service

        </label>

        <button
          className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-black"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}