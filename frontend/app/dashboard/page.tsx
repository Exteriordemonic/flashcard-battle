"use client";

import { useAuthStore } from "@/stores/authStore";

export default function DashboardPage() {
  const logout = () => {
    useAuthStore.getState().logout();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Hello from dashboard
      <button
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
