import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const NurseContext = createContext({
  nurses: [],
});

export const NurseProvider = ({ children }) => {
  const [nurses, setNurses] = useState([]);

  const userAuth = JSON.parse(localStorage.getItem("userAuthData"));
  axios.defaults.headers["Authorization"] = `Bearer ${userAuth?.access}`;

  useEffect(() => {
    axios.get("/api/nurse/").then((res) => {
      setNurses(res.data);
    });
  }, []);

  const value = { nurses };
  return (
    <NurseContext.Provider value={value}>{children}</NurseContext.Provider>
  );
};
