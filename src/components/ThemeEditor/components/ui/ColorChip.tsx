import React from "react";
import { Box, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { borderLight } from "@/theme/themeConfiguration";

export interface ColorChipProps {
  color: string;
  size?: string;
  label?: string;
  showTooltip?: boolean;
  onClick?: () => void;
  borderRadius?: string;
  isSelected?: boolean;
  flex?: number;
}

/**
 * A reusable color chip component that displays a color swatch
 * with optional tooltip and click handler.
 */
export const ColorChip: React.FC<ColorChipProps> = ({
  color,
  size = "40px",
  label,
  showTooltip = true,
  onClick,
  borderRadius = "sm",
  isSelected = false,
  flex,
}) => {
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const displayLabel = label || color;

  const colorBox = (
    <Box
      width={size}
      height={size}
      flex={flex}
      bg={color}
      borderWidth={isSelected ? "2px" : "1px"}
      borderColor={isSelected ? "blue.500" : borderColor}
      borderRadius={borderRadius}
      boxShadow={isSelected ? "0 0 0 2px rgba(66, 153, 225, 0.6)" : "md"}
      cursor={onClick ? "pointer" : "default"}
      transition="all 0.2s"
      _hover={{
        transform: onClick ? "scale(1.05)" : "none",
        boxShadow: onClick ? "lg" : "md",
      }}
      onClick={onClick}
    />
  );

  // Wrap with tooltip if needed
  if (showTooltip) {
    return (
      <Tooltip label={displayLabel} placement="top" hasArrow openDelay={300}>
        {colorBox}
      </Tooltip>
    );
  }

  return colorBox;
};

export default ColorChip;
