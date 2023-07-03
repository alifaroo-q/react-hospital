import {
  Box,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  useMediaQuery,
} from "@chakra-ui/react";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const INITIAL_LOGIN = Object.freeze({
  email: "",
  password: "",
});

const Login = () => {
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);
  const [isSmaller] = useMediaQuery("(max-width: 750px)");

  const [loginData, setLoginData] = useState(INITIAL_LOGIN);

  const loginDataChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value.trim(),
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    loginUser(loginData);
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
        <form onSubmit={handleFormSubmit}>
          <Flex
            direction={"column"}
            w={isSmaller ? "72" : "96"}
            h={"sm"}
            bg={"white"}
            shadow={"lg"}
            p={"6"}
            justifyContent={"space-between"}
            className="rounded-lg"
          >
            <Flex direction={"column"} gap={"1rem"}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={loginData.email}
                  name="email"
                  type="email"
                  placeholder="johndoe@google.com"
                  onChange={loginDataChangeHandler}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  value={loginData.password}
                  name="password"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  onChange={loginDataChangeHandler}
                />
              </FormControl>
            </Flex>
            <Flex pb={"5"} flexDirection={"column"} gap={"1rem"}>
              <Button
                minWidth={"3xs"}
                boxShadow={"lg"}
                colorScheme="telegram"
                type="submit"
              >
                Login
              </Button>
              <Button
                boxShadow={"lg"}
                colorScheme="teal"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default Login;
