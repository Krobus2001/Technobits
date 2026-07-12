"use client";

import { useState } from "react";
import OfficerPhotoUploader from "./OfficerPhotoUploader";
import { createOfficer, updateOfficer } from "@/app/admin/officers/actions";

type Position = {
  id: number;
  title: string;
};

type Officer = {
  id: string;
  full_name: string;
  photo_url: string;
  club_position_id: number;
  academic_year: string;
  quote: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  github_url: string | null;
  gmail: string | null;
};

type Props = {
  positions: Position[];
  officer?: Officer;
  editing?: boolean;
};

export default function OfficerForm({
  positions,
  officer,
  editing = false,
}: Props) {
  const [photo, setPhoto] = useState(
    officer?.photo_url ?? ""
  );

  return (
    <div className="max-w-3xl">

      <h1 className="mb-8 text-4xl font-black text-white">
        {editing ? "Edit Officer" : "Add Officer"}
      </h1>

      <form
        action={
          editing
            ? updateOfficer.bind(null, officer!.id)
            : createOfficer
        }
        className="space-y-6 rounded-2xl bg-[#07182F] p-8"
      >

        <input
          name="full_name"
          defaultValue={officer?.full_name}
          placeholder="Full Name"
          required
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <div>

          <label className="mb-2 block text-white font-semibold">
            Officer Photo
          </label>

          <OfficerPhotoUploader
            value={photo}
            onUpload={setPhoto}
          />

          <input
            type="hidden"
            name="photo_url"
            value={photo}
          />

        </div>

        <select
          name="club_position_id"
          defaultValue={officer?.club_position_id}
          required
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        >
          <option value="">
            Select Position
          </option>

          {positions.map((position) => (
            <option
              key={position.id}
              value={position.id}
            >
              {position.title}
            </option>
          ))}
        </select>

        <input
          name="academic_year"
          defaultValue={
            officer?.academic_year ??
            "2026-2027"
          }
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <textarea
          name="quote"
          defaultValue={officer?.quote ?? ""}
          rows={4}
          placeholder="Officer Quote"
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <input
          name="facebook_url"
          defaultValue={officer?.facebook_url ?? ""}
          placeholder="Facebook URL"
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <input
          name="instagram_url"
          defaultValue={officer?.instagram_url ?? ""}
          placeholder="Instagram URL"
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <input
          name="tiktok_url"
          defaultValue={officer?.tiktok_url ?? ""}
          placeholder="TikTok URL"
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <input
          name="github_url"
          defaultValue={officer?.github_url ?? ""}
          placeholder="GitHub URL"
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <input
          name="gmail"
          defaultValue={officer?.gmail ?? ""}
          placeholder="Gmail"
          className="w-full rounded-lg bg-[#091f39] p-3 text-white"
        />

        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-black hover:bg-cyan-400"
        >
          {editing
            ? "Save Changes"
            : "Create Officer"}
        </button>

      </form>

    </div>
  );
}