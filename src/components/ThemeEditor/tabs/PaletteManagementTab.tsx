import {
  AddPaletteModal,
  PaletteShade,
  AccessibilityAnalysisModal,
  ColorHarmonyModal,
  PaletteAdjustment,
  PaletteColorContrast,
} from "@/components/ThemeEditor/components";
import ThemeColorSwatch from "@/components/ThemeEditor/components/ThemeColorSwatch";
import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ThemeValues } from "@/types";
import { Plus, Trash, Check, RefreshCw } from "lucide-react";
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
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";

export const PaletteManagementTab: React.FC = () => {
  // Get theme context and functions
  const { getColors, setThemeValues, themeValues } = useThemeContext();
  const { trackColorAction } = useAnalytics();
  const toast = useToast();

  // Add palette modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Accessibility analysis modal state
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = React.useState(false);
  const [accessibilityColorKey, setAccessibilityColorKey] = React.useState<string>("");
  const [accessibilityColorShades, setAccessibilityColorShades] = React.useState<
    Record<string, string>
  >({});

  // Color harmony modal state
  const [isHarmonyModalOpen, setIsHarmonyModalOpen] = React.useState(false);
  const [harmonyColorKey, setHarmonyColorKey] = React.useState<string>("");
  const [harmonyColorShades, setHarmonyColorShades] = React.useState<Record<string, string>>({});

  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [paletteToDelete, setPaletteToDelete] = React.useState<string | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Get all palettes
  const palettes = getColors();

  // Handle delete button click
  const openDeleteDialog = (colorKey: string) => {
    setPaletteToDelete(colorKey);
    setIsDeleteDialogOpen(true);
  };

  // Handle opening the accessibility modal
  const openAccessibilityModal = (colorKey: string, colorShades: Record<string, string>) => {
    setAccessibilityColorKey(colorKey);
    setAccessibilityColorShades(colorShades);
    setIsAccessibilityModalOpen(true);

    // Track analytics
    trackColorAction("open_accessibility_analysis", colorKey);
  };

  // Handle opening the color harmony modal
  const openHarmonyModal = (colorKey: string, colorShades: Record<string, string>) => {
    setHarmonyColorKey(colorKey);
    setHarmonyColorShades(colorShades);
    setIsHarmonyModalOpen(true);

    // Track analytics
    trackColorAction("open_color_harmony", colorKey);
  };

  // Handle delete confirmation
  const handleDeletePalette = () => {
    if (paletteToDelete) {
      // Create a new theme object based on the current one
      const newTheme: ThemeValues = JSON.parse(JSON.stringify(themeValues));

      // Remove the color palette
      if (newTheme.colors && paletteToDelete in newTheme.colors) {
        const { [paletteToDelete]: _, ...remainingColors } = newTheme.colors;
        newTheme.colors = remainingColors;
      }

      // Update the theme
      setThemeValues(newTheme);

      // Track the delete action
      trackColorAction("delete_palette", paletteToDelete);

      // Show success toast
      toast({
        title: "Palette deleted",
        description: `The ${paletteToDelete} palette has been removed`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Close the dialog
      setIsDeleteDialogOpen(false);
      setPaletteToDelete(null);
    }
  };

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
            <Button leftIcon={<Plus size={16} />} colorScheme="blue" onClick={onOpen}>
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
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="medium">{palette.colorKey}</Text>
                  <HStack spacing={1}>
                    {/* Accessibility Analysis Button */}
                    <Tooltip label="Accessibility Analysis" placement="top">
                      <IconButton
                        aria-label="Accessibility Analysis"
                        icon={<Check size={16} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="green"
                        onClick={e => {
                          e.stopPropagation(); // Prevent accordion from toggling
                          openAccessibilityModal(palette.colorKey, palette.colorShades);
                        }}
                      />
                    </Tooltip>

                    {/* Color Harmony Button */}
                    <Tooltip label="Color Harmony" placement="top">
                      <IconButton
                        aria-label="Color Harmony"
                        icon={<RefreshCw size={16} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={e => {
                          e.stopPropagation(); // Prevent accordion from toggling
                          openHarmonyModal(palette.colorKey, palette.colorShades);
                        }}
                      />
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip label="Delete palette" placement="top">
                      <IconButton
                        aria-label="Delete palette"
                        icon={<Trash size={16} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={e => {
                          e.stopPropagation(); // Prevent accordion from toggling
                          openDeleteDialog(palette.colorKey);
                        }}
                      />
                    </Tooltip>
                  </HStack>
                </Flex>
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
              {/* Palette Adjustment Tool */}
              <PaletteAdjustment colorKey={palette.colorKey} colorShades={palette.colorShades} />

              {/* Individual Color Shades */}
              <Box mb={4}>
                <SimpleGrid columns={{ base: 2, sm: 5 }} spacing={4} maxWidth="100%">
                  {Object.entries(palette.colorShades)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([shade, color]) => (
                      <PaletteShade
                        key={shade}
                        colorKey={palette.colorKey}
                        shade={shade}
                        color={color as string}
                      />
                    ))}
                </SimpleGrid>
              </Box>

              {/* Color Contrast Explorer for this palette */}
              <PaletteColorContrast colorKey={palette.colorKey} colorShades={palette.colorShades} />
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
          <Button size="sm" colorScheme="blue" leftIcon={<Plus size={16} />} onClick={onOpen}>
            Add Your First Palette
          </Button>
        </Flex>
      )}

      {/* Add Palette Modal */}
      <AddPaletteModal isOpen={isOpen} onClose={onClose} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Palette
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the <b>{paletteToDelete}</b> palette? This action
              cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeletePalette} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Accessibility Analysis Modal */}
      <AccessibilityAnalysisModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        colorKey={accessibilityColorKey}
        colorShades={accessibilityColorShades}
      />

      {/* Color Harmony Modal */}
      <ColorHarmonyModal
        isOpen={isHarmonyModalOpen}
        onClose={() => setIsHarmonyModalOpen(false)}
        colorKey={harmonyColorKey}
        colorShades={harmonyColorShades}
      />
    </Box>
  );
};

export default PaletteManagementTab;
