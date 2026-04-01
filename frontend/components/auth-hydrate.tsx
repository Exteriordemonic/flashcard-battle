"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

/** Odtwarza stan auth z localStorage po odświeżeniu (Zustand startuje pusty). */
export function AuthHydrate() {
  const hydrateFromStorage = useAuthStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  return null;
}
