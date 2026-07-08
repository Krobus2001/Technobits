"use client";

import { useState } from "react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import {
  createQuestion,
  updateQuestion,
} from "@/app/admin/questions/actions";

type Props = {
  question?: any;
  questionId?: string;
};

export default function QuestionForm({
  question,
  questionId,
}: Props) {
  const [title, setTitle] = useState(
    question?.title ?? ""
  );

  const [slug, setSlug] = useState(
    question?.slug ?? ""
  );

  const [content, setContent] = useState(
    question?.content ?? ""
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
      action={
        questionId
          ? updateQuestion.bind(null, questionId)
          : createQuestion
      }
      className="space-y-8 rounded-2xl bg-white/5 p-8"
    >
      {/* Title */}

      <div>

        <label className="mb-2 block font-semibold text-white">
          Question Title
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

        <select
          name="category"
          defaultValue={
            question?.category ?? "General"
          }
          className="w-full rounded-lg bg-[#07182F] p-3 text-white"
        >
          <option>Programming</option>
          <option>Hardware</option>
          <option>Networking</option>
          <option>Windows</option>
          <option>Linux</option>
          <option>Cybersecurity</option>
          <option>Web Development</option>
          <option>Mobile Development</option>
          <option>School Projects</option>
          <option>General</option>
        </select>

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block font-semibold text-white">
          Short Description
        </label>

        <textarea
          rows={4}
          name="description"
          defaultValue={
            question?.description ?? ""
          }
          className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
        />
      </div>

            {/* Featured */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="featured"
          defaultChecked={question?.featured ?? false}
        />

        <label className="text-white">
          Featured Question
        </label>

      </div>

      {/* Pinned */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="pinned"
          defaultChecked={question?.pinned ?? false}
        />

        <label className="text-white">
          Pin this Question
        </label>

      </div>

      {/* Locked */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="locked"
          defaultChecked={question?.locked ?? false}
        />

        <label className="text-white">
          Lock Replies
        </label>

      </div>

      {/* Published */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="published"
          defaultChecked={question?.published ?? false}
        />

        <label className="text-white">
          Publish Immediately
        </label>

      </div>

      {/* Rich Text Editor */}

      <div>

        <label className="mb-2 block font-semibold text-white">
          Question Details
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

      {/* Submit */}

      <button
        type="submit"
        className="rounded-lg bg-cyan-500 px-8 py-3 font-bold text-black transition hover:bg-cyan-400"
      >
        {questionId
          ? "Update Question"
          : "Create Question"}
      </button>

    </form>
  );
}