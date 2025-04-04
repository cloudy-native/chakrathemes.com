import {
  AccessibilityAnalysisModal,
  ColorContrastModal,
  ColorHarmonyModal,
  PaletteAdjustment,
  PaletteShade,
  RenamePaletteModal,
  ThemeColorSwatch,
} from "@/components/ThemeEditor/components";
import { PaletteHeader } from "@/components/ThemeEditor/components/palette";
import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  borderLight,
  textMuted,
  emptyStateBorder,
  accentColor,
  primaryAccent,
  textSecondary,
} from "@/theme/themeConfiguration";
import { ColorPalette, ThemeValues, ColorSwatch } from "@/types";
import { AITheme } from "@/types";
import { generateColorPalette } from "@/utils/colorUtils";
import { EventCategory, trackEvent } from "@/utils/analytics";

import { ThemePalette } from "@/utils/curatedThemes";
import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  Icon,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Blend, CaptionsOff, Contrast, Edit2, Trash } from "lucide-react";

// Reusable color chip component
interface ColorChipProps {
  color: string;
  size?: string;
}

const ColorChip: React.FC<ColorChipProps> = ({ color, size = "80px" }) => {
  return (
    <Tooltip label={color} placement="top">
      <Box
        width={size}
        height={size}
        bg={color}
        borderWidth="1px"
        borderColor={useColorModeValue(borderLight.light, borderLight.dark)}
        borderRadius="sm"
        boxShadow="md"
        cursor="pointer"
      />
    </Tooltip>
  );
};

