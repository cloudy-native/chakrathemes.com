import { ChakraProvider } from "@chakra-ui/react";
import type { WrapRootElementBrowserArgs } from "gatsby";
import * as React from "react";
import Layout from "./components/Layout";
import { applicationTheme as theme } from "./theme";

export const WrapRootElement = ({ element }: Pick<WrapRootElementBrowserArgs, "element">) => (
  <ChakraProvider theme={theme}>
    <Layout>{element}</Layout>
  </ChakraProvider>
);
