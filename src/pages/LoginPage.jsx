import { useState } from "react";
import api from "../api/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setEmail("");
      setPassword("");

      console.log("Login successful: ", response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <header>
        <h1>Login in</h1>
      </header>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          value={email}
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
          type="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button type="submit">Login in</button>
    </form>
  );
}
