import React from "react";
import { Box } from "@chakra-ui/react";
import { useThemeContext } from "@/context/ThemeContext";
import { EventCategory, trackEvent } from "@/utils/analytics";
import { PaletteHeader, PaletteList } from "@/components/ThemeEditor/components/palette";
import { useAnalytics } from "@/hooks/useAnalytics";
import { usePaletteModals } from "@/hooks/usePaletteModals";
import { useToast } from "@chakra-ui/react";
import { 
  AccessibilityAnalysisModal, 
  ColorContrastModal, 
  ColorHarmonyModal, 
  RenamePaletteModal 
} from "@/components/ThemeEditor/components";
import { DeletePaletteModal, OverwriteConfirmModal } from "@/components/ThemeEditor/components/modals";
import { AITheme } from "@/types";
import { generateColorPalette } from "@/utils/colorUtils";

/**
 * Tab component for managing color palettes
 * 
 * Refactored version that:
 * 1. Uses the PaletteList component for displaying palettes
 * 2. Uses custom hooks for modal management
 * 3. Delegates rendering to appropriate components
 */
const PaletteManagementTab: React.FC = () => {
  // Context and hooks
  const { getColors, setThemeValues, themeValues } = useThemeContext();
  const { trackColorAction } = useAnalytics();
  const toast = useToast();

  // Get modal managers from custom hook
  const {
    accessibilityModal,
    contrastModal,
    harmonyModal,
    renameModal,
    deleteConfirmModal,
    overwriteConfirmModal
  } = usePaletteModals();
  
  // Reference for pending AI theme
  const [pendingAITheme, setPendingAITheme] = React.useState<AITheme | null>(null);
  
  // Get all palettes from context
  const palettes = getColors ? getColors() : [];

  // Handler for renaming palettes
  const handleRenameClick = (colorKey: string) => {
    renameModal.openModal({ colorKey });
    trackColorAction("open_rename_palette", colorKey);
  };

  // Handler for deleting palettes
  const handleDeleteClick = (colorKey: string) => {
    deleteConfirmModal.openModal({ colorKey });
  };

  // Handler for palette delete confirmation
  const handleDeleteConfirm = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const colorKey = deleteConfirmModal.modalData?.colorKey;
    
    if (colorKey) {
      // Create a new theme object based on the current one
      const newTheme = JSON.parse(JSON.stringify(themeValues));

      // Remove the color palette
      if (newTheme.colors && colorKey in newTheme.colors) {
        const { [colorKey]: _, ...remainingColors } = newTheme.colors;
        newTheme.colors = remainingColors;
      }

      // Update the theme
      setThemeValues(newTheme);

      // Track the delete action
      trackColorAction("delete_palette", colorKey);

      // Show success toast
      toast({
        title: "Palette deleted",
        description: `The ${colorKey} palette has been removed`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Close the dialog
      deleteConfirmModal.closeModal();
    }
  };

  // Handler for AI theme selection
  const handleSelectAITheme = (theme: AITheme) => {
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
      overwriteConfirmModal.openModal({ 
        action: 'applyAITheme',
        data: theme 
      });
    } else {
      // No conflicts, apply the theme directly
      applyAITheme(theme);
    }
  };

  // Apply AI theme function
  const applyAITheme = (theme: AITheme) => {
    // Create a new theme object directly with all four palettes added
    const newTheme = JSON.parse(JSON.stringify(themeValues));

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

    toast({
      title: `Added all palettes from theme`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handler for overwrite confirmation
  const handleOverwriteConfirm = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const action = overwriteConfirmModal.modalData?.action;
    
    if (action === 'applyAITheme' && pendingAITheme) {
      applyAITheme(pendingAITheme);
      setPendingAITheme(null);
    }
    
    overwriteConfirmModal.closeModal();
  };

  // Handler for updating a color shade
  const handleUpdateShade = (colorKey: string, shade: string, value: string) => {
    // Using context to update values
    /* Implementation would go here */
  };

  // Handler for updating the base color of a palette
  const handleUpdateBaseColor = (colorKey: string, baseColor: string) => {
    // Using context to update values
    /* Implementation would go here */
  };

  return (
    <Box>
      {/* Header section */}
      <Box position="relative">
        <PaletteHeader />
      </Box>

      {/* Palette list section */}
      <Box mt={4}>
        <PaletteList
          palettes={palettes}
          onRename={handleRenameClick}
          onDelete={handleDeleteClick}
          onOpenAccessibility={(colorKey, colorShades) => accessibilityModal.openModal({ colorKey, colorShades })}
          onOpenContrast={(colorKey, colorShades) => contrastModal.openModal({ colorKey, colorShades })}
          onOpenHarmony={(colorKey, colorShades) => harmonyModal.openModal({ colorKey, colorShades })}
          onUpdateShade={handleUpdateShade}
          onUpdateBaseColor={handleUpdateBaseColor}
        />
      </Box>

      {/* Modals */}
      {/* Accessibility Analysis Modal */}
      {accessibilityModal.isOpen && accessibilityModal.modalData && (
        <AccessibilityAnalysisModal
          isOpen={accessibilityModal.isOpen}
          onClose={accessibilityModal.closeModal}
          colorKey={accessibilityModal.modalData.colorKey}
          colorShades={accessibilityModal.modalData.colorShades}
        />
      )}

      {/* Color Contrast Modal */}
      {contrastModal.isOpen && contrastModal.modalData && (
        <ColorContrastModal
          isOpen={contrastModal.isOpen}
          onClose={contrastModal.closeModal}
          colorKey={contrastModal.modalData.colorKey}
          colorShades={contrastModal.modalData.colorShades}
        />
      )}

      {/* Color Harmony Modal */}
      {harmonyModal.isOpen && harmonyModal.modalData && (
        <ColorHarmonyModal
          isOpen={harmonyModal.isOpen}
          onClose={harmonyModal.closeModal}
          colorKey={harmonyModal.modalData.colorKey}
          colorShades={harmonyModal.modalData.colorShades}
        />
      )}

      {/* Rename Palette Modal */}
      {renameModal.isOpen && renameModal.modalData && (
        <RenamePaletteModal
          isOpen={renameModal.isOpen}
          onClose={renameModal.closeModal}
          currentName={renameModal.modalData.colorKey}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmModal.isOpen && deleteConfirmModal.modalData && (
        <DeletePaletteModal
          isOpen={deleteConfirmModal.isOpen}
          onClose={deleteConfirmModal.closeModal}
          onConfirm={handleDeleteConfirm}
          paletteName={deleteConfirmModal.modalData.colorKey}
        />
      )}

      {/* Overwrite Confirmation Modal */}
      {overwriteConfirmModal.isOpen && (
        <OverwriteConfirmModal
          isOpen={overwriteConfirmModal.isOpen}
          onClose={overwriteConfirmModal.closeModal}
          onConfirm={handleOverwriteConfirm}
          title="Overwrite Existing Palettes?"
          description="This will replace existing palette colors with new ones from your selection. This action cannot be undone."
        />
      )}
    </Box>
  );
};

export default PaletteManagementTab;