import React from "react";
import { Box, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { borderLight, primaryAccent } from "@/theme/themeConfiguration";
import ColorTooltip from "./ColorTooltip";

interface ColorShades {
  [key: string]: string;
}

interface ThemeColorSwatchProps {
  colorKey: string;
  colorShades: ColorShades;
  onClick?: (colorKey: string, shade: string, color: string) => void;
  isCompact?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  selected?: { colorKey: string; shade: string } | null;
}

/**
 * A consistent component for displaying theme color swatches throughout the application
 */
export const ThemeColorSwatch: React.FC<ThemeColorSwatchProps> = ({
  colorKey,
  colorShades,
  onClick,
  isCompact = false,
  size = "md",
  selected = null,
}) => {
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const highlightColor = useColorModeValue(primaryAccent.light, primaryAccent.dark);

  // Sort shades by numeric value
  const sortedShades = Object.entries(colorShades).sort(([a], [b]) => parseInt(a) - parseInt(b));

  if (isCompact) {
    // Compact display (single row)
    return (
      <Flex borderRadius="md" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
        {sortedShades.map(([shade, color]) => {
          const isSelected = selected && selected.colorKey === colorKey && selected.shade === shade;

          return (
            <Box
              key={shade}
              onClick={onClick ? () => onClick(colorKey, shade, color as string) : undefined}
              cursor={onClick ? "pointer" : "default"}
              flex={1}
              position="relative"
              borderWidth={isSelected ? "2px" : "0"}
              borderColor={isSelected ? highlightColor : "transparent"}
              zIndex={isSelected ? 1 : 0}
            >
              <ColorTooltip color={color as string} label={`${colorKey} ${shade}`} size={size} />
            </Box>
          );
        })}
      </Flex>
    );
  }

  // Grid display
  return (
    <SimpleGrid columns={{ base: 5, md: 10 }} spacing={1}>
      {sortedShades.map(([shade, color]) => {
        const isSelected = selected && selected.colorKey === colorKey && selected.shade === shade;

        return (
          <Box
            key={shade}
            onClick={onClick ? () => onClick(colorKey, shade, color as string) : undefined}
            cursor={onClick ? "pointer" : "default"}
            borderWidth={isSelected ? "2px" : "0"}
            borderColor={isSelected ? highlightColor : "transparent"}
            borderRadius="sm"
            overflow="hidden"
            position="relative"
            zIndex={isSelected ? 1 : 0}
          >
            <ColorTooltip color={color as string} label={`${colorKey} ${shade}`} size={size} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default ThemeColorSwatch;
