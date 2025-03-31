import { OptimizedImage } from "@/components";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLink, Check } from "lucide-react";
import React from "react";

const DeepDiveTab: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="md" mb={3}>
          Working with Color Palettes
        </Heading>
        <Text mb={4}>
          Color palettes are the foundation of your theme. Each palette consists of 10 shades (from
          50 to 900) that provide a complete range from light to dark.
        </Text>

        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="medium">
                Creating palettes from existing colors
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={3}>
                To create a palette from an existing color, navigate to the Palettes tab and click
                &quot;Add Palette&quot;. You can input a hex color code or use the color picker to
                select your base color. The editor will automatically generate lighter and darker
                shades.
              </Text>
              <OptimizedImage
                filename="help/palette-from-base-color.png"
                alt="Palette from base color"
                caption="The simple case: Create a palette from a base color"
              />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="medium">
                Extracting colors from images
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Text mb={3}>
                You can extract color palettes directly from images. This is useful for matching
                your theme to existing brand assets or inspiration images. The tool will identify
                key colors and create balanced palettes.
              </Text>
              <HStack>
                <OptimizedImage
                  filename="help/palette-from-cat-image.png"
                  alt="Palette from cat image"
                  caption="Extract colors from a cute cat"
                />
                <OptimizedImage
                  filename="help/palette-from-dog-image.png"
                  alt="Palette from chameleon image"
                  caption="Interesting colors are from the garden, not the cute dog"
                />
              </HStack>
              <Text mb={3}>
                This tool extracts two kinds of colors—vibrant and muted—and two additional
                variations for each in light and dark. This is not the same as finding average
                colors. The color science behind this feature looks for key colors in the image.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="medium">
                Finding inspiration
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Text mb={3}>
                Need creative inspiration for your color schemes? The Inspiration tab provides
                curated color palettes from various design categories and color harmony principles.
                Browse through trendy color combinations, nature-inspired schemes, UI design sets,
                and more.
              </Text>
              <Text mb={3}>
                There are six related colors in each theme. Check back for updates and more ideas.
                These colors all work great out of the box, even &quot;Neon Pink&quot; and
                &quot;Cyber Purple&quot; if that&apos;s the look you&apos;re going for.
              </Text>
              <HStack>
                <OptimizedImage
                  filename="help/palette-from-inspiration-1.png"
                  alt="Palette from curated examples"
                  caption="Pick colors from out curated sample, vibrant in this case"
                />
                <OptimizedImage
                  filename="help/palette-from-inspiration-2.png"
                  alt="Palette from curated examples"
                  caption="Maybe dial that back a bit"
                />
              </HStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="medium">
                Adjusting individual shades
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Text mb={3}>
                After generating a palette, you can fine-tune it. Open the palette details to see
                the exact HEX values that were generated. You can change these, but we strongly
                advise against second-guessing the algorithm.
              </Text>
              <Text mb={3}>
                Start to explore how different shades of the palette will look in light and dark
                mode. As you select different shades, the dark-mode and text colors are calculated
                automatically, using perceptual measures of contrast and luminance. When you like
                the result, you can copy the TypeScript code and add directly to your ChakraUI React
                application.
              </Text>
              <OptimizedImage
                filename="help/open-palette.png"
                alt="Open palette"
                caption="Open the palette to start exploring and adjusting"
              />
              <Text mb={3}>
                Clicking &quot;Adjust Palette&quot; brings up more tools for fine tuning. These
                image tools will be familiar to you from PhotoShop and other image editors.
              </Text>
              <OptimizedImage
                filename="help/adjust-palette.png"
                alt="Adjust palette"
                caption="Adjust the palette using familiar image manipulation tools"
              />

              <Alert status="info" variant="left-accent" mt={4}>
                <AlertIcon />
                <Box>
                  <Text fontWeight="medium" fontSize="sm">
                    What does the &quot;!&quot; warning mean?
                  </Text>
                  <Text fontSize="xs" mt={1}>
                    When adjusting saturation or contrast, you might see a &quot;!&quot; warning
                    icon. This indicates that your adjustments have pushed the color beyond normal
                    limits, potentially causing &quot;color clipping&quot; where details are lost in
                    extremely light or dark areas.
                  </Text>
                  <Text fontSize="xs" mt={1}>
                    To resolve this, try reducing the intensity of your adjustment or start with a
                    different base color. For best results, keep your adjustments within ranges that
                    don&apos;t trigger the warning indicator.
                  </Text>
                </Box>
              </Alert>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="medium">
                Validating accessibility
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Text mb={3}>
                Accessibility is more than just a buzzword. It&apos;s a hard requirement of websites
                nowadays. Only of the main reasons ChakraUI has gained such popularity is its
                accessibility-first approach.
              </Text>
              <Text mb={3}>
                Accessibility in selecting colors for a website means choosing color combinations
                that ensure sufficient contrast and visibility for all users, including those with
                visual impairments, to easily read and navigate the content.{" "}
              </Text>
              <Text mb={3}>
                Start with contrast analysis. Click <Icon as={Check} /> to open the contrast review.
                First see how a palette performs with the
                <Link href="https://www.w3.org/WAI/standards-guidelines/wcag/" isExternal>
                  WCAG Standards Guidelines <Icon as={ExternalLink} />
                </Link>
                . That standard has two measures, AA and AAA: 10/10 is a good score for AA with its
                4.5:1 contrast ratio, and 8/10 is not bad for AAA, with its more stringent
                requirements of 7:1.
              </Text>
              <Text mb={3}>
                Then see how the contrast between adjacent shades fares. The adjacent shade contrast
                display shows the perceptual contrast ratio between neighboring shades in your color
                palette, with higher numbers and green badges indicating good differentiation
                between consecutive shades, while lower numbers and red badges suggest shades that
                might be too similar for effective visual hierarchy.
              </Text>
              <HStack>
                <OptimizedImage
                  filename="help/contrast-analysis.png"
                  alt="Contrast analysis"
                  caption="Discover whether colors in this palette meet contrast standards"
                />
                <OptimizedImage
                  filename="help/adjacent-shade-contrast.png"
                  alt="Adjust shade contrast"
                  caption="Discover the contrast between adjacent shade of a palette"
                />
              </HStack>
              <Text mb={3}>
                Color blindness is an issue for many people. People affected with color blindness
                often identify pastel shades of color pairs like red/green and green/brown as being
                too similar. (Try not to ask a color-blind person what color they see instead.
                That&apos;s actually the point: They don&apos;t.)
              </Text>
              <Text mb={3}>
                The three main types of color blindness are protanopia (difficulty distinguishing
                red), deuteranopia (difficulty distinguishing green), and tritanopia (difficulty
                distinguishing blue), each resulting from missing or defective cone cells in the
                retina that detect those specific wavelengths of light.
              </Text>
              <OptimizedImage
                filename="help/color-blindness.png"
                alt="Color blindness"
                caption="How people affected by color blindness may see your color palettes"
              />
              <Text mb={3}>Finally, see any accessibility recommendations.</Text>
              <OptimizedImage
                filename="help/accessibility-recommendations.png"
                alt="Accessibility recommendations"
                caption="See recommendations to improve accessibility"
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Preview your theme
        </Heading>
        <Text mb={4}>
          The Theme Preview tab offers a view of how your theme affects various UI components. This
          feature helps you evaluate and refine your theme design in context.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Review the color palette
            </Heading>
            <Text>
              As reference, see the final palette after any adjustments you made in the Palettes
              tab.
            </Text>
            <OptimizedImage
              filename="help/theme-preview-palette-tab.png"
              alt="Review palette"
              caption="See palette after any adjustments"
              width="100%"
            />
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Basic UI Elements
            </Heading>
            <Text>
              Preview standard UI elements like buttons, inputs, checkboxes, switches, and other
              form controls with your custom theme applied. This helps you ensure that basic
              interactive elements maintain their usability while matching your design goals.
            </Text>
            <OptimizedImage
              filename="help/theme-preview-basics.png"
              alt="See basic UI components"
              caption="See how basic UI components look with your palette"
              width="100%"
            />
          </Box>

          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Card Variations
            </Heading>
            <Text>
              We had some fun creating different card layouts. Compare palettes side by side. Try
              dark mode.
            </Text>
            <OptimizedImage
              filename="help/card-variations.png"
              alt="Card variations"
              caption="See how different card designs and layout might look in your application"
              width="100%"
            />
          </Box>

          <Box borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>
              Table Variations
            </Heading>
            <Text>We also made some tables</Text>
            <OptimizedImage
              filename="help/table-variations.png"
              alt="Table variations"
              caption="See table you theme designs and layout might look in your application"
              width="100%"
            />
          </Box>
        </SimpleGrid>

        <Text mt={3}>
          Toggle between light and dark modes to ensure your theme provides excellent user
          experience in both contexts. You can also view responsive behavior to confirm your theme
          works well across different screen sizes.
        </Text>
      </Box>
    </VStack>
  );
};

export default DeepDiveTab;
