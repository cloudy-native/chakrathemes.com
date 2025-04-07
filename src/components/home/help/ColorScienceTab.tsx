import OptimizedImage from "@/components/OptimizedImage";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Accessibility, BookOpen, ExternalLink, Palette, PieChart } from "lucide-react";
import React from "react";

/**
 * ResourceCard Component
 *
 * A reusable card component to display a resource link with a title, description, and icon.
 *
 * @param {object} props - The properties for the ResourceCard component.
 * @param {string} props.title - The title of the resource.
 * @param {string} props.description - A brief description of the resource.
 * @param {string} props.url - The URL of the resource.
 * @param {React.ElementType} props.icon - The icon to display alongside the title.
 */
const ResourceCard = ({
  title,
  description,
  url,
  icon,
}: {
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
}) => {
  // Determine background and border colors based on the current color mode (light/dark).
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Card
      p={5}
      borderRadius="md"
      bg={cardBg}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Flex container for icon and title */}
      <Flex mb={3} align="center">
        {/* Icon container with background and styling */}
        <Box bg="primary.50" p={2} borderRadius="md" color="primary.600" mr={3}>
          <Icon as={icon} boxSize={5} />
        </Box>
        {/* Resource title */}
        <Heading size="sm">{title}</Heading>
      </Flex>
      {/* Resource description */}
      <Text fontSize="sm" mb={4}>
        {description}
      </Text>
      {/* Learn More button with external link icon */}
      <Button
        as={Link}
        href={url}
        isExternal
        size="sm"
        rightIcon={<Icon as={ExternalLink} boxSize={4} />}
        variant="outline"
        colorScheme="primary"
      >
        Learn More
      </Button>
    </Card>
  );
};

/**
 * ColorScienceTab Component
 *
 * This component provides an overview of color theory, accessibility, and dark mode considerations.
 * It also includes a list of recommended resources for further learning.
 */
const ColorScienceTab: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      {/* Introduction Section */}
      <VStack align="flex-start" spacing={4}>
        <Heading size="md">Understanding Color Theory</Heading>
        <Text>
          Our theme editor is built on solid color theory principles that help you create harmonious
          and accessible color schemes without needing to be a color expert. Here&apos;s a brief
          overview of the key concepts.
        </Text>

        {/* Info Alert */}
        <Alert status="info" variant="left-accent" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Want to dive deeper?</AlertTitle>
            <AlertDescription>
              This is just a brief overview. Check out the resources below for comprehensive guides
              on color theory and design principles.
            </AlertDescription>
          </Box>
        </Alert>
      </VStack>

      {/* Color Models & Harmonies Section */}
      <Box>
        <Heading size="sm" mb={4}>
          Color Models & Harmonies
        </Heading>
        {/* Grid layout for color model and harmonies */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* HSL Color Model */}
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>
                HSL Color Model
              </Text>
              <Text fontSize="sm">
                HSL (Hue, Saturation, Lightness) is an intuitive color model that makes it easier to
                create balanced color palettes. Our editor uses HSL behind the scenes to allow for
                natural color adjustments. HSV (Hue, Saturation, Value) is often used for color
                pickers because it tens to be more intuitive for designers.
              </Text>
              {/* Placeholder for HSV color model image */}
              <Box
                border="1px dashed"
                borderColor="gray.300"
                mt={4}
                p={3}
                borderRadius="md"
                bg="gray.50"
                textAlign="center"
                color="gray.500"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hsl-hsv_models.svg/580px-Hsl-hsv_models.svg.png"
                  alt="HSL and HSV color models"
                />
              </Box>
            </Box>
          </Box>

          {/* Color Harmonies */}
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>
                Color Harmonies
              </Text>
              <Text fontSize="sm">
                Our editor supports classic color harmonies like complementary, analogous, triadic,
                and more. These scientific relationships help ensure your colors work well together.
              </Text>
              {/* Placeholder for color harmonies image */}
              <Box
                border="1px dashed"
                borderColor="gray.300"
                mt={4}
                p={3}
                borderRadius="md"
                bg="gray.50"
                textAlign="center"
                color="gray.500"
              >
                <OptimizedImage filename="complementary-harmony.png" alt="Color Harmonies" />
                <OptimizedImage filename="analogous-harmony.png" alt="Color Harmonies" />
                <OptimizedImage filename="triadic-harmony.png" alt="Color Harmonies" />
                <OptimizedImage filename="monochromatic-harmony.png" alt="Color Harmonies" />
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Accessibility & Dark Mode Section */}
      <Box>
        <Heading size="sm" mb={4}>
          Accessibility & Dark Mode
        </Heading>
        {/* WCAG Guidelines Alert */}
        <Alert status="info" variant="left-accent" borderRadius="md" mb={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>WCAG Guidelines</AlertTitle>
            <AlertDescription>
              Our contrast checker ensures your color combinations meet WCAG 2.1 AA standards, with
              guidance to reach AAA compliance for maximum accessibility.
            </AlertDescription>
          </Box>
        </Alert>

        {/* Grid layout for dark mode and color vision deficiencies */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Dark Mode Adaptation */}
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>
                Dark Mode Adaptation
              </Text>
              <Text fontSize="sm">
                Our editor automatically optimizes your color scheme for dark mode using algorithms
                that adjust luminance while preserving color relationships and ensuring
                accessibility.
              </Text>
            </Box>
          </Box>

          {/* Color Vision Deficiencies */}
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>
                Color Vision Deficiencies
              </Text>
              <Text fontSize="sm">
                Preview your theme through the lens of different color vision deficiencies
                (protanopia, deuteranopia, tritanopia) to ensure your design works for everyone.
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Divider */}
      <Divider my={4} />

      {/* Recommended Resources Section */}
      <Box>
        <Heading size="sm" mb={5}>
          Recommended Resources
        </Heading>
        {/* Grid layout for resource cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {/* Resource Cards */}
          <ResourceCard
            title="Color Theory for Designers"
            description="A comprehensive guide to color theory fundamentals for UI/UX designers"
            url="https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/"
            icon={Palette}
          />

          <ResourceCard
            title="Color Contrast Checker"
            description="Advanced tool to check WCAG compliance for text and background combinations"
            url="https://webaim.org/resources/contrastchecker/"
            icon={Accessibility}
          />

          <ResourceCard
            title="Color Harmonies Explained"
            description="Learn how color wheel relationships create effective design harmonies"
            url="https://www.canva.com/colors/color-wheel/"
            icon={PieChart}
          />

          <ResourceCard
            title="Design for Color Blindness"
            description="Best practices for making designs accessible to users with color vision deficiencies"
            url="https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/"
            icon={Accessibility}
          />

          <ResourceCard
            title="Dark Mode Design Guide"
            description="Principles and techniques for effective dark mode color adaptation"
            url="https://material.io/design/color/dark-theme.html"
            icon={BookOpen}
          />
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default ColorScienceTab;
