import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }

        localStorage.removeItem("token")
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function logout() {
    try {
      localStorage.removeItem("token");

      await api.post("/auth/logout");
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
