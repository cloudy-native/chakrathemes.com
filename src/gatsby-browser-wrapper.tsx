import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import Layout from "./components/Layout";
import { applicationTheme as theme } from "./theme/";

// Wrap all pages with the ChakraProvider
export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider resetCSS theme={theme}>
        {element}
      </ChakraProvider>
    </>
  );
};

// Wrap all pages with the Layout component
export const wrapPageElement = ({ element }: { element: React.ReactNode }) => {
  return <Layout>{element}</Layout>;
};
