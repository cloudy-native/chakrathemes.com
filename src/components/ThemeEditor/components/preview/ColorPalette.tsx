import React from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { ThemeValues } from "../../../../types";

interface ColorPaletteProps {
  colorKey: string;
  themeValues: ThemeValues;
  copiedValue: string | null;
  onCopy: (value: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colorKey,
  themeValues,
  copiedValue,
  onCopy,
}) => {
  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={6}>
      {Object.entries(themeValues.colors[colorKey])
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([shade, colorValue]) => (
          <Box
            key={shade}
            bg="white"
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg",
            }}
          >
            <Box
              h="100px"
              bg={colorValue as string}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={parseInt(shade) > 500 ? "white" : "black"}
                textShadow="0px 0px 2px rgba(0,0,0,0.2)"
              >
                {shade}
              </Text>
            </Box>
            <Box p={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" fontFamily="monospace" color="gray.700">
                  {colorValue as string}
                </Text>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => onCopy(colorValue as string)}
                  aria-label={`Copy ${colorValue}`}
                  leftIcon={<CopyIcon />}
                >
                  {copiedValue === colorValue ? "Copied!" : ""}
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default ColorPalette;