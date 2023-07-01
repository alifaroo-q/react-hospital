import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ShowPatients from "./ShowPatients.jsx";
import AddNewAppointment from "./AddNewAppointment.jsx";

const Nurse = () => {
  return (
    <Box mt={"8"} w={"70%"} mx={"auto"}>
      <Tabs isFitted variant="solid-rounded" colorScheme={"teal"}>
        <TabList mb="1em">
          <Tab>Show Patients</Tab>
          <Tab>Add New Appointment</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ShowPatients />
          </TabPanel>
          <TabPanel>
            <AddNewAppointment />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default Nurse;
