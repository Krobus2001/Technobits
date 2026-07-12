import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ServiceBookingClient from "@/components/services/ServiceBookingClient";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  // Fetch the selected service
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!service) {
    notFound();
  }

  // Fetch the weekly schedule
  const { data: schedule } = await supabase
    .from("service_schedule")
    .select("*")
    .order("day_of_week", {
      ascending: true,
    });

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

        <Link
          href="/"
          className="transition hover:text-cyan-400"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          href="/services"
          className="transition hover:text-cyan-400"
        >
          Services
        </Link>

        <span>/</span>

        <span className="text-white">
          {service.title}
        </span>

      </div>

      <ServiceBookingClient
        service={service}
        schedule={schedule ?? []}
      />

    </div>
  );
}