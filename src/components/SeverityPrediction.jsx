import PredictionForm from "./PredictionForm.jsx";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { memo, useCallback, useContext, useState } from "react";
import { PredictionContext } from "../context/PredictionContext.jsx";

const INITIAL_SEVERITY_DATA = Object.freeze({
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
  PltsScore: "",
  TropYes: "",
  CrtnYes: "",
});

const SeverityPrediction = memo(() => {
  const [severityData, setSeverityData] = useState(() => INITIAL_SEVERITY_DATA);

  const { getSeverityPrediction } = useContext(PredictionContext);

  const handleSeverityDataChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setSeverityData({
        ...severityData,
        [name]: value,
      });
    },
    [severityData]
  );

  const severityPrediction = [
    {
      id: 2,
      name: "MAP Less 70",
      label: "MAP Less 70",
      value: severityData["MAP Less 70"],
    },
    {
      id: 3,
      name: "AgeScore",
      label: "Age Score",
      value: severityData.AgeScore,
    },
    {
      id: 4,
      name: "CrtnScore",
      label: "Crtn Score",
      value: severityData.CrtnScore,
    },
    {
      id: 5,
      name: "Procalciton Greater 0.1",
      label: "Procalciton Greater 0.1",
      value: severityData["Procalciton Greater 0.1"],
    },
    {
      id: 6,
      name: "Ddimer",
      label: "Ddimer",
      value: severityData.Ddimer,
    },
    {
      id: 7,
      name: "Procalcitonin",
      label: "Procalcitonin",
      value: severityData.Procalcitonin,
    },
    {
      id: 8,
      name: "D-Dimer Greater 3",
      label: "D-Dimer Greater 3",
      value: severityData["D-Dimer Greater 3"],
    },
    {
      id: 9,
      name: "IL6 Greater 150",
      label: "IL6 Greater 150",
      value: severityData["IL6 Greater 150"],
    },
    {
      id: 10,
      name: "Troponin Greater 0.1",
      label: "Troponin Greater 0.1",
      value: severityData["Troponin Greater 0.1"],
    },
    {
      id: 11,
      name: "O2 Sat Less 94",
      label: "O2 Sat Less 94",
      value: severityData["O2 Sat Less 94"],
    },
    {
      id: 12,
      name: "Creatinine",
      label: "Creatinine",
      value: severityData.Creatinine,
    },
    {
      id: 13,
      name: "Troponin",
      label: "Troponin",
      value: severityData.Troponin,
    },
    {
      id: 14,
      name: "Lymphocytes Less 1",
      label: "Lymphocytes Less 1",
      value: severityData["Lymphocytes Less 1"],
    },
    {
      id: 15,
      name: "Ferritin",
      label: "Ferritin",
      value: severityData.Ferritin,
    },
    {
      id: 16,
      name: "WBC",
      label: "WBC",
      value: severityData.WBC,
    },
    {
      id: 17,
      name: "Ferritin Greater 300",
      label: "Ferritin Greater 300",
      value: severityData["Ferritin Greater 300"],
    },
    {
      id: 18,
      name: "Sodium Less 139 or Greater 154",
      label: "Sodium Less 139 or Greater 154",
      value: severityData["Sodium Less 139 or Greater 154"],
    },
    {
      id: 19,
      name: "TropYes",
      label: "TropYes",
      value: severityData.TropYes,
    },
    {
      id: 20,
      name: "PltsScore",
      label: "Plts Score",
      value: severityData.PltsScore,
    },
    {
      id: 21,
      name: "CrtnYes",
      label: "CrtnYes",
      value: severityData.CrtnYes,
    },
  ];

  const handleSeverityPrediction = () => {
    getSeverityPrediction(severityData);
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
          onClick={handleSeverityPrediction}
        >
          Predict
        </Button>
      </Flex>
      <PredictionForm
        formFieldsChangeHandler={handleSeverityDataChange}
        formFields={severityPrediction}
      />
    </Box>
  );
});
export default SeverityPrediction;