const PaletteManagementTab = () => {
  // Get theme context and functions
  const {
    getColors,
    setThemeValues,
    themeValues,
    setNewColorName,
    setBaseColor,
    addNewColorPalette,
  } = useThemeContext();
  const { trackColorAction } = useAnalytics();
  const toast = useToast();

  // Define color mode values to avoid conditional hook calls
  const emptyStateBorderColor = useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark);
  const emptyStateTextColor = useColorModeValue(textMuted.light, textMuted.dark);
  const borderLightColor = useColorModeValue(borderLight.light, borderLight.dark);
  const primaryAccentColor = useColorModeValue(primaryAccent.light, primaryAccent.dark);
  const textSecondaryColor = useColorModeValue(textSecondary.light, textSecondary.dark);
  const accentColorValue = useColorModeValue(accentColor.light, accentColor.dark);

  // Local component state for palette management

  // State for palette selection from AI results
  const { isOpen: isPaletteNameModalOpen, onClose: _onPaletteNameModalClose } = useDisclosure();

  // Custom handler to prevent scroll jumps
  const onPaletteNameModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onPaletteNameModalClose();
  };
  const [selectedPaletteName, setSelectedPaletteName] = React.useState("");
  const [selectedBaseColor, setSelectedBaseColor] = React.useState("");
  const [selectedTheme, _setSelectedTheme] = React.useState<AITheme | null>(null);

  // Overwrite confirmation modal state
  const {
    isOpen: isOverwriteModalOpen,
    onOpen: onOverwriteModalOpen,
    onClose: _onOverwriteModalClose,
  } = useDisclosure();

  // Custom close handler to prevent scroll jumps
  const onOverwriteModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onOverwriteModalClose();
  };

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

  // Color contrast modal state
  const [isContrastModalOpen, setIsContrastModalOpen] = React.useState(false);
  const [contrastColorKey, setContrastColorKey] = React.useState<string>("");
  const [contrastColorShades, setContrastColorShades] = React.useState<Record<string, string>>({});

  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [paletteToDelete, setPaletteToDelete] = React.useState<string | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Close handler for delete dialog
  const closeDeleteDialog = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDeleteDialogOpen(false);
  };

  // Rename palette dialog state
  const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false);
  const [paletteToRename, setPaletteToRename] = React.useState("");

  // Close handler for rename dialog
  const closeRenameDialog = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsRenameDialogOpen(false);
  };

  // State to hold the collection to apply and check for overwrites
  const [collectionToApply, setCollectionToApply] = React.useState<string | null>(null);

  // Get all palettes
  const palettes = getColors ? getColors() : [];

  // Handle delete button click
  const openDeleteDialog = (colorKey: string) => {
    setPaletteToDelete(colorKey);
    setIsDeleteDialogOpen(true);
  };

  // Handle rename button click
  const openRenameDialog = (colorKey: string) => {
    setPaletteToRename(colorKey);
    setIsRenameDialogOpen(true);

    // Track analytics
    trackColorAction("open_rename_palette", colorKey);
  };

  // Handle opening the accessibility modal
  const openAccessibilityModal = (colorKey: string, colorShades: Record<string, string>) => {
    setAccessibilityColorKey(colorKey);
    setAccessibilityColorShades(colorShades);
    setIsAccessibilityModalOpen(true);

    // Track analytics
    trackColorAction("open_accessibility_analysis", colorKey);
  };

  // Handle closing the accessibility modal
  const closeAccessibilityModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsAccessibilityModalOpen(false);
  };

  // Store the currently selected AI theme for confirm/cancel operations
  const [pendingAITheme, setPendingAITheme] = useState<AITheme | null>(null);

  // Function to handle palette selection from AI results - adds all four palettes directly
  const handleSelectPalette = (theme: AITheme) => {
    // Check if any of the palettes already exist in the theme
    const paletteNames = ["primary", "secondary", "accent", "background"];
    const existingPalettes = paletteNames.filter(
      name =>
        themeValues.colors &&
        themeValues.colors[name] &&
        Object.keys(themeValues.colors[name]).length > 0
    );

    // If there are existing palettes, show confirmation dialog
    if (existingPalettes.length > 0) {
      // Store the selected theme for use after confirmation
      setPendingAITheme(theme);
      // Open the overwrite confirmation modal
      onOverwriteModalOpen();
    } else {
      // No conflicts, apply the theme directly
      applyAITheme(theme);
    }
  };

  // Function to apply the AI-generated theme
  const applyAITheme = (theme: AITheme) => {
    // Create a new theme object directly with all four palettes added
    const newTheme: ThemeValues = JSON.parse(JSON.stringify(themeValues));

    // Define the four palettes to add
    const palettes = [
      { name: "primary", value: theme.primary },
      { name: "secondary", value: theme.secondary },
      { name: "accent", value: theme.accent },
      { name: "background", value: theme.background },
    ];

    // Process and add each palette to the theme
    palettes.forEach(palette => {
      // Generate color shades for this palette
      const colorPalette = generateColorPalette(palette.value);

      // Add the color palette to the theme
      if (newTheme.colors) {
        newTheme.colors[palette.name] = colorPalette;
      }

      // Track the event
      trackEvent(EventCategory.COLOR, "add_ai_generated_palette", palette.name);
    });

    // Update the theme with all new palettes at once
    setThemeValues(newTheme);

    // Modal handling has been moved to PaletteActionsContainer

    toast({
      title: `Added all palettes from theme`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to add the selected palette to the theme
  const handleAddSelectedPalette = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!selectedPaletteName || !selectedPaletteName.trim() || !selectedBaseColor || !selectedTheme)
      return;

    // Set the theme context values (this will trigger the addNewColorPalette function)
    setNewColorName(selectedPaletteName);
    setBaseColor(selectedBaseColor);

    // Add the palette
    addNewColorPalette();

    // Track the event
    trackEvent(EventCategory.COLOR, "add_ai_generated_palette", selectedPaletteName);

    // Close the dialogs
    onPaletteNameModalClose();

    toast({
      title: `Added AI-generated palette: ${selectedPaletteName}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle opening the color harmony modal
  const openHarmonyModal = (colorKey: string, colorShades: Record<string, string>) => {
    setHarmonyColorKey(colorKey);
    setHarmonyColorShades(colorShades);
    setIsHarmonyModalOpen(true);

    // Track analytics
    trackColorAction("open_color_harmony", colorKey);
  };

  // Handle closing the color harmony modal
  const closeHarmonyModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsHarmonyModalOpen(false);
  };

  // Handle opening the color contrast modal
  const openContrastModal = (colorKey: string, colorShades: Record<string, string>) => {
    setContrastColorKey(colorKey);
    setContrastColorShades(colorShades);
    setIsContrastModalOpen(true);

    // Track analytics
    trackColorAction("open_color_contrast", colorKey);
  };

  // Handle closing the color contrast modal
  const closeContrastModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsContrastModalOpen(false);
  };

  // Handle delete confirmation
  const handleDeletePalette = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (paletteToDelete) {
      // Create a new theme object based on the current one
      const newTheme: ThemeValues = JSON.parse(JSON.stringify(themeValues));

      // Remove the color palette
      if (newTheme.colors && paletteToDelete && paletteToDelete in newTheme.colors) {
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
      closeDeleteDialog();
      setPaletteToDelete(null);
    }
  };

  const handleApplyCollection = (collection: ThemePalette, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Check if any palette in the collection already exists
    const existingPaletteNames = Object.keys(
      getColors().reduce<Record<string, boolean>>(
        (acc: Record<string, boolean>, curr: ColorSwatch) => {
          acc[curr.colorKey] = true;
          return acc;
        },
        {} as Record<string, boolean>
      )
    );

    const generatedPalette = applyGenerateColorPalette(collection);
    const collectionPaletteNames = Object.keys(generatedPalette);
    const hasOverlappingPalettes = collectionPaletteNames.some(name =>
      existingPaletteNames.includes(name)
    );

    if (hasOverlappingPalettes) {
      // Open the overwrite confirmation modal
      setCollectionToApply(collection.name);
      onOverwriteModalOpen();
    } else {
      // Apply the collection directly
      applyCollection(collection);
    }
  };

  const applyCollection = (collection: ThemePalette) => {
    const generatedPalette = applyGenerateColorPalette(collection);
    const newTheme: ThemeValues = JSON.parse(JSON.stringify(themeValues));

    // Add the new palette to the theme
    newTheme.colors = {
      ...newTheme.colors,
      ...generatedPalette,
    };

    setThemeValues(newTheme);
    toast({
      title: "Collection Applied",
      description: `The ${collection.name} collection has been applied`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onOverwriteModalClose();
  };

  const applyGenerateColorPalette = (collection: ThemePalette): Record<string, ColorPalette> => {
    const generatedPalette: Record<string, ColorPalette> = {};
    Object.keys(collection.colors).forEach(colorKey => {
      const baseColor = collection.colors[colorKey as keyof typeof collection.colors];
      if (typeof baseColor === "string") {
        generatedPalette[colorKey] = generateColorPalette(baseColor);
      }
    });
    return generatedPalette;
  };

  // Using AITheme interface from types file

  const handleConfirmOverwrite = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (collectionToApply) {
      // Handle curated theme collection application
      // Note: themeGroups is now imported in PaletteActionsContainer
      const selectedCollections: ThemePalette[] = [];  // Simplified
      const selectedCollection = selectedCollections
        .find(collection => collection.name === collectionToApply);
      if (selectedCollection) {
        applyCollection(selectedCollection);
      }
    } else if (pendingAITheme) {
      // Handle AI-generated theme application
      applyAITheme(pendingAITheme);
      setPendingAITheme(null); // Clear pending theme
    }
    // Close the confirm dialog
    onOverwriteModalClose();
  };

  return (
    <Box>
      {/* Header with description */}
      <Box position="relative">
        <PaletteHeader />
      </Box>

      <Box mt={4}>
        <Accordion allowMultiple defaultIndex={[]}>
          {palettes.map((palette, _index) => (
            <AccordionItem key={palette.colorKey}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap={2}>
                      <Tooltip label="Rename palette" placement="top">
                        <IconButton
                          aria-label="Rename palette"
                          icon={<Edit2 size={16} />}
                          variant="ghost"
                          onClick={e => {
                            e.stopPropagation(); // Prevent accordion from toggling
                            openRenameDialog(palette.colorKey);
                          }}
                        />
                      </Tooltip>
                      <Text fontWeight="medium">{palette.colorKey}</Text>
                    </Flex>
                    <HStack spacing={1}>
                      {/* Accessibility Analysis Button */}
                      <Tooltip label="Accessibility Analysis" placement="top">
                        <IconButton
                          aria-label="Accessibility Analysis"
                          icon={<Icon as={CaptionsOff} size={16} />}
                          variant="ghost"
                          onClick={e => {
                            e.stopPropagation(); // Prevent accordion from toggling
                            openAccessibilityModal(palette.colorKey, palette.colorShades);
                          }}
                        />
                      </Tooltip>

                      {/* Color Contrast Button */}
                      <Tooltip label="Color Contrast Explorer" placement="top">
                        <IconButton
                          aria-label="Color Contrast Explorer"
                          icon={<Icon as={Contrast} size={16} />}
                          variant="ghost"
                          onClick={e => {
                            e.stopPropagation(); // Prevent accordion from toggling
                            openContrastModal(palette.colorKey, palette.colorShades);
                          }}
                        />
                      </Tooltip>

                      {/* Color Harmony Button */}
                      <Tooltip label="Color Harmony" placement="top">
                        <IconButton
                          aria-label="Color Harmony"
                          icon={<Icon as={Blend} size={16} />}
                          variant="ghost"
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
                          icon={<Icon as={Trash} />}
                          variant="ghost"
                          color={accentColorValue}
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

                {/* Palette Adjustment Tool */}
                <PaletteAdjustment colorKey={palette.colorKey} colorShades={palette.colorShades} />
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
            borderColor={emptyStateBorderColor}
          >
            <Text mb={4} color={emptyStateTextColor}>
              No palettes in your theme yet
            </Text>
          </Flex>
        )}
      </Box>

      {/* Modals have been moved to PaletteActionsContainer */}

      {/* Modal for entering palette name when selecting from AI results */}
      <Modal isOpen={isPaletteNameModalOpen} onClose={onPaletteNameModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Selected Palette</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Palette Name</FormLabel>
              <Input
                value={selectedPaletteName}
                onChange={e => setSelectedPaletteName(e.target.value)}
                placeholder="E.g., primary, secondary, accent"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Base Color</FormLabel>
              <Flex>
                <Button
                  mr={2}
                  leftIcon={
                    <Box w="16px" h="16px" bg={selectedTheme?.primary || ""} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(selectedTheme?.primary || "")}
                  variant={selectedBaseColor === selectedTheme?.primary ? "solid" : "outline"}
                  borderColor={borderLightColor}
                  bg={
                    selectedBaseColor === selectedTheme?.primary
                      ? primaryAccentColor
                      : "transparent"
                  }
                  color={
                    selectedBaseColor === selectedTheme?.primary ? "white" : textSecondaryColor
                  }
                >
                  Primary
                </Button>
                <Button
                  mr={2}
                  leftIcon={
                    <Box w="16px" h="16px" bg={selectedTheme?.secondary || ""} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(selectedTheme?.secondary || "")}
                  variant={selectedBaseColor === selectedTheme?.secondary ? "solid" : "outline"}
                  borderColor={borderLightColor}
                  bg={
                    selectedBaseColor === selectedTheme?.secondary
                      ? primaryAccentColor
                      : "transparent"
                  }
                  color={
                    selectedBaseColor === selectedTheme?.secondary ? "white" : textSecondaryColor
                  }
                >
                  Secondary
                </Button>
                <Button
                  mr={2}
                  leftIcon={
                    <Box w="16px" h="16px" bg={selectedTheme?.accent || ""} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(selectedTheme?.accent || "")}
                  variant={selectedBaseColor === selectedTheme?.accent ? "solid" : "outline"}
                  borderColor={borderLightColor}
                  bg={
                    selectedBaseColor === selectedTheme?.accent ? primaryAccentColor : "transparent"
                  }
                  color={selectedBaseColor === selectedTheme?.accent ? "white" : textSecondaryColor}
                >
                  Accent
                </Button>
                <Button
                  leftIcon={
                    <Box w="16px" h="16px" bg={selectedTheme?.background || ""} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(selectedTheme?.background || "")}
                  variant={selectedBaseColor === selectedTheme?.background ? "solid" : "outline"}
                  borderColor={borderLightColor}
                  bg={
                    selectedBaseColor === selectedTheme?.background
                      ? primaryAccentColor
                      : "transparent"
                  }
                  color={
                    selectedBaseColor === selectedTheme?.background ? "white" : textSecondaryColor
                  }
                >
                  Background
                </Button>
              </Flex>
            </FormControl>

            {selectedBaseColor && (
              <Box mt={4} mb={4}>
                <Text fontWeight="medium" mb={2}>
                  Preview of generated palette:
                </Text>
                <Box overflowX="auto">
                  <Flex>
                    {Object.entries(generateColorPalette(selectedBaseColor)).map(
                      ([shade, color]) => (
                        <Box key={shade} mr={2}>
                          <ColorChip color={color} size="32px" />
                          <Text fontSize="xs" textAlign="center" mt={1}>
                            {shade}
                          </Text>
                        </Box>
                      )
                    )}
                  </Flex>
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onPaletteNameModalClose}>
              Cancel
            </Button>
            <Button
              bg={useColorModeValue(primaryAccent.light, primaryAccent.dark)}
              color="white"
              onClick={handleAddSelectedPalette}
              isDisabled={!selectedPaletteName.trim() || !selectedBaseColor}
            >
              Add to Theme
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
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
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
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
        onClose={closeAccessibilityModal}
        colorKey={accessibilityColorKey}
        colorShades={accessibilityColorShades}
      />

      {/* Color Harmony Modal */}
      <ColorHarmonyModal
        isOpen={isHarmonyModalOpen}
        onClose={closeHarmonyModal}
        colorKey={harmonyColorKey}
        colorShades={harmonyColorShades}
      />

      {/* Rename Palette Modal */}
      <RenamePaletteModal
        isOpen={isRenameDialogOpen}
        onClose={closeRenameDialog}
        currentName={paletteToRename}
      />

      {/* Color Contrast Modal */}
      <ColorContrastModal
        isOpen={isContrastModalOpen}
        onClose={closeContrastModal}
        colorKey={contrastColorKey}
        colorShades={contrastColorShades}
      />

      {/* Collections Modal has been moved to PaletteActionsContainer */}

      {/* Overwrite Confirmation Modal */}
      <AlertDialog
        isOpen={isOverwriteModalOpen}
        onClose={onOverwriteModalClose}
        leastDestructiveRef={cancelRef}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Overwrite Existing Palettes?
            </AlertDialogHeader>

            <AlertDialogBody>
              This collection contains palettes with names that already exist in your theme. Do you
              want to overwrite the existing color palettes with the new ones? This will replace any
              existing primary, secondary, accent, and background colors.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onOverwriteModalClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmOverwrite} ml={3}>
                Overwrite
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default PaletteManagementTab;
