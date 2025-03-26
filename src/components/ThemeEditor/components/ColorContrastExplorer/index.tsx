import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Flex,
  Text,
  Badge,
  HStack,
  Button,
  Tooltip,
  IconButton,
  Divider,
  useColorMode,
  Select,
  Code,
  useToast,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { getContrastRatio } from "@/utils/colorUtils";
import { Copy, Eye } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import chroma from "chroma-js";

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
      <Button colorScheme="blue" bg={bg} color={text} borderWidth="1px">
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
            icon={<Copy size={16} />}
            aria-label="Copy TypeScript code"
            size="sm"
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
          <Badge colorScheme={wcagAAA ? "green" : "blue"}>AAA {wcagAAA ? "✓" : "✗"}</Badge>
        </HStack>
      </Flex>

      <HStack>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="bold">
            Light Mode Preview:
          </Text>
          <Box p={3} borderRadius="md" bg={bgColorLight} borderWidth="1px" mt={1}>
            <Text color="gray.800">
              Background: {colorKey}.{shadeLight}
            </Text>
          </Box>
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="bold">
            Dark Mode Preview:
          </Text>
          <Box p={3} borderRadius="md" bg={bgColorDark} borderWidth="1px" mt={1}>
            <Text color="gray.100">
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
  const textPalette = palettes.find(p => p.colorKey === textColorKey)?.colorShades || {};

  const bgColorLight = bgPalette[bgShadeLight] || "#FFFFFF";
  const bgColorDark = bgPalette[bgShadeDark] || "#1A202C";
  const textColorLight = textPalette[textShadeLight] || "#1A202C";
  const textColorDark = textPalette[textShadeDark] || "#FFFFFF";

  // Computed values for accessibility
  const lightContrast = getContrastRatio(bgColorLight, textColorLight);
  const darkContrast = getContrastRatio(bgColorDark, textColorDark);

  // For live view mode
  const { colorMode, toggleColorMode } = useColorMode();
  const [liveView, setLiveView] = useState(false);

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

  // Handle view mode toggle with tracking
  const handleViewModeToggle = () => {
    const newMode = !liveView;
    setLiveView(newMode);
    trackFeature("contrast_explorer", newMode ? "switch_to_live_view" : "switch_to_split_view");
  };

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
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Color Contrast Explorer</Heading>
        <Tooltip label={liveView ? "Split view mode" : "Live preview mode"}>
          <IconButton
            icon={<Eye size={16} />}
            aria-label="Toggle live view"
            onClick={handleViewModeToggle}
            variant={liveView ? "solid" : "outline"}
            colorScheme="blue"
          />
        </Tooltip>
      </Flex>

      {liveView ? (
        // Live view mode - shows current theme mode with current pair
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Text>Currently showing: {colorMode === "light" ? "Light Mode" : "Dark Mode"}</Text>
            <Button size="sm" onClick={handleColorModeToggle}>
              Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
            </Button>
          </Flex>

          <Box
            p={4}
            bg={colorMode === "light" ? bgColorLight : bgColorDark}
            color={colorMode === "light" ? textColorLight : textColorDark}
            borderRadius="md"
          >
            <Heading size="lg" mb={4}>
              Live Preview
            </Heading>
            <Text>
              This shows how your content will appear in the current color mode. Switch between
              light and dark mode to see how your colors adapt.
            </Text>

            <Box
              mt={6}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg={colorMode === "light" ? bgColorLight : bgColorDark}
            >
              <Heading size="md" mb={2}>
                Card Component
              </Heading>
              <Text>
                Cards, buttons, and other UI elements should maintain readability across both color
                modes.
              </Text>
              <Button
                mt={4}
                color={colorMode === "light" ? textColorLight : textColorDark}
                bg="transparent"
                borderWidth="1px"
                borderColor={colorMode === "light" ? textColorLight : textColorDark}
              >
                Example Button
              </Button>
            </Box>
          </Box>

          <Box p={4} mt={4} borderWidth="1px" borderRadius="md">
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="sm">Generated TypeScript Code</Heading>
              <IconButton
                icon={<Copy size={16} />}
                aria-label="Copy TypeScript"
                size="sm"
                onClick={copyFullTSCode}
              />
            </Flex>
            <Code p={3} borderRadius="md" display="block" whiteSpace="pre">
              {generateFullTSCode()}
            </Code>
          </Box>

          <Divider my={6} />

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box>
              <Heading size="sm" mb={4}>
                Background Color
              </Heading>
              <ColorControls
                colorKey={bgColorKey}
                shadeLight={bgShadeLight}
                shadeDark={bgShadeDark}
                palettes={palettes}
                onColorKeyChange={setBgColorKey}
                onShadeLightChange={setBgShadeLight}
                onShadeDarkChange={setBgShadeDark}
                contrastRatio={lightContrast}
                isAutoDark={autoSuggestDark}
                trackColorAction={trackColorAction}
              />
              <FormControl display="flex" alignItems="center" mt={2}>
                <FormLabel htmlFor="auto-bg" mb="0" fontSize="sm">
                  Auto-suggest dark shade
                </FormLabel>
                <Switch
                  id="auto-bg"
                  isChecked={autoSuggestDark}
                  onChange={() => {
                    const newValue = !autoSuggestDark;
                    setAutoSuggestDark(newValue);
                    trackColorAction("toggle_auto_dark_bg", newValue ? "enabled" : "disabled");
                  }}
                  colorScheme="blue"
                />
              </FormControl>
            </Box>

            <Box>
              <Heading size="sm" mb={4}>
                Text Color
              </Heading>
              <ColorControls
                colorKey={textColorKey}
                shadeLight={textShadeLight}
                shadeDark={textShadeDark}
                palettes={palettes}
                onColorKeyChange={setTextColorKey}
                onShadeLightChange={setTextShadeLight}
                onShadeDarkChange={setTextShadeDark}
                contrastRatio={darkContrast}
                isAutoDark={autoSuggestDarkText}
                trackColorAction={trackColorAction}
              />
              <FormControl display="flex" alignItems="center" mt={2}>
                <FormLabel htmlFor="auto-text" mb="0" fontSize="sm">
                  Auto-suggest dark shade
                </FormLabel>
                <Switch
                  id="auto-text"
                  isChecked={autoSuggestDarkText}
                  onChange={() => {
                    const newValue = !autoSuggestDarkText;
                    setAutoSuggestDarkText(newValue);
                    trackColorAction("toggle_auto_dark_text", newValue ? "enabled" : "disabled");
                  }}
                  colorScheme="blue"
                />
              </FormControl>
            </Box>
          </Grid>
        </Box>
      ) : (
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
                  colorScheme="blue"
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
                  {Object.keys(textPalette)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(shade => (
                      <option key={shade} value={shade}>
                        {shade}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Flex
              align="center"
              justify="space-between"
              mt={4}
              p={2}
              bg="gray.100"
              borderRadius="md"
            >
              <Text fontSize="sm">Contrast: {lightContrast.toFixed(2)}:1</Text>
              <Badge colorScheme={lightContrast >= 4.5 ? "green" : "red"}>
                {lightContrast >= 4.5 ? "WCAG AA ✓" : "WCAG AA ✗"}
              </Badge>
            </Flex>
          </Box>

          {/* Dark Mode Panel */}
          <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.800">
            <Heading size="md" mb={4} color="white">
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
              <Heading size="sm" color="white">
                Background
              </Heading>
              <FormControl
                display="flex"
                alignItems="center"
                width="auto"
                isDisabled={autoSuggestDark}
              >
                <FormLabel htmlFor="auto-bg-dark" mb="0" fontSize="xs" mr={1} color="white">
                  Manual
                </FormLabel>
                <Switch
                  id="auto-bg-dark"
                  size="sm"
                  isChecked={!autoSuggestDark}
                  onChange={() => setAutoSuggestDark(!autoSuggestDark)}
                  colorScheme="blue"
                />
              </FormControl>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={4}>
              <FormControl size="sm" isDisabled={autoSuggestDark}>
                <FormLabel fontSize="xs" color="white">
                  Color
                </FormLabel>
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
                <FormLabel fontSize="xs" color="white">
                  Shade
                </FormLabel>
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
              <Heading size="sm" color="white">
                Text
              </Heading>
              <FormControl
                display="flex"
                alignItems="center"
                width="auto"
                isDisabled={autoSuggestDarkText}
              >
                <FormLabel htmlFor="auto-text-dark" mb="0" fontSize="xs" mr={1} color="white">
                  Manual
                </FormLabel>
                <Switch
                  id="auto-text-dark"
                  size="sm"
                  isChecked={!autoSuggestDarkText}
                  onChange={() => setAutoSuggestDarkText(!autoSuggestDarkText)}
                  colorScheme="blue"
                />
              </FormControl>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <FormControl size="sm" isDisabled={autoSuggestDarkText}>
                <FormLabel fontSize="xs" color="white">
                  Color
                </FormLabel>
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
                <FormLabel fontSize="xs" color="white">
                  Shade
                </FormLabel>
                <Select
                  size="sm"
                  value={textShadeDark}
                  onChange={e => setTextShadeDark(e.target.value)}
                  isDisabled={autoSuggestDarkText}
                >
                  {Object.keys(textPalette)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(shade => (
                      <option key={shade} value={shade}>
                        {shade}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Flex
              align="center"
              justify="space-between"
              mt={4}
              p={2}
              bg="gray.700"
              borderRadius="md"
            >
              <Text fontSize="sm" color="white">
                Contrast: {darkContrast.toFixed(2)}:1
              </Text>
              <Badge colorScheme={darkContrast >= 4.5 ? "green" : "red"}>
                {darkContrast >= 4.5 ? "WCAG AA ✓" : "WCAG AA ✗"}
              </Badge>
            </Flex>
          </Box>
        </Grid>
      )}

      {/* Shared Controls */}
      <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="sm">Generated TypeScript Code</Heading>
          <IconButton
            icon={<Copy size={16} />}
            aria-label="Copy TypeScript"
            size="sm"
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

  // Get text palette
  const textPalette = palettes.find(p => p.colorKey === textColorKey)?.colorShades || {};

  // Get colors
  const bgColorLight = colorShades[bgShadeLight] || "#FFFFFF";
  const bgColorDark = colorShades[bgShadeDark] || "#1A202C";
  const textColorLight = textPalette[textShadeLight] || "#1A202C";
  const textColorDark = textPalette[textShadeDark] || "#FFFFFF";

  // Calculate contrast
  const lightContrast = getContrastRatio(bgColorLight, textColorLight);
  const darkContrast = getContrastRatio(bgColorDark, textColorDark);

  // Auto-suggest dark mode shade when light mode changes
  useEffect(() => {
    if (autoSuggestDark) {
      const suggestedDark = suggestDarkShade(bgShadeLight);
      setBgShadeDark(suggestedDark);
    }
  }, [bgShadeLight, autoSuggestDark]);

  // Function to suggest a good text shade based on background color
  function findBestContrastShade(bgColor: string, textPalette: Record<string, string>): string {
    try {
      // Get all available shades sorted from lightest to darkest
      const shades = Object.keys(textPalette).sort((a, b) => parseInt(a) - parseInt(b));
      if (shades.length === 0) return "50"; // Default fallback

      // Check if bgColor is a valid color
      if (!bgColor || typeof bgColor !== "string") {
        console.error("Invalid background color:", bgColor);
        return "50"; // Default to light text
      }

      // Determine if bg is light or dark using luminance
      const bgLuminance = chroma(bgColor).luminance();
      const bgIsDark = bgLuminance < 0.45; // Use 0.45 as threshold

      console.log(
        `BG Color: ${bgColor}, Luminance: ${bgLuminance.toFixed(3)}, Is Dark: ${bgIsDark}`
      );

      // For dark backgrounds, we want light text (50, 100, 200)
      // For light backgrounds, we want dark text (700, 800, 900)
      if (bgIsDark) {
        // Dark background - use light text
        for (const preferredShade of ["50", "100", "200"]) {
          if (textPalette[preferredShade]) {
            console.log(`Dark background - using light text shade: ${preferredShade}`);
            return preferredShade;
          }
        }
        // Fallback to lightest available shade
        const lightestShade = shades[0];
        console.log(`Dark background - fallback to lightest available: ${lightestShade}`);
        return lightestShade;
      } else {
        // Light background - use dark text
        for (const preferredShade of ["900", "800", "700"]) {
          if (textPalette[preferredShade]) {
            console.log(`Light background - using dark text shade: ${preferredShade}`);
            return preferredShade;
          }
        }
        // Fallback to darkest available shade
        const darkestShade = shades[shades.length - 1];
        console.log(`Light background - fallback to darkest available: ${darkestShade}`);
        return darkestShade;
      }
    } catch (e) {
      console.error("Error in findBestContrastShade:", e);
      return "50"; // Default fallback on error - light text is safer
    }
  }

  // Auto-suggest text shades for better contrast with the background
  useEffect(() => {
    if (autoSuggestText) {
      try {
        console.log("------------- Auto-suggesting text colors -------------");

        // Get the current gray palette from the theme
        const grayPalette = themeValues.colors?.gray || {};
        console.log("Gray palette:", grayPalette);

        // Ensure we have the actual hex values for our background colors
        const bgColorLight = colorShades[bgShadeLight];
        const bgColorDark = colorShades[bgShadeDark];

        console.log(
          `Background colors - Light: ${bgColorLight} (${bgShadeLight}), Dark: ${bgColorDark} (${bgShadeDark})`
        );

        if (bgColorLight) {
          // For light mode background, find the best contrast text color
          console.log("Finding best contrast for LIGHT MODE:", bgColorLight);
          const suggestedLightText = findBestContrastShade(bgColorLight, grayPalette);
          console.log(`Setting light mode text shade to: ${suggestedLightText}`);
          setTextShadeLight(suggestedLightText);
        }

        if (bgColorDark) {
          // For dark mode background, find the best contrast text color
          console.log("Finding best contrast for DARK MODE:", bgColorDark);
          const suggestedDarkText = findBestContrastShade(bgColorDark, grayPalette);
          console.log(`Setting dark mode text shade to: ${suggestedDarkText}`);
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
        <Heading size="xs" mb={3}>
          Settings
        </Heading>
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
              colorScheme="blue"
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
              colorScheme="blue"
            />
          </FormControl>
        </VStack>

        <Text fontSize="xs" fontWeight="medium" mb={2} mt={2}>
          Using <b>gray</b> palette for text colors
        </Text>
      </Box>

      {/* Light/Dark Mode Previews with their respective color controls */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mt={4}>
        {/* Light Mode Column */}
        <Box>
          {/* Light Mode Color Controls */}
          <Box mb={3}>
            <Text fontSize="xs" fontWeight="bold" color="blue.500" mb={1}>
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
                    borderColor={bgShadeLight === shade ? "blue.500" : "transparent"}
                    cursor="pointer"
                    _hover={{ transform: "scale(1.1)" }}
                    transition="all 0.2s"
                    title={`Shade ${shade}`}
                  />
                ))}
            </Flex>

            <Flex align="center">
              <Text fontSize="xs" fontWeight="bold" color="blue.500" mb={1}>
                Text: gray.{textShadeLight}
              </Text>
              {autoSuggestText && (
                <Badge ml={2} colorScheme="green" variant="outline" fontSize="9px" mb={1}>
                  Auto
                </Badge>
              )}
            </Flex>
            <Flex gap={1} flexWrap="wrap">
              {Object.keys(textPalette)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(shade => (
                  <Box
                    key={shade}
                    onClick={() => !autoSuggestText && setTextShadeLight(shade)}
                    bg={textPalette[shade]}
                    w="22px"
                    h="22px"
                    borderRadius="sm"
                    borderWidth="2px"
                    borderColor={textShadeLight === shade ? "blue.500" : "transparent"}
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
            <Box p={4} bg={bgColorLight} color={textColorLight}>
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
                borderColor={textColorLight}
                color={textColorLight}
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
              <Text fontSize="xs" fontWeight="bold" color="blue.500" mb={1}>
                Background: {colorKey}.{bgShadeDark}
              </Text>
              {autoSuggestDark && (
                <Badge ml={2} colorScheme="blue" variant="outline" fontSize="9px" mb={1}>
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
                    borderColor={bgShadeDark === shade ? "blue.500" : "transparent"}
                    cursor={autoSuggestDark ? "not-allowed" : "pointer"}
                    opacity={autoSuggestDark ? 0.7 : 1}
                    _hover={{ transform: autoSuggestDark ? "none" : "scale(1.1)" }}
                    transition="all 0.2s"
                    title={autoSuggestDark ? `Auto-selected: ${shade}` : `Shade ${shade}`}
                  />
                ))}
            </Flex>

            <Flex align="center">
              <Text fontSize="xs" fontWeight="bold" color="blue.500" mb={1}>
                Text: gray.{textShadeDark}
              </Text>
              {autoSuggestText && (
                <Badge ml={2} colorScheme="green" variant="outline" fontSize="9px" mb={1}>
                  Auto
                </Badge>
              )}
            </Flex>
            <Flex gap={1} flexWrap="wrap">
              {Object.keys(textPalette)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(shade => (
                  <Box
                    key={shade}
                    onClick={() => !autoSuggestText && setTextShadeDark(shade)}
                    bg={textPalette[shade]}
                    w="22px"
                    h="22px"
                    borderRadius="sm"
                    borderWidth="2px"
                    borderColor={textShadeDark === shade ? "blue.500" : "transparent"}
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
            <Box py={2} px={3} bg="gray.800" color="white" borderBottomWidth="1px">
              <Text fontWeight="medium" fontSize="sm">
                Dark Mode
              </Text>
            </Box>
            <Box p={4} bg={bgColorDark} color={textColorDark}>
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
                borderColor={textColorDark}
                color={textColorDark}
              >
                Button
              </Button>
            </Box>
            <Box py={2} px={3} bg="gray.800" color="white" borderTopWidth="1px">
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
            icon={<Copy size={14} />}
            aria-label="Copy code"
            size="xs"
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
