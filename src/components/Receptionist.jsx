import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AddPatient from "./AddPatient.jsx";
import ShowAppointments from "./ShowAppointments.jsx";

const Receptionist = () => {
  return (
    <Box mt={"8"} w={"70%"} mx={"auto"}>
      <Tabs isFitted variant="solid-rounded" colorScheme={"teal"}>
        <TabList mb="1em">
          <Tab>Add Patient</Tab>
          <Tab>Show Appointments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddPatient />
          </TabPanel>
          <TabPanel>
            <ShowAppointments />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default Receptionist;
