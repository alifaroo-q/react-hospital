import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  const userAuth = JSON.parse(localStorage.getItem("userAuthData"));
  axios.defaults.headers["Authorization"] = `Bearer ${userAuth.access}`;

  useEffect(() => {
    const getAllPatients = () => {
      axios.get("/api/patients/").then((res) => {
        setPatients(res.data);
      });
    };

    getAllPatients();
  }, []);

  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <br />
      {patients.map((patient) => {
        return <div key={patient.id}>{patient.name}</div>;
      })}
    </div>
  );
};

export default Dashboard;
