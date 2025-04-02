import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { featureHeading } from "@/theme/themeConfiguration";
import React from "react";
import OptimizedImage from "../OptimizedImage";

const HeroSection: React.FC = () => {
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position="relative"
      py={{ base: 8, md: 16 }}
      px={{ base: 4, md: 8 }}
      mb={{ base: 6, md: 12 }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 12 }}
        gap={{ base: 6, md: 8 }}
        position="relative"
        zIndex="1"
      >
        <VStack
          align={{ base: "center", lg: "flex-start" }}
          spacing={{ base: 4, md: 6 }}
          gridColumn={{ lg: "span 7" }}
          textAlign={{ base: "center", lg: "left" }}
          mb={{ base: 8, lg: 0 }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
            lineHeight="1.1"
            color={headingColor}
            fontWeight="extrabold"
          >
            Create Perfect Chakra UI Themes
          </Heading>

          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} maxW="3xl">
            Design stunning, accessible themes with our powerful editor. Customize colors,
            typography, spacing, and export directly to your project.
          </Text>

          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} maxW="3xl">
            Free to use. No license. No Pro tier. No exceptions. Ever.
          </Text>
        </VStack>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gridColumn={{ lg: "span 5" }}
          position="relative"
          display={{ base: "flex", xs: "flex" }}
          maxH={{ base: "260px", md: "none" }}
        >
          <Box
            position="relative"
            w={{ base: "85%", md: "100%" }}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
            transform={{ base: "rotate(1deg)", md: "rotate(2deg)" }}
          >
            <OptimizedImage filename="phuket.jpeg" alt="Source image for site design" />
          </Box>

          {!isMobile && (
            <Box
              position="absolute"
              bottom="-5%"
              right="-5%"
              w="60%"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="xl"
              transform="rotate(-3deg)"
              zIndex="2"
              display={{ base: "none", sm: "block" }}
            >
              <OptimizedImage filename="color-from-image.png" alt="Extract palette from image" />
            </Box>
          )}

          {isMobile && (
            <Box
              position="absolute"
              bottom="-8%"
              right="0"
              w="40%"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              transform="rotate(-3deg)"
              zIndex="2"
            >
              <OptimizedImage filename="color-from-image.png" alt="Extract palette from image" />
            </Box>
          )}
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default HeroSection;
