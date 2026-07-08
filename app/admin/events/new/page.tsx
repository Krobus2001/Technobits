import EventForm from "@/components/events/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-6xl">

      <h1 className="mb-8 text-4xl font-black text-white">
        Create Event
      </h1>

      <EventForm />

    </div>
  );
}