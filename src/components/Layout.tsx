import { panelBackground } from "@/theme/themeConfiguration";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

// TODO: Footer is appearing twice because we botched the SSR code. So annoying! Just comment out for now.
//
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const applicationBg = useColorModeValue(panelBackground.light, panelBackground.dark);

  return (
    <Flex direction="column" minH="100vh" bg={applicationBg}>
      <Box as="header" width="100%">
        <Header />
      </Box>
      <Box as="main" flex="1" width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
