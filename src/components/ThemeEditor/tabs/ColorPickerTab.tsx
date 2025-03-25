import { useThemeContext } from "@/context/ThemeContext";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ColorInput from "@/components/ThemeEditor/components/ColorInput";
import { ExpandableColorSwatch } from "@/components/ThemeEditor/components/ColorSwatch";
import PaletteGenerator from "@/components/ThemeEditor/components/PaletteGenerator";
import PalettePreview from "@/components/ThemeEditor/components/PalettePreview";
import { generateColorPalette } from "@/utils/colorUtils";

export const ColorPickerTab: React.FC = () => {
  const {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    updateColorPalette,
    updateColorValue,
    getColors,
  } = useThemeContext();

  const colors = getColors();
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

  // Track the current input values
  const [inputValues, setInputValues] = useState<{
    [key: string]: string;
  }>(() => {
    // Initialize with current 500 colors
    const initialValues: { [key: string]: string } = {};
    colors.forEach(colorSwatch => {
      initialValues[colorSwatch.colorKey] = colorSwatch.colorShades["500"] || "#000000";
    });
    return initialValues;
  });

  // Effect to update inputValues when colors change
  useEffect(() => {
    const newValues: { [key: string]: string } = {};
    colors.forEach(colorSwatch => {
      newValues[colorSwatch.colorKey] = colorSwatch.colorShades["500"] || "#000000";
    });
    setInputValues(prevValues => ({
      ...prevValues,
      ...newValues,
    }));
  }, [colors]);

  const toggleColorSwatch = (colorKey: string) => {
    setOpenColorSwatches(prev => ({
      ...prev,
      [colorKey]: !prev[colorKey],
    }));
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Add new color palette */}
      <Box borderWidth="1px" borderRadius="md" p={4}>
        <PaletteGenerator baseColor={baseColor} setBaseColor={setBaseColor} />

        {/* Preview of the generated palette */}
        {baseColor && (
          <Box mt={4}>
            <PalettePreview
              palette={generateColorPalette(baseColor)}
              label="Preview of generated palette:"
            />
          </Box>
        )}

        {/* Color Name Input */}
        <FormControl mt={4}>
          <FormLabel>Palette Name</FormLabel>
          <Input
            value={newColorName}
            onChange={e => setNewColorName(e.target.value)}
            placeholder="primary, accent, brand, etc."
          />
        </FormControl>

        {/* Generate Button */}
        <Box mt={4} textAlign="right">
          <Button
            onClick={addNewColorPalette}
            disabled={!baseColor || !newColorName}
            colorScheme="blue"
          >
            Add to Theme
          </Button>
        </Box>
      </Box>

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
          <ExpandableColorSwatch
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
            <Box mb={4} p={3} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md">
              <FormLabel mb={2}>Regenerate Entire Palette</FormLabel>
              <HStack>
                <InputGroup size="sm">
                  <Input
                    type="text"
                    placeholder="Base color (hex)"
                    value={
                      inputValues[colorSwatch.colorKey] ||
                      colorSwatch.colorShades["500"] ||
                      "#000000"
                    }
                    onChange={e => {
                      // Update input state
                      const newColor = e.target.value;
                      setInputValues(prev => ({
                        ...prev,
                        [colorSwatch.colorKey]: newColor,
                      }));

                      // Only update the palette if it's a valid hex color
                      if (newColor.match(/^#([0-9A-F]{3}){1,2}$/i)) {
                        updateColorPalette(colorSwatch.colorKey, newColor);
                      }
                    }}
                  />
                  <InputRightElement width="3.5rem">
                    <input
                      type="color"
                      value={
                        inputValues[colorSwatch.colorKey] ||
                        colorSwatch.colorShades["500"] ||
                        "#000000"
                      }
                      onChange={e => {
                        const newColor = e.target.value;

                        // Update the state with the new color
                        setInputValues(prev => ({
                          ...prev,
                          [colorSwatch.colorKey]: newColor,
                        }));

                        // Immediately update the palette with the new color
                        updateColorPalette(colorSwatch.colorKey, newColor);
                      }}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </InputRightElement>
                </InputGroup>
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
                    onChange={value => updateColorValue(colorSwatch.colorKey, shade, value)}
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
