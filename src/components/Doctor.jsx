import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ShowPatients from "./ShowPatients.jsx";
import MakePredictions from "./MakePredictions.jsx";
import { PredictionProvider } from "../context/PredictionContext.jsx";

const Doctor = () => {
  return (
    <Box mt={"8"} w={"70%"} mx={"auto"}>
      <Tabs isFitted variant="solid-rounded" colorScheme={"teal"}>
        <TabList mb="1em">
          <Tab>Show Patients</Tab>
          <Tab>Make Predictions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ShowPatients />
          </TabPanel>
          <TabPanel>
            <PredictionProvider>
              <MakePredictions />
            </PredictionProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default Doctor;
