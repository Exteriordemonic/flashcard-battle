import { create } from "zustand";

type AuthState = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: any | null) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),

  logout: async () => {
    await fetch("/api/logout", { method: "POST" });

    set({
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    try {
      const res = await fetch("/api/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const user = await res.json();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));