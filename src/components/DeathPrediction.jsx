import PredictionForm from "./PredictionForm.jsx";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { memo, useCallback, useContext, useState } from "react";
import { PredictionContext } from "../context/PredictionContext.jsx";

const INITIAL_DEATH_DATA = Object.freeze({
  Severity_class: "",
  "MAP Less 70": "",
  AgeScore: "",
  CrtnScore: "",
  "Procalciton Greater 0.1": "",
  Ddimer: "",
  Procalcitonin: "",
  "D-Dimer Greater 3": "",
  "IL6 Greater 150": "",
  "Troponin Greater 0.1": "",
  "O2 Sat Less 94": "",
  Creatinine: "",
  Troponin: "",
  "Lymphocytes Less 1": "",
  Ferritin: "",
  WBC: "",
  "Ferritin Greater 300": "",
  "Sodium Less 139 or Greater 154": "",
  "WBC Less1.8 or Greater 4.8": "",
  PltsScore: "",
  TempYes: "",
});

const DeathPrediction = memo(() => {
  const [deathData, setDeathData] = useState(() => INITIAL_DEATH_DATA);

  const { getDeathPrediction } = useContext(PredictionContext);

  const handleDeathDataChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setDeathData({
        ...deathData,
        [name]: value,
      });
    },
    [deathData]
  );

  const deathPrediction = [
    {
      id: 1,
      name: "Severity_class",
      label: "Severity Class",
      value: deathData.Severity_class,
    },
    {
      id: 2,
      name: "MAP Less 70",
      label: "MAP Less 70",
      value: deathData["MAP Less 70"],
    },
    {
      id: 3,
      name: "AgeScore",
      label: "Age Score",
      value: deathData.AgeScore,
    },
    {
      id: 4,
      name: "CrtnScore",
      label: "Crtn Score",
      value: deathData.CrtnScore,
    },
    {
      id: 5,
      name: "Procalciton Greater 0.1",
      label: "Procalciton Greater 0.1",
      value: deathData["Procalciton Greater 0.1"],
    },
    {
      id: 6,
      name: "Ddimer",
      label: "Ddimer",
      value: deathData.Ddimer,
    },
    {
      id: 7,
      name: "Procalcitonin",
      label: "Procalcitonin",
      value: deathData.Procalcitonin,
    },
    {
      id: 8,
      name: "D-Dimer Greater 3",
      label: "D-Dimer Greater 3",
      value: deathData["D-Dimer Greater 3"],
    },
    {
      id: 9,
      name: "IL6 Greater 150",
      label: "IL6 Greater 150",
      value: deathData["IL6 Greater 150"],
    },
    {
      id: 10,
      name: "Troponin Greater 0.1",
      label: "Troponin Greater 0.1",
      value: deathData["Troponin Greater 0.1"],
    },
    {
      id: 11,
      name: "O2 Sat Less 94",
      label: "O2 Sat Less 94",
      value: deathData["O2 Sat Less 94"],
    },
    {
      id: 12,
      name: "Creatinine",
      label: "Creatinine",
      value: deathData.Creatinine,
    },
    {
      id: 13,
      name: "Troponin",
      label: "Troponin",
      value: deathData.Troponin,
    },
    {
      id: 14,
      name: "Lymphocytes Less 1",
      label: "Lymphocytes Less 1",
      value: deathData["Lymphocytes Less 1"],
    },
    {
      id: 15,
      name: "Ferritin",
      label: "Ferritin",
      value: deathData.Ferritin,
    },
    {
      id: 16,
      name: "WBC",
      label: "WBC",
      value: deathData.WBC,
    },
    {
      id: 17,
      name: "Ferritin Greater 300",
      label: "Ferritin Greater 300",
      value: deathData["Ferritin Greater 300"],
    },
    {
      id: 18,
      name: "Sodium Less 139 or Greater 154",
      label: "Sodium Less 139 or Greater 154",
      value: deathData["Sodium Less 139 or Greater 154"],
    },
    {
      id: 19,
      name: "WBC Less1.8 or Greater 4.8",
      label: "WBC Less 1.8 or Greater 4.8",
      value: deathData["WBC Less1.8 or Greater 4.8"],
    },
    {
      id: 20,
      name: "PltsScore",
      label: "Plts Score",
      value: deathData.PltsScore,
    },
    {
      id: 21,
      name: "TempYes",
      label: "Temp Yes",
      value: deathData.TempYes,
    },
  ];

  const handleDeathPrediction = () => {
    getDeathPrediction(deathData);
  };

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading fontSize={"lg"} my={"5"}>
          Enter all of the parameters
        </Heading>
        <Button
          colorScheme={"teal"}
          size={"md"}
          onClick={handleDeathPrediction}
        >
          Predict
        </Button>
      </Flex>
      <PredictionForm
        formFieldsChangeHandler={handleDeathDataChange}
        formFields={deathPrediction}
      />
    </Box>
  );
});
export default DeathPrediction;
