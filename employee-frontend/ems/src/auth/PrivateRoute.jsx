import { Navigate } from "react-router-dom";
import AuthService from "./AuthService";

export default function PrivateRoute({ children }) {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
}
