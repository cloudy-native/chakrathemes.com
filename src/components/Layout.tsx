import { panelBackground } from "@/theme/themeConstants";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const applicationBg = useColorModeValue(panelBackground.light, panelBackground.dark);

  return (
    <Flex direction="column" minH="100vh" bg={applicationBg}>
      <Header />
      <Box as="main" flex="1" width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
