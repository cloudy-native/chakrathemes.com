import { AddColorModal } from "@/components/ThemeEditor/components/AddColorModal";
import { PaletteShade } from "@/components/ThemeEditor/components/PaletteShade";
import ThemeColorSwatch from "@/components/ThemeEditor/components/ThemeColorSwatch";
import { useThemeContext } from "@/context/ThemeContext";
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
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const ColorManagementTab: React.FC = () => {
  const { getColors } = useThemeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Pre-compute color mode values to avoid hook rule violations
  const emptyStateBorderColor = useColorModeValue("gray.200", "gray.600");
  const emptyStateTextColor = useColorModeValue("gray.500", "gray.400");

  const colors = getColors();

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4}>
          <Text mb={6} fontSize="sm">
            Create and manage color palettes for your theme. Add colors manually, extract from
            images, or check out the curated Inspiration tab! You can always copy or tweak the color
            values, but be careful because it&apos;s easy to get messed up.
          </Text>
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
