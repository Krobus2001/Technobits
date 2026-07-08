import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: tutorial } = await supabase
    .from("tutorials")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tutorial) {
    notFound();
  }

  // Convert normal YouTube URL into embed URL if needed
  let youtubeUrl = tutorial.youtube_url;

  if (
    youtubeUrl &&
    youtubeUrl.includes("watch?v=")
  ) {
    youtubeUrl = youtubeUrl.replace(
      "watch?v=",
      "embed/"
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8">

        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-400">

          <Link
            href="/"
            className="transition hover:text-cyan-400"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/tutorials"
            className="transition hover:text-cyan-400"
          >
            Tutorials
          </Link>

          <span>/</span>

          <span className="text-white">
            {tutorial.title}
          </span>

        </div>

        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
        >
          ← Back to Tutorials
        </Link>

      </div>

      {/* Thumbnail */}

      <img
        src={tutorial.thumbnail_url}
        alt={tutorial.title}
        className="mb-10 h-[420px] w-full rounded-2xl object-cover"
      />

      {/* Category */}

      <span className="rounded-full bg-cyan-500/20 px-4 py-2 font-semibold text-cyan-400">
        {tutorial.category}
      </span>

      {/* Title */}

      <h1 className="mt-6 text-5xl font-black text-white">
        {tutorial.title}
      </h1>

      {/* Description */}

      <p className="mt-6 text-xl leading-relaxed text-slate-400">
        {tutorial.description}
      </p>

      {/* Meta */}

      <div className="mt-8 flex flex-wrap gap-6 text-slate-500">

        <span>
          📖 {tutorial.reading_time} min read
        </span>

        <span>
          📅{" "}
          {new Date(
            tutorial.created_at
          ).toLocaleDateString()}
        </span>

      </div>

      {/* YouTube */}

      {youtubeUrl && (
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 aspect-video">

          <iframe
            src={youtubeUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

        </div>
      )}

      {/* Tutorial Content */}

      <article
        className="prose prose-invert prose-cyan mt-14 max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400"
        dangerouslySetInnerHTML={{
          __html: tutorial.content,
        }}
      />

    </div>
  );
}