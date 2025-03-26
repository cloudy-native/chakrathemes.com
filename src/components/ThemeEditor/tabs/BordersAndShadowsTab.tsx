import { useThemeContext } from "@/context/ThemeContext";
import { Copy } from "lucide-react";
import {
  Box,
  Button,
  Code,
  Flex,
  Grid,
  GridItem,
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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

// Chakra UI default border radius values - used for reset
const DEFAULT_RADII = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

// Chakra UI default shadow values - used for reset
const DEFAULT_SHADOWS = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg":
    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
};

// Categories for display organization
const SIZE_RADII = ["none", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "full"];
const SIZE_SHADOWS = [
  "none",
  "xs",
  "sm",
  "base",
  "md",
  "lg",
  "xl",
  "2xl",
  "outline",
  "inner",
  "dark-lg",
];

// Reusable component for individual shadow controls
const ShadowControl: React.FC<{
  shadowKey: string;
  shadowValue: string;
  onChange: (shadowKey: string, value: string) => void;
  copiedValue: string | null;
  onCopy: (value: string) => void;
}> = ({ shadowKey, shadowValue, onChange, copiedValue, onCopy }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const codeBg = useColorModeValue("gray.100", "gray.700");
  const copyValue = `boxShadow="${shadowKey}"`;

  const handleCopy = () => {
    onCopy(copyValue);
  };

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
      <Flex mb={3} align="center" justify="space-between" bg={codeBg} p={2} borderRadius="md">
        <Code colorScheme="blue" children={copyValue} />
        <Button
          size="xs"
          variant="ghost"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          leftIcon={<Copy size={14} />}
        >
          {copiedValue === copyValue ? "Copied!" : ""}
        </Button>
      </Flex>

      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box
          width="120px"
          height="80px"
          bg={bgColor}
          borderRadius="md"
          boxShadow={shadowValue}
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "transparent",
            borderRadius: "md",
          }}
        />
      </Box>
    </Box>
  );
};

// Reusable component for individual border radius controls
const BorderRadiusControl: React.FC<{
  radiusKey: string;
  radiusValue: string;
  onChange: (radiusKey: string, value: string) => void;
  copiedValue: string | null;
  onCopy: (value: string) => void;
}> = ({ radiusKey, radiusValue, onChange, copiedValue, onCopy }) => {
  const codeBg = useColorModeValue("gray.100", "gray.700");
  const copyValue = `borderRadius="${radiusKey}"`;

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
  // Don't use a slider for "full" radius or "none"
  const canUseSlider =
    radiusKey !== "full" &&
    radiusKey !== "none" &&
    (radiusValue.includes("rem") || radiusValue.includes("px") || !isNaN(parseFloat(radiusValue)));

  // Determine if we should show the input field
  const showInput = radiusKey !== "none" && radiusKey !== "full";

  const remValue = parseRemValue(radiusValue);

  const handleCopy = () => {
    onCopy(copyValue);
  };

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
      <Flex mb={3} align="center" justify="space-between" bg={codeBg} p={2} borderRadius="md">
        <Code colorScheme="blue" children={copyValue} />
        <Button
          size="xs"
          variant="ghost"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          leftIcon={<Copy size={14} />}
        >
          {copiedValue === copyValue ? "Copied!" : ""}
        </Button>
      </Flex>

      <Flex justify="space-between" align="center" mb={4} flex="1">
        <Box width="80px" height="80px" bg="blue.500" borderRadius={radiusValue} />

        {showInput && (
          <Input
            value={radiusValue}
            onChange={e => onChange(radiusKey, e.target.value)}
            size="sm"
            width="120px"
          />
        )}
      </Flex>

      {canUseSlider ? (
        <Slider
          min={0}
          max={2} // Most border-radius values are less than 2rem
          step={0.0625}
          value={remValue}
          onChange={val => {
            if (val === 0) {
              onChange(radiusKey, "0");
            } else if (radiusValue.includes("px")) {
              // Keep px values in px
              onChange(radiusKey, `${Math.round(val * 16)}px`);
            } else {
              // Default to rem for other values
              onChange(radiusKey, `${val}rem`);
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

export const BordersAndShadowsTab: React.FC = () => {
  const { themeValues, updateThemeValue } = useThemeContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // Copy to clipboard handler
  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedValue(null);
    }, 2000);
  };

  // Handler for radius value changes
  const handleRadiiChange = (radiusKey: string, value: string) => {
    updateThemeValue(["radii", radiusKey], value);
  };

  // Handler for shadow value changes
  const handleShadowChange = (shadowKey: string, value: string) => {
    updateThemeValue(["shadows", shadowKey], value);
  };

  // Reset border radius to defaults
  const handleResetRadii = () => {
    Object.entries(DEFAULT_RADII).forEach(([radiusKey, radiusValue]) => {
      handleRadiiChange(radiusKey, radiusValue);
    });
  };

  // Reset shadows to defaults
  const handleResetShadows = () => {
    Object.entries(DEFAULT_SHADOWS).forEach(([shadowKey, shadowValue]) => {
      handleShadowChange(shadowKey, shadowValue);
    });
  };

  return (
    <Box>
      <Tabs index={tabIndex} onChange={setTabIndex} mb={6} isFitted isLazy>
        <TabList>
          <Tab>Border Radius</Tab>
          <Tab>Shadows</Tab>
        </TabList>

        <TabPanels>
          {/* Border Radius Panel */}
          <TabPanel p={0} pt={5}>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem rowSpan={2} colSpan={4}>
                <Text mb={6} fontSize={"sm"}>
                  Border radius values define the roundness of corners across your components.
                </Text>
              </GridItem>
              <GridItem>
                <Flex justify="right" mb={2}>
                  <Button colorScheme="blue" size="sm" onClick={handleResetRadii}>
                    Reset All Radii
                  </Button>
                </Flex>
              </GridItem>
            </Grid>

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
                    onChange={handleRadiiChange}
                    copiedValue={copiedValue}
                    onCopy={handleCopyToClipboard}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>

          {/* Shadow Panel */}
          <TabPanel p={0} pt={5}>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem rowSpan={2} colSpan={4}>
                <Text mb={6} fontSize={"sm"}>
                  Shadow values define the appearance of shadows across your components.
                </Text>
              </GridItem>
              <GridItem>
                <Flex justify="right" mb={2}>
                  <Button colorScheme="blue" size="sm" onClick={handleResetShadows}>
                    Reset All Shadows
                  </Button>
                </Flex>
              </GridItem>
            </Grid>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mb={8}>
              {Object.entries(themeValues.shadows || {})
                .sort(([a], [b]) => {
                  const aIndex = SIZE_SHADOWS.indexOf(a);
                  const bIndex = SIZE_SHADOWS.indexOf(b);

                  // If both are in SIZE_SHADOWS, sort by that order
                  if (aIndex !== -1 && bIndex !== -1) {
                    return aIndex - bIndex;
                  }

                  // If only one is in SIZE_SHADOWS, prioritize it
                  if (aIndex !== -1) return -1;
                  if (bIndex !== -1) return 1;

                  // Otherwise sort alphabetically
                  return a.localeCompare(b);
                })
                .map(([shadowKey, shadowValue]) => (
                  <ShadowControl
                    key={shadowKey}
                    shadowKey={shadowKey}
                    shadowValue={shadowValue as string}
                    onChange={handleShadowChange}
                    copiedValue={copiedValue}
                    onCopy={handleCopyToClipboard}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BordersAndShadowsTab;
