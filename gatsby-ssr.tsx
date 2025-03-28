import { ColorModeScript } from "@chakra-ui/react";
import type { GatsbySSR } from "gatsby";
import * as React from "react";
import { WrapRootElement } from "./src/provider";
import {applicationTheme as theme} from "./src/theme";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ]);
};

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <WrapRootElement element={element} />
);
