import React from "react";
import { Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";

const HeroSection: React.FC = () => {
  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h1" size="2xl" color={useColorModeValue("deep-space.500", "pearl-shimmer.200")}>
        A Lovely Chakra UI Theme Editor
      </Heading>
      <Text
        fontSize="xl"
        color={useColorModeValue("squid-ink.500", "pearl-shimmer.100")}
        maxW="6xl"
        mb="2"
      >
        Create and customize a unique and distinctive Chakra UI theme for your brand. Modify colors,
        typography, spacing, and more, then export your theme file for direct integration without
        extra steps.
      </Text>
    </VStack>
  );
};

export default HeroSection;
