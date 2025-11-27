import { useState } from "react";
import { SaveEmployee } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";


export default function AddEmployee() {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await SaveEmployee(employee);

    setSuccessMessage("Employee added successfully!");
    setErrorMessage("");

    setTimeout(() => {
      navigate("/employees");
    }, 1200);

  } catch (error) {
    setSuccessMessage("");
    setErrorMessage(error.response?.data || "Something went wrong");
  }
};


  return (
    <div className="container mt-5 d-flex justify-content-center">
         <div className="card shadow-sm p-4" style={{ width: "450px", borderRadius: "12px" }}>

      <h2>Add Employee</h2>
        <AlertMessage type="success" message={successMessage} />
        <AlertMessage type="danger" message={errorMessage} />

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>

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

        <button className="btn btn-primary mt-3">Save</button>
      </form>
      </div>
    </div>
  );
}
