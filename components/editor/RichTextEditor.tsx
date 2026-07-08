"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type Props = {
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
  placeholder?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  compact = false,
  placeholder = "Start writing...",
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({
        placeholder,
      }),
    ],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class: `${
          compact ? "min-h-[120px]" : "min-h-[400px]"
        } rounded-b-lg bg-[#07182F] p-4 text-white outline-none`,
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">

      <div className="flex flex-wrap gap-2 border-b border-white/10 bg-[#0B2447] p-3">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded bg-cyan-500 px-3 py-1 font-bold text-black"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded bg-cyan-500 px-3 py-1 italic text-black"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="rounded bg-cyan-500 px-3 py-1 underline text-black"
        >
          U
        </button>

        {!compact && (
          <>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="rounded bg-cyan-500 px-3 py-1 text-black"
            >
              H1
            </button>

            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="rounded bg-cyan-500 px-3 py-1 text-black"
            >
              H2
            </button>

            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              className="rounded bg-cyan-500 px-3 py-1 text-black"
            >
              • List
            </button>

            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
              className="rounded bg-cyan-500 px-3 py-1 text-black"
            >
              1. List
            </button>
          </>
        )}

      </div>

      <EditorContent editor={editor} />

    </div>
  );
}