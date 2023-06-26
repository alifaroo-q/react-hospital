import {
  Box,
  Button,
  Input,
  Flex,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
          height={"96"}
          w={"80"}
          bg={"white"}
          shadow={"lg"}
          p={"6"}
          justifyContent={"space-between"}
          className="rounded-lg"
        >
          <Flex direction={"column"} gap={"1rem"}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="johndoe" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              />
            </FormControl>
          </Flex>
          <Flex direction={"column"} gap={"1rem"}>
            <Button shadow={"base"} colorScheme="telegram">
              Login
            </Button>
            <Divider />
            <Button
              shadow={"base"}
              colorScheme="teal"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
