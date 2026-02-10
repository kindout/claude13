export type AuthUser = { id: number; username: string; email: string };
export type AuthResponse = { jwt: string; user: AuthUser };
