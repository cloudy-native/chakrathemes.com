import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ThemeValues } from "@/types";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
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
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import chroma from "chroma-js";
import { Check, Info, Moon, RotateCcw, Sun } from "lucide-react";
import React, { useState } from "react";

interface PaletteAdjustmentProps {
  colorKey: string;
  colorShades: Record<string, string>;
}

export const PaletteAdjustment: React.FC<PaletteAdjustmentProps> = ({ colorKey, colorShades }) => {
  const { themeValues, setThemeValues } = useThemeContext();
  const { trackColorAction } = useAnalytics();
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [previewShades, setPreviewShades] = useState<Record<string, string>>(colorShades);

  // Adjustment values
  const [brightness, setBrightness] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [contrastAmount, setContrastAmount] = useState(0);
  const [gammaValue, setGammaValue] = useState(1);

  // Initialize preview on first render
  React.useEffect(() => {
    if (isAdjusting) {
      updatePreview();
    }
  }, [isAdjusting]);

  // Color functions
  const baseColor = colorShades["500"];

  // UI Colors
  const panelBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Calculate adjustments for preview
  const updatePreview = () => {
    const newShades: Record<string, string> = {};

    Object.entries(colorShades).forEach(([shade, color]) => {
      let adjustedColor = chroma(color);

      // Apply brightness adjustment
      if (brightness !== 0) {
        adjustedColor =
          brightness > 0
            ? adjustedColor.brighten(brightness)
            : adjustedColor.darken(Math.abs(brightness));
      }

      // Apply saturation adjustment
      if (saturation !== 0) {
        const [h, s, l] = adjustedColor.hsl();
        const newSat = Math.max(0, Math.min(1, s + saturation * 0.01));
        adjustedColor = chroma.hsl(h, newSat, l);
      }

      // Apply temperature adjustment (-100 = cooler, 100 = warmer)
      if (temperature !== 0) {
        // Instead of using temperature directly (which chroma.js doesn't support as a direct property),
        // we'll adjust the color's warmth by shifting its hue
        const [h, s, l] = adjustedColor.hsl();
        const hueShift = temperature * 0.1; // Scale down for subtlety

        // Warm = shift toward orange/yellow (positive), Cool = shift toward blue (negative)
        const newHue = (h + hueShift + 360) % 360;
        adjustedColor = chroma.hsl(newHue, s, l);
      }

      // Apply contrast adjustment (increases difference between light and dark shades)
      if (contrastAmount !== 0) {
        const shadeNum = parseInt(shade);

        // Only apply to non-500 shades
        if (shadeNum !== 500) {
          const direction = shadeNum < 500 ? 1 : -1; // Lighter or darker
          const distance = Math.abs(shadeNum - 500) / 100; // How far from center
          const adjustment = direction * distance * contrastAmount * 0.02;

          adjustedColor =
            adjustment > 0
              ? adjustedColor.brighten(adjustment)
              : adjustedColor.darken(Math.abs(adjustment));
        }
      }

      // Apply gamma correction
      if (gammaValue !== 1) {
        const rgb = adjustedColor.rgb();
        // Make sure we're dealing with integers and properly cast to RGB triplet
        const correctedRgb: [number, number, number] = [
          Math.round(Math.pow(rgb[0] / 255, gammaValue) * 255),
          Math.round(Math.pow(rgb[1] / 255, gammaValue) * 255),
          Math.round(Math.pow(rgb[2] / 255, gammaValue) * 255),
        ];
        adjustedColor = chroma(correctedRgb);
      }

      newShades[shade] = adjustedColor.hex();
    });

    setPreviewShades(newShades);
  };

  // Reset all adjustments
  const resetAdjustments = () => {
    setBrightness(0);
    setSaturation(0);
    setTemperature(0);
    setContrastAmount(0);
    setGammaValue(1);
    setPreviewShades(colorShades);
  };

  // Apply the adjustments to the actual theme
  const applyAdjustments = () => {
    // Create a new theme object based on the current one
    const newTheme: ThemeValues = JSON.parse(JSON.stringify(themeValues));

    // Update the specific palette with adjusted colors
    if (newTheme.colors && newTheme.colors[colorKey]) {
      newTheme.colors[colorKey] = previewShades;
    }

    // Update the theme
    setThemeValues(newTheme);

    // Track the action
    trackColorAction("adjust_palette", colorKey);

    // Reset the adjusting state
    setIsAdjusting(false);

    // Reset adjustments after applying
    resetAdjustments();
  };

  // Calculate differences for display
  const calculateDifferences = () => {
    const diffs: Record<string, number> = {};
    Object.keys(colorShades).forEach(shade => {
      const original = chroma(colorShades[shade]);
      const adjusted = chroma(previewShades[shade]);

      // Calculate a simple perceptual difference using distance in Lab color space
      // (Since chroma.deltaE might not be directly available in some versions)
      const labOriginal = original.lab();
      const labAdjusted = adjusted.lab();

      // Euclidean distance in LAB space (approx. perceptual distance)
      const deltaE = Math.sqrt(
        Math.pow(labAdjusted[0] - labOriginal[0], 2) +
          Math.pow(labAdjusted[1] - labOriginal[1], 2) +
          Math.pow(labAdjusted[2] - labOriginal[2], 2)
      );

      diffs[shade] = deltaE;
    });
    return diffs;
  };

  const differences = isAdjusting ? calculateDifferences() : {};

  if (!isAdjusting) {
    return (
      <Flex justifyContent="center" mt={2} mb={4}>
        <Button
          leftIcon={<RotateCcw size={16} />}
          size="sm"
          onClick={() => {
            setIsAdjusting(true);
            updatePreview();
          }}
        >
          Adjust Palette
        </Button>
      </Flex>
    );
  }

  return (
    <Box my={4} borderWidth="1px" borderRadius="md" borderColor={borderColor} overflow="hidden">
      <Tabs isFitted>
        <TabList>
          <Tab>Basic Adjustments</Tab>
          <Tab>Advanced</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={4} bg={panelBg}>
            {/* Basic Adjustments */}
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Brightness
                </Text>
                <HStack>
                  <IconButton
                    aria-label="Decrease brightness"
                    icon={<Moon size={16} />}
                    size="xs"
                    onClick={() => {
                      setBrightness(Math.max(-2, brightness - 0.1));
                      updatePreview();
                    }}
                  />
                  <Badge variant="outline" fontSize="xs">
                    {brightness > 0 ? `+${brightness.toFixed(1)}` : brightness.toFixed(1)}
                  </Badge>
                  <IconButton
                    aria-label="Increase brightness"
                    icon={<Sun size={16} />}
                    size="xs"
                    onClick={() => {
                      setBrightness(Math.min(2, brightness + 0.1));
                      updatePreview();
                    }}
                  />
                </HStack>
              </Flex>
              <Slider
                min={-2}
                max={2}
                step={0.1}
                value={brightness}
                onChange={v => {
                  setBrightness(v);
                  updatePreview();
                }}
                mb={4}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <Flex justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Saturation
                </Text>
                <Badge variant="outline" fontSize="xs">
                  {saturation > 0 ? `+${saturation}%` : `${saturation}%`}
                </Badge>
              </Flex>
              <Slider
                min={-50}
                max={50}
                step={1}
                value={saturation}
                onChange={v => {
                  setSaturation(v);
                  updatePreview();
                }}
                mb={4}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <Flex justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Contrast
                </Text>
                <Badge variant="outline" fontSize="xs">
                  {contrastAmount > 0 ? `+${contrastAmount}%` : `${contrastAmount}%`}
                </Badge>
              </Flex>
              <Slider
                min={-50}
                max={50}
                step={1}
                value={contrastAmount}
                onChange={v => {
                  setContrastAmount(v);
                  updatePreview();
                }}
                mb={4}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </VStack>
          </TabPanel>

          <TabPanel p={4} bg={panelBg}>
            {/* Advanced Adjustments */}
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" mb={2}>
                <HStack>
                  <Text fontSize="sm" fontWeight="medium">
                    Temperature
                  </Text>
                  <Tooltip label="Shift colors warmer (yellow/red) or cooler (blue)">
                    <Info size={12} />
                  </Tooltip>
                </HStack>
                <Badge variant="outline" fontSize="xs">
                  {temperature > 0
                    ? `+${temperature} (Warm)`
                    : temperature < 0
                      ? `${temperature} (Cool)`
                      : "0 (Neutral)"}
                </Badge>
              </Flex>
              <Slider
                min={-100}
                max={100}
                step={5}
                value={temperature}
                onChange={v => {
                  setTemperature(v);
                  updatePreview();
                }}
                mb={4}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <Flex justify="space-between" mb={2}>
                <HStack>
                  <Text fontSize="sm" fontWeight="medium">
                    Gamma
                  </Text>
                  <Tooltip label="Adjust the gamma curve (affects mid-tones)">
                    <Info size={12} />
                  </Tooltip>
                </HStack>
                <Badge variant="outline" fontSize="xs">
                  {gammaValue.toFixed(2)}
                </Badge>
              </Flex>
              <Slider
                min={0.5}
                max={2}
                step={0.05}
                value={gammaValue}
                onChange={v => {
                  setGammaValue(v);
                  updatePreview();
                }}
                mb={4}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Preview comparison */}
      <Box p={4} borderTopWidth="1px" borderColor={borderColor}>
        <Text fontSize="sm" fontWeight="medium" mb={3}>
          Preview
        </Text>

        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <Text fontSize="sm" mb={2} textAlign="center">
              Original
            </Text>
            <Flex mb={2}>
              {Object.entries(colorShades)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([shade, color]) => (
                  <Box
                    key={shade}
                    flex={1}
                    bg={color}
                    h="30px"
                    title={`${colorKey}.${shade}: ${color}`}
                  />
                ))}
            </Flex>
          </Box>

          <Box>
            <Text fontSize="sm" mb={2} textAlign="center">
              Adjusted
            </Text>
            <Flex mb={2}>
              {Object.entries(previewShades)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([shade, color]) => (
                  <Box
                    key={shade}
                    flex={1}
                    bg={color}
                    h="30px"
                    position="relative"
                    title={`${colorKey}.${shade}: ${color}`}
                  >
                    {differences[shade] > 10 && (
                      <Badge
                        position="absolute"
                        top="0"
                        right="0"
                        size="xs"
                        colorScheme="red"
                        fontSize="8px"
                      >
                        !
                      </Badge>
                    )}
                  </Box>
                ))}
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>

      <Flex p={4} borderTopWidth="1px" borderColor={borderColor} justify="flex-end">
        <ButtonGroup>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              resetAdjustments();
              setIsAdjusting(false);
            }}
          >
            Cancel
          </Button>

          <Button
            size="sm"
            variant="outline"
            leftIcon={<RotateCcw size={16} />}
            onClick={resetAdjustments}
          >
            Reset
          </Button>

          <Button
            size="sm"
            colorScheme="green"
            leftIcon={<Check size={16} />}
            onClick={applyAdjustments}
          >
            Apply Changes
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default PaletteAdjustment;
