import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
} from '@chakra-ui/react';
import ColorTooltip from './ColorTooltip';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({ 
  label, 
  value, 
  onChange 
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <HStack>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Popover>
          <PopoverTrigger>
            <Box w="40px" h="40px" cursor="pointer">
              <ColorTooltip
                color={value}
                label={label}
                size="lg"
                tooltipPlacement="top"
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent p={0} width="200px">
            <PopoverBody p={2}>
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "100%", height: "40px" }}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </FormControl>
  );
};

export default ColorInput;