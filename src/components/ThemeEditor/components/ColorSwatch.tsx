import React from "react";
import { Box, Text, Flex, HStack, SimpleGrid, VStack, useColorModeValue } from "@chakra-ui/react";
import { ColorSwatch as ColorSwatchType } from "@/types";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import ThemeColorSwatch from "./ThemeColorSwatch";
import { PaletteShade } from "./PaletteShade";

// Simple color swatch component for use in dialogs, tooltips, etc.
interface BasicColorSwatchProps {
  color: string;
  size?: "xs" | "sm" | "md" | "lg";
  borderRadius?: string;
  mr?: number;
  ml?: number;
}

export const ColorSwatch: React.FC<BasicColorSwatchProps> = ({ 
  color, 
  size = "md", 
  borderRadius = "md",
  mr,
  ml
}) => {
  // Size mapping
  const sizeMap = {
    xs: "16px",
    sm: "24px",
    md: "32px",
    lg: "40px"
  };
  
  const dimension = sizeMap[size];
  
  return (
    <Box 
      w={dimension} 
      h={dimension} 
      bg={color} 
      borderRadius={borderRadius}
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      mr={mr}
      ml={ml}
    />
  );
};

// Expanded color swatch component (original implementation)
interface ExpandableColorSwatchProps {
  colorSwatch: ColorSwatchType;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ExpandableColorSwatch: React.FC<ExpandableColorSwatchProps> = ({ 
  colorSwatch, 
  isOpen, 
  toggleOpen 
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  return (
    <VStack spacing={0} align="stretch">
      <Box
        as="button"
        onClick={toggleOpen}
        width="full"
        textAlign="left"
        py={3}
        px={4}
        display="flex"
        alignItems="center"
        bg={bgColor}
        _hover={{ bg: hoverBgColor }}
        transition="all 0.2s"
        borderTopRadius="md"
        borderBottomRadius={isOpen ? "none" : "md"}
      >
        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="medium">{colorSwatch.colorKey}</Text>
            {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
          </Flex>
          <HStack spacing={3} mt={2}>
            {/* Color swatch preview */}
            <Box flex={1}>
              <ThemeColorSwatch
                colorKey={colorSwatch.colorKey}
                colorShades={colorSwatch.colorShades}
                isCompact={true}
                size="lg"
              />
            </Box>
          </HStack>
        </Box>
      </Box>

      {/* Expanded content - Paint Chip Style */}
      {isOpen && (
        <Box
          p={4}
          bg={useColorModeValue("white", "gray.800")}
          borderWidth="1px"
          borderColor={borderColor}
          borderBottomRadius="md"
        >
          <SimpleGrid columns={{ base: 2, sm: 5 }} spacing={4} maxWidth="100%">
            {Object.entries(colorSwatch.colorShades)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([shade, color]) => (
                <PaletteShade
                  key={shade}
                  colorKey={colorSwatch.colorKey}
                  shade={shade}
                  color={color as string}
                />
              ))}
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
};

export default ColorSwatch;