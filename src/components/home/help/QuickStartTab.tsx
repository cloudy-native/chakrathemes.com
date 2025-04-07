import OptimizedImage from "@/components/OptimizedImage";
import {
  featureHeading,
  iconAccent,
  primaryAccent,
  textSecondary,
} from "@/theme/themeConfiguration";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Eye, Lightbulb, Palette, Type } from "lucide-react";
import React from "react";

/**
 * StepInfo Interface
 *
 * Defines the structure for each step in the Quick Start guide.
 *
 * @param {string} title - The title of the step.
 * @param {string} description - A brief description of the step.
 * @param {React.ElementType} icon - The icon to display for the step.
 * @param {string} [imageUrl] - Optional URL for an image related to the step.
 * @param {string[]} tips - An array of tips for the step.
 * @param {object} [alert] - Optional alert to display for the step.
 * @param {string} [alert.title] - The title of the alert.
 * @param {string} [alert.description] - The description of the alert.
 * @param {"info" | "warning" | "success" | "error"} [alert.status] - The status of the alert.
 */
interface StepInfo {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  tips: string[];
  alert?: {
    title: string;
    description: string;
    status: "info" | "warning" | "success" | "error";
  };
}

/**
 * steps Array
 *
 * An array of StepInfo objects defining the steps in the Quick Start guide.
 */
const steps: StepInfo[] = [
  {
    title: "Step 1: Choose Palettes",
    description: "Create color schemes that define your brand's visual identity",
    icon: Palette,
    image: "ai-theme-generator.png",
    tips: [
      "Use the 'From Color' option to generate balanced shades from a single base color",
      "Try 'From Image' to extract colors from your brand photos or inspiration images",
      "Explore 'Inspiration' for professionally designed color combinations",
      "Use 'AI Generator' to create color schemes based on text descriptions",
      "Name palettes 'primary', 'secondary', 'accent', or 'background' for automatic theme mapping",
    ],
    alert: {
      title: "Pro Tip",
      description:
        "The AI Generator creates complete themes with four coordinated palettes at once - primary, secondary, accent, and background. Let your imagination run wild!",
      status: "info",
    },
  },
  {
    title: "Step 2: Set Typography",
    description: "Select font pairings that complement your color scheme",
    icon: Type,
    image: "typography-tab.png",
    tips: [
      "Choose from our curated font combinations for professionally matched heading/body pairs",
      "Customize individual heading levels and body text for precise control",
      "Preview your typography with real-time examples as you make selections",
      "Balance contrast and readability with your color schemes",
    ],
    alert: {
      title: "System Fonts",
      description:
        "For best performance, consider using system font stacks. They load instantly and respect user preferences.",
      status: "info",
    },
  },
  {
    title: "Step 3: Preview & Export",
    description: "Visualize your complete theme and export it for your project",
    icon: Eye,
    image: "preview-tab.png",
    tips: [
      "Switch between light and dark modes to test color adaptability",
      "Examine how colors and typography work together across different UI components",
      "Test accessibility with the contrast analysis tools",
      "Use the Download button to export your theme as ready-to-use Chakra UI code",
    ],
    alert: {
      title: "Sharing",
      description:
        "Use the Share button to generate a link to your theme that others can view and edit.",
      status: "info",
    },
  },
];

/**
 * QuickStartTab Component
 *
 * This component provides a step-by-step guide to quickly create a theme using the theme editor.
 */
const QuickStartTab: React.FC = () => {
  // Color values for the component, dynamically adjusted based on the color mode.
  const mutedTextColor = useColorModeValue(textSecondary.light, textSecondary.dark);
  const lightbulbColor = useColorModeValue(iconAccent.light, iconAccent.dark);
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);
  const iconBg = useColorModeValue(primaryAccent.light, primaryAccent.dark);

  return (
    // Main container for the QuickStartTab.
    <Box>
      {/* Introduction Section */}
      <VStack align="flex-start" mb={8}>
        {/* Main heading and badge */}
        <HStack>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} color={headingColor}>
            Create Your Theme in 3 Simple Steps
          </Heading>
          {/* Badge to indicate the section is updated */}
          <Badge colorScheme="primary" fontSize="sm" variant="solid" py={1} px={2}>
            Updated
          </Badge>
        </HStack>
        {/* Introduction text */}
        <Text fontSize="lg" color={mutedTextColor}>
          Our simplified workflow makes creating professional Chakra UI themes fast and intuitive.
          Just follow these three steps to go from concept to code.
        </Text>
      </VStack>

      {/* Steps Section */}
      <VStack spacing={4} align="stretch">
        {/* Map through the steps array to create each step section. */}
        {steps.map((step, index) => {
          return (
            // Container for each step.
            <Box key={index} mb={6}>
              {/* Step title and description */}
              <Flex mb={4} align="center">
                {/* Step icon */}
                <Box bg={iconBg} p={2} borderRadius="md" color="white" mr={4}>
                  <Icon as={step.icon} boxSize={5} />
                </Box>
                {/* Step title and description */}
                <Box>
                  <Heading as="h3" size="md" color={headingColor}>
                    {step.title}
                  </Heading>
                  <Text color={mutedTextColor}>{step.description}</Text>
                </Box>
              </Flex>

              {/* Step details (tips, alert, image) */}
              <VStack align="stretch" spacing={4} pl={14}>
                {/* Tips section */}
                {step.tips.length > 0 && (
                  <Box width="100%">
                    {/* List of tips */}
                    <List spacing={2}>
                      {/* Map through the tips array to create each tip. */}
                      {step.tips.map((tip, tipIndex) => (
                        <ListItem key={tipIndex}>
                          {/* Tip icon */}
                          <ListIcon as={Lightbulb} color={lightbulbColor} />
                          {/* Tip text */}
                          {tip}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Alert section */}
                {step.alert && (
                  <Alert status={step.alert.status} variant="left-accent" borderRadius="md" mt={2}>
                    <AlertIcon />
                    <Box>
                      {/* Alert title */}
                      <AlertTitle>{step.alert.title}</AlertTitle>
                      {/* Alert description */}
                      <AlertDescription>{step.alert.description}</AlertDescription>
                    </Box>
                  </Alert>
                )}

                {/* Image placeholder section */}
                {step.image && (
                  <Box
                    border="1px dashed"
                    borderColor="gray.300"
                    p={4}
                    borderRadius="md"
                    bg="gray.50"
                    textAlign="center"
                    color="gray.500"
                  >
                    <OptimizedImage filename={step.image} alt={step.title} />
                  </Box>
                )}
              </VStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};
export default QuickStartTab;
