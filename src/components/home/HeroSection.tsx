import React from "react";
import { Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";

const HeroSection: React.FC = () => {
  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h1" size="2xl">
        A Lovely Chakra UI Theme Editor
      </Heading>
      <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.400")} maxW="6xl" mb="2">
        Create and customize a unique and distinctive Chakra UI theme for your brand. Modify colors,
        typography, spacing, and more, then export your theme file for direct integration without
        extra steps.
      </Text>
    </VStack>
  );
};

export default HeroSection;
