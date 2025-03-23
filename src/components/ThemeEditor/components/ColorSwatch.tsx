import React from "react";
import { Box, Text, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import { ColorSwatch as ColorSwatchType } from "../../../types";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import ThemeColorSwatch from "./ThemeColorSwatch";

interface ColorSwatchProps {
  colorSwatch: ColorSwatchType;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colorSwatch,
  isOpen,
  toggleOpen,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="button"
      onClick={toggleOpen}
      width="full"
      textAlign="left"
      py={3}
      px={4}
      display="flex"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.700")}
      _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
      transition="all 0.2s"
    >
      <Box flex="1">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="medium">{colorSwatch.colorKey}</Text>
          {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
        </Flex>
        <HStack spacing={3}>
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
  );
};

export default ColorSwatch;
