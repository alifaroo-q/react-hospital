import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const AppointmentContext = createContext({
  appointments: [],
  addAppointment: () => {},
});

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const toast = useToast();

  const userAuth = JSON.parse(localStorage.getItem("userAuthData"));
  axios.defaults.headers["Authorization"] = `Bearer ${userAuth?.access}`;

  useEffect(() => {
    if (userAuth.user.role === "Receptionist") {
      axios.get("/api/appointments/").then((res) => {
        setAppointments(res.data);
      });
    }
  }, [userAuth.user.role]);

  const addAppointment = (newAppointment) => {
    axios
      .post("/api/appointments/", newAppointment)
      .then((res) => {
        console.log(res);
        toast({
          title: "Appointment Created",
          description: "Appointment created successfully",
          status: "success",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = { appointments, addAppointment };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
