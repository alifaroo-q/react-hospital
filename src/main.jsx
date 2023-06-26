import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/poppins";
import "@fontsource/open-sans";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
