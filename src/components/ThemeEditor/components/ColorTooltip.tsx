import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

interface ColorTooltipProps {
  color: string;
  label: string;
  size?: "xs" | "sm" | "md" | "lg";
  showTooltip?: boolean;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

/**
 * A reusable color swatch component with tooltip
 */
export const ColorTooltip: React.FC<ColorTooltipProps> = ({
  color,
  label,
  size = "md",
  showTooltip = true,
  tooltipPlacement = "top",
}) => {
  // Calculate dimensions based on size
  const dimensions = {
    xs: { height: "16px", width: "100%" },
    sm: { height: "20px", width: "100%" },
    md: { height: "24px", width: "100%" },
    lg: { height: "32px", width: "100%" },
  };

  // Calculate tooltip positioning
  const tooltipPositions = {
    top: { bottom: "120%", top: "auto" },
    bottom: { top: "120%", bottom: "auto" },
    left: { right: "120%", left: "auto", top: "50%", transform: "translateY(-50%)" },
    right: { left: "120%", right: "auto", top: "50%", transform: "translateY(-50%)" },
  };

  const tooltipPosition = tooltipPositions[tooltipPlacement];
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={color}
      height={dimensions[size].height}
      width={dimensions[size].width}
      borderRadius="sm"
      position="relative"
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        boxShadow: showTooltip ? "md" : "none",
        ...(showTooltip && {
          _after: {
            content: `"${label}: ${color}"`,
            position: "absolute",
            ...tooltipPosition,
            left: tooltipPlacement === "left" || tooltipPlacement === "right" ? "auto" : "50%",
            transform:
              tooltipPlacement === "top" || tooltipPlacement === "bottom"
                ? "translateX(-50%)"
                : tooltipPlacement === "left" || tooltipPlacement === "right"
                  ? "translateY(-50%)"
                  : "none",
            bg: "gray.700",
            color: "white",
            fontSize: "xs",
            p: 1,
            borderRadius: "sm",
            whiteSpace: "nowrap",
            zIndex: 10,
            boxShadow: "md",
          },
        }),
      }}
    />
  );
};

export default ColorTooltip;
