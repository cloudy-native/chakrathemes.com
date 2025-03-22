import {
  Box,
  Button,
  Divider,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ColorInput from "../components/ColorInput";
import ColorSwatch from "../components/ColorSwatch";
import PaletteGenerator from "../components/PaletteGenerator";
import { ColorSwatch as ColorSwatchType } from "../utils/colorUtils";

interface ColorPickerTabProps {
  newColorName: string;
  setNewColorName: (name: string) => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  addNewColorPalette: () => void;
  updateColorPalette: (colorKey: string, newBaseColor: string) => void;
  updateColorValue: (
    colorCategory: string,
    shade: string,
    value: string
  ) => void;
  colors: ColorSwatchType[];
}

export const ColorPickerTab: React.FC<ColorPickerTabProps> = ({
  newColorName,
  setNewColorName,
  baseColor,
  setBaseColor,
  addNewColorPalette,
  updateColorPalette,
  updateColorValue,
  colors,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  // Initialize with first color swatch open
  const [openColorSwatches, setOpenColorSwatches] = useState<{
    [key: string]: boolean;
  }>(() => {
    // Default to first color being open if colors exist
    if (colors.length > 0) {
      return { [colors[0].colorKey]: true };
    }
    return {};
  });

  const toggleColorSwatch = (colorKey: string) => {
    setOpenColorSwatches((prev) => ({
      ...prev,
      [colorKey]: !prev[colorKey],
    }));
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Add new color palette */}
      <PaletteGenerator
        colorName={newColorName}
        setColorName={setNewColorName}
        baseColor={baseColor}
        setBaseColor={setBaseColor}
        onGenerate={addNewColorPalette}
      />

      <Divider />

      {/* Existing color palettes */}
      {colors.map((colorSwatch, idx) => (
        <Box
          key={idx}
          borderWidth="1px"
          borderRadius="md"
          borderColor={borderColor}
          overflow="hidden"
        >
          <ColorSwatch
            colorSwatch={colorSwatch}
            isOpen={
              openColorSwatches[colorSwatch.colorKey] !== undefined
                ? openColorSwatches[colorSwatch.colorKey]
                : idx === 0
            }
            toggleOpen={() => toggleColorSwatch(colorSwatch.colorKey)}
          />

          {/* Accordion Content */}
          <Box
            p={4}
            style={{
              display: (
                openColorSwatches[colorSwatch.colorKey] !== undefined
                  ? openColorSwatches[colorSwatch.colorKey]
                  : idx === 0
              )
                ? "block"
                : "none",
            }}
          >
            {/* Auto-generate button */}
            <Box
              mb={4}
              p={3}
              bg={useColorModeValue("gray.50", "gray.700")}
              borderRadius="md"
            >
              <FormLabel mb={2}>Regenerate Entire Palette</FormLabel>
              <HStack>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    placeholder="Base color (hex)"
                    defaultValue={colorSwatch.colorShades["500"] || "#000000"}
                    id={`base-color-${colorSwatch.colorKey}`}
                  />
                  <InputRightElement width="2.5rem">
                    <input
                      type="color"
                      value={colorSwatch.colorShades["500"] || "#000000"}
                      onChange={(e) => {
                        const input = document.getElementById(
                          `base-color-${colorSwatch.colorKey}`
                        ) as HTMLInputElement;
                        if (input) input.value = e.target.value;
                      }}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </InputRightElement>
                </InputGroup>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => {
                    const input = document.getElementById(
                      `base-color-${colorSwatch.colorKey}`
                    ) as HTMLInputElement;
                    if (input)
                      updateColorPalette(colorSwatch.colorKey, input.value);
                  }}
                >
                  Generate
                </Button>
              </HStack>
            </Box>

            {/* Individual color shades */}
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {Object.entries(colorSwatch.colorShades)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([shade, colorValue]) => (
                  <ColorInput
                    key={shade}
                    label={shade}
                    value={colorValue as string}
                    onChange={(value) =>
                      updateColorValue(colorSwatch.colorKey, shade, value)
                    }
                  />
                ))}
            </SimpleGrid>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default ColorPickerTab;
