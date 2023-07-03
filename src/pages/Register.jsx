import {
  Box,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext.jsx";

const INITIAL_REGISTER = Object.freeze({
  username: "",
  email: "",
  password1: "",
  password2: "",
  role: "",
  department: "",
});

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState(INITIAL_REGISTER);
  const { registerUser } = useContext(AuthContext);

  const [isSmaller] = useMediaQuery("(max-width: 750px)");

  const registerDataChangeHandler = (event) => {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value.trim(),
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    registerUser(registerData);
  };

  return (
    <Box
      as="main"
      height={"100vh"}
      className="bg-neutral-300"
      fontFamily={"body"}
    >
      <Flex
        direction={"column"}
        height={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          direction={"column"}
          w={isSmaller ? "72" : "xl"}
          bg={"white"}
          shadow={"lg"}
          p={"6"}
          justifyContent={"space-between"}
          className="rounded-lg"
          overflow={"scroll"}
          overflowX={"clip"}
        >
          <form onSubmit={handleFormSubmit}>
            <Flex direction={"column"} gap={"1rem"}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={registerDataChangeHandler}
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={registerData.username}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={registerDataChangeHandler}
                  name="email"
                  type="email"
                  placeholder="john@google.com"
                  value={registerData.email}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={registerDataChangeHandler}
                  name="password1"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={registerData.password1}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  onChange={registerDataChangeHandler}
                  name="password2"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  value={registerData.password2}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  placeholder="Select role"
                  onChange={registerDataChangeHandler}
                  value={registerData.role}
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Receptionist">Receptionist</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Department</FormLabel>
                <Select
                  name="department"
                  placeholder="Select department"
                  onChange={registerDataChangeHandler}
                  value={registerData.department}
                >
                  <option value="Anesthesia & ICU Department">
                    Anesthesia & ICU Department
                  </option>
                  <option value="Behavioral Medicine">
                    Behavioral Medicine
                  </option>
                  <option value="Child Health">Child Health</option>
                  <option value="Clinical Physiology">
                    Clinical Physiology
                  </option>
                  <option value="Dental & Maxillofacial Surgery">
                    Dental & Maxillofacial Surgery
                  </option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                  <option value="Family Medicine & Public Health">
                    Family Medicine & Public Health
                  </option>
                  <option value="Genetics Department">
                    Genetics Department
                  </option>
                </Select>
              </FormControl>
            </Flex>

            <Flex
              flexDirection={isSmaller ? "column" : "row"}
              justifyContent={"center"}
              gap={"1rem"}
              mt={"2rem"}
            >
              <Button
                minWidth={isSmaller ? "" : "xs"}
                shadow={"base"}
                colorScheme="teal"
                type="submit"
              >
                Register
              </Button>
              <Button
                shadow={"base"}
                colorScheme="telegram"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Register;
