import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import ServicesNavigation from "@/components/admin/services/ServicesNavigation";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("title");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">
            Services
          </h1>

          <p className="mt-2 text-slate-400">
            Manage TECHNOBITS services.
          </p>
        </div>
      </div>

      <ServicesNavigation current="services" />

      <div className="mt-10 grid gap-6">

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

                <p className="mt-2 max-w-3xl text-slate-400">
                  {service.description}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-cyan-400">
                  ₱{service.price}
                </p>

                <p className="text-slate-500">
                  {service.estimated_duration} mins
                </p>

                <div className="mt-5 flex justify-end gap-3">

                  <Link
                    href={`/admin/services/${service.id}`}
                    className="rounded-lg border border-cyan-500 px-4 py-2 font-semibold text-cyan-400 transition hover:bg-cyan-500/10"
                  >
                    Edit
                  </Link>

                  <form
                    action={deleteService.bind(null, service.id)}
                  >
                    <button
                      type="submit"
                      className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </form>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}