import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Heading } from "@chakra-ui/react";

import Header from "../components/Header.jsx";
import Doctor from "../components/Doctor.jsx";
import Nurse from "../components/Nurse.jsx";
import Receptionist from "../components/Receptionist.jsx";
import { AppointmentProvider } from "../context/AppointmentContext.jsx";
import { PatientProvider } from "../context/PatientContext.jsx";
import { DoctorProvider } from "../context/DoctorContext.jsx";
import { NurseProvider } from "../context/NurseContext.jsx";

const Dashboard = () => {
  const { userAuthData } = useContext(AuthContext);

  let mainView;

  // decides which view to show
  switch (userAuthData.user.role.toLowerCase()) {
    case "doctor":
      mainView = <Doctor />;
      break;
    case "nurse":
      mainView = <Nurse />;
      break;
    case "receptionist":
      mainView = <Receptionist />;
      break;
    default:
      mainView = <Heading>Something went wrong</Heading>;
      break;
  }

  return (
    <>
      <AppointmentProvider>
        <PatientProvider>
          <DoctorProvider>
            <NurseProvider>
              <Header />
              {mainView}
            </NurseProvider>
          </DoctorProvider>
        </PatientProvider>
      </AppointmentProvider>
    </>
  );
};

export default Dashboard;
