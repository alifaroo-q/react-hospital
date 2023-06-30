import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Show,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Header = () => {
  const { logoutUser, userAuthData } = useContext(AuthContext);

  const logoutUserHandler = () => {
    logoutUser();
  };

  return (
    <Box bg={"whiteAlpha.200"} p={"8"} shadow={"lg"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading color={"blackAlpha.800"}>React Hospital</Heading>
        <Show above={"lg"}>
          <Box>
            <Heading size={"md"} color={"blackAlpha.500"}>
              {userAuthData.user.role.toLowerCase()}
            </Heading>
          </Box>
        </Show>

        <HStack spacing={"8"}>
          <Show above={"lg"}>
            <HStack>
              <Avatar size={"sm"}></Avatar>
              <Text>{userAuthData.user.username}</Text>
            </HStack>
          </Show>
          <Button
            shadow={"md"}
            colorScheme={"teal"}
            onClick={logoutUserHandler}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
export default Header;
