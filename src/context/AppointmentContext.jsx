import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const AppointmentContext = createContext({
  appointments: [],
});

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const userAuth = JSON.parse(localStorage.getItem("userAuthData"));
  axios.defaults.headers["Authorization"] = `Bearer ${userAuth?.access}`;

  useEffect(() => {
    if (userAuth.user.role === "Receptionist") {
      axios.get("/api/appointments/").then((res) => {
        setAppointments(res.data);
      });
    }
  }, [userAuth.user.role]);

  const value = { appointments };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
