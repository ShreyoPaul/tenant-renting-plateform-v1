



import { NavLink } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // const navLinks = [
  //   { name: "Home", path: "/" },
  //   { name: "Search", path: "/search" },
  //   { name: "Owners", path: "/owners" },
  //   { name: "My Account", path: "/account" },
  // ];

// const token = localStorage.getItem("token");

const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
    setUserRole(decoded.role);
  }
}, []);
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Search", path: "/search" },

  // ✅ show only if owner
  ...(userRole === "owner"
    ? [{ name: "Owners", path: "/owners" }]
    : []),

  { name: "My Account", path: "/account" },
];
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      localStorage.removeItem("token");
      window.location.reload();
      // navigate("/login");
    }
  };
  return (
    <nav className="ac-nav">
      {/* Logo */}
      <div className="ac-nav-logo">The Academic Curator</div>

      {/* Desktop Links */}
      <ul className="ac-nav-links">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Icons + Hamburger */}
      <div className="ac-nav-icons">
        {/* <span>🔔</span>
        <span>♥</span> */}
        <NavLink to={"/signup"} className="ac-avatar">S</NavLink>
        <button
          onClick={handleLogout}
          className="w-20 sm:w-16 rounded-xl
  text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 border-red-500 border text-center"
        >
          {/* <span className="text-lg font-semibold">🚪</span> */}
          Logout
        </button>

        {/* Hamburger */}
        <div
          className="ac-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="ac-mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="ac-mobile-link"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}