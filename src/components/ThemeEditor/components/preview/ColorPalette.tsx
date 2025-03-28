import React, { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ThemeValues } from "@/types";
import { PaletteShade } from "@/components/ThemeEditor/components";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ColorPaletteProps {
  colorKey: string;
  themeValues: ThemeValues;
  copiedValue: string | null;
  onCopy: (value: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colorKey,
  themeValues,
  copiedValue, // kept for compatibility but not used directly
  onCopy,
}) => {
  const { trackColorAction } = useAnalytics();
  const [selectedShade, setSelectedShade] = useState<string | null>(null);

  // Create a click handler for the PaletteShade component
  const handleShadeClick = (shade: string, color: string) => {
    setSelectedShade(prevShade => (prevShade === shade ? null : shade));
    
    // Track the selection action
    if (selectedShade !== shade) {
      trackColorAction("select_shade", `${colorKey}.${shade}`);
    }
    
    // Copy the color to clipboard when selected
    onCopy(color);
  };

  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={4}>
      {Object.entries(themeValues.colors[colorKey])
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([shade, colorValue]) => (
          <Box 
            key={shade} 
            onClick={() => handleShadeClick(shade, colorValue as string)}
            cursor="pointer"
          >
            <PaletteShade
              colorKey={colorKey}
              shade={shade}
              color={colorValue as string}
              isSelected={selectedShade === shade}
            />
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default ColorPalette;