"use client";

import { useState } from "react";
import ThumbnailUploader from "./ThumbnailUploader";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { createTutorial } from "@/app/admin/tutorials/actions";

type Tutorial = {
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail_url: string;
  youtube_url: string;
  reading_time: number;
  featured: boolean;
  status: string;
  content: string;
};

type Props = {
  tutorial?: Partial<Tutorial>;
  action?: (formData: FormData) => void;
};

export default function TutorialForm({
  tutorial,
  action,
}: Props) {
  const [thumbnail, setThumbnail] = useState(
    tutorial?.thumbnail_url ?? ""
  );

  const [title, setTitle] = useState(
    tutorial?.title ?? ""
  );

  const [slug, setSlug] = useState(
    tutorial?.slug ?? ""
  );

  const [content, setContent] = useState(
    tutorial?.content ?? ""
  );

  function generateSlug(value: string) {
    const generated = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setSlug(generated);
  }

  return (
    <form
      action={action ?? createTutorial}
      className="space-y-8 rounded-xl bg-white/5 p-8"
    >
      {/* Thumbnail */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Thumbnail
        </label>

        <ThumbnailUploader
          value={thumbnail}
          onUpload={setThumbnail}
        />

        <input
          type="hidden"
          name="thumbnail_url"
          value={thumbnail}
        />
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Title
        </label>

        <input
          required
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            generateSlug(e.target.value);
          }}
          className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

      {/* Slug */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Slug
        </label>

        <input
          required
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Category
        </label>

        <input
          name="category"
          defaultValue={tutorial?.category ?? "General"}
          className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          defaultValue={tutorial?.description ?? ""}
          className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

      {/* YouTube */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          YouTube Embed URL
        </label>

        <input
          name="youtube_url"
          defaultValue={tutorial?.youtube_url ?? ""}
          placeholder="https://www.youtube.com/embed/..."
          className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

      {/* Reading Time */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Reading Time
        </label>

        <input
          type="number"
          name="reading_time"
          defaultValue={tutorial?.reading_time ?? 5}
          className="w-40 rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

      {/* Featured */}

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={tutorial?.featured}
        />

        <label className="text-white">
          Featured Tutorial
        </label>
      </div>

      {/* Status */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Status
        </label>

        <select
          name="status"
          defaultValue={tutorial?.status ?? "Draft"}
          className="w-full rounded-lg bg-[#07182F] p-3 text-white"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>

      {/* Rich Text Editor */}

      <div>
        <label className="mb-2 block font-semibold text-white">
          Tutorial Content
        </label>

        <RichTextEditor
          value={content}
          onChange={setContent}
        />

        <input
          type="hidden"
          name="content"
          value={content}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-cyan-500 px-8 py-3 font-bold text-black transition hover:bg-cyan-400"
      >
        {tutorial ? "Save Changes" : "Create Tutorial"}
      </button>
    </form>
  );
}