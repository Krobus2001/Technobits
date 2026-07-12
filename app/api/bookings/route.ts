import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json(
    {
      error: "You must be logged in to book a service.",
    },
    {
      status: 401,
    }
  );
}

  const body = await request.json();

  const {
    service_id,
    appointment_date,
    appointment_time,
    full_name,
    student_id,
    contact_number,
    device_type,
    device_brand,
    problem_description,
  } = body;

  const { data, error } = await supabase
  .from("service_bookings")
  .insert({
    user_id: user.id,

    service_id,
    appointment_date,
    appointment_time,

    full_name,
    student_id,
    contact_number,

    device_type,
    device_brand,
    problem_description,

    status: "Pending",
  })
  .select()
  .single();

  if (error) {
  console.log(error);

  return NextResponse.json(
    {
      error: error.message,
      details: error,
    },
    {
      status: 400,
    }
  );
}

  return NextResponse.json(data);
}