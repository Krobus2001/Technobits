import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("title");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">

      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

        <Link
          href="/"
          className="transition hover:text-cyan-400"
        >
          Home
        </Link>

        <span>/</span>

        <span className="text-white">
          Services
        </span>

      </div>

      {/* Header */}

      <h1 className="text-5xl font-black text-white">
        TECHNOBITS Services
      </h1>

      <p className="mt-5 text-slate-400">
        Book one of our technical services.
      </p>

      {/* Services */}

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {services?.map((service) => (

          <div
            key={service.id}
            className="rounded-2xl border border-white/10 bg-[#07182F] p-8 transition hover:border-cyan-400 hover:bg-[#0b2140]"
          >

            <h2 className="text-2xl font-bold text-white">
              {service.title}
            </h2>

            <p className="mt-4 text-slate-400">
              {service.description}
            </p>

            <div className="mt-8 flex items-center justify-between">

              <span className="font-bold text-cyan-400">
                ₱{service.price}
              </span>

              <span className="text-slate-500">
                {service.estimated_duration} mins
              </span>

            </div>

            <Link
              href={`/services/${service.slug}`}
              className="mt-8 block rounded-xl bg-cyan-500 py-3 text-center font-bold text-black transition hover:bg-cyan-400"
            >
              Book Service
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}