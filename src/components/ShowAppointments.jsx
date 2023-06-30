import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext.jsx";
import {
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";

const ShowAppointments = () => {
  const { appointments } = useContext(AppointmentContext);
  const [isSmaller] = useMediaQuery("(max-width: 750px)");

  return (
    <SimpleGrid columns={isSmaller ? 1 : 2} spacing={"2.5rem"} my={"8"}>
      {appointments.map((appointment, index) => {
        return (
          <Card key={index}>
            <CardBody>
              <VStack>
                <HStack>
                  <span>Date: </span>
                  <Text fontWeight={"semibold"}>{appointment.date}</Text>
                </HStack>
                <HStack>
                  <span>Patient: </span>
                  <Text>{appointment.patient_name}</Text>
                </HStack>
                <HStack>
                  <span>Doctor: </span>
                  <Text>{appointment.doctor_name}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
export default ShowAppointments;
