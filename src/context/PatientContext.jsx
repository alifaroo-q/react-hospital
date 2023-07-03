import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const PatientContext = createContext({
  patients: [],
  addNewPatient: () => {},
  updatePatient: () => {},
  deletePatient: () => {},
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
          position: "top",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePatient = (updatedPatientData) => {
    const filterOutPatients = patients.filter(
      (patient) => patient.id !== updatedPatientData.id
    );
    const newPatients = [updatedPatientData, ...filterOutPatients];

    const url =
      userAuth.user.role === "Doctor"
        ? `/api/doctor/patients/${updatedPatientData.id}/`
        : `/api/patient/${updatedPatientData.id}/`;

    axios
      .put(url, updatedPatientData)
      .then(() => {
        setPatients(newPatients);
        toast({
          title: "Patient Updated",
          description: "Patient updated successfully",
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

  const deletePatient = (id) => {
    const filteredPatients = patients.filter((patient) => patient.id !== id);

    axios
      .delete(`/api/patient/${id}/`)
      .then(() => {
        setPatients(filteredPatients);
        toast({
          title: "Patient Deleted",
          description: "Patient deleted successfully",
          status: "warning",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const url =
      userAuth.user.role === "Doctor"
        ? "/api/doctor/patients/"
        : "/api/patients/";
    axios
      .get(url)
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const value = { patients, addNewPatient, updatePatient, deletePatient };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
