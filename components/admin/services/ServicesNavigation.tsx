import Link from "next/link";

type Props = {
  current:
    | "services"
    | "new"
    | "schedule"
    | "bookings"
    | "archive";
};

export default function ServicesNavigation({
  current,
}: Props) {
  const items = [
    {
      key: "services",
      href: "/admin/services",
      label: "📋 All Services",
    },
    {
      key: "new",
      href: "/admin/services/new",
      label: "➕ New Service",
    },
    {
      key: "schedule",
      href: "/admin/services/schedule",
      label: "🕒 Schedule",
    },
    {
      key: "bookings",
      href: "/admin/services/bookings",
      label: "📅 Bookings",
    },
    {
      key: "archive",
      href: "/admin/services/archive",
      label: "🗄️ Archive",
    },
  ];

  return (
    <div className="mb-10 mt-10 flex flex-wrap gap-4">
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={`rounded-xl px-6 py-3 font-bold transition ${
            current === item.key
              ? "bg-cyan-500 text-black"
              : "bg-[#07182F] text-white hover:bg-[#0A2244]"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}