import React, { useEffect, useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { useColorSuggestion, useContrastCalculation } from "./hooks";
import { ColorModePanel, ColorModeToggle, CodeGenerator } from "./components";

// Gray palette for text colors
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

/**
 * Main component for exploring color contrast in both light and dark modes
 */
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
  const [textColorKey] = useState("gray");
  const [textShadeLight, setTextShadeLight] = useState("800"); // Default to dark text on light bg
  const [textShadeDark, setTextShadeDark] = useState("100"); // Default to light text on dark bg
  const [autoSuggestText, setAutoSuggestText] = useState(true);

  // Get current palette colors
  const bgPalette = palettes.find(p => p.colorKey === bgColorKey)?.colorShades || {};

  const bgColorLight = bgPalette[bgShadeLight] || "#FFFFFF";
  const bgColorDark = bgPalette[bgShadeDark] || "#1A202C";
  const textColorLight = grayPalette[textShadeLight] || "#1A202C";
  const textColorDark = grayPalette[textShadeDark] || "#FFFFFF";

  // Custom hooks for color suggestion and contrast calculation
  useColorSuggestion(
    autoSuggestDark,
    autoSuggestText,
    bgShadeLight,
    setBgShadeDark,
    bgPalette,
    grayPalette,
    setTextShadeLight,
    setTextShadeDark
  );

  const { lightContrast, darkContrast } = useContrastCalculation(
    bgColorLight,
    bgColorDark,
    textColorLight,
    textColorDark
  );

  // Track explorer loaded
  useEffect(() => {
    trackFeature("contrast_explorer", "loaded");
  }, [trackFeature]);

  // Event handlers for color changes
  const _handleBgColorChange = (newBgColorKey: string) => {
    setBgColorKey(newBgColorKey);
    trackColorAction("change_contrast_bg_palette", newBgColorKey);
  };

  const handleBgShadeLightChange = (shade: string) => {
    setBgShadeLight(shade);
    trackColorAction("change_contrast_light_shade", `${bgColorKey}.${shade}`);
  };

  const handleBgShadeDarkChange = (shade: string) => {
    setBgShadeDark(shade);
    trackColorAction("change_contrast_dark_shade", `${bgColorKey}.${shade}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
      <Heading size="md" mb={4}>
        Color Contrast Explorer
      </Heading>

      {/* Color mode toggles */}
      <ColorModeToggle
        autoSuggestDark={autoSuggestDark}
        setAutoSuggestDark={setAutoSuggestDark}
        autoSuggestText={autoSuggestText}
        setAutoSuggestText={setAutoSuggestText}
        trackAction={trackColorAction}
      />

      {/* Split view panels for light and dark mode */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {/* Light Mode Panel */}
        <ColorModePanel
          mode="light"
          colorKey={bgColorKey}
          colorShades={bgPalette}
          selectedBgShade={bgShadeLight}
          textColorKey={textColorKey}
          textShades={grayPalette}
          selectedTextShade={textShadeLight}
          contrastRatio={lightContrast}
          onBgShadeChange={handleBgShadeLightChange}
          onTextShadeChange={setTextShadeLight}
          textDisabled={autoSuggestText}
          textAutoSelected={autoSuggestText}
        />

        {/* Dark Mode Panel */}
        <ColorModePanel
          mode="dark"
          colorKey={bgColorKey}
          colorShades={bgPalette}
          selectedBgShade={bgShadeDark}
          textColorKey={textColorKey}
          textShades={grayPalette}
          selectedTextShade={textShadeDark}
          contrastRatio={darkContrast}
          onBgShadeChange={handleBgShadeDarkChange}
          onTextShadeChange={setTextShadeDark}
          bgDisabled={autoSuggestDark}
          textDisabled={autoSuggestText}
          bgAutoSelected={autoSuggestDark}
          textAutoSelected={autoSuggestText}
        />
      </Grid>

      {/* Code Generation */}
      <Box mt={6}>
        <CodeGenerator
          bgColorKey={bgColorKey}
          bgShadeLight={bgShadeLight}
          bgShadeDark={bgShadeDark}
          textColorKey={textColorKey}
          textShadeLight={textShadeLight}
          textShadeDark={textShadeDark}
          trackCopy={trackColorAction}
        />
      </Box>
    </Box>
  );
};

/**
 * A streamlined version specifically for embedding in palette panels
 */
interface PaletteColorContrastProps {
  colorKey: string;
  colorShades: Record<string, string>;
}

export const PaletteColorContrast: React.FC<PaletteColorContrastProps> = ({
  colorKey,
  colorShades,
}) => {
  const { trackColorAction, trackFeature } = useAnalytics();

  // State for selected shades
  const [bgShadeLight, setBgShadeLight] = useState("50");
  const [bgShadeDark, setBgShadeDark] = useState("800");
  const [textShadeLight, setTextShadeLight] = useState("800");
  const [textShadeDark, setTextShadeDark] = useState("100");
  const [autoSuggestDark, setAutoSuggestDark] = useState(true);
  const [autoSuggestText, setAutoSuggestText] = useState(true);

  // Always use gray for text
  const textColorKey = "gray";

  // Get colors
  const bgColorLight = colorShades[bgShadeLight] || "#FFFFFF";
  const bgColorDark = colorShades[bgShadeDark] || "#1A202C";
  const textColorLight = grayPalette[textShadeLight] || "#1A202C";
  const textColorDark = grayPalette[textShadeDark] || "#FFFFFF";

  // Custom hooks for color suggestion and contrast calculation
  useColorSuggestion(
    autoSuggestDark,
    autoSuggestText,
    bgShadeLight,
    setBgShadeDark,
    colorShades,
    grayPalette,
    setTextShadeLight,
    setTextShadeDark
  );

  const { lightContrast, darkContrast } = useContrastCalculation(
    bgColorLight,
    bgColorDark,
    textColorLight,
    textColorDark
  );

  // Track component loaded
  useEffect(() => {
    trackFeature("contrast_explorer", "palette_contrast_loaded");
    trackColorAction("view_palette_contrast", colorKey);
  }, [trackFeature, trackColorAction, colorKey]);

  return (
    <Box mt={4} borderWidth="1px" borderRadius="md" p={4}>
      <Heading size="sm" mb={4}>
        Color Contrast Explorer for {colorKey}
      </Heading>

      {/* Color mode toggles */}
      <ColorModeToggle
        autoSuggestDark={autoSuggestDark}
        setAutoSuggestDark={setAutoSuggestDark}
        autoSuggestText={autoSuggestText}
        setAutoSuggestText={setAutoSuggestText}
        trackAction={trackColorAction}
        colorKey={colorKey}
      />

      {/* Light/Dark Mode Previews */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mt={4}>
        {/* Light Mode Panel */}
        <ColorModePanel
          mode="light"
          colorKey={colorKey}
          colorShades={colorShades}
          selectedBgShade={bgShadeLight}
          textColorKey={textColorKey}
          textShades={grayPalette}
          selectedTextShade={textShadeLight}
          contrastRatio={lightContrast}
          onBgShadeChange={setBgShadeLight}
          onTextShadeChange={setTextShadeLight}
          textDisabled={autoSuggestText}
          textAutoSelected={autoSuggestText}
        />

        {/* Dark Mode Panel */}
        <ColorModePanel
          mode="dark"
          colorKey={colorKey}
          colorShades={colorShades}
          selectedBgShade={bgShadeDark}
          textColorKey={textColorKey}
          textShades={grayPalette}
          selectedTextShade={textShadeDark}
          contrastRatio={darkContrast}
          onBgShadeChange={setBgShadeDark}
          onTextShadeChange={setTextShadeDark}
          bgDisabled={autoSuggestDark}
          textDisabled={autoSuggestText}
          bgAutoSelected={autoSuggestDark}
          textAutoSelected={autoSuggestText}
        />
      </Grid>

      {/* Code Generation */}
      <Box mt={4}>
        <CodeGenerator
          bgColorKey={colorKey}
          bgShadeLight={bgShadeLight}
          bgShadeDark={bgShadeDark}
          textColorKey={textColorKey}
          textShadeLight={textShadeLight}
          textShadeDark={textShadeDark}
          trackCopy={trackColorAction}
        />
      </Box>
    </Box>
  );
};

export default ColorContrastExplorer;
