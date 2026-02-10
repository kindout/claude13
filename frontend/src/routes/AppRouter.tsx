import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { BoardsList } from "../pages/Boards/BoardsList";
import { BoardView } from "../pages/Boards/BoardView";
import { ProtectedRoute } from "./ProtectedRoute";
// OPTIONNEL : si tu ne veux plus de debug, enlève les 2 lignes suivantes
import { ApiTest } from "../pages/Debug/ApiTest";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* OPTIONNEL */}
        <Route path="/debug/api" element={<ApiTest />} />

        <Route
          path="/boards"
          element={
            <ProtectedRoute>
              <BoardsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/boards/:id"
          element={
            <ProtectedRoute>
              <BoardView />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div style={{ padding: 16 }}>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}