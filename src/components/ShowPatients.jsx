import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Text,
  Thead,
  Tr,
  useDisclosure,
  FormLabel,
  FormControl,
  Stack,
  Input,
  Textarea,
  Heading,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { PatientContext } from "../context/PatientContext.jsx";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { NurseContext } from "../context/NurseContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const INITIAL_PATIENT = Object.freeze({
  height: "",
  weight: "",
  blood_pressure: "",
  oxygen_saturation: "",
  nurse_notes: "",
});

const ShowPatients = () => {
  const { patients, updatePatient, deletePatient } = useContext(PatientContext);
  const { doctors } = useContext(DoctorContext);
  const { nurses } = useContext(NurseContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userAuthData } = useContext(AuthContext);

  const [modalValues, setModalValues] = useState(INITIAL_PATIENT);
  const [patientUpdated, setPatientUpdated] = useState(false);

  const navigate = useNavigate();

  const patientEditHandler = (patient) => {
    setModalValues(patient);
    onOpen();
  };

  const handlePatientDataChange = (event) => {
    const { name, value } = event.target;
    setModalValues({
      ...modalValues,
      [name]: value,
    });
    setPatientUpdated(true);
  };

  const handlePatientUpdate = () => {
    if (!patientUpdated) {
      setPatientUpdated(false);
      onClose();
      return;
    }

    const _newUpdatedPatient = {
      ...modalValues,
      blood_pressure: Number(modalValues.blood_pressure),
      oxygen_saturation: Number(modalValues.oxygen_saturation),
      weight: Number(modalValues.weight),
      height: Number(modalValues.height),
    };

    updatePatient(_newUpdatedPatient);
    setModalValues(INITIAL_PATIENT);
    onClose();
  };

  const handlePatientDelete = (id) => {
    deletePatient(id);
    onClose();
  };

  return (
    <>
      {patients.length ? (
        <Box mb={"8"}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Birthday</Th>
                  <Th>Gender</Th>
                  <Th>Doctor</Th>
                  <Th>Nurse</Th>
                  <Th>Edit</Th>
                  {userAuthData.user.role === "Doctor" && <Th>Profile</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {patients.map((patient) => {
                  const patientNurse = nurses.filter(
                    (nurse) => nurse.nurse_id === patient.nurse
                  );
                  const patientDoctor = doctors.filter(
                    (doctor) => doctor.doctor_id === patient.doctor
                  );

                  return (
                    <Tr key={patient.id}>
                      <Td>{patient.name}</Td>
                      <Td>{patient.DOB}</Td>
                      <Td>{patient.gender}</Td>
                      <Td>{patientDoctor[0]?.doctor_name}</Td>
                      <Td>{patientNurse[0]?.nurse_name}</Td>
                      <Td>
                        <IconButton
                          onClick={() => patientEditHandler(patient)}
                          aria-label={"update patient"}
                          icon={<EditIcon />}
                        />
                      </Td>
                      {userAuthData.user.role === "Doctor" && (
                        <Td>
                          <Avatar
                            size={"sm"}
                            onClick={() => navigate(`/patient/${patient.id}`)}
                            cursor={"pointer"}
                          />
                        </Td>
                      )}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Flex justifyContent={"center"} mt={"10rem"}>
          <Heading color={"blackAlpha.700"}>No relevant patients</Heading>
        </Flex>
      )}

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Stack>
                <FormControl>
                  <FormLabel>Blood Pressure</FormLabel>
                  <Input
                    name="blood_pressure"
                    value={modalValues.blood_pressure}
                    onChange={handlePatientDataChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Height{" "}
                    <Text display={"inline-block"} fontSize={"xs"}>
                      in centimeters
                    </Text>
                  </FormLabel>
                  <Input
                    name="height"
                    value={modalValues.height}
                    onChange={handlePatientDataChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Weight{" "}
                    <Text display={"inline-block"} fontSize={"xs"}>
                      in kilos
                    </Text>
                  </FormLabel>
                  <Input
                    name="weight"
                    value={modalValues.weight}
                    onChange={handlePatientDataChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Oxygen Saturation{" "}
                    <Text display={"inline-block"} fontSize={"xs"}>
                      in percents
                    </Text>
                  </FormLabel>
                  <Input
                    name="oxygen_saturation"
                    value={modalValues.oxygen_saturation}
                    onChange={handlePatientDataChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nurse Notes</FormLabel>
                  <Textarea
                    readOnly={userAuthData.user.role === "Doctor"}
                    name="nurse_notes"
                    value={modalValues.nurse_notes}
                    onChange={handlePatientDataChange}
                  />
                </FormControl>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter justifyContent={"space-between"}>
            {userAuthData.user.role === "Doctor" && (
              <IconButton
                colorScheme={"red"}
                aria-label={"update patient"}
                icon={<DeleteIcon />}
                onClick={() => handlePatientDelete(modalValues.id)}
              />
            )}
            <Box alignSelf={"end"}>
              <Button colorScheme="teal" mr={3} onClick={handlePatientUpdate}>
                Update
              </Button>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ShowPatients;
