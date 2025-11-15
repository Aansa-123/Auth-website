import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./features/auth/authSlice";
import api from "./api/axios";
import { useSessionManager } from "./hooks/useSessionManager";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import SessionWarning from "./components/SessionWarning";
import './index.css';
export default function App() {
  const dispatch = useDispatch();
  const { accessToken, user, initializing } = useSelector((state) => state.auth);

  // Initialize session management
  useSessionManager();


  useEffect (() => {
    const restoreSession = async () => {
      try {
        await dispatch(refreshToken());
      } catch (error) {
        console.error('Session restore failed:', error);
      }
    };
    restoreSession();
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  if (initializing) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <SessionWarning />
      <Routes>
        <Route
          path="/"
          element={user ? (user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/profile" replace />) : <Navigate to="/login" replace />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? (user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/profile" replace />) : <Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
}
