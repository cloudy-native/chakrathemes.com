import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

interface PaletteGeneratorProps {
  baseColor: string;
  setBaseColor: (color: string) => void;
}

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({ baseColor, setBaseColor }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
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
    </Box>
  );
};

export default PaletteGenerator;
