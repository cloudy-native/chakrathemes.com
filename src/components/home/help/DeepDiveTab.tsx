import {
  Alert,
  AlertIcon,
  Box,
  Card,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Icon,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { 
  Image, 
  Palette, 
  Lightbulb, 
  BotMessageSquare, 
  PanelBottomOpen, 
  Sparkles,
  Wand2,
  Check,
  Eye,
  FileCode,
  Type 
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl?: string;
  tips?: string[];
  alert?: {
    title: string;
    description: string;
    status: "info" | "warning" | "success" | "error";
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  imageUrl, 
  tips,
  alert
}) => {
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
      <Flex mb={4} align="center">
        <Box bg={iconBg} p={2} borderRadius="md" color={iconColor} mr={3}>
          <Icon as={icon} boxSize={5} />
        </Box>
        <Heading size="sm">{title}</Heading>
      </Flex>
      
      <Text mb={4}>{description}</Text>
      
      {tips && tips.length > 0 && (
        <Accordion allowToggle mb={4}>
          <AccordionItem border="none">
            <AccordionButton 
              px={3} 
              py={2} 
              bg={useColorModeValue("gray.100", "gray.700")}
              borderRadius="md"
              _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
            >
              <Flex flex="1" align="center">
                <Icon as={Lightbulb} mr={2} boxSize={4} color={iconColor} />
                <Text fontWeight="medium">Pro Tips</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} pt={3}>
              <VStack align="flex-start" spacing={2}>
                {tips.map((tip, index) => (
                  <Flex key={index} align="flex-start">
                    <Icon as={Check} boxSize={4} color={iconColor} mt="2px" mr={2} />
                    <Text fontSize="sm">{tip}</Text>
                  </Flex>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
      
      {alert && (
        <Alert 
          status={alert.status} 
          variant="left-accent" 
          borderRadius="md"
          mb={4}
        >
          <AlertIcon />
          <Box>
            <Text fontWeight="medium" fontSize="sm">{alert.title}</Text>
            <Text fontSize="sm" mt={1}>{alert.description}</Text>
          </Box>
        </Alert>
      )}
      
      {imageUrl && (
        <Box 
          border="1px dashed" 
          borderColor="gray.300" 
          p={4} 
          borderRadius="md"
          bg="gray.50"
          textAlign="center"
          color="gray.500"
        >
          {imageUrl}
          <Text fontSize="sm" mt={2}>Image placeholder - will be updated later</Text>
        </Box>
      )}
    </Card>
  );
};

const DeepDiveTab: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="md" mb={4}>
          Features Overview
        </Heading>
        <Text mb={6}>
          Our redesigned theme editor offers powerful yet accessible features to help you create professional
          Chakra UI themes quickly. Here's a detailed look at the key features and how to use them.
        </Text>
        
        <Heading size="sm" mb={4}>Color Palette Creation</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
          <FeatureCard 
            title="From Color"
            description="Create balanced color palettes from a single base color. Our algorithm generates a full 10-shade palette with mathematically optimized lightness distribution."
            icon={Palette}
            imageUrl="[IMAGE: from-color-feature]"
            tips={[
              "Use the color picker to select any color from the spectrum",
              "Bookmark your favorite colors by saving them to your browser",
              "Create color palettes with names like 'primary', 'secondary', or 'accent' for automatic mapping in preview"
            ]}
          />
          
          <FeatureCard 
            title="From Image"
            description="Extract color palettes directly from your brand images or design inspiration with our intelligent color analysis algorithm."
            icon={Image}
            imageUrl="[IMAGE: from-image-feature]"
            tips={[
              "Upload images in JPG, PNG, or WebP formats up to 5MB",
              "Click on extracted colors to fine-tune and create a palette",
              "For best results, use images with clear, distinct color areas"
            ]}
            alert={{
              title: "Image Processing",
              description: "Your images are processed locally in the browser and are never stored on our servers.",
              status: "info"
            }}
          />
          
          <FeatureCard 
            title="Inspiration Palettes"
            description="Browse our curated collection of professionally designed color palettes spanning various design styles and color harmonies."
            icon={Sparkles}
            imageUrl="[IMAGE: inspiration-palettes]"
            tips={[
              "Filter palettes by style (minimal, vibrant, muted, etc.)",
              "Click any color in a palette to use it as a base for your own palette",
              "Save your favorite inspiration palettes to return to them later"
            ]}
          />
          
          <FeatureCard 
            title="AI Theme Generator"
            description="Describe your desired theme in natural language, and our AI will generate coordinated color schemes based on your description."
            icon={BotMessageSquare}
            imageUrl="[IMAGE: ai-generator]"
            tips={[
              "Be specific about colors, mood, and brand characteristics",
              "Try descriptions like 'modern tech startup with blue tones' or 'earthy organic cosmetics brand'",
              "The AI generator creates complete themes with primary, secondary, accent, and background palettes"
            ]}
            alert={{
              title: "New Feature",
              description: "The AI generator is constantly improving. Try different prompts to explore possibilities!",
              status: "success"
            }}
          />
        </SimpleGrid>
        
        <Divider my={6} />
        
        <Heading size="sm" mb={4}>Typography & Preview</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
          <FeatureCard 
            title="Typography Settings"
            description="Set the perfect font combinations for your theme with our streamlined typography controls."
            icon={Type}
            imageUrl="[IMAGE: typography-settings]"
            tips={[
              "Choose from pre-matched heading and body font pairs",
              "Preview font combinations with real-time examples",
              "Adjust font sizes and weights to match your brand's style",
              "All Google Fonts are available with instant preview"
            ]}
          />
          
          <FeatureCard 
            title="Theme Preview"
            description="See your theme in action with interactive component previews that show how your colors and typography work together."
            icon={Eye}
            imageUrl="[IMAGE: theme-preview]"
            tips={[
              "Toggle between light and dark modes to check adaptability",
              "View your theme applied to buttons, cards, forms, and more",
              "Test color contrast and accessibility with our built-in tools",
              "Make adjustments directly from the preview tab"
            ]}
          />
          
          <FeatureCard 
            title="Accessibility Tools"
            description="Ensure your theme is accessible to all users with our integrated accessibility checking and enhancement tools."
            icon={Wand2}
            imageUrl="[IMAGE: accessibility-tools]"
            tips={[
              "Automated WCAG 2.1 compliance checking for text contrast",
              "Color blindness simulators to test visual accessibility",
              "Intelligent suggestions to improve problematic color combinations",
              "Focus state visibility validation for keyboard navigation"
            ]}
            alert={{
              title: "Accessibility Standards",
              description: "Our tools help you meet WCAG AA standards (minimum 4.5:1 contrast for normal text, 3:1 for large text).",
              status: "info"
            }}
          />
          
          <FeatureCard 
            title="Export & Share"
            description="Take your theme with you as production-ready code or share it with your team for collaboration."
            icon={FileCode}
            imageUrl="[IMAGE: export-share]"
            tips={[
              "Download your theme as a ready-to-use Chakra UI theme file",
              "Share your theme via a unique URL that others can open and edit",
              "Copy theme configuration as JSON to paste directly into your code",
              "Your theme is automatically optimized for both light and dark modes"
            ]}
          />
        </SimpleGrid>
        
        <Divider my={6} />
        
        <Heading size="sm" mb={4}>Special Features</Heading>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
          <FeatureCard 
            title="Curated Themes"
            description="Skip the design process entirely with our collection of complete, ready-to-use themes crafted by professional designers."
            icon={PanelBottomOpen}
            imageUrl="[IMAGE: curated-themes]"
            tips={[
              "Browse themes by industry, style, or color scheme",
              "Each theme includes coordinated color palettes and typography",
              "Customize any aspect of a curated theme to match your specific needs",
              "Perfect for quick prototyping or when you need a professional result fast"
            ]}
            alert={{
              title: "Design System Ready",
              description: "All curated themes are tested for accessibility and work seamlessly with Chakra UI components.",
              status: "success"
            }}
          />
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default DeepDiveTab;
