import {
  Box,
  Divider,
  Heading,
  ListItem,
  OrderedList,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const ColorScienceTab: React.FC = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={3}>
          Understanding Color Systems
        </Heading>
        <Text mb={4}>
          The editor uses advanced color theory to help you create harmonious and accessible color
          palettes. Here&apos;s how different aspects of color are handled:
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              HSL Color Model
            </Heading>
            <Text>
              The editor uses the HSL (Hue, Saturation, Lightness) color model, which makes it
              intuitive to generate related colors. Hue refers to the color itself, saturation
              controls intensity, and lightness determines how light or dark the color appears.
            </Text>
          </Box>

          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Shade Generation
            </Heading>
            <Text>
              When creating a palette, we generate 10 shades by progressively adjusting the
              lightness while maintaining the hue and saturation. This creates a natural progression
              from light to dark that works well in both light and dark UI modes.
            </Text>
          </Box>

          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Contrast Ratios
            </Heading>
            <Text>
              WCAG guidelines recommend a contrast ratio of at least 4.5:1 for normal text and 3:1
              for large text. Our Color Contrast Explorer helps you find shade combinations that
              meet these requirements for accessibility.
            </Text>
          </Box>

          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Color Harmonies
            </Heading>
            <Text>
              Color harmonies are predefined color combinations based on their positions on the
              color wheel. The editor can suggest complementary, analogous, and triadic color
              combinations to create visually pleasing palettes.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Light and Dark Mode Considerations
        </Heading>
        <Text mb={4}>
          When designing for both light and dark modes, certain color principles help ensure your
          theme looks great in both contexts:
        </Text>

        <OrderedList spacing={3} mb={4}>
          <ListItem>
            <Text fontWeight="bold">Inverse Shade Relationships</Text>
            <Text>
              In many cases, you&apos;ll want to use inverse shade relationships between light and
              dark modes. For example, if you use shade 100 in light mode, you might use shade 900
              in dark mode. The editor&apos;s Color Contrast Explorer helps you quickly find these
              relationships.
            </Text>
          </ListItem>

          <ListItem>
            <Text fontWeight="bold">Perceived Brightness</Text>
            <Text>
              Colors appear differently based on their surrounding context. A medium gray will look
              darker on a white background and lighter on a black background. The editor accounts
              for these perceptual effects when suggesting color combinations.
            </Text>
          </ListItem>

          <ListItem>
            <Text fontWeight="bold">Saturation Adjustments</Text>
            <Text>
              Highly saturated colors can cause visual fatigue, especially in dark mode. The editor
              helps you create palettes with appropriate saturation levels for both light and dark
              contexts.
            </Text>
          </ListItem>
        </OrderedList>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Accessibility Testing
        </Heading>
        <Text mb={3}>
          All colors in your theme should meet accessibility standards to ensure your application is
          usable by people with visual impairments. The editor includes tools to help you create
          accessible color schemes:
        </Text>

        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="bold">WCAG Compliance Checks</Text>
            <Text>
              The Color Contrast Explorer automatically calculates contrast ratios and indicates
              whether your color combinations meet WCAG AA or AAA standards.
            </Text>
          </ListItem>

          <ListItem>
            <Text fontWeight="bold">Accessible Text Generation</Text>
            <Text>
              For any background color, the editor can suggest text colors that provide sufficient
              contrast for readability.
            </Text>
          </ListItem>
        </UnorderedList>
      </Box>
    </VStack>
  );
};

export default ColorScienceTab;
