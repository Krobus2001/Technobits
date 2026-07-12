import { createClient } from "@/lib/supabase-server";
import ServicesNavigation from "@/components/admin/services/ServicesNavigation";
import BookingFilters from "@/components/admin/services/BookingFilters";

export default async function BookingsPage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("service_bookings")
    .select(`
      *,
      services (
        title
      )
    `)
    .eq("archived", false)
    .order("appointment_date", {
      ascending: true,
    })
    .order("appointment_time", {
      ascending: true,
    });

  return (
    <div>
      <h1 className="text-4xl font-black text-white">
        Service Bookings
      </h1>

      <ServicesNavigation current="bookings" />

      <BookingFilters bookings={bookings ?? []} />
    </div>
  );
}