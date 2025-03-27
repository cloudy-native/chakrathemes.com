import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getContrastRatio } from "@/utils/colorUtils";
import {
  Badge,
  Box,
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Select,
  Switch,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import chroma from "chroma-js";
import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

// TODO: Pull this out of out application theme instead of hard-coding
//
const grayPalette: { [key: string]: string } = {
  50: "#F7FAFC",
  100: "#EDF2F7",
  200: "#E2E8F0",
  300: "#CBD5E0",
  400: "#A0AEC0",
  500: "#718096",
  600: "#4A5568",
  700: "#2D3748",
  800: "#1A202C",
  900: "#171923",
};

// Preview panel showing text at different sizes (for future use)
const _PreviewPanel: React.FC<{ bg: string; text: string }> = ({ bg, text }) => (
  <Box mt={4} p={4} bg={bg} borderRadius="md" borderWidth="1px">
    <Heading size="lg" color={text} mb={2}>
      Heading Text
    </Heading>
    <Text color={text} fontSize="md" mb={3}>
      This is a paragraph of text that demonstrates how content would appear with these color
      settings. It should be readable and meet accessibility standards.
    </Text>
    <Text color={text} fontSize="sm">
      Here&apos;s smaller text for captions or secondary content, which has stricter contrast
      requirements.
    </Text>

    <Flex justifyContent="space-between" mt={4}>
      <Button colorScheme="primary" bg={bg} color={text} borderWidth="1px">
        Primary Button
      </Button>
      <Button variant="outline" borderColor={text} bg="transparent" color={text}>
        Secondary Button
      </Button>
    </Flex>
  </Box>
);

// Controls for selecting colors from palettes
interface ColorControlsProps {
  colorKey: string;
  shadeLight: string;
  shadeDark: string;
  palettes: Array<{ colorKey: string; colorShades: Record<string, string> }>;
  onColorKeyChange: (colorKey: string) => void;
  onShadeLightChange: (shade: string) => void;
  onShadeDarkChange: (shade: string) => void;
  contrastRatio: number;
  isAutoDark: boolean;
  trackColorAction?: (action: string, label?: string, value?: number) => void;
}

const ColorControls: React.FC<ColorControlsProps> = ({
  colorKey,
  shadeLight,
  shadeDark,
  palettes,
  onColorKeyChange,
  onShadeLightChange,
  onShadeDarkChange,
  contrastRatio,
  isAutoDark,
  trackColorAction,
}) => {
  const wcagAA = contrastRatio >= 4.5;
  const wcagAALarge = contrastRatio >= 3;
  const wcagAAA = contrastRatio >= 7;

  // Get current palette
  const currentPalette = palettes.find(p => p.colorKey === colorKey)?.colorShades || {};
  const bgColorLight = currentPalette[shadeLight] || "#FFFFFF";
  const bgColorDark = currentPalette[shadeDark] || "#1A202C";

  // Create TypeScript code for useColorModeValue
  const generateTSCode = () => {
    return `useColorModeValue("${colorKey}.${shadeLight}", "${colorKey}.${shadeDark}")`;
  };

  const toast = useToast();

  // Handle color key change with tracking
  const handleColorKeyChange = (newColorKey: string) => {
    onColorKeyChange(newColorKey);
    if (trackColorAction) {
      trackColorAction("change_palette", newColorKey);
    }
  };

  // Handle shade changes with tracking
  const handleShadeLightChange = (shade: string) => {
    onShadeLightChange(shade);
    if (trackColorAction) {
      trackColorAction("change_light_shade", `${colorKey}.${shade}`);
    }
  };

  const handleShadeDarkChange = (shade: string) => {
    onShadeDarkChange(shade);
    if (trackColorAction) {
      trackColorAction("change_dark_shade", `${colorKey}.${shade}`);
    }
  };

  const copyTSCode = () => {
    navigator.clipboard.writeText(generateTSCode());
    toast({
      title: "Code copied",
      description: "TypeScript code copied to clipboard",
      status: "success",
      duration: 2000,
    });

    if (trackColorAction) {
      trackColorAction("copy_color_code", colorKey);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Color Palette</FormLabel>
        <Select value={colorKey} onChange={e => handleColorKeyChange(e.target.value)}>
          {palettes.map(palette => (
            <option key={palette.colorKey} value={palette.colorKey}>
              {palette.colorKey}
            </option>
          ))}
        </Select>
      </FormControl>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl>
          <FormLabel>Light Mode Shade</FormLabel>
          <Select value={shadeLight} onChange={e => handleShadeLightChange(e.target.value)}>
            {Object.keys(currentPalette)
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map(shade => (
                <option key={shade} value={shade}>
                  {shade} ({currentPalette[shade]})
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl isDisabled={isAutoDark}>
          <FormLabel>Dark Mode Shade</FormLabel>
          <Select
            value={shadeDark}
            onChange={e => handleShadeDarkChange(e.target.value)}
            isDisabled={isAutoDark}
          >
            {Object.keys(currentPalette)
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map(shade => (
                <option key={shade} value={shade}>
                  {shade} ({currentPalette[shade]})
                </option>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Box p={2} borderRadius="md" borderWidth="1px">
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold">Generated TypeScript:</Text>
          <IconButton
            variant="ghost"
            icon={<Icon as={Copy} />}
            aria-label="Copy TypeScript code"
            onClick={copyTSCode}
          />
        </Flex>
        <Code p={2} borderRadius="md" width="100%" fontSize="sm" display="block">
          {generateTSCode()}
        </Code>
      </Box>

      <Flex align="center" justify="space-between" p={2} borderRadius="md" borderWidth="1px">
        <Text>Contrast Ratio: {contrastRatio.toFixed(2)}:1</Text>
        <HStack>
          <Badge colorScheme={wcagAALarge ? "green" : "red"} mr={1}>
            AA Large {wcagAALarge ? "✓" : "✗"}
          </Badge>
          <Badge colorScheme={wcagAA ? "green" : "red"} mr={1}>
            AA {wcagAA ? "✓" : "✗"}
          </Badge>
          <Badge colorScheme={wcagAAA ? "green" : "primary"}>AAA {wcagAAA ? "✓" : "✗"}</Badge>
        </HStack>
      </Flex>

      <HStack>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="bold">
            Light Mode Preview:
          </Text>
          <Box p={3} borderRadius="md" bg={bgColorLight} borderWidth="1px" mt={1}>
            <Text>
              Background: {colorKey}.{shadeLight}
            </Text>
          </Box>
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="bold">
            Dark Mode Preview:
          </Text>
          <Box p={3} borderRadius="md" bg={bgColorDark} borderWidth="1px" mt={1}>
            <Text>
              Background: {colorKey}.{shadeDark}
            </Text>
          </Box>
        </Box>
      </HStack>
    </VStack>
  );
};

// Function to suggest a good dark shade based on light shade
function suggestDarkShade(lightShade: string): string {
  // We convert to number but don't need the value later, the mapping is direct
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _lightValue = parseInt(lightShade);

  // Simple mapping strategy (inverse relationship)
  const mapping: Record<string, string> = {
    "50": "900",
    "100": "800",
    "200": "700",
    "300": "600",
    "400": "500",
    "500": "400",
    "600": "300",
    "700": "200",
    "800": "100",
    "900": "50",
  };

  return mapping[lightShade] || "800"; // Default to 800 if no mapping
}

// Main component with split view
export const ColorContrastExplorer: React.FC = () => {
  const { themeValues } = useThemeContext();
  const { trackColorAction, trackFeature } = useAnalytics();

  // Get palettes from theme
  const palettes = Object.entries(themeValues.colors || {}).map(([colorKey, colorShades]) => ({
    colorKey,
    colorShades: colorShades as Record<string, string>,
  }));

  // Default to first palette or gray if none available
  const defaultPalette = palettes.length > 0 ? palettes[0].colorKey : "gray";

  // Background configuration
  const [bgColorKey, setBgColorKey] = useState(defaultPalette);
  const [bgShadeLight, setBgShadeLight] = useState("50"); // Default to lightest shade
  const [bgShadeDark, setBgShadeDark] = useState("800"); // Default to dark shade
  const [autoSuggestDark, setAutoSuggestDark] = useState(true);

  // Text configuration (we'll use gray for text by default)
  const [textColorKey, setTextColorKey] = useState("gray");
  const [textShadeLight, setTextShadeLight] = useState("800"); // Default to dark text on light bg
  const [textShadeDark, setTextShadeDark] = useState("100"); // Default to light text on dark bg
  const [autoSuggestDarkText, setAutoSuggestDarkText] = useState(true);

  // Get current palette colors
  const bgPalette = palettes.find(p => p.colorKey === bgColorKey)?.colorShades || {};

  const bgColorLight = bgPalette[bgShadeLight] || "#FFFFFF";
  const bgColorDark = bgPalette[bgShadeDark] || "#1A202C";
  const textColorLight = grayPalette[textShadeLight] || "#1A202C";
  const textColorDark = grayPalette[textShadeDark] || "#FFFFFF";

  // Computed values for accessibility
  const lightContrast = getContrastRatio(bgColorLight, textColorLight);
  const darkContrast = getContrastRatio(bgColorDark, textColorDark);

  // For live view mode
  const { colorMode, toggleColorMode } = useColorMode();

  // Auto-suggest dark mode colors when light mode changes
  useEffect(() => {
    if (autoSuggestDark) {
      const suggestedDark = suggestDarkShade(bgShadeLight);
      setBgShadeDark(suggestedDark);
    }
  }, [bgShadeLight, autoSuggestDark]);

  // Track explorer loaded
  useEffect(() => {
    trackFeature("contrast_explorer", "loaded");
  }, [trackFeature]);

  // Handle color mode toggle with tracking
  const handleColorModeToggle = () => {
    toggleColorMode();
    trackFeature("contrast_explorer", `switch_to_${colorMode === "light" ? "dark" : "light"}_mode`);
  };

  // Generate TypeScript code for complete pair
  const generateFullTSCode = () => {
    const bgCode = `const bg = useColorModeValue("${bgColorKey}.${bgShadeLight}", "${bgColorKey}.${bgShadeDark}");`;
    const textCode = `const textColor = useColorModeValue("${textColorKey}.${textShadeLight}", "${textColorKey}.${textShadeDark}");`;
    return `${bgCode}\n${textCode}`;
  };

  const toast = useToast();

  const copyFullTSCode = () => {
    navigator.clipboard.writeText(generateFullTSCode());
    toast({
      title: "Code copied",
      description: "Complete TypeScript code copied to clipboard",
      status: "success",
      duration: 2000,
    });
    trackColorAction("copy_contrast_code", `${bgColorKey}/${textColorKey}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
      // Split view mode - shows both light and dark simultaneously
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Light Mode Panel */}
        <Box p={4} borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>
            Light Mode
          </Heading>
          <Box
            p={4}
            borderRadius="md"
            bg={bgColorLight}
            color={textColorLight}
            borderWidth="1px"
            mb={4}
          >
            <Heading size="md" mb={2}>
              Preview
            </Heading>
            <Text>
              This text uses {textColorKey}.{textShadeLight} on {bgColorKey}.{bgShadeLight}
            </Text>
            <Button
              mt={4}
              bg="transparent"
              borderWidth="1px"
              borderColor={textColorLight}
              color={textColorLight}
            >
              Sample Button
            </Button>
          </Box>

          <Flex justifyContent="space-between" mb={3}>
            <Heading size="sm">Background</Heading>
            <FormControl display="flex" alignItems="center" width="auto">
              <FormLabel htmlFor="auto-bg-light" mb="0" fontSize="xs" mr={1}>
                Auto dark
              </FormLabel>
              <Switch
                id="auto-bg-light"
                size="sm"
                isChecked={autoSuggestDark}
                onChange={() => setAutoSuggestDark(!autoSuggestDark)}
                colorScheme="primary"
              />
            </FormControl>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={4}>
            <FormControl size="sm">
              <FormLabel fontSize="xs">Color</FormLabel>
              <Select size="sm" value={bgColorKey} onChange={e => setBgColorKey(e.target.value)}>
                {palettes.map(palette => (
                  <option key={palette.colorKey} value={palette.colorKey}>
                    {palette.colorKey}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm">
              <FormLabel fontSize="xs">Shade</FormLabel>
              <Select
                size="sm"
                value={bgShadeLight}
                onChange={e => setBgShadeLight(e.target.value)}
              >
                {Object.keys(bgPalette)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(shade => (
                    <option key={shade} value={shade}>
                      {shade}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Heading size="sm" mb={3}>
            Text
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <FormControl size="sm">
              <FormLabel fontSize="xs">Color</FormLabel>
              <Select
                size="sm"
                value={textColorKey}
                onChange={e => setTextColorKey(e.target.value)}
              >
                {palettes.map(palette => (
                  <option key={palette.colorKey} value={palette.colorKey}>
                    {palette.colorKey}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm">
              <FormLabel fontSize="xs">Shade</FormLabel>
              <Select
                size="sm"
                value={textShadeLight}
                onChange={e => setTextShadeLight(e.target.value)}
              >
                {Object.keys(grayPalette)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(shade => (
                    <option key={shade} value={shade}>
                      {shade}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Flex align="center" justify="space-between" mt={4} p={2} bg="gray.100" borderRadius="md">
            <Text fontSize="sm">Contrast: {lightContrast.toFixed(2)}:1</Text>
            <Badge colorScheme={lightContrast >= 4.5 ? "green" : "red"}>
              {lightContrast >= 4.5 ? "WCAG AA ✓" : "WCAG AA ✗"}
            </Badge>
          </Flex>
        </Box>

        {/* Dark Mode Panel */}
        <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.800">
          <Heading size="md" mb={4}>
            Dark Mode
          </Heading>
          <Box
            p={4}
            borderRadius="md"
            bg={bgColorDark}
            color={textColorDark}
            borderWidth="1px"
            mb={4}
          >
            <Heading size="md" mb={2}>
              Preview
            </Heading>
            <Text>
              This text uses {textColorKey}.{textShadeDark} on {bgColorKey}.{bgShadeDark}
            </Text>
            <Button
              mt={4}
              bg="transparent"
              borderWidth="1px"
              borderColor={textColorDark}
              color={textColorDark}
            >
              Sample Button
            </Button>
          </Box>

          <Flex justifyContent="space-between" mb={3}>
            <Heading size="sm">Background</Heading>
            <FormControl
              display="flex"
              alignItems="center"
              width="auto"
              isDisabled={autoSuggestDark}
            >
              <FormLabel htmlFor="auto-bg-dark" mb="0" fontSize="xs" mr={1}>
                Manual
              </FormLabel>
              <Switch
                id="auto-bg-dark"
                size="sm"
                isChecked={!autoSuggestDark}
                onChange={() => setAutoSuggestDark(!autoSuggestDark)}
                colorScheme="primary"
              />
            </FormControl>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={4}>
            <FormControl size="sm" isDisabled={autoSuggestDark}>
              <FormLabel fontSize="xs">Color</FormLabel>
              <Select
                size="sm"
                value={bgColorKey}
                onChange={e => setBgColorKey(e.target.value)}
                isDisabled={autoSuggestDark}
              >
                {palettes.map(palette => (
                  <option key={palette.colorKey} value={palette.colorKey}>
                    {palette.colorKey}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm" isDisabled={autoSuggestDark}>
              <FormLabel fontSize="xs">Shade</FormLabel>
              <Select
                size="sm"
                value={bgShadeDark}
                onChange={e => setBgShadeDark(e.target.value)}
                isDisabled={autoSuggestDark}
              >
                {Object.keys(bgPalette)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(shade => (
                    <option key={shade} value={shade}>
                      {shade}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Flex justifyContent="space-between" mb={3}>
            <Heading size="sm">Text</Heading>
            <FormControl
              display="flex"
              alignItems="center"
              width="auto"
              isDisabled={autoSuggestDarkText}
            >
              <FormLabel htmlFor="auto-text-dark" mb="0" fontSize="xs" mr={1}>
                Manual
              </FormLabel>
              <Switch
                id="auto-text-dark"
                size="sm"
                isChecked={!autoSuggestDarkText}
                onChange={() => setAutoSuggestDarkText(!autoSuggestDarkText)}
                colorScheme="primary"
              />
            </FormControl>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <FormControl size="sm" isDisabled={autoSuggestDarkText}>
              <FormLabel fontSize="xs">Color</FormLabel>
              <Select
                size="sm"
                value={textColorKey}
                onChange={e => setTextColorKey(e.target.value)}
                isDisabled={autoSuggestDarkText}
              >
                {palettes.map(palette => (
                  <option key={palette.colorKey} value={palette.colorKey}>
                    {palette.colorKey}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm" isDisabled={autoSuggestDarkText}>
              <FormLabel fontSize="xs">Shade</FormLabel>
              <Select
                size="sm"
                value={textShadeDark}
                onChange={e => setTextShadeDark(e.target.value)}
                isDisabled={autoSuggestDarkText}
              >
                {Object.keys(grayPalette)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(shade => (
                    <option key={shade} value={shade}>
                      {shade}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Flex align="center" justify="space-between" mt={4} p={2} bg="gray.700" borderRadius="md">
            <Text fontSize="sm">Contrast: {darkContrast.toFixed(2)}:1</Text>
            <Badge colorScheme={darkContrast >= 4.5 ? "green" : "red"}>
              {darkContrast >= 4.5 ? "WCAG AA ✓" : "WCAG AA ✗"}
            </Badge>
          </Flex>
        </Box>
      </Grid>
      {/* Shared Controls */}
      <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="sm">Generated TypeScript Code</Heading>
          <IconButton
            icon={<Copy size={16} />}
            aria-label="Copy TypeScript"
            onClick={copyFullTSCode}
          />
        </Flex>
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre">
          {generateFullTSCode()}
        </Code>
      </Box>
    </Box>
  );
};

// A streamlined version specifically for embedding in palette panels
interface PaletteColorContrastProps {
  colorKey: string;
  colorShades: Record<string, string>;
}

export const PaletteColorContrast: React.FC<PaletteColorContrastProps> = ({
  colorKey,
  colorShades,
}) => {
  const { themeValues } = useThemeContext();
  const { trackColorAction, trackFeature } = useAnalytics();
  const toast = useToast();

  // Track component loaded
  useEffect(() => {
    trackFeature("contrast_explorer", "palette_contrast_loaded");
    trackColorAction("view_palette_contrast", colorKey);
  }, [trackFeature, trackColorAction, colorKey]);

  // State for selected shades
  const [bgShadeLight, setBgShadeLight] = useState("50");
  const [bgShadeDark, setBgShadeDark] = useState("800");
  const [textShadeLight, setTextShadeLight] = useState("800");
  const [textShadeDark, setTextShadeDark] = useState("100");
  const [autoSuggestDark, setAutoSuggestDark] = useState(true);
  const [autoSuggestText, setAutoSuggestText] = useState(true);

  // Always use gray for text
  const textColorKey = "gray";

  // Get all palettes for text color selection
  const palettes = Object.entries(themeValues.colors || {}).map(([key, shades]) => ({
    colorKey: key,
    colorShades: shades as Record<string, string>,
  }));

  // Get colors
  const bgColorLight = colorShades[bgShadeLight] || "#FFFFFF";
  const bgColorDark = colorShades[bgShadeDark] || "#1A202C";

  // Calculate contrast
  const lightContrast = getContrastRatio(bgColorLight, grayPalette[textShadeLight] || "#1A202C"); // Updated
  const darkContrast = getContrastRatio(bgColorDark, grayPalette[textShadeDark] || "#FFFFFF"); // Updated

  // Auto-suggest dark mode shade when light mode changes
  useEffect(() => {
    if (autoSuggestDark) {
      const suggestedDark = suggestDarkShade(bgShadeLight);
      setBgShadeDark(suggestedDark);
    }
  }, [bgShadeLight, autoSuggestDark]);

  // Function to suggest a good text shade based on background color
  function findBestContrastShade(bgColor: string, textPalette: Record<string, string>): string {
    // Validate inputs
    if (!bgColor || typeof bgColor !== "string") {
      console.error("Invalid background color:", bgColor);
      return "50"; // Default to light text
    }

    if (!textPalette || typeof textPalette !== "object" || Object.keys(textPalette).length === 0) {
      console.error("Invalid text palette:", textPalette);
      return "50"; // Default to light text
    }

    try {
      // 1. Determine if the background is light or dark
      const bgLuminance = chroma(bgColor).luminance();
      const bgIsDark = bgLuminance < 0.45;

      // 2. Define preferred shades based on background darkness
      const preferredShades = bgIsDark ? ["50", "100", "200"] : ["900", "800", "700"];

      // 3. Set the minimum contrast ratio
      const minContrast = 4.5; // WCAG AA

      // 4. Initialize variables to track the best shade
      let bestShade = "50"; // Default to lightest shade
      let bestContrast = 0;

      // 5. Iterate through all available shades
      for (const shade in textPalette) {
        const textColor = textPalette[shade];
        const contrast = getContrastRatio(bgColor, textColor);

        // 6. Check if the current shade meets the minimum contrast
        if (contrast >= minContrast) {
          // 7. Prioritize preferred shades
          if (preferredShades.includes(shade)) {
            // 8. If a preferred shade has better contrast, update bestShade
            if (contrast > bestContrast) {
              bestShade = shade;
              bestContrast = contrast;
            }
          } else {
            // 9. If not a preferred shade, but still meets contrast, update if better
            if (contrast > bestContrast) {
              bestShade = shade;
              bestContrast = contrast;
            }
          }
        } else {
          // 10. If the shade doesn't meet the minimum contrast, update if it's the best so far
          if (contrast > bestContrast) {
            bestShade = shade;
            bestContrast = contrast;
          }
        }
      }

      // 11. If no shade meets the minimum contrast, log a warning
      if (bestContrast < minContrast) {
        console.warn(
          `No text shade meets the minimum contrast of ${minContrast}:1 for background color ${bgColor}. Best available contrast is ${bestContrast.toFixed(
            2
          )}:1 with shade ${bestShade}.`
        );
      }

      return bestShade;
    } catch (error) {
      console.error("Error in findBestContrastShade:", error);
      return "50"; // Default fallback on error
    }
  }

  // Auto-suggest text shades for better contrast with the background
  useEffect(() => {
    if (autoSuggestText) {
      try {
        // Ensure we have the actual hex values for our background colors
        const bgColorLight = colorShades[bgShadeLight];
        const bgColorDark = colorShades[bgShadeDark];

        if (bgColorLight) {
          // For light mode background, find the best contrast text color
          const suggestedLightText = findBestContrastShade(bgColorLight, grayPalette);

          setTextShadeLight(suggestedLightText);
        }

        if (bgColorDark) {
          // For dark mode background, find the best contrast text color
          const suggestedDarkText = findBestContrastShade(bgColorDark, grayPalette);

          setTextShadeDark(suggestedDarkText);
        }
      } catch (error) {
        console.error("Error suggesting text colors:", error);
      }
    }
  }, [bgShadeLight, bgShadeDark, colorShades, themeValues.colors, autoSuggestText]);

  // Generate TypeScript code
  const generateTSCode = () => {
    return `// Background color
const bg = useColorModeValue("${colorKey}.${bgShadeLight}", "${colorKey}.${bgShadeDark}");
// Text color
const textColor = useColorModeValue("${textColorKey}.${textShadeLight}", "${textColorKey}.${textShadeDark}");`;
  };

  const copyTSCode = () => {
    navigator.clipboard.writeText(generateTSCode());
    toast({
      title: "Code copied",
      description: "TypeScript code copied to clipboard",
      status: "success",
      duration: 2000,
    });
    trackColorAction("copy_palette_contrast_code", colorKey);
  };

  return (
    <Box mt={4} borderWidth="1px" borderRadius="md" p={4}>
      <Heading size="sm" mb={4}>
        Color Contrast Explorer for {colorKey}
      </Heading>

      <Box>
        <VStack align="stretch" spacing={2} mb={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="auto-dark" mb="0" fontSize="sm">
              Auto-suggest dark mode shade
            </FormLabel>
            <Switch
              id="auto-dark"
              size="sm"
              isChecked={autoSuggestDark}
              onChange={() => {
                const newValue = !autoSuggestDark;
                setAutoSuggestDark(newValue);
                trackColorAction(
                  "toggle_palette_auto_dark",
                  `${newValue ? "enabled" : "disabled"}_${colorKey}`
                );
              }}
              colorScheme="primary"
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="auto-text" mb="0" fontSize="sm">
              Auto-suggest text colors
            </FormLabel>
            <Switch
              id="auto-text"
              size="sm"
              isChecked={autoSuggestText}
              onChange={() => {
                const newValue = !autoSuggestText;
                setAutoSuggestText(newValue);
                trackColorAction(
                  "toggle_palette_auto_text",
                  `${newValue ? "enabled" : "disabled"}_${colorKey}`
                );
              }}
              colorScheme="primary"
            />
          </FormControl>
        </VStack>
      </Box>

      {/* Light/Dark Mode Previews with their respective color controls */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mt={4}>
        {/* Light Mode Column */}
        <Box>
          {/* Light Mode Color Controls */}
          <Box mb={3}>
            <Text fontSize="xs" fontWeight="bold" mb={1}>
              Background: {colorKey}.{bgShadeLight}
            </Text>
            <Flex gap={1} flexWrap="wrap" mb={3}>
              {Object.keys(colorShades)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(shade => (
                  <Box
                    key={shade}
                    onClick={() => setBgShadeLight(shade)}
                    bg={colorShades[shade]}
                    w="22px"
                    h="22px"
                    borderRadius="sm"
                    borderWidth="2px"
                    borderColor={bgShadeLight === shade ? "primary.500" : "transparent"}
                    cursor="pointer"
                    _hover={{ transform: "scale(1.1)" }}
                    transition="all 0.2s"
                    title={`Shade ${shade}`}
                  />
                ))}
            </Flex>

            <Flex align="center">
              <Text fontSize="xs" fontWeight="bold" mb={1}>
                Text: gray.{textShadeLight}
              </Text>
              {autoSuggestText && (
                <Badge ml={2} colorScheme="green" variant="outline" fontSize="9px" mb={1}>
                  Auto
                </Badge>
              )}
            </Flex>
            <Flex gap={1} flexWrap="wrap">
              {Object.keys(grayPalette)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(shade => (
                  <Box
                    key={shade}
                    onClick={() => !autoSuggestText && setTextShadeLight(shade)}
                    bg={grayPalette[shade]}
                    w="22px"
                    h="22px"
                    borderRadius="sm"
                    borderWidth="2px"
                    borderColor={textShadeLight === shade ? "primary.500" : "transparent"}
                    cursor={autoSuggestText ? "not-allowed" : "pointer"}
                    opacity={autoSuggestText ? 0.7 : 1}
                    _hover={{ transform: autoSuggestText ? "none" : "scale(1.1)" }}
                    transition="all 0.2s"
                    title={autoSuggestText ? `Auto-selected: ${shade}` : `Shade ${shade}`}
                  />
                ))}
            </Flex>
          </Box>

          {/* Light Mode Preview */}
          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <Box py={2} px={3} bg="gray.50" borderBottomWidth="1px">
              <Text fontWeight="medium" fontSize="sm">
                Light Mode
              </Text>
            </Box>
            <Box p={4} bg={bgColorLight} color={`gray.${textShadeLight}`}>
              <Heading size="sm" mb={2}>
                Preview
              </Heading>
              <Text fontSize="sm">
                This text demonstrates gray.{textShadeLight} on {colorKey}.{bgShadeLight}.
              </Text>
              <Button
                mt={3}
                size="sm"
                bg="transparent"
                borderWidth="1px"
                color={grayPalette[textShadeLight]}
              >
                Button
              </Button>
            </Box>
            <Box py={2} px={3} bg="gray.50" borderTopWidth="1px">
              <Flex justify="space-between" align="center">
                <Text fontSize="xs">Contrast: {lightContrast.toFixed(2)}:1</Text>
                <Badge size="sm" colorScheme={lightContrast >= 4.5 ? "green" : "red"}>
                  WCAG {lightContrast >= 4.5 ? "AA ✓" : "AA ✗"}
                </Badge>
              </Flex>
            </Box>
          </Box>
        </Box>

        {/* Dark Mode Column */}
        <Box>
          {/* Dark Mode Color Controls */}
          <Box mb={3}>
            <Flex align="center">
              <Text fontSize="xs" fontWeight="bold" mb={1}>
                Background: {colorKey}.{bgShadeDark}
              </Text>
              {autoSuggestDark && (
                <Badge ml={2} colorScheme="primary" variant="outline" fontSize="9px" mb={1}>
                  Auto
                </Badge>
              )}
            </Flex>
            <Flex gap={1} flexWrap="wrap" mb={3}>
              {Object.keys(colorShades)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(shade => (
                  <Box
                    key={shade}
                    onClick={() => !autoSuggestDark && setBgShadeDark(shade)}
                    bg={colorShades[shade]}
                    w="22px"
                    h="22px"
                    borderRadius="sm"
                    borderWidth="2px"
                    borderColor={bgShadeDark === shade ? "primary.500" : "transparent"}
                    cursor={autoSuggestDark ? "not-allowed" : "pointer"}
                    opacity={autoSuggestDark ? 0.7 : 1}
                    _hover={{ transform: autoSuggestDark ? "none" : "scale(1.1)" }}
                    transition="all 0.2s"
                    title={autoSuggestDark ? `Auto-selected: ${shade}` : `Shade ${shade}`}
                  />
                ))}
            </Flex>

            <Flex align="center">
              <Text fontSize="xs" fontWeight="bold" mb={1}>
                Text: gray.{textShadeDark}
              </Text>
              {autoSuggestText && (
                <Badge ml={2} colorScheme="green" variant="outline" fontSize="9px" mb={1}>
                  Auto
                </Badge>
              )}
            </Flex>
            <Flex gap={1} flexWrap="wrap">
              {Object.keys(grayPalette)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(shade => (
                  <Box
                    key={shade}
                    onClick={() => !autoSuggestText && setTextShadeDark(shade)}
                    bg={grayPalette[shade]}
                    w="22px"
                    h="22px"
                    borderRadius="sm"
                    borderWidth="2px"
                    borderColor={textShadeDark === shade ? "primary.500" : "transparent"}
                    cursor={autoSuggestText ? "not-allowed" : "pointer"}
                    opacity={autoSuggestText ? 0.7 : 1}
                    _hover={{ transform: autoSuggestText ? "none" : "scale(1.1)" }}
                    transition="all 0.2s"
                    title={autoSuggestText ? `Auto-selected: ${shade}` : `Shade ${shade}`}
                  />
                ))}
            </Flex>
          </Box>

          {/* Dark Mode Preview */}
          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <Box py={2} px={3} bg="gray.800" borderBottomWidth="1px">
              <Text fontWeight="medium" fontSize="sm">
                Dark Mode
              </Text>
            </Box>
            <Box p={4} bg={bgColorDark} color={`gray.${textShadeDark}`}>
              <Heading size="sm" mb={2}>
                Preview
              </Heading>
              <Text fontSize="sm">
                This text demonstrates gray.{textShadeDark} on {colorKey}.{bgShadeDark}.
              </Text>
              <Button
                mt={3}
                size="sm"
                bg="transparent"
                borderWidth="1px"
                color={grayPalette[textShadeDark]}
              >
                Button
              </Button>
            </Box>
            <Box py={2} px={3} bg="gray.800" borderTopWidth="1px">
              <Flex justify="space-between" align="center">
                <Text fontSize="xs">Contrast: {darkContrast.toFixed(2)}:1</Text>
                <Badge size="sm" colorScheme={darkContrast >= 4.5 ? "green" : "red"}>
                  WCAG {darkContrast >= 4.5 ? "AA ✓" : "AA ✗"}
                </Badge>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Code Generation */}
      <Box mt={4} p={3} borderWidth="1px" borderRadius="md">
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="medium" fontSize="sm">
            Generated Code
          </Text>
          <IconButton
            variant="ghost"
            icon={<Icon as={Copy} />}
            aria-label="Copy code"
            onClick={copyTSCode}
          />
        </Flex>
        <Code p={2} borderRadius="md" fontSize="xs" display="block" whiteSpace="pre">
          {generateTSCode()}
        </Code>
      </Box>
    </Box>
  );
};

export default ColorContrastExplorer;
