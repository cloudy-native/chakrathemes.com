import {
  featureHeading,
  iconAccent,
  textSecondary,
  primaryAccent,
} from "@/theme/themeConfiguration";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
} from "@chakra-ui/react";
import React from "react";
import { Palette, Eye, Type, Lightbulb, ArrowRight } from "lucide-react";

interface StepInfo {
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl?: string;
  tips: string[];
  alert?: {
    title: string;
    description: string;
    status: "info" | "warning" | "success" | "error";
  };
}

const steps: StepInfo[] = [
  {
    title: "Step 1: Choose Palettes",
    description: "Create color schemes that define your brand's visual identity",
    icon: Palette,
    imageUrl: "[IMAGE: palette-creation-tab]", // You can replace with actual image later
    tips: [
      "Use the 'From Color' option to generate balanced shades from a single base color",
      "Try 'From Image' to extract colors from your brand photos or inspiration images",
      "Explore 'Inspiration' for professionally designed color combinations",
      "Use 'AI Generator' to create color schemes based on text descriptions",
      "Name palettes 'primary', 'secondary', 'accent', or 'background' for automatic theme mapping"
    ],
    alert: {
      title: "Pro Tip",
      description: "The AI Generator creates complete themes with four coordinated palettes at once - primary, secondary, accent, and background.",
      status: "info"
    }
  },
  {
    title: "Step 2: Set Typography",
    description: "Select font pairings that complement your color scheme",
    icon: Type,
    imageUrl: "[IMAGE: typography-tab]", // You can replace with actual image later
    tips: [
      "Choose from our curated font combinations for professionally matched heading/body pairs",
      "Customize individual heading levels and body text for precise control",
      "Preview your typography with real-time examples as you make selections",
      "Balance contrast and readability with your color schemes"
    ],
    alert: {
      title: "System Fonts",
      description: "For best performance, consider using system font stacks. They load instantly and respect user preferences.",
      status: "info"
    }
  },
  {
    title: "Step 3: Preview & Export",
    description: "Visualize your complete theme and export it for your project",
    icon: Eye,
    imageUrl: "[IMAGE: preview-tab]", // You can replace with actual image later
    tips: [
      "Switch between light and dark modes to test color adaptability",
      "Examine how colors and typography work together across different UI components",
      "Test accessibility with the contrast analysis tools",
      "Use the Download button to export your theme as ready-to-use Chakra UI code"
    ],
    alert: {
      title: "Sharing",
      description: "Use the Share button to generate a link to your theme that others can view and edit.",
      status: "info"
    }
  }
];

const QuickStartTab: React.FC = () => {
  const mutedTextColor = useColorModeValue(textSecondary.light, textSecondary.dark);
  const lightbulbColor = useColorModeValue(iconAccent.light, iconAccent.dark);
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);
  const iconBg = useColorModeValue(primaryAccent.light, primaryAccent.dark);

  return (
    <Box>
      <VStack align="flex-start" mb={8}>
        <HStack>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} color={headingColor}>
            Create Your Theme in 3 Simple Steps
          </Heading>
          <Badge colorScheme="primary" fontSize="sm" variant="solid" py={1} px={2}>
            Updated
          </Badge>
        </HStack>
        <Text fontSize="lg" color={mutedTextColor}>
          Our simplified workflow makes creating professional Chakra UI themes fast and intuitive.
          Just follow these three steps to go from concept to code.
        </Text>
      </VStack>

      <VStack spacing={4} align="stretch">
        {/* Move the useColorModeValue hook outside the map callback */}
        {steps.map((step, index) => {
          return (
            <Box key={index} mb={6}>
              <Flex mb={4} align="center">
                <Box bg={iconBg} p={2} borderRadius="md" color="white" mr={4}>
                  <Icon as={step.icon} boxSize={5} />
                </Box>
                <Box>
                  <Heading as="h3" size="md" color={headingColor}>
                    {step.title}
                  </Heading>
                  <Text color={mutedTextColor}>{step.description}</Text>
                </Box>
              </Flex>

              <VStack align="stretch" spacing={4} pl={14}>
                {step.tips.length > 0 && (
                  <Box width="100%">
                    <List spacing={2}>
                      {step.tips.map((tip, tipIndex) => (
                        <ListItem key={tipIndex}>
                          <ListIcon as={Lightbulb} color={lightbulbColor} />
                          {tip}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {step.alert && (
                  <Alert 
                    status={step.alert.status} 
                    variant="left-accent" 
                    borderRadius="md"
                    mt={2}
                  >
                    <AlertIcon />
                    <Box>
                      <AlertTitle>{step.alert.title}</AlertTitle>
                      <AlertDescription>{step.alert.description}</AlertDescription>
                    </Box>
                  </Alert>
                )}

                {step.imageUrl && (
                  <Box 
                    border="1px dashed" 
                    borderColor="gray.300" 
                    p={4} 
                    borderRadius="md"
                    bg="gray.50"
                    textAlign="center"
                    color="gray.500"
                  >
                    {step.imageUrl}
                    <Text fontSize="sm" mt={2}>Image placeholder - will be updated later</Text>
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
