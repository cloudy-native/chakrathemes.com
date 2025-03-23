import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useThemeContext } from "@/context/ThemeContext";

// Chakra UI default spacing values - used for reset
const DEFAULT_SPACING = {
  // Numeric scale
  "0": "0",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
  // T-shirt sizes
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
  // Special values
  px: "1px",
};

// T-shirt sizes for separate handling
const T_SHIRT_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
];

// Component for visualizing spacing values
const SpacingVisualizer: React.FC<{
  spaceValue: string;
}> = ({ spaceValue }) => {
  // Skip visualization for zero value
  if (spaceValue === "0") {
    return null;
  }

  return (
    <Box mt={2} mb={4}>
      <Box
        width={spaceValue}
        height="12px"
        bg="blue.500"
        borderRadius="sm"
        minWidth="2px" // Ensure very small values are still visible
      />
    </Box>
  );
};

// Reusable component for individual spacing controls
const SpacingControl: React.FC<{
  spaceKey: string;
  spaceValue: string;
  handleSpacingChange: (spaceKey: string, value: string) => void;
}> = ({ spaceKey, spaceValue, handleSpacingChange }) => {
  // Parse rem value for slider
  const parseRemValue = (value: string): number => {
    if (value === "0") return 0;
    if (typeof value === "string") {
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
  const canUseSlider =
    !["px"].includes(spaceKey) &&
    (spaceValue.includes("rem") ||
      spaceValue.includes("px") ||
      !isNaN(parseFloat(spaceValue)));

  const remValue = parseRemValue(spaceValue);

  return (
    <Box p={3} borderWidth="1px" borderRadius="md" boxShadow="sm">
      <HStack justify="space-between" mb={1}>
        <Text fontWeight="bold">{spaceKey}</Text>
        <Input
          value={spaceValue}
          onChange={(e) => handleSpacingChange(spaceKey, e.target.value)}
          size="sm"
          width="120px"
        />
      </HStack>

      {canUseSlider && (
        <Slider
          min={0}
          max={16}
          step={0.125}
          value={remValue}
          onChange={(val) => {
            if (val === 0) {
              handleSpacingChange(spaceKey, "0");
            } else if (spaceValue.includes("px")) {
              // Keep px values in px
              handleSpacingChange(spaceKey, `${Math.round(val * 16)}px`);
            } else {
              // Default to rem for other values
              handleSpacingChange(spaceKey, `${val}rem`);
            }
          }}
          my={2}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      )}

      <SpacingVisualizer spaceValue={spaceValue} />
    </Box>
  );
};

export const SpacingTab: React.FC = () => {
  const { themeValues, updateThemeValue } = useThemeContext();
  
  // Handle spacing value changes
  const handleSpacingChange = (spaceKey: string, value: string) => {
    updateThemeValue(['space', spaceKey], value);
  };

  // Reset spacing to defaults
  const handleResetSpacing = () => {
    Object.entries(DEFAULT_SPACING).forEach(([spaceKey, spaceValue]) => {
      handleSpacingChange(spaceKey, spaceValue);
    });
  };

  // Add t-shirt sizes
  const handleAddTshirtSizes = () => {
    T_SHIRT_SIZES.forEach((sizeKey) => {
      // Look up in DEFAULT_SPACING
      if (DEFAULT_SPACING[sizeKey]) {
        handleSpacingChange(sizeKey, DEFAULT_SPACING[sizeKey]);
      } else {
        // Fallback values in case they're not in DEFAULT_SPACING
        const fallbackSizes = {
          'xs': '0.75rem',
          'sm': '0.875rem',
          'md': '1rem',
          'lg': '1.125rem',
          'xl': '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
          '6xl': '3.75rem',
          '7xl': '4.5rem',
          '8xl': '6rem',
          '9xl': '8rem',
        };
        
        if (fallbackSizes[sizeKey]) {
          handleSpacingChange(sizeKey, fallbackSizes[sizeKey]);
        }
      }
    });
  };

  return (
    <Box>
      <Flex justify="space-between" mb={5} align="center">
        <Heading size="md">Spacing Scale</Heading>
        <HStack>
          <Button size="sm" colorScheme="purple" onClick={handleAddTshirtSizes}>
            Add T-shirt Sizes
          </Button>
          <Button size="sm" colorScheme="blue" onClick={handleResetSpacing}>
            Reset All Spacing
          </Button>
        </HStack>
      </Flex>

      <Text mb={4} fontSize="sm" >
        Spacing values are used for margins, padding, and layout sizing across
        your theme.
      </Text>

      <Divider mb={6} />

      <Tabs variant="line" isLazy>
        <TabList>
          <Tab>Small Numeric (0-12)</Tab>
          <Tab>Large Numeric (14+)</Tab>
          <Tab>T-shirt Sizes</Tab>
        </TabList>

        <TabPanels>
          {/* Small numeric spacing values (0-12) */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {Object.entries(themeValues.space || {})
                .filter(([key]) => {
                  const num = parseFloat(key);
                  return (
                    !isNaN(num) && num <= 12 && !T_SHIRT_SIZES.includes(key)
                  );
                })
                .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                .map(([spaceKey, spaceValue]) => (
                  <SpacingControl
                    key={spaceKey}
                    spaceKey={spaceKey}
                    spaceValue={spaceValue as string}
                    handleSpacingChange={handleSpacingChange}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>

          {/* Large numeric spacing values (14+) */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {Object.entries(themeValues.space || {})
                .filter(([key]) => {
                  const num = parseFloat(key);
                  return (
                    !isNaN(num) && num > 12 && !T_SHIRT_SIZES.includes(key)
                  );
                })
                .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                .map(([spaceKey, spaceValue]) => (
                  <SpacingControl
                    key={spaceKey}
                    spaceKey={spaceKey}
                    spaceValue={spaceValue as string}
                    handleSpacingChange={handleSpacingChange}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>

          {/* T-shirt sizes */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {Object.entries(themeValues.space || {})
                .filter(([key]) => T_SHIRT_SIZES.includes(key))
                .sort(([a], [b]) => {
                  return T_SHIRT_SIZES.indexOf(a) - T_SHIRT_SIZES.indexOf(b);
                })
                .map(([spaceKey, spaceValue]) => (
                  <SpacingControl
                    key={spaceKey}
                    spaceKey={spaceKey}
                    spaceValue={spaceValue as string}
                    handleSpacingChange={handleSpacingChange}
                  />
                ))}
              {T_SHIRT_SIZES.filter(
                (size) => !themeValues.space || !themeValues.space[size]
              ).length > 0 && (
                <Box p={4} borderWidth="1px" borderRadius="md">
                  <Text fontSize="sm" mb={2}>
                    Some t-shirt sizes are missing
                  </Text>
                  <Button size="sm" onClick={handleAddTshirtSizes}>
                    Add Missing Sizes
                  </Button>
                </Box>
              )}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SpacingTab;