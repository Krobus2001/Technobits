import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function TutorialsPage() {
  const supabase = await createClient();

  const { data: tutorials } = await supabase
    .from("tutorials")
    .select("*")
    .eq("status", "Published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  const featuredTutorial =
    tutorials?.find((t) => t.featured) ?? tutorials?.[0];

  const totalTutorials = tutorials?.length ?? 0;

  const totalCategories = tutorials
    ? new Set(tutorials.map((t) => t.category)).size
    : 0;

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
          Tutorials
        </span>

      </div>

      {/* Hero */}

      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#07182F] via-[#0A2340] to-[#0E335D] p-10">

        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold uppercase tracking-wide text-cyan-400">
          TECHNOBITS Learning Center
        </span>

        <h1 className="mt-6 text-5xl font-black text-white">
          Learn Technology.
          <br />
          Build Your Skills.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Explore tutorials created by TECHNOBITS covering
          Windows installation, networking, hardware,
          programming, cybersecurity, software installation,
          troubleshooting, and more.
        </p>

        {/* Stats */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-4xl font-black text-cyan-400">
              {totalTutorials}
            </p>

            <p className="mt-2 text-slate-300">
              Published Tutorials
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-4xl font-black text-cyan-400">
              {totalCategories}
            </p>

            <p className="mt-2 text-slate-300">
              Categories
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-4xl font-black text-cyan-400">
              {tutorials?.filter((t) => t.featured).length ?? 0}
            </p>

            <p className="mt-2 text-slate-300">
              Featured Tutorials
            </p>

          </div>

        </div>

      </section>

      {/* Search */}

      <div className="mt-14">

        <input
          disabled
          placeholder="🔍 Search tutorials (Coming Soon)"
          className="w-full rounded-2xl border border-white/10 bg-[#07182F] px-6 py-4 text-white placeholder:text-slate-500"
        />

      </div>

      {/* Categories */}

      <div className="mt-8 flex flex-wrap gap-3">

        <button className="rounded-full bg-cyan-500 px-5 py-2 font-semibold text-black">
          All
        </button>

        {Array.from(
          new Set(tutorials?.map((t) => t.category))
        ).map((category) => (
          <button
            key={category}
            className="rounded-full border border-white/10 px-5 py-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            {category}
          </button>
        ))}

      </div>

      {/* Featured Tutorial */}

      {featuredTutorial && (

        <section className="mt-16 overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#07182F]">

          <div className="grid items-center lg:grid-cols-2">

            <img
              src={featuredTutorial.thumbnail_url}
              alt={featuredTutorial.title}
              className="h-full w-full object-cover"
            />

            <div className="p-10">

              <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
                ⭐ Featured Tutorial
              </span>

              <h2 className="mt-6 text-4xl font-black text-white">
                {featuredTutorial.title}
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                {featuredTutorial.description}
              </p>

              <Link
                href={`/tutorials/${featuredTutorial.slug}`}
                className="mt-8 inline-flex rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
              >
                Start Learning →
              </Link>

            </div>

          </div>

        </section>

      )}

      {/* Tutorials */}

      <section className="mt-20">

        <h2 className="mb-8 text-3xl font-black text-white">
          Latest Tutorials
        </h2>

        {tutorials && tutorials.length > 0 ? (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {tutorials.map((tutorial) => (

              <Link
                key={tutorial.id}
                href={`/tutorials/${tutorial.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#07182F] transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10"
              >

                <div className="overflow-hidden">

                  <img
                    src={tutorial.thumbnail_url}
                    alt={tutorial.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="p-6">

                  <div className="flex items-center justify-between">

                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-400">
                      {tutorial.category}
                    </span>

                    {tutorial.featured && (
                      <span className="text-yellow-400">
                        ⭐
                      </span>
                    )}

                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-white transition group-hover:text-cyan-400">
                    {tutorial.title}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-slate-400">
                    {tutorial.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between text-sm text-slate-500">

                    <span>
                      📖 {tutorial.reading_time} min
                    </span>

                    <span>
                      👀 {tutorial.views}
                    </span>

                  </div>

                  <div className="mt-5 text-cyan-400 font-semibold group-hover:translate-x-1 transition">
                    Read Tutorial →
                  </div>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-dashed border-white/10 py-24 text-center">

            <div className="text-7xl">
              📚
            </div>

            <h2 className="mt-6 text-3xl font-black text-white">
              No Tutorials Yet
            </h2>

            <p className="mt-4 text-slate-400">
              We're currently building the TECHNOBITS
              Learning Library.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black hover:bg-cyan-400"
            >
              Return Home
            </Link>

          </div>

        )}

      </section>

    </div>
  );
}