import React, { createContext, useEffect, useMemo, useState } from "react";
import type { AuthUser } from "../types/auth";
import { authService } from "../services/auth.service";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (!token) return;
        const me = await authService.me();
        setUser(me);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      setIsLoading(false);
      return;
    }

    init();
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      login: async (email, password) => {
        const { jwt, user } = await authService.login(email, password);
        localStorage.setItem("token", jwt);
        setToken(jwt);
        setUser(user);
      },
      register: async (username, email, password) => {
        await authService.register(username, email, password);
      },
      logout: () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      },
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
