import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { NurseContext } from "../context/NurseContext.jsx";
import { PatientContext } from "../context/PatientContext.jsx";

const INITIAL_PATIENT = Object.freeze({
  name: "",
  gender: "",
  DOB: "",
  department: "",
  doctor_id: "",
  nurse_id: "",
  weight: 0,
  height: 0,
  blood_pressure: 0,
  oxygen_saturation: 0,
  nurse_notes: "",
});

const AddPatient = () => {
  const [patientData, setPatientData] = useState(INITIAL_PATIENT);
  const [gender, setGender] = useState("male");
  const [isSmaller] = useMediaQuery("(max-width: 750px)");

  const { doctors } = useContext(DoctorContext);
  const { nurses } = useContext(NurseContext);
  const { addNewPatient } = useContext(PatientContext);
  const patientDataChangeHandler = (event) => {
    const { name, value } = event.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const patientSubmitHandler = (event) => {
    event.preventDefault();
    const _patientData = {
      ...patientData,
      gender,
      doctor_id: Number(patientData.doctor_id),
      nurse_id: Number(patientData.nurse_id),
    };
    addNewPatient(_patientData);
    setPatientData(INITIAL_PATIENT);
  };

  return (
    <form onSubmit={patientSubmitHandler}>
      <SimpleGrid columns={isSmaller ? 1 : 2} spacing={"2.5rem"} my={"8"}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={patientData.name}
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={patientDataChangeHandler}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Doctor</FormLabel>
          <Select
            name="doctor_id"
            placeholder="Select doctor"
            onChange={patientDataChangeHandler}
            value={patientData.doctor_id}
          >
            {doctors.map((doctor) => {
              return (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  {doctor.doctor_name}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date of birth</FormLabel>
          <Input
            placeholder="Select date of birth"
            size="md"
            value={patientData.DOB}
            name="DOB"
            type="date"
            onChange={patientDataChangeHandler}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Department</FormLabel>
          <Select
            name="department"
            placeholder="Select department"
            onChange={patientDataChangeHandler}
            value={patientData.department}
          >
            <option value="Anesthesia & ICU Department">
              Anesthesia & ICU Department
            </option>
            <option value="Behavioral Medicine">Behavioral Medicine</option>
            <option value="Child Health">Child Health</option>
            <option value="Clinical Physiology">Clinical Physiology</option>
            <option value="Dental & Maxillofacial Surgery">
              Dental & Maxillofacial Surgery
            </option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Family Medicine & Public Health">
              Family Medicine & Public Health
            </option>
            <option value="Genetics Department">Genetics Department</option>
          </Select>
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Gender</FormLabel>
          <RadioGroup name="gender" defaultValue={gender} onChange={setGender}>
            <HStack spacing="24px">
              <Radio value="male">male</Radio>
              <Radio value="female">female</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nurse</FormLabel>
          <Select
            name="nurse_id"
            placeholder="Select nurse"
            onChange={patientDataChangeHandler}
            value={patientData.nurse_id}
          >
            {nurses.map((nurse) => {
              return (
                <option key={nurse.nurse_id} value={nurse.nurse_id}>
                  {nurse.nurse_name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </SimpleGrid>
      <Flex justifyContent={"center"} mt={"16"}>
        <Button colorScheme={"teal"} type={"submit"} shadow={"md"} w={"2xs"}>
          <HStack>
            <AddIcon />
            <Text>Add new patient</Text>
          </HStack>
        </Button>
      </Flex>
    </form>
  );
};
export default AddPatient;
