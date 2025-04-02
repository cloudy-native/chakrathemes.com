import { AddColorModal } from "@/components/ThemeEditor/components/AddColorModal";
import { PaletteShade } from "@/components/ThemeEditor/components/PaletteShade";
import ThemeColorSwatch from "@/components/ThemeEditor/components/ThemeColorSwatch";
import { useThemeContext } from "@/context/ThemeContext";
import { emptyStateBorder, textMuted, primaryAccent } from "@/theme/themeConfiguration";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const ColorManagementTab: React.FC = () => {
  const { getColors } = useThemeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use theme constants for consistent styling
  const emptyStateBorderColor = useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark);
  const emptyStateTextColor = useColorModeValue(textMuted.light, textMuted.dark);
  const primaryColor = useColorModeValue(primaryAccent.light, primaryAccent.dark);

  const colors = getColors();

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4}>
          <HStack spacing={4} mb={6} overflow="hidden" position="relative" alignItems="center">
            <Box
              w="3px"
              h="24px"
              bgGradient={`linear(to-b, ${primaryColor}, purple.500)`}
              borderRadius="full"
            />
            <Box flex="1">
              <Tabs variant="unstyled" size="sm" colorScheme="primary" defaultIndex={0}>
                <TabList>
                  <Tab
                    _selected={{ color: primaryColor, fontWeight: "semibold" }}
                    fontSize="xs"
                    px={2}
                  >
                    OVERVIEW
                  </Tab>
                  <Tab
                    _selected={{ color: primaryColor, fontWeight: "semibold" }}
                    fontSize="xs"
                    px={2}
                  >
                    TIPS
                  </Tab>
                </TabList>
                <TabPanels mt={1}>
                  <TabPanel p={0}>
                    <Text fontSize="sm" color={emptyStateTextColor} fontWeight="medium">
                      Create custom color palettes for your theme. Name your palettes to see them
                      applied instantly in the preview.
                    </Text>
                  </TabPanel>
                  <TabPanel p={0}>
                    <Text fontSize="sm" color={emptyStateTextColor} fontWeight="medium">
                      Use{" "}
                      <Text as="span" fontWeight="bold" color={primaryColor}>
                        &quot;primary&quot;
                      </Text>{" "}
                      for main UI elements,
                      <Text as="span" fontWeight="bold" color={primaryColor}>
                        &quot;accent&quot;
                      </Text>{" "}
                      for highlights, and
                      <Text as="span" fontWeight="bold" color={primaryColor}>
                        &quot;gray&quot;
                      </Text>{" "}
                      for text and backgrounds.
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </HStack>
        </GridItem>
        <GridItem>
          <Flex justify="right" mb={2}>
            <Button leftIcon={<Plus size={16} />} colorScheme="primary" onClick={onOpen}>
              Add Color Palette
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      <Accordion allowMultiple defaultIndex={[]}>
        {colors.map((colorSwatch, index) => (
          <AccordionItem key={colorSwatch.colorKey}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="medium">{colorSwatch.colorKey}</Text>
                <Box mt={2}>
                  <ThemeColorSwatch
                    colorKey={colorSwatch.colorKey}
                    colorShades={colorSwatch.colorShades}
                    isCompact={true}
                    size="lg"
                  />
                </Box>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box mb={4}>
                <SimpleGrid columns={{ base: 2, sm: 5 }} spacing={4} maxWidth="100%">
                  {Object.entries(colorSwatch.colorShades)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([shade, color]) => (
                      <PaletteShade
                        key={shade}
                        colorKey={colorSwatch.colorKey}
                        shade={shade}
                        color={color as string}
                      />
                    ))}
                </SimpleGrid>
                {index < colors.length - 1 && <Divider mt={4} />}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Empty state */}
      {colors.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          borderWidth="1px"
          borderRadius="md"
          borderStyle="dashed"
          borderColor={emptyStateBorderColor}
        >
          <Text mb={4} color={emptyStateTextColor}>
            No colors in your palette yet
          </Text>
          <Button size="sm" colorScheme="primary" leftIcon={<Plus size={16} />} onClick={onOpen}>
            Add Your First Color
          </Button>
        </Flex>
      )}

      {/* Add Color Modal */}
      <AddColorModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ColorManagementTab;
