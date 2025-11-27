import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import axios from "axios";


export default function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });
    
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


  // Load employee details
  const loadEmployee = async () => {
    try {
      // const response = await api.get(`/employees/${id}`);
      const response=await axios.get(`http://localhost:8080/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployee(response.data);

    } catch (error) {
      setErrorMessage("Failed to load employee details");
    }
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    // await api.put(`/employees/${id}`, employee);
    const response=await axios.put(`http://localhost:8080/employees/${id}`, employee, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response,"response from update");
    
    setSuccessMessage("Employee updated successfully!");
    setErrorMessage("");

    setTimeout(() => {
      navigate("/employees");
    }, 1200);

  } catch (error) {
    setErrorMessage(error.response?.data || "Update failed");
    setSuccessMessage("");
  }
};

  return (
    <div className="container mt-5 d-flex justify-content-center">
  <div className="card shadow-sm p-4" style={{ width: "450px", borderRadius: "12px" }}>

      <h2>Edit Employee</h2>
    <AlertMessage type="success" message={successMessage} />
    <AlertMessage type="danger" message={errorMessage} />

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <form onSubmit={handleUpdate}>

        <div className="mt-2">
          <label>Name</label>
          <input 
            type="text"
            className="form-control shadow-sm"
            style={{ borderRadius: "8px" }}
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <label>Email</label>
          <input 
            type="email"
            className="form-control shadow-sm"
            style={{ borderRadius: "8px" }}
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <label>Department</label>
          <input 
            type="text"
            className="form-control shadow-sm"
            style={{ borderRadius: "8px" }}
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <label>Salary</label>
          <input 
            type="number"
            className="form-control shadow-sm"
            style={{ borderRadius: "8px" }}
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary mt-3 px-4 shadow-sm" style={{ borderRadius: "8px" }}>
update
</button>

      </form>
      </div>
    </div>
  );
}
