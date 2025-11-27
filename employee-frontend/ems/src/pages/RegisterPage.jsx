import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../api/axiosConfig";
import AlertMessage from "../components/AlertMessage";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await api.post("/auth/register", user);
      await UserRegister(user);

      setSuccessMessage("Registration successful! Redirecting to login...");
      setErrorMessage("");

      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Registration failed!"
      );
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>

        <h3 className="text-primary fw-bold text-center mb-3">
          Create Account
        </h3>

        <AlertMessage type="success" message={successMessage} />
        <AlertMessage type="danger" message={errorMessage} />

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={user.role}
              onChange={handleChange}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            style={{ borderRadius: "8px" }}
          >
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
