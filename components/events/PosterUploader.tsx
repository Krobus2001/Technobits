"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

type Props = {
  value?: string;
  onUpload: (url: string) => void;
};

export default function PosterUploader({
  value,
  onUpload,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value ?? "");

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const supabase = createClient();

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("event-posters")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("event-posters")
      .getPublicUrl(fileName);

    setPreview(publicUrl);

    onUpload(publicUrl);

    setUploading(false);
  }

  return (
    <div className="space-y-4">

      {preview && (
        <img
          src={preview}
          alt="Event Poster"
          className="h-72 w-full rounded-xl border border-white/10 object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={uploadFile}
        disabled={uploading}
        className="block w-full rounded-lg border border-white/10 bg-[#07182F] p-3 text-white"
      />

      {uploading && (
        <p className="text-cyan-400">
          Uploading poster...
        </p>
      )}

    </div>
  );
}