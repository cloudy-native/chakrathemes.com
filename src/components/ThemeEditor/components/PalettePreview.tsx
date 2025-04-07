import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ThemeColorSwatch from "./ThemeColorSwatch";

interface PalettePreviewProps {
  palette: { [key: string]: string };
  label?: string;
  colorKey?: string; // Optional colorKey to use for labeling
  onClick?: (shade: string, color: string) => void;
  selectedShade?: string;
}

const PalettePreview: React.FC<PalettePreviewProps> = ({
  palette,
  label,
  colorKey = "color",
  onClick,
  selectedShade,
}) => {
  // Handler for click events if needed
  const handleClick = onClick
    ? (key: string, shade: string, color: string) => {
        onClick(shade, color);
      }
    : undefined;

  // Selected item format for ThemeColorSwatch
  const selected = selectedShade
    ? {
        colorKey: colorKey,
        shade: selectedShade,
      }
    : null;

  return (
    <Box>
      {label && (
        <Text fontSize="sm" mb={2}>
          {label}
        </Text>
      )}
      <ThemeColorSwatch
        colorKey={colorKey}
        colorShades={palette}
        onClick={handleClick}
        size="lg"
        selected={selected}
      />
    </Box>
  );
};

export default PalettePreview;
