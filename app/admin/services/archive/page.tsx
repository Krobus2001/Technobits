import { createClient } from "@/lib/supabase-server";
import ServicesNavigation from "@/components/admin/services/ServicesNavigation";
import BookingFilters from "@/components/admin/services/BookingFilters";

export default async function ArchivePage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("service_bookings")
    .select(`
      *,
      services (
        title
      )
    `)
    .eq("archived", true)
    .order("appointment_date", {
      ascending: false,
    })
    .order("appointment_time", {
      ascending: false,
    });

  return (
    <div>
      <h1 className="text-4xl font-black text-white">
        Archived Bookings
      </h1>

      <p className="mt-2 text-slate-400">
        View all archived service bookings.
      </p>

      <ServicesNavigation current="archive" />

      <BookingFilters bookings={bookings ?? []} />
    </div>
  );
}