import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import axios from "axios";

export const AuthContext = createContext({
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
  userAuthData: {},
});

export const AuthProvider = ({ children }) => {
  const [userAuthData, setUserAuthData] = useState(
    JSON.parse(localStorage.getItem("userAuthData")) || {}
  );

  const toast = useToast();
  const navigate = useNavigate();

  const loginUser = (userData) => {
    axios
      .post("/dj-rest-auth/login/", userData)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userAuthData", JSON.stringify(res.data));

          setUserAuthData(res.data);
          toast({
            title: "Login success",
            description: "You are logged in successfully",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });

          navigate("/");
        }
      })
      .catch((err) => {
        const desc =
          err.code === "ERR_BAD_REQUEST"
            ? "Wrong credentials"
            : "Something went wrong with the server";

        toast({
          title: "Login failed",
          description: desc,
          position: "top",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  const userRole = (userData) => {
    const { user, access } = userData;

    axios
      .post(
        `/api/${user.role.toLowerCase()}/`,
        { id: user.pk },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const registerUser = (userData) => {
    axios
      .post("/dj-rest-auth/registration/", userData)
      .then((res) => {
        if (res.status === 201) {
          userRole(res.data);

          toast({
            title: "Registration success",
            description: "You account created successfully",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });

          navigate("/login");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.non_field_errors) {
          toast({
            title: "Registration success",
            description: "Your password is similar to your username",
            status: "warning",
            position: "top",
            duration: 3000,
            isClosable: true,
          });

          navigate("/login");
        }

        if (err?.response?.data?.email || err?.response?.data?.username) {
          toast({
            title: "Registration failed",
            description: "User with given email/username already exist",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        }
        console.log(err);
      });
  };

  const logoutUser = () => {
    axios.post("/dj-rest-auth/logout/").catch((err) => {
      console.log(err);
    });
    localStorage.removeItem("userAuthData");
    setUserAuthData({});
    navigate("/login");
  };

  const value = { userAuthData, loginUser, registerUser, logoutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
