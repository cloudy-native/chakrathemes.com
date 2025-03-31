import OptimizedImage from "@/components/OptimizedImage";
import { Alert, AlertIcon, Box, Card, HStack, SimpleGrid } from "@chakra-ui/react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const DeepDiveTab: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h3" size="md" mb={4}>
              Creating and customizing palettes
            </Heading>
            <Text mb={3}>
              Navigate to the Palettes tab and click &quot;Add Palette&quot; to create a new color
              set. You can select an RGB value directly using a color picker if you like that kind
              of thing. Our algorithm will automatically generate a balanced set of shades from 50
              to 900 for you. These are the numbered shades of a color that ChakraUI is expecting.
              If you have a picture you&apos;d like to use as inspiration, you can upload it and
              we&apos;ll extract the salient colors for you. If you&apos;d like some ideas, you can
              also browse our curated inspiration palettes.
            </Text>

            <HStack>
              <OptimizedImage
                filename="color-from-picker.png"
                alt="Create palette from color picker"
              />
              <OptimizedImage
                filename="curated-palettes.png"
                alt="Create palette from curated list"
              />
            </HStack>
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={4}>
              Color extraction from images
            </Heading>
            <Text mb={3}>
              You can extract color palettes directly from your brand images or design inspiration.
              Our algorithm identifies key colors and creates balanced palettes that capture the
              essence of your visual assets.
            </Text>

            <OptimizedImage filename="color-from-image.png" alt="Create palette from image" />

            <Text mb={3}>
              The extraction process creates both vibrant and muted color variations, giving you
              options for different UI elements. These aren&apos;t simple averages but intelligently
              selected colors that work well together in a design system.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={4}>
              Browsing inspiration palettes
            </Heading>
            <Text mb={3}>
              Our curated inspiration palettes provide quick starting points for your design. Browse
              through categories ranging from modern minimalist to vibrant creative themes that
              follow color harmony principles.
            </Text>

            <OptimizedImage
              filename="select-inspiration-color.png"
              alt="Create palette from curated list"
            />

            <Text mb={3}>
              Each inspiration palette includes six harmonious colors that can be directly added to
              your theme. Even bold choices like &quot;Neon Pink&quot; and &quot;Cyber Purple&quot;
              are carefully balanced to work well when implemented in your UI.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={4}>
              Advanced palette adjustments (not recommended)
            </Heading>
            <Text mb={3}>
              After generating a palette, you can event fine-tune it with our visual editing tools
              if you really want to. Open the palette details to see the exact HEX values and
              preview how colors will look in both light and dark modes.
            </Text>

            <OptimizedImage filename="advanced-adjustments.png" alt="Advanced color adjustments" />

            <Text mb={3}>
              The &quot;Adjust Palette&quot; feature provides intuitive controls for saturation,
              brightness, and contrast that affect the entire palette while maintaining color
              relationships. These tools will feel familiar to anyone who has used image editing
              software.
            </Text>

            <Alert status="info" variant="left-accent" mt={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  Understanding adjustment warnings
                </Text>
                <Text fontSize="xs" mt={1}>
                  A yellow warning indicator appears when your adjustments push colors beyond
                  optimal ranges. This can lead to &quot;color clipping&quot; where details are lost
                  in extremely light or dark areas.
                </Text>
                <Text fontSize="xs" mt={1}>
                  For best results, keep your adjustments within ranges that don&apos;t trigger the
                  warning. If needed, try starting with a different base color or reducing
                  adjustment intensity.
                </Text>
              </Box>
            </Alert>
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={4}>
              Accessibility validation
            </Heading>
            <OptimizedImage
              filename="accessibility-icon.png"
              alt="Accessibility Icon"
              width={"50%"}
            />
            <Text mb={3}>
              Accessibility is fundamental to modern web design, and it&apos;s one of the core
              principles behind Chakra UI&apos;s popularity. Our theme editor incorporates
              accessibility checking throughout the process.
            </Text>
            <Text mb={3}>
              As you select colors for your theme, our built-in contrast tools automatically
              evaluate whether your color choices provide sufficient contrast for all users,
              including those with visual impairments. The system follows WCAG 2.1 guidelines for
              minimum contrast ratios:
            </Text>

            <SimpleGrid columns={3} spacing={4} mb={4}>
              <Card p={3}>
                <Text fontWeight="bold" mb={1}>
                  4.5:1
                </Text>
                <Text fontSize="sm">For normal text (below 18pt)</Text>
              </Card>
              <Card p={3}>
                <Text fontWeight="bold" mb={1}>
                  3:1
                </Text>
                <Text fontSize="sm">For large text (18pt+)</Text>
              </Card>
              <Card p={3}>
                <Text fontWeight="bold" mb={1}>
                  3:1
                </Text>
                <Text fontSize="sm">For UI components</Text>
              </Card>
            </SimpleGrid>

            <HStack spacing={4} mb={4}>
              <OptimizedImage filename="contrast-analysis.png" alt="Contrast analysis" />
              <OptimizedImage filename="adjacent-shades.png" alt="Adjacent shades" />
            </HStack>

            <Text mb={3}>
              The application also includes tools to visualize how your palettes appear to users
              with color blindness, including protanopia (red blindness), deuteranopia (green
              blindness), and tritanopia (blue blindness).
            </Text>

            <OptimizedImage filename="color-blindness.png" alt="Color blindness" />

            <Text mb={3}>
              Our intelligent system provides specific recommendations for improving color
              accessibility when potential issues are detected.
            </Text>

            <OptimizedImage filename="accessibility-recommendations.png" alt="Color blindness" />
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={4}>
              Color Contrast Explorer
            </Heading>
            <OptimizedImage
              filename="color-contrast-explorer-button.png"
              alt="Color contrast explorer button"
              width={"50%"}
            />

            <Text mb={3}>
              Our theme editor includes powerful tools for exploring color relationships and
              ensuring your palette works harmoniously together. The Color Contrast Explorer
              provides an interactive way to test foreground and background color combinations
              across your entire palette.
            </Text>

            <OptimizedImage filename="color-contrast-explorer.png" alt="Color contrast explorer" />

            <Heading as="h3" size="md" mb={4}>
              Color Harmony
            </Heading>
            <OptimizedImage
              filename="color-harmony-button.png"
              alt="Color harmony tool"
              width={"50%"}
            />

            <Text mb={5}>
              The Color Harmony tool helps you understand the relationships between colors in your
              palette using established color theory principles. It visualizes various color
              relationships to help you create cohesive color schemes. Each tab represents a
              different harmony method, giving you multiple perspectives on your palette&apos;s
              balance and harmony.
            </Text>

            <Heading as="h4" size="sm" mb={3}>
              Complementary Colors
            </Heading>
            <Text mb={3}>
              Complementary colors sit opposite each other on the color wheel, creating high
              contrast and visual vibrance. This harmony uses color pairs that are 180° apart, like
              blue and orange or purple and yellow. Our tool automatically finds the complementary
              color for any shade in your palette, helping you create eye-catching accent
              combinations that draw attention to important UI elements.
            </Text>
            <OptimizedImage
              filename="color-harmony-complementary.png"
              alt="Complementary color harmony"
              mb={6}
            />

            <Heading as="h4" size="sm" mb={3}>
              Analogous Colors
            </Heading>
            <Text mb={3}>
              Analogous colors appear next to each other on the color wheel, creating harmonious and
              serene combinations. This harmony uses colors within 30° of your selected color,
              resulting in smooth transitions that work well for creating depth in interfaces
              without stark contrasts. Perfect for navigation menus, progress indicators, or
              anywhere you need subtle differentiation.
            </Text>
            <OptimizedImage
              filename="color-harmony-analogous.png"
              alt="Analogous color harmony"
              mb={6}
            />

            <Heading as="h4" size="sm" mb={3}>
              Triadic Colors
            </Heading>
            <Text mb={3}>
              Triadic harmony uses three colors equally spaced around the color wheel (120° apart),
              creating a balanced yet vibrant palette. This arrangement provides high contrast while
              maintaining color harmony, making it ideal for data visualizations, featured content
              sections, or applications that need to visually distinguish between multiple
              categories while ensuring the colors work well together.
            </Text>
            <OptimizedImage
              filename="color-harmony-triadic.png"
              alt="Triadic color harmony"
              mb={6}
            />

            <Heading as="h4" size="sm" mb={3}>
              Monochromatic Colors
            </Heading>
            <Text mb={3}>
              Monochromatic harmonies use variations of a single color by adjusting its saturation
              and brightness. This creates a cohesive, elegant look that&apos;s perfect for
              minimalist designs or when you want to emphasize content hierarchy without introducing
              multiple hues. Our tool generates sophisticated monochromatic palettes that avoid the
              flatness often associated with single-color designs, ensuring your UI maintains visual
              interest.
            </Text>
            <OptimizedImage
              filename="color-harmony-monochromatic.png"
              alt="Monochromatic color harmony"
              mb={6}
            />

            <Heading as="h4" size="sm" mb={3}>
              Custom Gradient
            </Heading>
            <Text mb={3}>
              The Custom Gradient option provides complete creative freedom, allowing you to create
              transitions between any two colors. This unique tool lets you visualize smooth
              gradient paths across the color space, helping you identify interesting intermediate
              colors that might not be obvious in traditional color theory approaches. Perfect for
              creating unique brand palettes, custom state indicators, or exploring unexpected color
              relationships.
            </Text>
            <OptimizedImage
              filename="color-harmony-custom-gradient.png"
              alt="Custom gradient color harmony"
              mb={6}
            />

            <Text mb={3}>
              Together, these tools provide a comprehensive environment for creating professional
              color palettes that are both aesthetically pleasing and accessible to all users. You
              can quickly identify potential issues and make informed adjustments to your theme
              colors.
            </Text>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default DeepDiveTab;
