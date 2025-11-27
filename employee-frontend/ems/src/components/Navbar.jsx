import AuthService from "../auth/AuthService";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
      <span 
        className="navbar-brand fw-bold" 
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/employees")}
      >
        Employee Manager
      </span>

      <div className="ms-auto">
        {AuthService.isAuthenticated() && (
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
