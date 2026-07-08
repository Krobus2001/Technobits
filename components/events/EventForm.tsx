"use client";

import { useState } from "react";
import PosterUploader from "./PosterUploader";
import RichTextEditor from "@/components/editor/RichTextEditor";
import {
  createEvent,
  updateEvent,
} from "@/app/admin/events/actions";

type Props = {
  event?: any;
  eventId?: string;
};

export default function EventForm({
  event,
  eventId,
}: Props) {
  const [poster, setPoster] = useState(
    event?.poster_url ?? ""
  );

  const [title, setTitle] = useState(
    event?.title ?? ""
  );

  const [slug, setSlug] = useState(
    event?.slug ?? ""
  );

  const [content, setContent] = useState(
    event?.content ?? ""
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
        eventId
          ? updateEvent.bind(null, eventId)
          : createEvent
      }
      className="space-y-10"
    >

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Event Information
        </h2>

        <div className="space-y-8">

          <div>

            <label className="mb-2 block font-semibold text-white">
              Event Poster
            </label>

            <PosterUploader
              value={poster}
              onUpload={setPoster}
            />

            <input
              type="hidden"
              name="poster_url"
              value={poster}
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-white">
              Event Title
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

          <div>

            <label className="mb-2 block font-semibold text-white">
              URL Slug
            </label>

            <input
              required
              name="slug"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-white">
              Short Description
            </label>

            <textarea
              rows={4}
              name="description"
              defaultValue={
                event?.description ?? ""
              }
              placeholder="Short summary shown on the Events page..."
              className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
            />

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Event Details
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold text-white">
              Event Type
            </label>

            <select
              name="event_type"
              defaultValue={event?.event_type ?? "General Event"}
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              <option>Seminar</option>
              <option>Workshop</option>
              <option>Tournament</option>
              <option>Training</option>
              <option>Meeting</option>
              <option>Booth Activity</option>
              <option>Competition</option>
              <option>Outreach</option>
              <option>Webinar</option>
              <option>General Event</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block font-semibold text-white">
              Venue
            </label>

            <select
              name="venue"
              defaultValue={event?.venue ?? "IS Building"}
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              <option>IS Building</option>
              <option>Computer Laboratory</option>
              <option>AVR</option>
              <option>Gymnasium</option>
              <option>School Grounds</option>
              <option>Online</option>
              <option>TBA</option>
            </select>

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-semibold text-white">
              Eligibility
            </label>

            <select
              name="eligibility"
              defaultValue={
                event?.eligibility ??
                "Open to All Students"
              }
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              <option>Open to All Students</option>
              <option>TECHNOBITS Members</option>
              <option>ICT Students</option>
              <option>BSIT Students</option>
              <option>By Invitation</option>
            </select>

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Schedule
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold text-white">
              📅 Event Starts
            </label>

            <input
              type="datetime-local"
              name="start_date"
              defaultValue={
                event?.start_date?.slice(0, 16) ?? ""
              }
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-white">
              🏁 Event Ends
            </label>

            <input
              type="datetime-local"
              name="end_date"
              defaultValue={
                event?.end_date?.slice(0, 16) ?? ""
              }
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            />

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="mb-2 text-2xl font-bold text-white">
          Registration
        </h2>

        <p className="mb-6 text-slate-400">
          Configure how students can join this event.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold text-white">
              💵 Registration Fee
            </label>

            <input
              name="registration_fee"
              defaultValue={
                event?.registration_fee ?? "FREE"
              }
              placeholder="FREE or 100"
              className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-white">
              👥 Participant Limit
            </label>

            <input
              type="number"
              name="max_participants"
              defaultValue={
                event?.max_participants ?? ""
              }
              placeholder="Leave blank for unlimited"
              className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-semibold text-white">
              🔗 Registration Form Link
            </label>

            <input
              name="registration_url"
              defaultValue={
                event?.registration_url ?? ""
              }
              placeholder="https://forms.google.com/..."
              className="w-full rounded-lg bg-[#07182F] p-3 text-white outline-none"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-semibold text-white">
              ⏰ Registration Deadline
            </label>

            <input
              type="datetime-local"
              name="registration_deadline"
              defaultValue={
                event?.registration_deadline?.slice(
                  0,
                  16
                ) ?? ""
              }
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            />

            <p className="mt-2 text-sm text-slate-500">
              Leave blank if registration stays open
              until the event starts.
            </p>

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Publishing
        </h2>

        <div className="space-y-6">

          <label className="flex items-center gap-4 rounded-xl border border-white/10 p-4 hover:border-cyan-400 transition">

            <input
              type="checkbox"
              name="featured"
              defaultChecked={event?.featured ?? false}
              className="h-5 w-5"
            />

            <div>

              <p className="font-semibold text-white">
                ⭐ Featured Event
              </p>

              <p className="text-sm text-slate-400">
                Featured events appear first on the
                homepage and Events page.
              </p>

            </div>

          </label>

          <div>

            <label className="mb-2 block font-semibold text-white">
              Event Status
            </label>

            <select
              name="status"
              defaultValue={event?.status ?? "Draft"}
              className="w-full rounded-lg bg-[#07182F] p-3 text-white"
            >
              <option value="Draft">
                Draft
              </option>

              <option value="Published">
                Published
              </option>

            </select>

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="mb-2 text-2xl font-bold text-white">
          Event Details
        </h2>

        <p className="mb-6 text-slate-400">
          Write everything participants need to know about this event.
          You can add headings, images, links, schedules, rules, prizes,
          requirements, and more.
        </p>

        <RichTextEditor
          value={content}
          onChange={setContent}
        />

        <input
          type="hidden"
          name="content"
          value={content}
        />

      </section>

      <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-8">

        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
        >
          {eventId
            ? "💾 Update Event"
            : "🚀 Create Event"}
        </button>

      </div>

    </form>
  );
}