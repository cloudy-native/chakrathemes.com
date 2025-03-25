import React from "react";
import { Box, Text, Flex, HStack, SimpleGrid, VStack, useColorModeValue } from "@chakra-ui/react";
import { ColorSwatch as ColorSwatchType } from "@/types";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import ThemeColorSwatch from "./ThemeColorSwatch";
import { PaletteShade } from "./PaletteShade";

interface ColorSwatchProps {
  colorSwatch: ColorSwatchType;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorSwatch, isOpen, toggleOpen }) => {
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
