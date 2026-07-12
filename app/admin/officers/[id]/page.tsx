import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import OfficerForm from "@/components/admin/officers/OfficerForm";

export default async function EditOfficerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: officer } = await supabase
    .from("officers")
    .select("*")
    .eq("id", id)
    .single();

  if (!officer) {
    notFound();
  }

  const { data: positions } = await supabase
    .from("club_positions")
    .select("*")
    .neq("title", "Member")
    .neq("title", "Alumni")
    .order("category")
    .order("title");

  return (
    <OfficerForm
      officer={officer}
      positions={positions ?? []}
      editing
    />
  );
}