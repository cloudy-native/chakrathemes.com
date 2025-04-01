import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import OptimizedImage from "../OptimizedImage";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const headingColor = useColorModeValue("secondary.500", "secondary.300");

  return (
    <Box position="relative" py={16} px={8} mb={12}>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} position="relative" zIndex="1">
        <VStack align="flex-start" spacing={6} gridColumn={{ lg: "span 7" }}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            lineHeight="1.1"
            color={headingColor}
            fontWeight="extrabold"
          >
            Create Perfect Chakra UI Themes
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl">
            Design stunning, accessible themes with our powerful editor. Customize colors,
            typography, spacing, and export directly to your project.
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl">
            Free to use. No license. No Pro tier. No exceptions. Ever.
          </Text>

          <HStack spacing={4} pt={4}>
            <Button
              size="lg"
              colorScheme="primary"
              rightIcon={<ArrowRight />}
              onClick={() => {
                const editorSection = document.getElementById("theme-editor-section");
                if (editorSection) {
                  editorSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Start Creating
            </Button>
          </HStack>
        </VStack>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gridColumn={{ lg: "span 5" }}
          position="relative"
        >
          <Box
            position="relative"
            w="100%"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
            transform="rotate(2deg)"
          >
            <OptimizedImage filename="phuket.jpeg" alt="Source image for site design" />
          </Box>

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
          >
            <OptimizedImage filename="color-from-image.png" alt="Extract palette from image" />
          </Box>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default HeroSection;
