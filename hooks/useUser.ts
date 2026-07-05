"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/Supabase";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  return {
    user,
    loading,
  };
}