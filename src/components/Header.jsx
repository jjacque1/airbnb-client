import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand-logo">
          JacqueCodes
        </Link>

        <nav className="main-nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
}