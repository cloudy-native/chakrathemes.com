import { Flex, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import OptimizedImage from "../OptimizedImage";

const HeroSection: React.FC = () => {
  return (
    <VStack spacing={6} align="center">
      <Heading as="h1" size="2xl" textAlign="center" mb={4}>
        A Lovely Chakra UI Theme Editor
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%" alignItems="start">
        <Flex flexDir="column" align="flex-start" justify="flex-start" textAlign="left">
          <Text fontSize="xl" maxW="6xl" mb="4">
          Create your perfect Chakra UI theme. Customize colors, typography, spacing, and export directly.          </Text>
          <Text fontSize="xl" maxW="6xl" mb="4">
            The base colors for this application's theme were discovered using built-in color
            science goodness from this image of the sun setting over Phuket, Thailand.
          </Text>
          <Text fontSize="xl" maxW="6xl" mb="4">
            I'm happy to debate the color aesthetic of this application. I just wrote the code. And
            I'm color blind. But it would be poor show indeed not to theme the application using the
            application itself.
          </Text>
        </Flex>
        <Flex align="flex-start" justify="center">
          <HStack spacing={4} align="flex-start">
            <OptimizedImage width="45%" filename="phuket.jpeg" alt="Source image for site design" />
            <OptimizedImage
              width="45%"
              filename="color-source.png"
              alt="Extract palette from image"
            />
          </HStack>
        </Flex>
      </SimpleGrid>
    </VStack>
  );
};

export default HeroSection;
