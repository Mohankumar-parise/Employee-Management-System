import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import PrivateRoute from "./auth/PrivateRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        {/* Protected Routes */}
        <Route 
          path="/employees" 
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/add"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />

        <Route 
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />


        {/* Default */}
        <Route path="*" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}
