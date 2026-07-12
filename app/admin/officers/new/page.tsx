import { createClient } from "@/lib/supabase-server";
import OfficerForm from "@/components/admin/officers/OfficerForm";

export default async function NewOfficerPage() {
  const supabase = await createClient();

  const { data: positions } = await supabase
    .from("club_positions")
    .select("*")
    .neq("title", "Member")
    .neq("title", "Alumni")
    .order("category")
    .order("title");

  return (
    <OfficerForm
      positions={positions ?? []}
    />
  );
}