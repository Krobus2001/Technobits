import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json([]);
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("service_bookings")
    .select("appointment_time")
    .eq("service_id", id)
    .eq("appointment_date", date)
    .neq("status", "Cancelled");

  return NextResponse.json(data ?? []);
}