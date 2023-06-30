import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const DoctorContext = createContext({
  doctors: [],
});

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const userAuth = JSON.parse(localStorage.getItem("userAuthData"));
  axios.defaults.headers["Authorization"] = `Bearer ${userAuth?.access}`;

  useEffect(() => {
    axios.get("/api/doctor/").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  const value = { doctors };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
