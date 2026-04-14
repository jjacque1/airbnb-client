import { useState } from "react";
import api from "../api/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      console.log("Register success:", response.data);

      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h1>Register</h1>
      </header>
      <div>
        <label htmlFor="fullName">Full Name: </label>
        <input
          id="fullName"
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
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
