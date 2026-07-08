import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import DeleteTutorialButton from "@/components/admin/DeleteTutorialButton";
import { deleteTutorial } from "./actions";

export default async function TutorialsPage() {
  const supabase = await createClient();

  const { data: tutorials } = await supabase
    .from("tutorials")
    .select("*")
    .order("created_at", { ascending: false });

  const total = tutorials?.length ?? 0;
  const published =
    tutorials?.filter((t) => t.status === "Published").length ?? 0;
  const drafts =
    tutorials?.filter((t) => t.status === "Draft").length ?? 0;
  const featured =
    tutorials?.filter((t) => t.featured).length ?? 0;

  return (
    <div>
      {/* Header */}

      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">
            Tutorial Management
          </h1>

          <p className="mt-2 text-slate-400">
            Create, edit and publish TECHNOBITS tutorials.
          </p>
        </div>

        <Link
          href="/admin/tutorials/new"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          + New Tutorial
        </Link>
      </div>

      {/* Statistics */}

      <div className="mb-10 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-[#132742] p-6">
          <p className="text-slate-400">Total Tutorials</p>
          <h2 className="mt-2 text-5xl font-black text-white">
            {total}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-900/30 p-6">
          <p className="text-green-400">Published</p>
          <h2 className="mt-2 text-5xl font-black text-white">
            {published}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-900/20 p-6">
          <p className="text-yellow-400">Drafts</p>
          <h2 className="mt-2 text-5xl font-black text-white">
            {drafts}
          </h2>
        </div>

        <div className="rounded-2xl bg-cyan-900/30 p-6">
          <p className="text-cyan-400">Featured</p>
          <h2 className="mt-2 text-5xl font-black text-white">
            {featured}
          </h2>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="border-b border-white/10">
              <th className="p-5 text-left text-white">Thumbnail</th>
              <th className="text-left text-white">Title</th>
              <th className="text-left text-white">Category</th>
              <th className="text-left text-white">Status</th>
              <th className="text-left text-white">Featured</th>
              <th className="text-left text-white">Views</th>
              <th className="text-left text-white">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tutorials?.map((tutorial) => (
              <tr
                key={tutorial.id}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                <td className="p-5">
                  <img
                    src={tutorial.thumbnail_url}
                    alt={tutorial.title}
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                </td>

                <td>
                  <p className="font-semibold text-white">
                    {tutorial.title}
                  </p>

                  <p className="text-sm text-slate-400">
                    {tutorial.slug}
                  </p>
                </td>

                <td className="text-slate-300">
                  {tutorial.category}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      tutorial.status === "Published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {tutorial.status}
                  </span>
                </td>

                <td>
                  {tutorial.featured ? (
                    <span className="text-yellow-400">⭐ Featured</span>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>

                <td className="text-slate-300">
                  {tutorial.views}
                </td>

                <td>
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/tutorials/${tutorial.id}`}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
                    >
                      Edit
                    </Link>

                    <DeleteTutorialButton
                        action={deleteTutorial.bind(null, tutorial.id)}
                    />

                  </div>
                </td>
              </tr>
            ))}

            {tutorials?.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-10 text-center text-slate-400"
                >
                  No tutorials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}