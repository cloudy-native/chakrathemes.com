import OptimizedImage from "@/components/OptimizedImage";
import {
  Alert,
  AlertIcon,
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  BotMessageSquare,
  Check,
  Eye,
  FileCode,
  Image,
  Lightbulb,
  Palette,
  PanelBottomOpen,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";
import React from "react";

/**
 * FeatureCardProps Interface
 *
 * Defines the properties for the FeatureCard component.
 *
 * @param {string} title - The title of the feature.
 * @param {string} description - A brief description of the feature.
 * @param {React.ElementType} icon - The icon to display alongside the title.
 * @param {string} [image] - Optional filename for an image related to the feature.
 * @param {string[]} [tips] - Optional array of tips for using the feature.
 * @param {object} [alert] - Optional alert to display for the feature.
 * @param {string} [alert.title] - The title of the alert.
 * @param {string} [alert.description] - The description of the alert.
 * @param {"info" | "warning" | "success" | "error"} [alert.status] - The status of the alert.
 */
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  imageUrl?: string; // For backward compatibility
  tips?: string[];
  alert?: {
    title: string;
    description: string;
    status: "info" | "warning" | "success" | "error";
  };
}

/**
 * FeatureCard Component
 *
 * A reusable card component to display a feature with a title, description, icon, optional image, tips, and alert.
 *
 * @param {FeatureCardProps} props - The properties for the FeatureCard component.
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  imageUrl, // Support both image and imageUrl for backward compatibility
  tips,
  alert,
}) => {
  // Use image or fall back to imageUrl for backward compatibility
  const imageToShow = image || imageUrl;

  // Determine background and border colors based on the current color mode (light/dark).
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconBg = useColorModeValue("primary.50", "primary.900");
  const iconColor = useColorModeValue("primary.600", "primary.200");

  return (
    <Card
      p={5}
      borderRadius="md"
      bg={cardBg}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      mb={4}
    >
      {/* Flex container for icon and title */}
      <Flex mb={4} align="center">
        {/* Icon container with background and styling */}
        <Box bg={iconBg} p={2} borderRadius="md" color={iconColor} mr={3}>
          <Icon as={icon} boxSize={5} />
        </Box>
        {/* Feature title */}
        <Heading size="sm">{title}</Heading>
      </Flex>

      {/* Feature description */}
      <Text mb={4}>{description}</Text>

      {/* Optional alert section */}
      {alert && (
        <Alert status={alert.status} variant="left-accent" borderRadius="md" mb={4}>
          <AlertIcon />
          <Box>
            <Text fontWeight="medium" fontSize="sm">
              {alert.title}
            </Text>
            <Text fontSize="sm" mt={1}>
              {alert.description}
            </Text>
          </Box>
        </Alert>
      )}

      {/* Optional image - centered with proper styling */}
      {imageToShow && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          my={4}
          overflow="hidden"
          borderRadius="md"
          boxShadow="md"
        >
          <OptimizedImage filename={imageToShow} alt={title} />
        </Box>
      )}

      {/* Optional tips section */}
      {tips && tips.length > 0 && (
        <Box mb={4} mt={6}>
          {/* Pro Tips heading */}
          <Flex align="center" mb={3}>
            <Icon as={Lightbulb} mr={2} boxSize={5} color={iconColor} />
            <Heading size="xs" fontWeight="bold">
              Pro Tips
            </Heading>
          </Flex>

          {/* Tips list */}
          <Box
            bg={cardBg === "white" ? "gray.50" : "gray.700"}
            borderRadius="md"
            p={4}
            borderLeft="3px solid"
            borderColor={iconColor}
          >
            <VStack align="flex-start" spacing={3}>
              {/* Map through tips and display each one */}
              {tips.map((tip, index) => (
                <Flex key={index} align="flex-start">
                  <Icon as={Check} boxSize={4} color={iconColor} mt="2px" mr={2} />
                  <Text fontSize="sm">{tip}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
    </Card>
  );
};

/**
 * DeepDiveTab Component
 *
 * This component provides a detailed overview of the theme editor's features, including color palette creation,
 * typography settings, theme preview, accessibility tools, and more.
 */
const DeepDiveTab: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      {/* Features Overview Section */}
      <Box>
        <Heading size="md" mb={4}>
          Features Overview
        </Heading>
        <Text mb={6}>
          Our redesigned theme editor offers powerful yet accessible features to help you create
          professional Chakra UI themes quickly. Here&apos;s a detailed look at the key features and
          how to use them.
        </Text>

        {/* Color Palette Creation Sub-section */}
        <Heading size="sm" mb={4}>
          Color Palette Creation
        </Heading>
        {/* Grid layout for color palette creation features */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
          {/* "From Color" Feature Card */}
          <FeatureCard
            title="From Color"
            description="Create balanced color palettes from a single base color. Our algorithm generates a full 10-shade palette with mathematically optimized lightness distribution."
            icon={Palette}
            image="from-color-feature.png"
            tips={[
              "Use the color picker to select any color from the spectrum",
              "Bookmark your favorite colors by saving them to your browser",
              "Create color palettes with names like 'primary', 'secondary', or 'accent' for automatic mapping in preview",
            ]}
          />

          {/* "From Image" Feature Card */}
          <FeatureCard
            title="From Image"
            description="Extract color palettes directly from your brand images or design inspiration with our intelligent color analysis algorithm."
            icon={Image}
            image="color-from-image.png"
            tips={[
              "Upload images in JPG, PNG, or WebP formats up to 5MB",
              "Click on extracted colors to fine-tune and create a palette",
              "For best results, use images with clear, distinct color areas",
            ]}
            alert={{
              title: "Image Processing",
              description:
                "Your images are processed locally in the browser and are never stored on our servers.",
              status: "info",
            }}
          />

          {/* "Inspiration Palettes" Feature Card */}
          <FeatureCard
            title="Inspiration Palettes"
            description="Browse our curated collection of professionally designed color palettes spanning various design styles and color harmonies."
            icon={Sparkles}
            image="palette-from-inspiration-1.png"
            tips={[
              "Filter palettes by style (minimal, vibrant, muted, etc.)",
              "Click any color in a palette to use it as a base for your own palette",
              "Save your favorite inspiration palettes to return to them later",
            ]}
          />

          {/* "AI Theme Generator" Feature Card */}
          <FeatureCard
            title="AI Theme Generator"
            description="Describe your desired theme in natural language, and our AI will generate coordinated color schemes based on your description."
            icon={BotMessageSquare}
            image="ai-theme-generator.png"
            tips={[
              "Be specific about colors, mood, and brand characteristics",
              "Try descriptions like 'modern tech startup with blue tones' or 'earthy organic cosmetics brand'",
              "The AI generator creates complete themes with primary, secondary, accent, and background palettes",
            ]}
            alert={{
              title: "New Feature",
              description:
                "The AI generator is constantly improving. Try different prompts to explore possibilities!",
              status: "success",
            }}
          />
        </SimpleGrid>

        {/* Divider */}
        <Divider my={6} />

        {/* Typography & Preview Sub-section */}
        <Heading size="sm" mb={4}>
          Typography & Preview
        </Heading>
        {/* Grid layout for typography and preview features */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
          {/* "Typography Settings" Feature Card */}
          <FeatureCard
            title="Typography Settings"
            description="Set the perfect font combinations for your theme with our streamlined typography controls."
            icon={Type}
            image="typography-tab.png"
            tips={[
              "Choose from pre-matched heading and body font pairs",
              "Preview font combinations with real-time examples",
              "Adjust font sizes and weights to match your brand's style",
              "All Google Fonts are available with instant preview",
            ]}
          />

          {/* "Theme Preview" Feature Card */}
          <FeatureCard
            title="Theme Preview"
            description="See your theme in action with interactive component previews that show how your colors and typography work together."
            icon={Eye}
            image="theme-preview.png"
            tips={[
              "Toggle between light and dark modes to check adaptability",
              "View your theme applied to buttons, cards, forms, and more",
              "Test color contrast and accessibility with our built-in tools",
              "Make adjustments directly from the preview tab",
            ]}
          />

          {/* "Accessibility Tools" Feature Card */}
          <FeatureCard
            title="Accessibility Tools"
            description="Ensure your theme is accessible to all users with our integrated accessibility checking and enhancement tools."
            icon={Wand2}
            image="accessibility-contrast.png"
            tips={[
              "Automated WCAG 2.1 compliance checking for text contrast",
              "Color blindness simulators to test visual accessibility",
              "Intelligent suggestions to improve problematic color combinations",
              "Focus state visibility validation for keyboard navigation",
            ]}
            alert={{
              title: "Accessibility Standards",
              description:
                "Our tools help you meet WCAG AA standards (minimum 4.5:1 contrast for normal text, 3:1 for large text).",
              status: "info",
            }}
          />

          {/* "Export & Share" Feature Card */}
          <FeatureCard
            title="Export & Share"
            description="Take your theme with you as production-ready code or share it with your team for collaboration."
            icon={FileCode}
            image="theme-share.png"
            tips={[
              "Download your theme as a ready-to-use Chakra UI theme file",
              "Share your theme via a unique URL that others can open and edit",
              "Copy theme configuration as JSON to paste directly into your code",
              "Your theme is automatically optimized for both light and dark modes",
            ]}
          />
        </SimpleGrid>

        {/* Divider */}
        <Divider my={6} />

        {/* Special Features Sub-section */}
        <Heading size="sm" mb={4}>
          Special Features
        </Heading>
        {/* Grid layout for special features */}
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
          {/* "Curated Themes" Feature Card */}
          <FeatureCard
            title="Curated Themes"
            description="Skip the design process entirely with our collection of complete, ready-to-use themes crafted by professional designers."
            icon={PanelBottomOpen}
            image="curated-palettes.png"
            tips={[
              "Browse themes by industry, style, or color scheme",
              "Each theme includes coordinated color palettes and typography",
              "Customize any aspect of a curated theme to match your specific needs",
              "Perfect for quick prototyping or when you need a professional result fast",
            ]}
            alert={{
              title: "Design System Ready",
              description:
                "All curated themes are tested for accessibility and work seamlessly with Chakra UI components.",
              status: "success",
            }}
          />
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default DeepDiveTab;
