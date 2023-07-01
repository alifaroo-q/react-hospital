import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { PatientContext } from "../context/PatientContext.jsx";
import { AppointmentContext } from "../context/AppointmentContext.jsx";

const INITIAL_APPOINTMENT = Object.freeze({
  date: "",
  doctor: "",
  patient: "",
});
const AddNewAppointment = () => {
  const { doctors } = useContext(DoctorContext);
  const { patients } = useContext(PatientContext);

  const [appointment, setAppointment] = useState(INITIAL_APPOINTMENT);
  const { addAppointment } = useContext(AppointmentContext);

  const appointmentDataChangeHandler = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  const appointmentSubmitHandler = (event) => {
    event.preventDefault();
    addAppointment(appointment);
    setAppointment(INITIAL_APPOINTMENT);
  };

  return (
    <form onSubmit={appointmentSubmitHandler}>
      <Stack w="50%" spacing={"2rem"}>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={appointment.date}
            onChange={appointmentDataChangeHandler}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Patient</FormLabel>
          <Select
            name="patient"
            placeholder="Select patient"
            onChange={appointmentDataChangeHandler}
            value={appointment.patient}
          >
            {patients.map((patient) => {
              return (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Doctor</FormLabel>
          <Select
            name="doctor"
            placeholder="Select doctor"
            onChange={appointmentDataChangeHandler}
            value={appointment.doctor}
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
        <Flex justifyContent={"flex-end"}>
          <Button type="submit" shadow={"md"} colorScheme={"teal"}>
            Add appointment
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default AddNewAppointment;
