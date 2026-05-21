import { useState } from "react";
import api from "../api/api";
import {
  UNSAFE_RSCDefaultRootErrorBoundary,
  useNavigate,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [passwordHint, setPasswordHint] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  async function handleRegister(event) {
    event.preventDefault();
    try {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!password) {
        setError("Password is required.");
        return;
      }

      if (password.length < 12) {
        setError("Password must be at least 12 characters long.");
        return;
      }

      const response = await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);

      navigate("/profile");

      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <header>
        <h1>Register</h1>
      </header>
      <div>
        <label htmlFor="fullName">Full Name: </label>
        <input
          id="fullName"
          placeholder="Enter full name"
          type="text"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="password-input-wrapper">
        <label htmlFor="password">Password: </label>

        <input
          value={password}
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          onClick={() => setPasswordHint("Password must be at least 12 characters.")}
        />

        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁"}
        </button>
        <p className="input-hint"> {passwordHint} </p>
      </div>
      <p style={{ color: "red", paddingTop: "16px" }}> {error} </p>
      <button type="submit">Sign up</button>
    </form>
  );
}
