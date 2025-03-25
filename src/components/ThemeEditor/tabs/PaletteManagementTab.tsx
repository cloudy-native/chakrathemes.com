import { AddPaletteModal } from "@/components/ThemeEditor/components/AddPaletteModal";
import { PaintChip } from "@/components/ThemeEditor/components/ColorSwatch";
import ThemeColorSwatch from "@/components/ThemeEditor/components/ThemeColorSwatch";
import { useThemeContext } from "@/context/ThemeContext";
import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const PaletteManagementTab: React.FC = () => {
  const { getColors } = useThemeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const palettes = getColors();

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4}>
          <Text mb={6} fontSize="sm">
            Create and manage palettes for your theme. Each palette is a range of shades derived
            from a base color. Add palettes manually, extract from images, or check out the curated
            Inspiration tab! You can have as many palettes as you like. Palettes are part of a
            complete ChakraUI theme that also includes typography, space, borders, and so on.
          </Text>
        </GridItem>
        <GridItem>
          <Flex justify="right" mb={2}>
            <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
              Add Palette
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      <Accordion allowMultiple defaultIndex={[]}>
        {palettes.map((palette, index) => (
          <AccordionItem key={palette.colorKey}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="medium">{palette.colorKey}</Text>
                <Box mt={2}>
                  <ThemeColorSwatch
                    colorKey={palette.colorKey}
                    colorShades={palette.colorShades}
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
                  {Object.entries(palette.colorShades)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([shade, color]) => (
                      <PaintChip
                        key={shade}
                        colorKey={palette.colorKey}
                        shade={shade}
                        color={color as string}
                      />
                    ))}
                </SimpleGrid>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Empty state */}
      {palettes.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          borderWidth="1px"
          borderRadius="md"
          borderStyle="dashed"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Text mb={4} color={useColorModeValue("gray.500", "gray.400")}>
            No palettes in your theme yet
          </Text>
          <Button size="sm" colorScheme="blue" leftIcon={<AddIcon />} onClick={onOpen}>
            Add Your First Palette
          </Button>
        </Flex>
      )}

      {/* Add Palette Modal */}
      <AddPaletteModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PaletteManagementTab;
