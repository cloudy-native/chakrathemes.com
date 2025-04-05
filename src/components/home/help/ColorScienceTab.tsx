import {
  Box,
  Card,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Icon,
  Button,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLink, BookOpen, Palette, PieChart, Droplet, Accessibility } from "lucide-react";

// Card component for resource links
const ResourceCard = ({ 
  title, 
  description, 
  url, 
  icon 
}: { 
  title: string; 
  description: string; 
  url: string; 
  icon: React.ElementType 
}) => {
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
        transition: "all 0.2s ease"
      }}
    >
      <Flex mb={3} align="center">
        <Box bg="primary.50" p={2} borderRadius="md" color="primary.600" mr={3}>
          <Icon as={icon} boxSize={5} />
        </Box>
        <Heading size="sm">{title}</Heading>
      </Flex>
      <Text fontSize="sm" mb={4}>{description}</Text>
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

const ColorScienceTab: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      <VStack align="flex-start" spacing={4}>
        <Heading size="md">Understanding Color Theory</Heading>
        <Text>
          Our theme editor is built on solid color theory principles that help you create 
          harmonious and accessible color schemes without needing to be a color expert. 
          Here's a brief overview of the key concepts.
        </Text>
        
        <Alert 
          status="info" 
          variant="left-accent" 
          borderRadius="md"
        >
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

      <Box>
        <Heading size="sm" mb={4}>Color Models & Harmonies</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>HSL Color Model</Text>
              <Text fontSize="sm">
                HSL (Hue, Saturation, Lightness) is an intuitive color model that makes it easier to create
                balanced color palettes. Our editor uses HSL to allow for natural color adjustments.
              </Text>
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
                [IMAGE: hsl-color-model]
                <Text fontSize="sm" mt={2}>Image placeholder - will be updated later</Text>
              </Box>
            </Box>
          </Box>
          
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>Color Harmonies</Text>
              <Text fontSize="sm">
                Our editor supports classic color harmonies like complementary, analogous, triadic, and more. 
                These scientific relationships help ensure your colors work well together.
              </Text>
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
                [IMAGE: color-harmonies]
                <Text fontSize="sm" mt={2}>Image placeholder - will be updated later</Text>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

      <Box>
        <Heading size="sm" mb={4}>Accessibility & Dark Mode</Heading>
        <Alert 
          status="info" 
          variant="left-accent" 
          borderRadius="md"
          mb={4}
        >
          <AlertIcon />
          <Box>
            <AlertTitle>WCAG Guidelines</AlertTitle>
            <AlertDescription>
              Our contrast checker ensures your color combinations meet WCAG 2.1 AA standards, with 
              guidance to reach AAA compliance for maximum accessibility.
            </AlertDescription>
          </Box>
        </Alert>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>Dark Mode Adaptation</Text>
              <Text fontSize="sm">
                Our editor automatically optimizes your color scheme for dark mode using algorithms 
                that adjust luminance while preserving color relationships and ensuring accessibility.
              </Text>
            </Box>
          </Box>
          
          <Box>
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.900")}>
              <Text fontWeight="medium" mb={2}>Color Vision Deficiencies</Text>
              <Text fontSize="sm">
                Preview your theme through the lens of different color vision deficiencies (protanopia, 
                deuteranopia, tritanopia) to ensure your design works for everyone.
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

      <Divider my={4} />

      <Box>
        <Heading size="sm" mb={5}>Recommended Resources</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <ResourceCard 
            title="Color Theory for Designers"
            description="A comprehensive guide to color theory fundamentals for UI/UX designers"
            url="https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/"
            icon={Palette}
          />
          
          <ResourceCard 
            title="HSL Color Picker"
            description="Interactive tool to explore HSL color model and create harmonious palettes"
            url="https://hslpicker.com/"
            icon={Droplet}
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
