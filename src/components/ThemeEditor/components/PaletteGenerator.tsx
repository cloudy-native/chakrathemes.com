import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { generateColorPalette } from '../utils/colorUtils';
import ThemeColorSwatch from './ThemeColorSwatch';

interface PaletteGeneratorProps {
  colorName: string;
  setColorName: (name: string) => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  onGenerate: () => void;
}

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({
  colorName,
  setColorName,
  baseColor,
  setBaseColor,
  onGenerate,
}) => {
  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="md" 
      bg={useColorModeValue("blue.50", "blue.900")}
    >
      <Text fontWeight="bold" mb={4}>Generate New Color Palette</Text>
      
      <HStack spacing={4} mb={4}>
        <FormControl>
          <FormLabel>Color Name</FormLabel>
          <Input 
            placeholder="e.g. primary, accent, etc." 
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </FormControl>
        
        <FormControl>
          <FormLabel>Base Color (500)</FormLabel>
          <InputGroup>
            <Input 
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
            />
            <InputRightElement width="3.5rem">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                style={{ 
                  width: "30px", 
                  height: "30px", 
                  padding: 0,
                  border: "none" 
                }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </HStack>
      
      <Button 
        colorScheme="blue" 
        onClick={onGenerate}
        leftIcon={<span>🎨</span>}
      >
        Generate Palette
      </Button>
      
      {/* Preview of the generated palette */}
      <Box mt={4}>
        <ThemeColorSwatch
          colorKey={colorName || "preview"}
          colorShades={generateColorPalette(baseColor)}
          size="sm"
        />
      </Box>
    </Box>
  );
};

export default PaletteGenerator;