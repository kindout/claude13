import { api } from "./api";
import type { AuthResponse, AuthUser } from "../types/auth";

export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post<AuthResponse>("/auth/local", {
      identifier: email,
      password,
    });
    return data;
  },

  async register(username: string, email: string, password: string) {
    const { data } = await api.post<AuthResponse>("/auth/local/register", {
      username,
      email,
      password,
    });
    return data;
  },

  async me() {
    const { data } = await api.get<AuthUser>("/users/me");
    return data;
  },
};