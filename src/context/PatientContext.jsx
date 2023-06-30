import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const PatientContext = createContext({
  patients: [],
  addNewPatient: () => {},
});

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const toast = useToast();

  const userAuth = JSON.parse(localStorage.getItem("userAuthData"));
  axios.defaults.headers["Authorization"] = `Bearer ${userAuth?.access}`;

  const addNewPatient = (newPatient) => {
    axios
      .post("/api/patient/add/", newPatient)
      .then(() => {
        toast({
          title: "Patient Created",
          description: "New patient created successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("/api/patients/").then((res) => {
      setPatients(res.data);
    });
  }, []);

  const value = { patients, addNewPatient };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
