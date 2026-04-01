import { create } from "zustand";

const ACCESS_KEY = "auth_access_token";
const REFRESH_KEY = "auth_refresh_token";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  user: unknown | null;

  hydrateFromStorage: () => void;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
  setUser: (user: unknown) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  hasHydrated: false,
  user: null,

  hydrateFromStorage: () => {
    if (typeof window === "undefined") return;
    const access = localStorage.getItem(ACCESS_KEY);
    const refresh = localStorage.getItem(REFRESH_KEY);
    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: Boolean(access && refresh),
      hasHydrated: true,
    });
  },

  setTokens: (access, refresh) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_KEY, access);
      localStorage.setItem(REFRESH_KEY, refresh);
    }

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
      hasHydrated: true,
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    }

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,
      hasHydrated: true,
    });
  },

  setUser: (user) => {
    set({ user });
  },
}));
