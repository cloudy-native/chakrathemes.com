import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { ThemeValues } from '../hooks/useColorManagement';

interface BorderRadiusTabProps {
  themeValues: ThemeValues;
  handleRadiiChange: (radiusKey: string, value: string) => void;
}

// Chakra UI default border radius values - used for reset
const DEFAULT_RADII = {
  'none': '0',
  'sm': '0.125rem',
  'base': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
};

// Categories for display organization
const SIZE_RADII = ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

// Reusable component for individual border radius controls
const BorderRadiusControl: React.FC<{
  radiusKey: string;
  radiusValue: string;
  handleRadiiChange: (radiusKey: string, value: string) => void;
}> = ({ radiusKey, radiusValue, handleRadiiChange }) => {
  // Parse rem value for slider
  const parseRemValue = (value: string): number => {
    if (value === '0') return 0;
    if (typeof value === 'string') {
      // Handle rem values
      const remMatch = value.match(/([0-9.]+)rem/);
      if (remMatch && remMatch[1]) {
        return parseFloat(remMatch[1]);
      }
      // Handle pixel values (convert to rem)
      const pxMatch = value.match(/([0-9.]+)px/);
      if (pxMatch && pxMatch[1]) {
        return parseFloat(pxMatch[1]) / 16;
      }
      // Handle plain numbers
      if (!isNaN(parseFloat(value))) {
        return parseFloat(value);
      }
    }
    return 0;
  };

  // Determine if we can use a slider for this value
  // Don't use a slider for "full" radius or "none"
  const canUseSlider = radiusKey !== 'full' && radiusKey !== 'none' && 
    (radiusValue.includes('rem') || radiusValue.includes('px') || !isNaN(parseFloat(radiusValue)));

  // Determine if we should show the input field
  const showInput = radiusKey !== 'none' && radiusKey !== 'full';

  const remValue = parseRemValue(radiusValue);

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="md" 
      boxShadow="sm"
      p={4}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Flex justify="space-between" mb={3}>
        <Text fontWeight="bold">{radiusKey}</Text>
        {showInput && (
          <Input
            value={radiusValue}
            onChange={(e) => handleRadiiChange(radiusKey, e.target.value)}
            size="sm"
            width="120px"
          />
        )}
      </Flex>
      
      <Box 
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Box
          width="80px"
          height="80px"
          bg="blue.500"
          borderRadius={radiusValue}
        />
      </Box>
      
      {canUseSlider ? (
        <Slider
          min={0}
          max={2} // Most border-radius values are less than 2rem
          step={0.0625}
          value={remValue}
          onChange={(val) => {
            if (val === 0) {
              handleRadiiChange(radiusKey, "0");
            } else if (radiusValue.includes('px')) {
              // Keep px values in px
              handleRadiiChange(radiusKey, `${Math.round(val * 16)}px`);
            } else {
              // Default to rem for other values
              handleRadiiChange(radiusKey, `${val}rem`);
            }
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      ) : (
        <Box height="16px" /> // Spacer for consistent layout
      )}
    </Box>
  );
};

export const BorderRadiusTab: React.FC<BorderRadiusTabProps> = ({
  themeValues,
  handleRadiiChange,
}) => {
  // Reset border radius to defaults
  const handleResetRadii = () => {
    Object.entries(DEFAULT_RADII).forEach(([radiusKey, radiusValue]) => {
      handleRadiiChange(radiusKey, radiusValue);
    });
  };

  // Add missing border radius values
  const handleAddMissingRadii = () => {
    Object.entries(DEFAULT_RADII).forEach(([radiusKey, radiusValue]) => {
      if (!themeValues.radii || !themeValues.radii[radiusKey]) {
        handleRadiiChange(radiusKey, radiusValue);
      }
    });
  };

  // Check if any default radius values are missing
  const hasMissingRadii = () => {
    return Object.keys(DEFAULT_RADII).some(key => 
      !themeValues.radii || !themeValues.radii[key]
    );
  };

  return (
    <Box>
      <Flex justify="space-between" mb={5} align="center">
        <Heading size="md">Border Radius</Heading>
        <HStack>
          {hasMissingRadii() && (
            <Button size="sm" colorScheme="purple" onClick={handleAddMissingRadii}>
              Add Missing Radii
            </Button>
          )}
          <Button size="sm" colorScheme="blue" onClick={handleResetRadii}>
            Reset All Radii
          </Button>
        </HStack>
      </Flex>

      <Text mb={6} fontSize="sm" >
        Border radius values define the roundness of corners across your components.
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mb={8}>
        {Object.entries(themeValues.radii || {})
          .sort(([a], [b]) => {
            const aIndex = SIZE_RADII.indexOf(a);
            const bIndex = SIZE_RADII.indexOf(b);
            
            // If both are in SIZE_RADII, sort by that order
            if (aIndex !== -1 && bIndex !== -1) {
              return aIndex - bIndex;
            }
            
            // If only one is in SIZE_RADII, prioritize it
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            
            // Otherwise sort alphabetically
            return a.localeCompare(b);
          })
          .map(([radiusKey, radiusValue]) => (
            <BorderRadiusControl
              key={radiusKey}
              radiusKey={radiusKey}
              radiusValue={radiusValue as string}
              handleRadiiChange={handleRadiiChange}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default BorderRadiusTab;