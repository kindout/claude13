import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();

  if (isLoading) return <div style={{ padding: 16 }}>Chargement...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
