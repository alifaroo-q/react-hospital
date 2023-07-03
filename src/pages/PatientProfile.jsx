import Header from "../components/Header.jsx";
import ProfileView from "../components/ProfileView.jsx";
import { PatientProvider } from "../context/PatientContext.jsx";

const PatientProfile = () => {
  return (
    <>
      <Header />
      <PatientProvider>
        <ProfileView />
      </PatientProvider>
    </>
  );
};
export default PatientProfile;
