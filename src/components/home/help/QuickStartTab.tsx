import { OptimizedImage } from "@/components";
import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  Flex,
  useColorModeValue,
  VStack,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import React from "react";
import { Palette, Eye, Layers, Type, Lightbulb } from "lucide-react";

interface StepInfo {
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl?: string;
  tips: string[];
}

const steps: StepInfo[] = [
  {
    title: "Create Color Palettes",
    description: "Build your brand's color foundation with our streamlined palette tools",
    icon: Palette,
    imageUrl: "help/palettes-tab.png", // [IMAGE PLACEHOLDER: Screenshot of updated palette tab]
    tips: [
      "Select a base color and let the advanced color algorithm generate balanced shades automatically",
      "Create distinct palettes from images, our color inspiration tool, or thoughtful presets for all-in-one palettes for a ready-made theme",
      'Name your palettes "primary", "secondary", "accent", or "background" to see your changes instantly in the Theme Preview tab!',
    ],
  },
  {
    title: "Set Typography",
    description: "Choose between curated font combinations or custom font selections",
    icon: Type,
    imageUrl: "help/typography-tab.png", // [IMAGE PLACEHOLDER: Screenshot of new simplified typography tab]
    tips: [
      "Use 'Curated Combinations' for pre-matched heading/body fonts",
      "Switch to 'Custom Fonts' for full control over font selection",
      "Preview your typography choices with real-time examples",
      "Just like your color palettes, these fonts will be used in the Theme Preview tab",
    ],
  },
  {
    title: "(Don't configure Spacing and Borders & Shadows just yet)",
    description: "Wait until you're sure about colors and typography",
    icon: Layers,
    tips: [],
  },
  {
    title: "Preview & Download",
    description: "Visualize your theme with real components in both light & dark modes",
    icon: Eye,
    imageUrl: "help/theme-preview.png", // [IMAGE PLACEHOLDER: Screenshot of theme preview section]
    tips: [
      "Theme preview uses the color palettes and typography your assigned",
      "Toggle between light and dark modes to check color contrast",
      "Test your theme on different UI patterns for compatibility",
      "Export your theme as working code when you're ready to use it in your Chakra UI project",
    ],
  },
];

const QuickStartTab: React.FC = () => {
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");
  const lightbulbColor = useColorModeValue("accent.500", "accent.300");
  const headingColor = useColorModeValue("secondary.500", "secondary.300");

  return (
    <Box>
      <VStack align="flex-start" mb={8}>
        <HStack>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} color={headingColor}>
            Create Your Theme in 5 Simple Steps
          </Heading>
          <Badge colorScheme="primary" fontSize="sm" variant="solid" py={1} px={2}>
            New
          </Badge>
        </HStack>
        <Text fontSize="lg" color={mutedTextColor}>
          Follow our streamlined process to create a professional Chakra UI theme with our
          redesigned interface.
        </Text>
      </VStack>

      <VStack spacing={4} align="stretch">
        {steps.map((step, index) => (
          <Box key={index} mb={6}>
            <Flex mb={4} align="center">
              <Box bg="primary.500" p={2} borderRadius="md" color="white" mr={4}>
                <Icon as={step.icon} boxSize={5} />
              </Box>
              <Box>
                <Heading as="h3" size="md" color={headingColor} >
                  {step.title}
                </Heading>
                <Text color={mutedTextColor}>{step.description}</Text>
              </Box>
            </Flex>

            <VStack align="stretch" spacing={4} pl={14}>
              {step.tips.length > 0 && (
                <Box width="100%">
                  <List>
                    {step.tips.map((tip, tipIndex) => (
                      <ListItem key={tipIndex}>
                        <ListIcon as={Lightbulb} color={lightbulbColor} />
                        {tip}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {step.imageUrl && <OptimizedImage filename={step.imageUrl} alt={step.title} />}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
export default QuickStartTab;
