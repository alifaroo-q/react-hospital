import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import DeathPrediction from "./DeathPrediction.jsx";
import SeverityPrediction from "./SeverityPrediction.jsx";
import { useContext } from "react";
import { PredictionContext } from "../context/PredictionContext.jsx";

const MakePredictions = () => {
  const { severityPrediction, deathPrediction } = useContext(PredictionContext);

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem py={"3"}>
          <Heading fontSize={"lg"}>
            <AccordionButton>
              <Box as="h2" flex="1" textAlign="left">
                Severity Prediction
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <SeverityPrediction />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem py={"3"}>
          <Heading fontSize={"xl"}>
            <AccordionButton>
              <Box as="h2" flex="1" textAlign="left">
                Death Prediction
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <DeathPrediction />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex py={"8"} flexDirection={"column"} gap={"6"}>
        <Stack>
          <Heading color={"blackAlpha.800"}>Death Prediction</Heading>
          {Object.keys(deathPrediction).length ? (
            <Text>Death Prediction: {deathPrediction?.death_prediction}</Text>
          ) : (
            <Text>Enter the parameters to get death prediction</Text>
          )}
        </Stack>
        <Stack>
          <Heading color={"blackAlpha.800"}>Severity Prediction</Heading>
          {Object.keys(severityPrediction).length ? (
            <Text>
              Severity Prediction: {severityPrediction?.severity_prediction}
            </Text>
          ) : (
            <Text>Enter the parameters to get severity prediction</Text>
          )}
        </Stack>
      </Flex>
    </>
  );
};
export default MakePredictions;
