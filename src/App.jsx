import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import PatientProfile from "./pages/PatientProfile.jsx";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" exact element={<Dashboard />} />
        <Route path={"/patient/:patientID"} element={<PatientProfile />} />
      </Route>
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
