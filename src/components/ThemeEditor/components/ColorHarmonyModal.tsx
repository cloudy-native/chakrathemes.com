import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ThemeValues } from "@/types";
import { isPaletteNameAvailable } from "@/utils/colorUtils";
import { addPaletteToTheme } from "@/utils/themeUtils";
import {
  createColorScale,
  generateColorPalette,
  getAnalogousColors,
  getComplementaryColor,
  getMonochromaticColors,
  getTriadicColors,
} from "@/utils/colorUtils";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Check, Plus } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { ColorSwatch } from "./ColorSwatch";
import { backgroundMedium, emptyStateBorder, panelBackground } from "@/theme/themeConfiguration";

import { PaletteAnalysisModalProps } from "@/types";

export const ColorHarmonyModal: React.FC<PaletteAnalysisModalProps> = ({
  isOpen,
  onClose,
  colorKey,
  colorShades,
}) => {
  const baseColor = colorShades[500]; // Use 500 as the base color for harmonies
  const toast = useToast();
  const { setThemeValues, themeValues } = useThemeContext();
  const { trackColorAction } = useAnalytics();

  // State for harmony settings
  const [harmonyAngle, setHarmonyAngle] = useState(30);
  const [harmonyCount, setHarmonyCount] = useState(3);
  const [selectedHarmonyColor, setSelectedHarmonyColor] = useState<string | null>(null);
  const [newPaletteName, setNewPaletteName] = useState("");

  // Generate different color harmonies
  const complementaryColor = useMemo(() => {
    return getComplementaryColor(baseColor);
  }, [baseColor]);

  const analogousColors = useMemo(() => {
    return getAnalogousColors(baseColor, harmonyCount, harmonyAngle);
  }, [baseColor, harmonyCount, harmonyAngle]);

  const triadicColors = useMemo(() => {
    return getTriadicColors(baseColor);
  }, [baseColor]);

  const monochromaticColors = useMemo(() => {
    return getMonochromaticColors(baseColor, 5);
  }, [baseColor]);

  // Custom gradient generator
  const [gradientStart, setGradientStart] = useState(baseColor);
  const [gradientEnd, setGradientEnd] = useState(complementaryColor);
  const [gradientSteps, setGradientSteps] = useState(5);

  const gradientColors = useMemo(() => {
    return createColorScale(gradientStart, gradientEnd, gradientSteps);
  }, [gradientStart, gradientEnd, gradientSteps]);

  // Handle adding a new color palette
  const addNewPalette = useCallback((color: string) => {
    // Generate a placeholder name based on color
    const colorHex = color.replace("#", "");
    const suggestedName = `color${colorHex.substring(0, 3)}`;
    setNewPaletteName(suggestedName);
    setSelectedHarmonyColor(color);
  }, []);

  // Handle confirming the new palette
  const confirmNewPalette = useCallback(() => {
    if (!selectedHarmonyColor) {
      toast({
        title: "No Color Selected",
        description: "Please select a color to create a palette",
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Use the centralized validation utility
    if (!isPaletteNameAvailable(newPaletteName, themeValues.colors, toast)) {
      return;
    }

    // Generate palette from the selected color
    const newPalette = generateColorPalette(selectedHarmonyColor);

    // Use the utility to add the palette to theme
    const updatedTheme = addPaletteToTheme(themeValues, newPaletteName, newPalette);

    // Update the theme
    setThemeValues(updatedTheme);

    // Track the action
    trackColorAction("add_harmony_palette", newPaletteName);

    // Show success toast
    toast({
      title: "Palette Created",
      description: `The ${newPaletteName} palette has been added to your theme`,
      status: "success",
      duration: 2000,
    });

    // Reset state
    setSelectedHarmonyColor(null);
    setNewPaletteName("");
  }, [selectedHarmonyColor, newPaletteName, themeValues, setThemeValues, trackColorAction, toast]);

  const bgColor = useColorModeValue(panelBackground.light, panelBackground.dark);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <Flex align="center">
            <Text>Color Harmony: {colorKey}</Text>
            <ColorSwatch color={baseColor} size="xs" ml={2} />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList mb="1em">
              <Tab>Complementary</Tab>
              <Tab>Analogous</Tab>
              <Tab>Triadic</Tab>
              <Tab>Monochromatic</Tab>
              <Tab>Custom Gradient</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Complementary Color Tab */}
                <Box mb={4}>
                  <Text mb={2}>
                    Complementary colors are opposite each other on the color wheel. They create a
                    high-contrast, vibrant look.
                  </Text>

                  <Flex direction="column" alignItems="center" mt={6}>
                    <Box
                      p={4}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark)}
                      width="100%"
                      maxWidth="400px"
                    >
                      <Flex justify="space-between" align="center" mb={4}>
                        <VStack align="flex-start">
                          <HStack>
                            <Box w="24px" h="24px" borderRadius="md" bg={baseColor} />
                            <Text fontWeight="bold">{colorKey} (Base)</Text>
                          </HStack>
                          <Text fontSize="sm">{baseColor}</Text>
                        </VStack>

                        <Text fontSize="lg" fontWeight="bold">
                          →
                        </Text>

                        <VStack align="flex-start">
                          <HStack>
                            <Box w="24px" h="24px" borderRadius="md" bg={complementaryColor} />
                            <Text fontWeight="bold">Complementary</Text>
                          </HStack>
                          <Text fontSize="sm">{complementaryColor}</Text>
                        </VStack>
                      </Flex>

                      <Box
                        p={2}
                        borderRadius="md"
                        bg={useColorModeValue(backgroundMedium.light, backgroundMedium.dark)}
                      >
                        <Flex h="80px">
                          <Box flex={1} bg={baseColor} />
                          <Box flex={1} bg={complementaryColor} />
                        </Flex>
                      </Box>

                      <HStack mt={4} justify="center">
                        <Tooltip label="Add as new palette">
                          <IconButton
                            aria-label="Add as new palette"
                            icon={<Icon as={Plus} />}
                            onClick={() => addNewPalette(complementaryColor)}
                          />
                        </Tooltip>
                      </HStack>
                    </Box>
                  </Flex>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Analogous Colors Tab */}
                <Box mb={4}>
                  <Text mb={2}>
                    Analogous colors are next to each other on the color wheel. They create a
                    harmonious, cohesive look.
                  </Text>

                  <HStack spacing={4} mt={4} mb={6}>
                    <VStack alignItems="flex-start" flex={1}>
                      <Text fontWeight="bold">Number of Colors</Text>
                      <Slider
                        min={3}
                        max={7}
                        step={2}
                        value={harmonyCount}
                        onChange={setHarmonyCount}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text fontSize="sm">{harmonyCount} colors</Text>
                    </VStack>

                    <VStack alignItems="flex-start" flex={1}>
                      <Text fontWeight="bold">Angle</Text>
                      <Slider
                        min={10}
                        max={60}
                        step={5}
                        value={harmonyAngle}
                        onChange={setHarmonyAngle}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text fontSize="sm">{harmonyAngle}° spacing</Text>
                    </VStack>
                  </HStack>

                  <Box
                    p={4}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark)}
                  >
                    <Text fontWeight="bold" mb={3}>
                      Analogous Colors ({harmonyCount})
                    </Text>

                    <Flex h="80px" mb={3} borderRadius="md" overflow="hidden">
                      {analogousColors.map((color, index) => (
                        <Box key={index} flex={1} bg={color} />
                      ))}
                    </Flex>

                    <SimpleGrid columns={Math.min(5, harmonyCount)} spacing={3}>
                      {analogousColors.map((color, index) => (
                        <VStack key={index} align="flex-start">
                          <HStack>
                            <Box w="16px" h="16px" borderRadius="md" bg={color} />
                            <Text fontSize="sm" fontWeight={index === 0 ? "bold" : "normal"}>
                              {index === 0 ? "Base" : `Color ${index + 1}`}
                            </Text>
                          </HStack>
                          <Text fontSize="xs" fontFamily="mono">
                            {color}
                          </Text>
                          <Tooltip label="Add as new palette">
                            <IconButton
                              aria-label="Add as new palette"
                              icon={<Plus size={14} />}
                              onClick={() => addNewPalette(color)}
                            />
                          </Tooltip>
                        </VStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Triadic Colors Tab */}
                <Box mb={4}>
                  <Text mb={2}>
                    Triadic colors are evenly spaced (120°) around the color wheel. They create a
                    balanced, vibrant look.
                  </Text>

                  <Box
                    p={4}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark)}
                    mt={4}
                  >
                    <Text fontWeight="bold" mb={3}>
                      Triadic Colors
                    </Text>

                    <Flex h="80px" mb={3} borderRadius="md" overflow="hidden">
                      {triadicColors.map((color, index) => (
                        <Box key={index} flex={1} bg={color} />
                      ))}
                    </Flex>

                    <SimpleGrid columns={3} spacing={3}>
                      {triadicColors.map((color, index) => (
                        <VStack key={index} align="flex-start">
                          <HStack>
                            <Box w="16px" h="16px" borderRadius="md" bg={color} />
                            <Text fontSize="sm" fontWeight={index === 0 ? "bold" : "normal"}>
                              {index === 0 ? "Base" : `Color ${index + 1}`}
                            </Text>
                          </HStack>
                          <Text fontSize="xs" fontFamily="mono">
                            {color}
                          </Text>
                          <Tooltip label="Add as new palette">
                            <IconButton
                              aria-label="Add as new palette"
                              icon={<Plus size={14} />}
                              onClick={() => addNewPalette(color)}
                            />
                          </Tooltip>
                        </VStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Monochromatic Colors Tab */}
                <Box mb={4}>
                  <Text mb={2}>
                    Monochromatic colors use the same hue with different lightness and saturation
                    values. They create a cohesive, elegant look.
                  </Text>

                  <Box
                    p={4}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark)}
                    mt={4}
                  >
                    <Text fontWeight="bold" mb={3}>
                      Monochromatic Colors
                    </Text>

                    <Flex h="80px" mb={3} borderRadius="md" overflow="hidden">
                      {monochromaticColors.map((color, index) => (
                        <Box key={index} flex={1} bg={color} />
                      ))}
                    </Flex>

                    <SimpleGrid columns={5} spacing={3}>
                      {monochromaticColors.map((color, index) => (
                        <VStack key={index} align="flex-start">
                          <HStack>
                            <Box w="16px" h="16px" borderRadius="md" bg={color} />
                            <Text fontSize="sm" fontWeight="normal">{`${index * 25}%`}</Text>
                          </HStack>
                          <Text fontSize="xs" fontFamily="mono">
                            {color}
                          </Text>
                          <Tooltip label="Add as new palette">
                            <IconButton
                              aria-label="Add as new palette"
                              icon={<Plus size={14} />}
                              onClick={() => addNewPalette(color)}
                            />
                          </Tooltip>
                        </VStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Custom Gradient Tab */}
                <Box mb={4}>
                  <Text mb={2}>
                    Create a custom gradient between two colors. This can be useful for creating
                    smooth transitions.
                  </Text>

                  <HStack spacing={4} mt={4} mb={4}>
                    <VStack alignItems="flex-start" flex={1}>
                      <Text fontWeight="bold">Start Color</Text>
                      <Select
                        value={gradientStart}
                        onChange={e => setGradientStart(e.target.value)}
                      >
                        <option value={baseColor}>Base Color ({baseColor})</option>
                        <option value={complementaryColor}>
                          Complementary ({complementaryColor})
                        </option>
                        {Object.entries(colorShades).map(([shade, color]) => (
                          <option key={shade} value={color}>
                            {colorKey} {shade} ({color})
                          </option>
                        ))}
                      </Select>
                    </VStack>

                    <VStack alignItems="flex-start" flex={1}>
                      <Text fontWeight="bold">End Color</Text>
                      <Select value={gradientEnd} onChange={e => setGradientEnd(e.target.value)}>
                        <option value={complementaryColor}>
                          Complementary ({complementaryColor})
                        </option>
                        <option value={baseColor}>Base Color ({baseColor})</option>
                        {Object.entries(colorShades).map(([shade, color]) => (
                          <option key={shade} value={color}>
                            {colorKey} {shade} ({color})
                          </option>
                        ))}
                      </Select>
                    </VStack>
                  </HStack>

                  <VStack alignItems="flex-start" mb={6}>
                    <Text fontWeight="bold">Number of Steps</Text>
                    <Slider
                      min={3}
                      max={9}
                      step={2}
                      value={gradientSteps}
                      onChange={setGradientSteps}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text fontSize="sm">{gradientSteps} colors</Text>
                  </VStack>

                  <Box p={4} borderRadius="md" borderWidth="1px">
                    <Text fontWeight="bold" mb={3}>
                      Custom Gradient ({gradientSteps} steps)
                    </Text>

                    <Flex h="80px" mb={3} borderRadius="md" overflow="hidden">
                      {gradientColors.map((color, index) => (
                        <Box key={index} flex={1} bg={color} />
                      ))}
                    </Flex>

                    <SimpleGrid columns={Math.min(5, gradientSteps)} spacing={3}>
                      {gradientColors.map((color, index) => (
                        <VStack key={index} align="flex-start">
                          <HStack>
                            <Box w="16px" h="16px" borderRadius="md" bg={color} />
                            <Text fontSize="sm" fontWeight="normal">{`${Math.round(
                              (100 * index) / (gradientSteps - 1)
                            )}%`}</Text>
                          </HStack>
                          <Text fontSize="xs" fontFamily="mono">
                            {color}
                          </Text>
                          <Tooltip label="Add as new palette">
                            <IconButton
                              aria-label="Add as new palette"
                              icon={<Plus size={14} />}
                              colorScheme="primary"
                              onClick={() => addNewPalette(color)}
                            />
                          </Tooltip>
                        </VStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* New Palette Creation UI */}
          {selectedHarmonyColor && (
            <Box mt={6} p={4} borderWidth="1px" borderRadius="md" borderStyle="dashed">
              <Text fontWeight="bold" mb={3}>
                Create New Palette from Selected Color
              </Text>

              <Flex alignItems="center" mb={4}>
                <Box w="40px" h="40px" borderRadius="md" bg={selectedHarmonyColor} mr={3} />

                <VStack align="flex-start" flex={1}>
                  <Text fontSize="sm">Selected Color</Text>
                  <Text fontFamily="mono">{selectedHarmonyColor}</Text>
                </VStack>

                <Box flex={2}>
                  <Flex alignItems="center">
                    <Text fontSize="sm" mr={2}>
                      New Palette Name:
                    </Text>
                    <input
                      value={newPaletteName}
                      onChange={e => setNewPaletteName(e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid",
                        width: "100%",
                      }}
                      placeholder="Enter palette name"
                    />
                  </Flex>
                </Box>

                <Button
                  ml={3}
                  colorScheme="primary"
                  leftIcon={<Icon as={Check} />}
                  onClick={confirmNewPalette}
                >
                  Add
                </Button>
              </Flex>

              <Text fontSize="xs" fontStyle="italic">
                This will create a complete palette with all 10 shades (50-900) derived from the
                selected color.
              </Text>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ColorHarmonyModal;
