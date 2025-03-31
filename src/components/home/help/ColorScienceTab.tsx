import OptimizedImage from "@/components/OptimizedImage";
import {
  Box,
  Card,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ColorScienceTab: React.FC = () => {
  // Colors for different themes in the examples
  const accentBg = useColorModeValue("accent.50", "accent.900");

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={3}>
          Color Theory Fundamentals
        </Heading>
        <Text mb={4}>
          Our redesigned theme editor leverages modern color theory principles to help you create
          beautiful, harmonious, and accessible color palettes with less effort than ever before.
        </Text>
        <Text mb={4}>
          The powerful color tools behind the editor are designed to help you create beautiful,
          harmonious, and accessible color palettes without an advanced degree in color science.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              HSL Color Model
            </Heading>
            <Text mb={2}>
              Our editor uses the intuitive HSL (Hue, Saturation, Lightness) color model, making it
              easy to create harmonious color relationships:
            </Text>
            <Flex wrap="wrap" gap={2} mb={2}>
              <Tag colorScheme="red">Hue (0-360°)</Tag>
              <Tag colorScheme="blue">Saturation (0-100%)</Tag>
              <Tag colorScheme="green">Lightness (0-100%)</Tag>
            </Flex>
            <Text fontSize="sm" fontStyle="italic">
              Tip: Small hue adjustments (±5°) can refine a color while maintaining its general
              appearance.
            </Text>
          </Card>

          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              Enhanced Shade Generation
            </Heading>
            <Text mb={3}>
              Our improved algorithm creates balanced 10-shade palettes with mathematically precise
              lightness distribution, ensuring smoother transitions between shades and better
              dark/light mode compatibility.
            </Text>

            {/* Visual example of a shade palette */}
            <Stack spacing={1}>
              {[...Array(5)].map((_, i) => (
                <Flex key={i} h="8px">
                  {[...Array(10)].map((_, j) => (
                    <Box
                      key={j}
                      flex={1}
                      bg={`rgba(${30 + i * 50}, ${100 + j * 15}, ${200 - j * 20}, ${0.5 + j * 0.05})`}
                      h="100%"
                    />
                  ))}
                </Flex>
              ))}
            </Stack>
          </Card>

          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              Intelligent Color Harmonies
            </Heading>
            <Text mb={3}>
              Choose from scientifically-derived harmony rules to create professional color
              combinations:
            </Text>
            <SimpleGrid columns={2} spacing={2}>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Complementary
                </Text>
                <Text fontSize="xs">Colors opposite on the wheel</Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Analogous
                </Text>
                <Text fontSize="xs">Colors adjacent on the wheel</Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Triadic
                </Text>
                <Text fontSize="xs">Three evenly spaced colors</Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Split Complementary
                </Text>
                <Text fontSize="xs">Two colors adjacent to complement</Text>
              </Card>
            </SimpleGrid>
          </Card>

          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              New: Color Psychology
            </Heading>
            <Text mb={3}>
              Our theme editor now includes color meaning suggestions based on extensive research in
              color psychology:
            </Text>
            <SimpleGrid columns={1} spacing={2}>
              <Card p={2} bg="blue.50" _dark={{ bg: "blue.900" }}>
                <Text fontSize="sm" fontWeight="medium">
                  Blue: Trust, Security, Stability
                </Text>
              </Card>
              <Card p={2} bg="green.50" _dark={{ bg: "green.900" }}>
                <Text fontSize="sm" fontWeight="medium">
                  Green: Growth, Health, Nature
                </Text>
              </Card>
              <Card p={2} bg="red.50" _dark={{ bg: "red.900" }}>
                <Text fontSize="sm" fontWeight="medium">
                  Red: Passion, Energy, Urgency
                </Text>
              </Card>
              <Card p={2} bg="purple.50" _dark={{ bg: "purple.900" }}>
                <Text fontSize="sm" fontWeight="medium">
                  Purple: Luxury, Creativity, Wisdom
                </Text>
              </Card>
            </SimpleGrid>
          </Card>
        </SimpleGrid>
      </Box>

      <Box>
        <Heading size="md" mb={3}>
          Dark Mode Optimization
        </Heading>
        <Text mb={4}>
          Our enhanced dark mode engine automatically transforms your light-mode theme into a
          perfectly tuned dark theme using advanced color adaptation algorithms.
        </Text>

        <OptimizedImage filename="color-contrast-explorer.png" alt="Color contrast explorer" />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={4}>
          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              Automatic Dark Adaptation
            </Heading>
            <Text mb={3}>
              Our intelligent system applies these key transformations when switching to dark mode:
            </Text>
            <OrderedList spacing={2} pl={4}>
              <ListItem>
                <Text fontWeight="medium" fontSize="sm">
                  Inverse luminance mapping
                </Text>
                <Text fontSize="xs">
                  Light colors become dark and vice versa while preserving perceived contrast
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="medium" fontSize="sm">
                  Saturation reduction
                </Text>
                <Text fontSize="xs">
                  Colors are desaturated to prevent eye strain in dark environments
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="medium" fontSize="sm">
                  Selective hue shifting
                </Text>
                <Text fontSize="xs">
                  Slight hue adjustments to maintain color recognition in dark contexts
                </Text>
              </ListItem>
            </OrderedList>
          </Card>

          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              Fine-Tuning Controls
            </Heading>
            <Text mb={3}>
              The new interface provides precise controls for customizing dark mode behavior:
            </Text>
            <SimpleGrid columns={1} spacing={2}>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm">
                  Contrast intensity slider to balance readability and eye comfort
                </Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm">
                  Color temperature adjustment for warmer or cooler dark themes
                </Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm">
                  True black toggle for OLED displays to maximize battery savings
                </Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm">
                  Component-specific dark mode overrides for critical UI elements
                </Text>
              </Card>
            </SimpleGrid>
          </Card>
        </SimpleGrid>
      </Box>

      <Box>
        <Heading size="md" mb={3}>
          Advanced Accessibility Features
        </Heading>
        <Text mb={4}>
          Our updated theme editor includes comprehensive accessibility tools that go beyond basic
          contrast checking to ensure your themes work for everyone.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              Real-Time WCAG Compliance
            </Heading>
            <Text mb={3}>Our expanded accessibility toolkit now features:</Text>
            <UnorderedList spacing={2} pl={4} mb={3}>
              <ListItem>
                <Text fontSize="sm">
                  Automatic WCAG 2.1 AA and AAA compliance checking for all combinations
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="sm">
                  Smart text color suggestions that dynamically adjust to maintain legibility
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="sm">
                  Focus state visibility validator to ensure keyboard navigation is always visible
                </Text>
              </ListItem>
            </UnorderedList>
          </Card>

          <Card p={4} variant="outline">
            <Heading size="sm" mb={2}>
              Color Vision Deficiency Tools
            </Heading>
            <Text mb={3}>
              Preview how your theme appears to users with different types of color blindness:
            </Text>
            <SimpleGrid columns={2} spacing={2}>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Protanopia
                </Text>
                <Text fontSize="xs">Red-blind (1% of males)</Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Deuteranopia
                </Text>
                <Text fontSize="xs">Green-blind (1% of males)</Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Tritanopia
                </Text>
                <Text fontSize="xs">Blue-blind (rare)</Text>
              </Card>
              <Card p={2} bg={accentBg}>
                <Text fontSize="sm" fontWeight="medium">
                  Achromatopsia
                </Text>
                <Text fontSize="xs">Complete color blindness</Text>
              </Card>
            </SimpleGrid>
          </Card>

          <Card p={4} variant="outline" gridColumn={{ md: "span 2" }}>
            <Heading size="sm" mb={2}>
              New: Smart Color Correction
            </Heading>
            <Text mb={3}>
              Our intelligent system can now automatically suggest color adjustments to resolve
              accessibility issues while preserving your design intent as much as possible.
            </Text>
          </Card>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default ColorScienceTab;
