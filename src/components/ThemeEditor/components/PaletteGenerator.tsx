import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { generateColorPalette } from "@/utils/colorUtils";
import ThemeColorSwatch from "./ThemeColorSwatch";

interface PaletteGeneratorProps {
  baseColor: string;
  setBaseColor: (color: string) => void;
}

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({ baseColor, setBaseColor }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg={useColorModeValue("blue.50", "blue.900")}>
      <Text fontWeight="bold" mb={4}>
        Generate New Color Palette
      </Text>

      <FormControl mb={4}>
        <FormLabel>Base Color (500)</FormLabel>
        <InputGroup>
          <Input
            value={baseColor}
            onChange={e => setBaseColor(e.target.value)}
            placeholder="#3182CE"
          />
          <InputRightElement width="3.5rem">
            <input
              type="color"
              value={baseColor}
              onChange={e => setBaseColor(e.target.value)}
              style={{
                width: "30px",
                height: "30px",
                padding: 0,
                border: "none",
              }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Preview of the generated palette */}
      <Box mt={4}>
        <Text fontSize="sm" mb={2}>
          Preview:
        </Text>
        <ThemeColorSwatch
          colorKey="preview"
          colorShades={generateColorPalette(baseColor)}
          size="lg"
        />
      </Box>
    </Box>
  );
};

export default PaletteGenerator;
