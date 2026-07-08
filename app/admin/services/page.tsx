import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div>

      <div className="mb-10 flex items-center justify-between">

        <h1 className="text-4xl font-black text-white">
          Services
        </h1>

        <Link
          href="/admin/services/new"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
        >
          + Add Service
        </Link>

      </div>

      <div className="space-y-5">

        {services?.map((service) => (

          <div
            key={service.id}
            className="rounded-2xl border border-white/10 bg-[#07182F] p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  {service.title}
                </h2>

                <p className="mt-2 text-slate-400">
                  {service.description}
                </p>

                <div className="mt-4 flex gap-6 text-cyan-400">

                  <span>
                    ₱{service.price}
                  </span>

                  <span>
                    {service.estimated_duration} mins
                  </span>

                  <span>
                    {service.active
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <Link
                    href={`/admin/services/${service.id}`}
                    className="rounded-lg border border-cyan-500 px-5 py-2 text-cyan-400"
                >
                    Edit
                </Link>

                <form
                    action={deleteService.bind(null, service.id)}
                >
                    <button
                    className="rounded-lg border border-red-500 px-5 py-2 text-red-400 hover:bg-red-500/10"
                    >
                    Delete
                    </button>
                </form>

                </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}