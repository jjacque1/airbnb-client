import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="app-header">
      <div className="header-container">
        <NavLink to="/" className="brand-logo">
          JacqueCodes
        </NavLink>

        <nav className="main-nav">
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
              </NavLink>
              <button onClick={handleLogout} >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
