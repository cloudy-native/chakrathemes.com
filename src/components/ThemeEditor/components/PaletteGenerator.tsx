import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";

interface PaletteGeneratorProps {
  baseColor: string;
  setBaseColor: (color: string) => void;
}

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({ baseColor, setBaseColor }) => {
  // Local state for the hex input field
  const [hexInput, setHexInput] = useState(baseColor || "#3182CE");

  // Initialize color picker with the base color
  const [color, setColor] = useColor(baseColor || "#3182CE");

  // Background colors for light/dark modes
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const colorPickerBg = useColorModeValue("white", "gray.700");

  // Update the hex input and parent component when color changes
  useEffect(() => {
    setHexInput(color.hex);
    setBaseColor(color.hex);
  }, [color, setBaseColor]);

  // Update color when hex input changes
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    // Only update color if it's a valid hex
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      // Use ColorService.toHex from the library to create a proper color object
      // This is implicit in the useColor hook, but we need to create it manually here
      setColor(prevColor => ({
        ...prevColor,
        hex: value,
      }));
      setBaseColor(value);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor} bg={bgColor}>
      <Text fontWeight="bold" mb={4}>
        Generate New Color Palette
      </Text>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Color Picker</Tab>
          <Tab>Hex Input</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={4}>
            <Box
              bg={colorPickerBg}
              p={4}
              borderRadius="md"
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                ".rcp-root": {
                  width: "100%",
                  maxWidth: "400px",
                  margin: "0 auto",
                },
                ".rcp-saturation": {
                  borderRadius: "md",
                  marginBottom: 4,
                },
                ".rcp-hue": {
                  borderRadius: "md",
                  height: "16px",
                  marginBottom: 4,
                },
                ".rcp-fields-element": {
                  border: "1px solid",
                  borderColor,
                  borderRadius: "md",
                  bg: bgColor,
                },
              }}
            >
              <ColorPicker color={color} onChange={setColor} hideInput={[]} />
            </Box>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Hex Color Value</FormLabel>
                <Input
                  value={hexInput}
                  onChange={handleHexChange}
                  placeholder="#3182CE"
                  isInvalid={
                    !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexInput) && hexInput.length > 0
                  }
                />
              </FormControl>

              <Box>
                <Text fontSize="sm" mb={2}>
                  Common Colors:
                </Text>
                <HStack spacing={2} wrap="wrap">
                  {[
                    "#3182CE", // Blue
                    "#38A169", // Green
                    "#E53E3E", // Red
                    "#805AD5", // Purple
                    "#DD6B20", // Orange
                    "#D69E2E", // Yellow
                    "#00B5D8", // Cyan
                    "#F56565", // Pink
                    "#2D3748", // Gray
                    "#000000", // Black
                  ].map((colorHex, idx) => (
                    <Box
                      key={idx}
                      w="30px"
                      h="30px"
                      bg={colorHex}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => {
                        setHexInput(colorHex);
                        setColor(prevColor => ({ ...prevColor, hex: colorHex }));
                        setBaseColor(colorHex);
                      }}
                      border="1px solid"
                      borderColor={borderColor}
                      _hover={{ transform: "scale(1.1)", transition: "transform 0.2s" }}
                    />
                  ))}
                </HStack>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PaletteGenerator;
