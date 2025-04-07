import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { panelBackground, backgroundLight } from "@/theme/themeConfiguration";
import ShadeSelector from "./ShadeSelector";
import PreviewSection from "./PreviewSection";
import ContrastIndicator from "./ContrastIndicator";

interface ColorModePanelProps {
  mode: "light" | "dark";
  colorKey: string;
  colorShades: Record<string, string>;
  selectedBgShade: string;
  textColorKey: string;
  textShades: Record<string, string>;
  selectedTextShade: string;
  contrastRatio: number;
  onBgShadeChange: (shade: string) => void;
  onTextShadeChange: (shade: string) => void;
  bgDisabled?: boolean;
  textDisabled?: boolean;
  bgAutoSelected?: boolean;
  textAutoSelected?: boolean;
}

/**
 * Panel for a specific color mode (light or dark)
 */
export const ColorModePanel: React.FC<ColorModePanelProps> = ({
  mode,
  colorKey,
  colorShades,
  selectedBgShade,
  textColorKey,
  textShades,
  selectedTextShade,
  contrastRatio,
  onBgShadeChange,
  onTextShadeChange,
  bgDisabled = false,
  textDisabled = false,
  bgAutoSelected = false,
  textAutoSelected = false,
}) => {
  const panelBgValue = useColorModeValue(panelBackground.light, panelBackground.dark);
  const headerBgValue = useColorModeValue(
    mode === "light" ? panelBgValue : backgroundLight.light,
    mode === "dark" ? panelBgValue : backgroundLight.dark
  );

  // Get actual colors from shade keys
  const bgColor = colorShades[selectedBgShade] || "#FFFFFF";
  const textColor = textShades[selectedTextShade] || "#000000";

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <Box py={2} px={3} bg={headerBgValue} borderBottomWidth="1px">
        <Text fontWeight="medium" fontSize="sm">
          {mode === "light" ? "Light Mode" : "Dark Mode"}
        </Text>
      </Box>

      {/* Color selectors */}
      <Box p={3}>
        <ShadeSelector
          label={`Background: ${colorKey}`}
          shades={colorShades}
          selectedShade={selectedBgShade}
          onShadeChange={onBgShadeChange}
          disabled={bgDisabled}
          autoSelected={bgAutoSelected}
        />

        <ShadeSelector
          label={`Text: ${textColorKey}`}
          shades={textShades}
          selectedShade={selectedTextShade}
          onShadeChange={onTextShadeChange}
          disabled={textDisabled}
          autoSelected={textAutoSelected}
        />
      </Box>

      {/* Preview section */}
      <PreviewSection
        backgroundColor={bgColor}
        textColor={textColor}
        colorLabel={`${colorKey}.${selectedBgShade}`}
        textLabel={`${textColorKey}.${selectedTextShade}`}
        mode={mode}
      />

      {/* Contrast indicator */}
      <Box py={2} px={3} bg={headerBgValue} borderTopWidth="1px">
        <ContrastIndicator contrastRatio={contrastRatio} />
      </Box>
    </Box>
  );
};

export default ColorModePanel;
