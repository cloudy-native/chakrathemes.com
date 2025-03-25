import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ThemeValues } from "@/types";
import { PaletteShade } from "@/components/ThemeEditor/components";

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
  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={6}>
      {Object.entries(themeValues.colors[colorKey])
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([shade, colorValue]) => (
          <PaletteShade
            key={shade}
            colorKey={colorKey}
            shade={shade}
            color={colorValue as string}
            // PaletteShade has its own copy functionality
          />
        ))}
    </SimpleGrid>
  );
};

export default ColorPalette;
