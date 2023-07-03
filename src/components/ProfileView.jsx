import { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { PatientContext } from "../context/PatientContext.jsx";

const ProfileView = () => {
  const params = useParams();
  const patientID = Number(params["patientID"]);

  const { patients } = useContext(PatientContext);
  const profile = patients.filter((patient) => patient.id === patientID)[0];

  const [isSmaller] = useMediaQuery("(max-width: 850px)");

  return (
    <Box mb={"8"} mt={"8"}>
      <VStack>
        <HStack spacing={"6"} mb={"8"} mt={"4"}>
          <Avatar size={"xl"} />
          <Heading fontSize={"2xl"} color={"blackAlpha.700"}>
            {profile?.name}
          </Heading>
        </HStack>
        <HStack>
          <Grid
            templateColumns={isSmaller ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
            gap={"6"}
          >
            <GridItem h={"15rem"}>
              <Card h={"full"}>
                <CardHeader>
                  <Heading fontSize={"xl"}>Profile</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={"4"}>
                    <Text>Gender: {profile?.gender}</Text>
                    <Text>Birthday: {profile?.DOB}</Text>
                    <Text isTruncated>Department: {profile?.department}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem h={"15rem"}>
              <Card h={"full"}>
                <CardHeader>
                  <Heading fontSize={"xl"}>Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={"4"}>
                    <Text>Blood Pressure: {profile?.blood_pressure}</Text>
                    <Text>Oxygen Saturation: {profile?.oxygen_saturation}</Text>
                    <Text>Height: {profile?.height} cms</Text>
                    <Text>Weight: {profile?.weight} kg</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem h={"15rem"} colSpan={isSmaller ? 1 : 2}>
              <Card h={"full"}>
                <CardHeader>
                  <Heading fontSize={"xl"}>Nurse Notes</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    {profile?.nurse_notes !== ""
                      ? profile?.nurse_notes
                      : "No notes from the nurse"}
                  </Text>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </HStack>
      </VStack>
    </Box>
  );
};
export default ProfileView;
