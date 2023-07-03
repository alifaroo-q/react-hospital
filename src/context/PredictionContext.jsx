import { createContext, useState } from "react";

import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";

export const PredictionContext = createContext({
  deathPrediction: {},
  severityPrediction: {},
  getDeathPrediction: () => {},
  getSeverityPrediction: () => {},
});

export const PredictionProvider = ({ children }) => {
  const [deathPrediction, setDeathPrediction] = useState({});
  const [severityPrediction, setSeverityPrediction] = useState({});

  const toast = useToast();

  const getDeathPrediction = (parameters) => {
    toast({
      description: "making death prediction",
      status: "loading",
      duration: 3000,
      position: "top",
      isClosable: true,
      icon: <Spinner />,
    });

    axios
      .post("/api/predictions/death/", parameters)
      .then((res) => {
        setDeathPrediction(res.data);
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_RESPONSE") {
          alert("Something wrong with input data");
        } else {
          console.log(err);
        }
      });
  };

  const getSeverityPrediction = (parameters) => {
    toast({
      description: "making severity prediction",
      status: "loading",
      duration: 3000,
      position: "top",
      isClosable: true,
      icon: <Spinner />,
    });

    axios
      .post("/api/predictions/severity/", parameters)
      .then((res) => {
        setSeverityPrediction(res.data);
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_RESPONSE") {
          alert("Something wrong with input data");
        } else {
          console.log(err);
        }
      });
  };

  const value = {
    deathPrediction,
    severityPrediction,
    getDeathPrediction,
    getSeverityPrediction,
  };
  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  );
};
