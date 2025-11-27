import { useState } from "react";
import  { UserLogin } from "../api/axiosConfig";
import AuthService from "../auth/AuthService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
    
      const response=await UserLogin({username, password});
      // return console.log("Login successful:", response.data.token);
      AuthService.login(response.data.token); 
      navigate("/employees");

    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input 
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>

        <div className="mt-2">
          <label>Password</label>
          <input 
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button className="btn btn-primary mt-3">Login</button>
        <p className="text-center mt-3">
        Don’t have an account?{" "}
        <span 
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
        >
            Register
        </span>
        </p>

      </form>
    </div>
  );
}
