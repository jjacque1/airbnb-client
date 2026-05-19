import { useState } from "react";
import api from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(response.data.user);
      navigate("/profile");

      setEmail("");
      setPassword("");

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <header>
        <h1>Login</h1>
      </header>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          value={email}
          placeholder="Enter email"
          type="email"
          id="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          placeholder="Enter password"
          type="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <p style={{ color: "red", paddingTop: "16px" }}> {error} </p>
      <button type="submit">Login</button>
    </form>
  );
}
