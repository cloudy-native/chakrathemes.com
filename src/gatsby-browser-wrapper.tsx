import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import { applicationTheme as theme } from "./theme/";
import "react-color-palette/dist/css/rcp.css";

// Wrap the root element with ChakraProvider
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

// Important: We're not using wrapPageElement anymore
// This was causing duplicate Layout/Footer components in production builds
export const wrapPageElement = ({ element }: { element: React.ReactNode }) => {
  // Simply return the element without wrapping it in Layout
  // The Layout component should be included in each page template instead
  return element;
};
