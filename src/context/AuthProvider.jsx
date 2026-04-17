import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(error);
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
