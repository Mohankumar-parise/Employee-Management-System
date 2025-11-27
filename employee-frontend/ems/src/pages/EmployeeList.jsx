import { useEffect, useState } from "react";
import { DeleteUser, GetUsers } from "../api/axiosConfig";
import {  useNavigate } from "react-router-dom";  // ✅ FIX: import useNavigate
import AlertMessage from "../components/AlertMessage";

export default function EmployeeList() {

  const navigate = useNavigate();  // ✅ FIX: define navigate

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const loadEmployees = async () => {
    // const response = await api.get("/employees");
    const response =await GetUsers();
    setEmployees(response.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      // await api.delete(`/employees/${id}`);
      await DeleteUser(id);
      loadEmployees();
      setSuccessMessage("Employee deleted successfully!");
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

    } catch (error) {
      setErrorMessage("Delete failed: " + (error.response?.data || ""));
    }
  };


  return (
    <div className="d-flex justify-content-center mt-4">
  <div className="card shadow-sm p-4" style={{ width: "90%", maxWidth: "1200px", borderRadius: "12px" }}>

     <h2 className="text-center fw-bold mb-4" style={{ color: "#0d6efd" }}>
  Employees Table
</h2>


      <AlertMessage type="success" message={successMessage} />
      <AlertMessage type="danger" message={errorMessage} />

      <div className="d-flex justify-content-between align-items-center mb-4">

      <input
        type="text"
        className="form-control w-25"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ borderRadius: "8px" }}
      />

      <button
        onClick={() => navigate("/add")}
        className="btn btn-success px-4"
        style={{ borderRadius: "8px" }}
      >
        + Add Employee
      </button>
    </div>

      <table className="table table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees
            .filter((e) =>
              e.name.toLowerCase().includes(search.toLowerCase()) ||
              e.email.toLowerCase().includes(search.toLowerCase())
            )
            .map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td className="fw-semibold">{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>₹ {e.salary.toLocaleString()}</td>
                <td className="text-center">

                  <button
                    onClick={() => navigate(`/edit/${e.id}`)} // ✅ works
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
