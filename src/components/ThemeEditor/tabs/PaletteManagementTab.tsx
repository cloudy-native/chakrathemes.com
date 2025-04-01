import {
  AccessibilityAnalysisModal,
  AddPaletteModal,
  ColorContrastModal,
  ColorHarmonyModal,
  PaletteAdjustment,
  PaletteShade,
  RenamePaletteModal,
} from "@/components/ThemeEditor/components";
import ThemeColorSwatch from "@/components/ThemeEditor/components/ThemeColorSwatch";
import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ColorPalette, ThemeValues, ColorSwatch } from "@/types";
import { generateColorPalette } from "@/utils/colorUtils";
import { EventCategory, trackEvent } from "@/utils/analytics";

interface AITheme {
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}
import { themeGroups, ThemePalette } from "@/utils/curatedThemes";
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
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Blend,
  CaptionsOff,
  Contrast,
  Edit2,
  Plus,
  SwatchBook,
  Trash,
  BotMessageSquare,
} from "lucide-react";

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
        borderColor="gray.300"
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
  const emptyStateBorderColor = useColorModeValue("gray.200", "gray.600");
  const emptyStateTextColor = useColorModeValue("gray.500", "gray.400");

  // Add palette modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Collections modal state
  const {
    isOpen: isCollectionsModalOpen,
    onOpen: onCollectionsModalOpen,
    onClose: onCollectionsModalClose,
  } = useDisclosure();

  // AI dialog state
  const {
    isOpen: isAIModalOpen,
    onOpen: onAIModalOpen,
    onClose: _onAIModalClose, // Rename the original handler
  } = useDisclosure();

  // Custom modal close handler that doesn't clear the AI prompt or results
  const onAIModalClose = () => {
    // Just close the modal without clearing state
    _onAIModalClose();
  };
  const [aiPrompt, setAIPrompt] = React.useState("");
  const [aiThemeResults, setAIThemeResults] = React.useState<AITheme[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationError, setGenerationError] = React.useState<string | null>(null);

  // State for palette selection from AI results
  const {
    isOpen: isPaletteNameModalOpen,
    onClose: onPaletteNameModalClose,
  } = useDisclosure();
  const [selectedPaletteName, setSelectedPaletteName] = React.useState("");
  const [selectedBaseColor, setSelectedBaseColor] = React.useState("");
  const [selectedTheme, setSelectedTheme] = React.useState<AITheme | null>(null);

  // Overwrite confirmation modal state
  const {
    isOpen: isOverwriteModalOpen,
    onOpen: onOverwriteModalOpen,
    onClose: onOverwriteModalClose,
  } = useDisclosure();

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

  // Rename palette dialog state
  const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false);
  const [paletteToRename, setPaletteToRename] = React.useState("");

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

  // Store the currently selected AI theme for confirm/cancel operations
  const [pendingAITheme, setPendingAITheme] = useState<AITheme | null>(null);

  // Function to handle palette selection from AI results - adds all four palettes directly
  const handleSelectPalette = (theme: AITheme) => {
    // Check if any of the palettes already exist in the theme
    const paletteNames = ["primary", "secondary", "accent", "background"];
    const existingPalettes = paletteNames.filter(name => 
      themeValues.colors && themeValues.colors[name] && Object.keys(themeValues.colors[name]).length > 0
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

    // Close the AI modal
    onAIModalClose();

    toast({
      title: `Added all palettes from theme`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to add the selected palette to the theme
  const handleAddSelectedPalette = () => {
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

  // Handle opening the color contrast modal
  const openContrastModal = (colorKey: string, colorShades: Record<string, string>) => {
    setContrastColorKey(colorKey);
    setContrastColorShades(colorShades);
    setIsContrastModalOpen(true);

    // Track analytics
    trackColorAction("open_color_contrast", colorKey);
  };

  // Handle delete confirmation
  const handleDeletePalette = () => {
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
      setIsDeleteDialogOpen(false);
      setPaletteToDelete(null);
    }
  };

  const handleApplyCollection = (collection: ThemePalette) => {
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
    onCollectionsModalClose();
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

  const handleConfirmOverwrite = () => {
    if (collectionToApply) {
      // Handle curated theme collection application
      const selectedCollection = themeGroups
        .flatMap(group => group.palettes)
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
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={4}>
          <Text mb={6} fontSize="sm">
            Color palettes define the visual identity of your theme. Name your palettes
            &quot;primary&quot;, &quot;secondary&quot;, &quot;accent&quot;, and
            &quot;background&quot; to see them applied in Preview & Download tab.
          </Text>
        </GridItem>
        <GridItem>
          <Flex justify="right" mb={2}>
            <ButtonGroup>
              <Button
                size="md"
                colorScheme="primary"
                leftIcon={<Icon as={Plus} />}
                onClick={onOpen}
              >
                Add Palette
              </Button>
              <Button
                size="md"
                colorScheme="primary"
                leftIcon={<Icon as={SwatchBook} />}
                onClick={onCollectionsModalOpen}
              >
                Palette Collections
              </Button>
              <Box position="relative" display="inline-block">
                <Button
                  size="md"
                  colorScheme="primary"
                  leftIcon={<Icon as={BotMessageSquare} />}
                  onClick={onAIModalOpen}
                  px={4}
                  fontWeight="bold"
                >
                  AI Theme Generator
                </Button>
                <Box
                  position="absolute"
                  top="-8px"
                  right="-10px"
                  bg="red.500"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  px={2}
                  py={1}
                  borderRadius="full"
                  boxShadow="md"
                  zIndex={1}
                >
                  NEW
                </Box>
              </Box>
            </ButtonGroup>
          </Flex>
        </GridItem>
      </Grid>

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

      {/* Add Palette Modal */}
      <AddPaletteModal isOpen={isOpen} onClose={onClose} />

      {/* AI Dialog */}
      <Modal isOpen={isAIModalOpen} onClose={onAIModalClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Theme Generator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Describe the theme you want to create, and AI will suggest color palettes for you.
            </Text>
            <Box mb={6}>
              <Flex>
                <Box flex="1" mr={2}>
                  <Input
                    placeholder="Describe your theme idea..."
                    value={aiPrompt}
                    onChange={e => setAIPrompt(e.target.value.slice(0, 500))}
                    maxLength={500}
                  />
                  <Text fontSize="xs" textAlign="right" color="gray.500" mt={1}>
                    {aiPrompt.length}/500 characters
                  </Text>
                </Box>
                <Button
                  colorScheme="primary"
                  isLoading={isGenerating}
                  loadingText="Generating"
                  onClick={async () => {
                    console.log("AI Prompt:", aiPrompt);
                    if (!aiPrompt.trim()) {
                      toast({
                        title: "Error",
                        description: "Please enter a description for your theme",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                      return;
                    }

                    setIsGenerating(true);
                    setGenerationError(null);

                    try {
                      const response = await fetch(
                        "https://pnl3jv9t9f.execute-api.ap-southeast-1.amazonaws.com/prod/generate-theme",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ prompt: aiPrompt }),
                        }
                      );

                      if (!response.ok) {
                        throw new Error(`API error: ${response.status}`);
                      }

                      const data = await response.json();
                      console.log("AI Response:", data);
                      // Access the themes array from the response
                      if (data.themes && Array.isArray(data.themes)) {
                        setAIThemeResults(data.themes);
                      } else {
                        console.error("Unexpected response format:", data);
                        setGenerationError("Received an invalid response format from the API");
                      }

                      // Track analytics
                      trackColorAction("ai_generate_theme", aiPrompt);
                    } catch (error) {
                      const errorMessage = error instanceof Error ? error.message : String(error);
                      setGenerationError(errorMessage);
                      toast({
                        title: "Error generating theme",
                        description: errorMessage,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                      console.error("Error generating theme:", error);
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                >
                  Generate
                </Button>
              </Flex>
            </Box>

            {generationError && (
              <Box mt={4} p={3} bg="red.50" color="red.600" borderRadius="md">
                <Text fontWeight="medium">Error generating theme:</Text>
                <Text>{generationError}</Text>
              </Box>
            )}

            {!generationError && isGenerating && (
              <Flex justifyContent="center" mt={6} mb={6}>
                <Text>Generating theme suggestions...</Text>
              </Flex>
            )}

            {!generationError && !isGenerating && aiThemeResults && aiThemeResults.length > 0 && (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Description</Th>
                      <Th>Primary</Th>
                      <Th>Secondary</Th>
                      <Th>Accent</Th>
                      <Th>Background</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {aiThemeResults.map((theme, index) => (
                      <Tr key={index}>
                        <Td maxWidth="500px">{theme.description}</Td>
                        <Td>
                          <ColorChip color={theme.primary} />
                        </Td>
                        <Td>
                          <ColorChip color={theme.secondary} />
                        </Td>
                        <Td>
                          <ColorChip color={theme.accent} />
                        </Td>
                        <Td>
                          <ColorChip color={theme.background} />
                        </Td>
                        <Td>
                          <Button
                            size="sm"
                            colorScheme="primary"
                            onClick={() => handleSelectPalette(theme)}
                          >
                            Use theme
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}

            {!generationError &&
              !isGenerating &&
              aiThemeResults &&
              aiThemeResults.length === 0 &&
              aiPrompt &&
              aiPrompt.trim() !== "" && (
                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" borderStyle="dashed">
                  <Text textAlign="center" color="gray.500">
                    No theme suggestions generated yet. Click the Generate button to get started.
                  </Text>
                </Box>
              )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onAIModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
                  colorScheme="gray"
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
                  colorScheme="gray"
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
                  colorScheme="gray"
                >
                  Accent
                </Button>
                <Button
                  leftIcon={
                    <Box w="16px" h="16px" bg={selectedTheme?.background || ""} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(selectedTheme?.background || "")}
                  variant={selectedBaseColor === selectedTheme?.background ? "solid" : "outline"}
                  colorScheme="gray"
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
              colorScheme="primary"
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

      {/* Rename Palette Modal */}
      <RenamePaletteModal
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        currentName={paletteToRename}
      />

      {/* Color Contrast Modal */}
      <ColorContrastModal
        isOpen={isContrastModalOpen}
        onClose={() => setIsContrastModalOpen(false)}
        colorKey={contrastColorKey}
        colorShades={contrastColorShades}
      />

      {/* Collections Modal */}
      <Modal isOpen={isCollectionsModalOpen} onClose={onCollectionsModalClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Curated Color Collections</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowMultiple>
              {themeGroups.map(group => (
                <AccordionItem key={group.groupName}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {group.groupName}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      {group.palettes.map(collection => (
                        <Box
                          key={collection.name}
                          p={4}
                          borderWidth="1px"
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ shadow: "md" }}
                          onClick={() => handleApplyCollection(collection)}
                          transition="all 0.2s"
                        >
                          <Text fontWeight="bold" mb={2}>
                            {collection.name}
                          </Text>
                          <SimpleGrid columns={4} spacing={2}>
                            {Object.keys(collection.colors).map(colorKey => (
                              <Box key={colorKey}>
                                {Object.values(
                                  generateColorPalette(
                                    collection.colors[colorKey as keyof typeof collection.colors]
                                  )
                                )
                                  .slice(4, 5)
                                  .map(color => (
                                    <Box
                                      key={color}
                                      w="100%"
                                      h="20px"
                                      bg={color}
                                      borderRadius="sm"
                                    />
                                  ))}
                              </Box>
                            ))}
                          </SimpleGrid>
                          <Text fontSize="sm" mb={4}>
                            {collection.description}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCollectionsModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Overwrite Confirmation Modal */}
      <AlertDialog
        isOpen={isOverwriteModalOpen}
        onClose={onOverwriteModalClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Overwrite Existing Palettes?
            </AlertDialogHeader>

            <AlertDialogBody>
              This collection contains palettes with names that already exist in your theme. Do you
              want to overwrite the existing color palettes with the new ones?
              
              This will replace any existing primary, secondary, accent, and background colors.
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
