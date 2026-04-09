import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <NavLink to="/" className="brand-logo">
          JacqueCodes
        </NavLink>

        <nav className="main-nav">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
