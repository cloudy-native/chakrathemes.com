import React from "react";
import { Flex, Text, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import {
  successColor,
  successBackground,
  errorColor,
  errorBackground,
} from "@/theme/themeConfiguration";
import { passesWCAGAA, passesWCAGAALarge, passesWCAGAAA } from "../utils/contrastUtils";

interface ContrastIndicatorProps {
  contrastRatio: number;
  showDetailed?: boolean;
}

/**
 * Component to display contrast ratios with WCAG compliance badges
 */
export const ContrastIndicator: React.FC<ContrastIndicatorProps> = ({
  contrastRatio,
  showDetailed = false,
}) => {
  const successColorValue = useColorModeValue(successColor.light, successColor.dark);
  const successBgValue = useColorModeValue(successBackground.light, successBackground.dark);
  const errorColorValue = useColorModeValue(errorColor.light, errorColor.dark);
  const errorBgValue = useColorModeValue(errorBackground.light, errorBackground.dark);

  const wcagAA = passesWCAGAA(contrastRatio);
  const wcagAALarge = passesWCAGAALarge(contrastRatio);
  const wcagAAA = passesWCAGAAA(contrastRatio);

  // Simplified version
  if (!showDetailed) {
    return (
      <Flex justify="space-between" align="center">
        <Text fontSize="xs">Contrast: {contrastRatio.toFixed(2)}:1</Text>
        <Badge
          size="sm"
          bg={wcagAA ? successBgValue : errorBgValue}
          color={wcagAA ? successColorValue : errorColorValue}
        >
          WCAG {wcagAA ? "AA ✓" : "AA ✗"}
        </Badge>
      </Flex>
    );
  }

  // Detailed version with all compliance levels
  return (
    <Flex align="center" justify="space-between" p={2} borderRadius="md" borderWidth="1px">
      <Text>Contrast Ratio: {contrastRatio.toFixed(2)}:1</Text>
      <Flex>
        <Badge colorScheme={wcagAALarge ? "green" : "red"} mr={1}>
          AA Large {wcagAALarge ? "✓" : "✗"}
        </Badge>
        <Badge colorScheme={wcagAA ? "green" : "red"} mr={1}>
          AA {wcagAA ? "✓" : "✗"}
        </Badge>
        <Badge colorScheme={wcagAAA ? "green" : "primary"}>AAA {wcagAAA ? "✓" : "✗"}</Badge>
      </Flex>
    </Flex>
  );
};

export default ContrastIndicator;
