import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EventForm from "@/components/events/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-6xl">

      <h1 className="mb-8 text-4xl font-black text-white">
        Edit Event
      </h1>

      <EventForm
        event={event}
        eventId={id}
      />

    </div>
  );
}