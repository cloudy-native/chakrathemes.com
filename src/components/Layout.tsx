import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Get appropriate gradient colors for light/dark mode
  const gradientStart = useColorModeValue("blue.50", "blue.900");
  const gradientEnd = useColorModeValue("blue.100", "blue.800");

  return (
    <Flex 
      direction="column" 
      minH="100vh"
      bgGradient={`linear(to-b, ${gradientStart}, ${gradientEnd})`}
    >
      <Header />
      <Box 
        as="main" 
        flex="1" 
        width="100%"
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
