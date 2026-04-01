import { create } from "zustand";
import { useRouter } from "next/navigation";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: any | null;

  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
  setUser: (user: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  // ===== STATE =====
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,

  // ===== ACTIONS =====

  setTokens: (access, refresh) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_access_token", access);
      localStorage.setItem("auth_refresh_token", refresh);
    }

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_access_token");
      localStorage.removeItem("auth_refresh_token");
    }

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,
    });    
  },

  setUser: (user) => {
    set({
      user,
    });
  },
}));
