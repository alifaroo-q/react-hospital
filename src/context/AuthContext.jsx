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
            duration: 3000,
            isClosable: true,
          });

          navigate("/");
        }
      })
      .catch((err) => console.log(err));
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
            duration: 3000,
            isClosable: true,
          });

          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    axios
      .post("/dj-rest-auth/logout/")
      .then(() => {
        localStorage.removeItem("userAuthData");
        setUserAuthData({});
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = { userAuthData, loginUser, registerUser, logoutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
