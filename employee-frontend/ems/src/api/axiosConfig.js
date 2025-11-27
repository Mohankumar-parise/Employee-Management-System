import axios from "axios";



export const SaveEmployee = async (employee) => {
  const token = localStorage.getItem("token");
  return await axios.post("http://localhost:8080/employees", employee, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UserRegister = async (user) => {
  return await axios.post("http://localhost:8080/auth/register", user);
}

export const UserLogin = async (credentials) => {
  return await axios.post("http://localhost:8080/auth/login", credentials);
}

export const DeleteUser=async(id)=>{
  const token = localStorage.getItem("token");
  return await axios.delete(`http://localhost:8080/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetUsers= async()=>{
  const token = localStorage.getItem("token");
  return await axios.get("http://localhost:8080/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
