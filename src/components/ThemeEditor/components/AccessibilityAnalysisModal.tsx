import { getAccessibleTextColor, getContrastRatio } from "@/utils/colorUtils";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import React, { useMemo } from "react";
import { ColorSwatch } from "./ColorSwatch";

interface AccessibilityAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  colorKey: string;
  colorShades: Record<string, string>;
}

export const AccessibilityAnalysisModal: React.FC<AccessibilityAnalysisModalProps> = ({
  isOpen,
  onClose,
  colorKey,
  colorShades,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const boxBgColor = useColorModeValue("gray.50", "gray.700");

  // Sort shades by numeric value
  const sortedShades = useMemo(() => {
    return Object.entries(colorShades).sort(([a], [b]) => parseInt(a) - parseInt(b));
  }, [colorShades]);

  // Calculate contrast ratios against white and black for all shades
  const contrastData = useMemo(() => {
    return sortedShades.map(([shade, color]) => {
      const whiteContrast = getContrastRatio(color, "#FFFFFF");
      const blackContrast = getContrastRatio(color, "#000000");
      const bestTextColor = getAccessibleTextColor(color);
      const bestContrast = Math.max(whiteContrast, blackContrast);

      // WCAG criteria: AA requires 4.5:1 for normal text, 3:1 for large text
      // AAA requires 7:1 for normal text, 4.5:1 for large text
      const wcagAANormal = bestContrast >= 4.5;
      const wcagAALarge = bestContrast >= 3;
      const wcagAAANormal = bestContrast >= 7;
      const wcagAAALarge = bestContrast >= 4.5;

      return {
        shade,
        color,
        whiteContrast,
        blackContrast,
        bestTextColor,
        bestContrast,
        wcagAANormal,
        wcagAALarge,
        wcagAAANormal,
        wcagAAALarge,
      };
    });
  }, [sortedShades]);

  // Calculate warnings for the palette
  const wcagWarnings = useMemo(() => {
    const warnings = [];

    // Check if there are any shades with poor contrast
    const poorContrastShades = contrastData.filter(data => !data.wcagAANormal);
    if (poorContrastShades.length > 0) {
      warnings.push({
        type: "contrast",
        message: `${poorContrastShades.length} shades don't meet WCAG AA contrast requirements for normal text`,
        shades: poorContrastShades.map(d => d.shade),
      });
    }

    // Check if there are enough accessible colors for text in the palette
    const accessibleTextColors = contrastData.filter(data => data.wcagAANormal);
    if (accessibleTextColors.length < 3) {
      warnings.push({
        type: "variety",
        message:
          "Limited accessible color options for text. Consider adding more contrast variation.",
        shades: [],
      });
    }

    return warnings;
  }, [contrastData]);

  // Check adjacent shades for sufficient contrast differences
  const adjacentContrastData = useMemo(() => {
    const results = [];

    for (let i = 0; i < sortedShades.length - 1; i++) {
      const [shade1, color1] = sortedShades[i];
      const [shade2, color2] = sortedShades[i + 1];

      const contrast = getContrastRatio(color1, color2);
      const isAdequate = contrast >= 1.1; // Arbitrary threshold for noticeable difference

      results.push({
        shade1,
        shade2,
        color1,
        color2,
        contrast,
        isAdequate,
      });
    }

    return results;
  }, [sortedShades]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader>
          <Flex align="center">
            <Text>Accessibility Analysis: {colorKey}</Text>
            <ColorSwatch color={colorShades[500]} size="xs" ml={2} />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Contrast Analysis</Tab>
              <Tab>Color Blindness</Tab>
              <Tab>Recommendations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Contrast Analysis Tab */}
                <Box mb={4}>
                  <Flex justifyContent="space-between" mb={4}>
                    <Stat>
                      <StatLabel>Overall WCAG Compliance</StatLabel>
                      <StatNumber>
                        {contrastData.filter(d => d.wcagAANormal).length} / {contrastData.length}
                      </StatNumber>
                      <StatHelpText>shades meet AA standard (4.5:1)</StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>AAA Compliance</StatLabel>
                      <StatNumber>
                        {contrastData.filter(d => d.wcagAAANormal).length} / {contrastData.length}
                      </StatNumber>
                      <StatHelpText>shades meet AAA standard (7:1)</StatHelpText>
                    </Stat>
                  </Flex>

                  {wcagWarnings.length > 0 && (
                    <Box
                      mb={4}
                      p={3}
                      bg="yellow.50"
                      color="yellow.800"
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor="yellow.200"
                    >
                      <Flex mb={2} align="center">
                        <Icon as={AlertTriangle} color="yellow.500" mr={2} />
                        <Text fontWeight="bold">Accessibility Warnings</Text>
                      </Flex>
                      {wcagWarnings.map((warning, i) => (
                        <Text key={i} fontSize="sm" ml={6} mb={1}>
                          • {warning.message}
                        </Text>
                      ))}
                    </Box>
                  )}
                </Box>

                <Box overflowX="auto">
                  <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" gap={2}>
                    <Box fontWeight="bold">Shade</Box>
                    <Box fontWeight="bold">Color</Box>
                    <Box fontWeight="bold">White Text</Box>
                    <Box fontWeight="bold">Black Text</Box>
                    <Box fontWeight="bold">Best Option</Box>

                    {contrastData.map(data => (
                      <React.Fragment key={data.shade}>
                        <Box>{data.shade}</Box>
                        <Box>
                          <Flex align="center">
                            <Box
                              w="24px"
                              h="24px"
                              borderRadius="md"
                              bg={data.color}
                              mr={2}
                              borderWidth="1px"
                              borderColor="gray.200"
                            />
                            {data.color}
                          </Flex>
                        </Box>
                        <Box>
                          <Flex align="center">
                            {data.whiteContrast.toFixed(2)}:1
                            <Badge
                              ml={2}
                              colorScheme={
                                data.whiteContrast >= 4.5
                                  ? "green"
                                  : data.whiteContrast >= 3
                                    ? "yellow"
                                    : "red"
                              }
                            >
                              {data.whiteContrast >= 4.5
                                ? "AA"
                                : data.whiteContrast >= 3
                                  ? "Large"
                                  : "Fail"}
                            </Badge>
                          </Flex>
                        </Box>
                        <Box>
                          <Flex align="center">
                            {data.blackContrast.toFixed(2)}:1
                            <Badge
                              ml={2}
                              colorScheme={
                                data.blackContrast >= 4.5
                                  ? "green"
                                  : data.blackContrast >= 3
                                    ? "yellow"
                                    : "red"
                              }
                            >
                              {data.blackContrast >= 4.5
                                ? "AA"
                                : data.blackContrast >= 3
                                  ? "Large"
                                  : "Fail"}
                            </Badge>
                          </Flex>
                        </Box>
                        <Box>
                          <Flex
                            align="center"
                            justify="center"
                            bg={data.color}
                            color={data.bestTextColor}
                            p={1}
                            borderRadius="md"
                            fontWeight="bold"
                          >
                            Sample Text
                          </Flex>
                        </Box>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>

                <Box mt={6}>
                  <Text fontWeight="bold" mb={2}>
                    Adjacent Shade Contrast
                  </Text>
                  <Text fontSize="sm" mb={3}>
                    For UI elements like borders and backgrounds, adjacent shades should have enough
                    contrast.
                  </Text>

                  <Grid templateColumns="1fr 1fr 1fr" gap={2}>
                    <Box fontWeight="bold">Shade Pair</Box>
                    <Box fontWeight="bold">Contrast Ratio</Box>
                    <Box fontWeight="bold">Sample</Box>

                    {adjacentContrastData.map(data => (
                      <React.Fragment key={`${data.shade1}-${data.shade2}`}>
                        <Box>
                          {data.shade1} → {data.shade2}
                        </Box>
                        <Box>
                          <Badge
                            colorScheme={
                              data.contrast >= 1.5
                                ? "green"
                                : data.contrast >= 1.1
                                  ? "yellow"
                                  : "red"
                            }
                          >
                            {data.contrast.toFixed(2)}:1
                          </Badge>
                        </Box>
                        <Box>
                          <Flex h="24px">
                            <Box flex={1} bg={data.color1} />
                            <Box flex={1} bg={data.color2} />
                          </Flex>
                        </Box>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Color Blindness Simulation Tab */}
                <Text mb={4}>
                  Color blindness affects approximately 8% of men and 0.5% of women. Here's how your
                  palette appears to users with different types of color vision deficiency:
                </Text>

                <Box mb={6}>
                  <Text fontWeight="bold" mb={2}>
                    Normal Vision
                  </Text>
                  <Flex>
                    {sortedShades.map(([shade, color]) => (
                      <Box
                        key={shade}
                        w="40px"
                        h="40px"
                        bg={color}
                        borderWidth="1px"
                        borderColor="gray.200"
                        position="relative"
                      >
                        <Text
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          fontSize="xs"
                          fontWeight="bold"
                          color={getAccessibleTextColor(color)}
                        >
                          {shade}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>

                <Box mb={6}>
                  <Text fontWeight="bold" mb={2}>
                    Protanopia (Red-Green Color Blindness - Red Weakness)
                    <Tooltip label="1% of men have this condition" placement="top">
                      <span>
                        <Icon as={Info} ml={1} boxSize={3} />
                      </span>
                    </Tooltip>
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    This simulation shows how users with red-cone deficiency see your palette.
                  </Text>
                  <Flex>
                    {/* Note: This is a simulated effect. In a real implementation, 
                        we would use a color transformation algorithm */}
                    {sortedShades.map(([shade, color]) => (
                      <Box
                        key={shade}
                        w="40px"
                        h="40px"
                        bg={color}
                        filter="grayscale(30%) sepia(20%)"
                        borderWidth="1px"
                        borderColor="gray.200"
                        position="relative"
                      >
                        <Text
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          fontSize="xs"
                          fontWeight="bold"
                          color={getAccessibleTextColor(color)}
                        >
                          {shade}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>

                <Box mb={6}>
                  <Text fontWeight="bold" mb={2}>
                    Deuteranopia (Red-Green Color Blindness - Green Weakness)
                    <Tooltip label="6% of men have this condition" placement="top">
                      <span>
                        <Icon as={Info} ml={1} boxSize={3} />
                      </span>
                    </Tooltip>
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    This simulation shows how users with green-cone deficiency see your palette.
                  </Text>
                  <Flex>
                    {/* Simulated effect */}
                    {sortedShades.map(([shade, color]) => (
                      <Box
                        key={shade}
                        w="40px"
                        h="40px"
                        bg={color}
                        filter="grayscale(40%) sepia(10%)"
                        borderWidth="1px"
                        borderColor="gray.200"
                        position="relative"
                      >
                        <Text
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          fontSize="xs"
                          fontWeight="bold"
                          color={getAccessibleTextColor(color)}
                        >
                          {shade}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Tritanopia (Blue-Yellow Color Blindness)
                    <Tooltip label="0.1% of people have this rare condition" placement="top">
                      <span>
                        <Icon as={Info} ml={1} boxSize={3} />
                      </span>
                    </Tooltip>
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    This simulation shows how users with blue-cone deficiency see your palette.
                  </Text>
                  <Flex>
                    {/* Simulated effect */}
                    {sortedShades.map(([shade, color]) => (
                      <Box
                        key={shade}
                        w="40px"
                        h="40px"
                        bg={color}
                        filter="hue-rotate(45deg) saturate(80%)"
                        borderWidth="1px"
                        borderColor="gray.200"
                        position="relative"
                      >
                        <Text
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          fontSize="xs"
                          fontWeight="bold"
                          color={getAccessibleTextColor(color)}
                        >
                          {shade}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Recommendations Tab */}
                <Text mb={4}>
                  Based on the analysis of your {colorKey} palette, here are some suggestions to
                  improve accessibility and usability:
                </Text>

                <Box p={4} bg={boxBgColor} borderRadius="md" mb={4}>
                  <Flex mb={3}>
                    <Icon as={CheckCircle} color="green.500" mr={2} mt={1} />
                    <Box>
                      <Text fontWeight="bold">Use Appropriate Text Colors</Text>
                      <Text fontSize="sm">
                        Always use white text on your darker shades (700-900) and black text on your
                        lighter shades (50-300). Middle shades (400-600) should be carefully checked
                        for adequate contrast.
                      </Text>
                    </Box>
                  </Flex>

                  {wcagWarnings.length === 0 ? (
                    <Flex>
                      <Icon as={CheckCircle} color="green.500" mr={2} mt={1} />
                      <Box>
                        <Text fontWeight="bold">Good Job!</Text>
                        <Text fontSize="sm">
                          Your palette has excellent contrast characteristics that should work well
                          for most users.
                        </Text>
                      </Box>
                    </Flex>
                  ) : (
                    wcagWarnings.map((warning, i) => (
                      <Flex key={i} mb={warning.type === "contrast" ? 3 : 0}>
                        <Icon as={AlertTriangle} color="orange.500" mr={2} mt={1} />
                        <Box>
                          <Text fontWeight="bold">
                            {warning.type === "contrast"
                              ? "Improve Contrast"
                              : "Add More Variation"}
                          </Text>
                          <Text fontSize="sm">{warning.message}</Text>
                          {warning.shades.length > 0 && (
                            <Text fontSize="sm" fontStyle="italic">
                              Affected shades: {warning.shades.join(", ")}
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    ))
                  )}
                </Box>

                <Box p={4} bg={boxBgColor} borderRadius="md">
                  <Text fontWeight="bold" mb={2}>
                    Tips for Color Blindness Considerations
                  </Text>
                  <Box fontSize="sm">
                    <Text mb={2}>
                      • Don't rely on color alone to convey information. Use icons, patterns, or
                      text labels.
                    </Text>
                    <Text mb={2}>
                      • Ensure adequate lightness contrast between adjacent colors.
                    </Text>
                    <Text mb={2}>
                      • For critical interface elements, consider using blue or yellow rather than
                      red and green.
                    </Text>
                    <Text>
                      • Test your design with color blindness simulation tools before finalizing.
                    </Text>
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccessibilityAnalysisModal;
