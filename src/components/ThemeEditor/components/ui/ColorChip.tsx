import { Box, Tooltip } from "@chakra-ui/react";
import React from "react";

export interface ColorChipProps {
  color: string;
  size?: string;
  label?: string;
  onClick?: () => void;
  showTooltip?: boolean;
}

/**
 * A reusable color chip component that displays a color swatch
 * with optional tooltip and click handler.
 */
export const ColorChip: React.FC<ColorChipProps> = ({
  color,
  size = "80px",
  label,
  onClick,
  showTooltip = true,
}) => {
  const colorBox = (
    <Box
      width={size}
      height={size}
      bg={color}
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="sm"
      boxShadow="md"
      cursor={onClick ? "pointer" : "default"}
      transition="transform 0.2s"
      _hover={onClick ? { transform: "scale(1.05)" } : undefined}
      onClick={onClick}
    />
  );

  // If tooltip is disabled or no label provided, return just the color box
  if (!showTooltip || !label) {
    return colorBox;
  }

  // Return color box with tooltip
  return (
    <Tooltip label={label || color} placement="top">
      {colorBox}
    </Tooltip>
  );
};

export default ColorChip;
