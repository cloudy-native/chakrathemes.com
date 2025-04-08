import AIThemeGeneratorModal from "@/components/ThemeEditor/components/AIThemeGeneratorModal";
import ColorPickerModal from "@/components/ThemeEditor/components/ColorPickerModal";
import CuratedThemesModal from "@/components/ThemeEditor/components/CuratedThemesModal";
import ImageColorPickerModal from "@/components/ThemeEditor/components/ImageColorPickerModal";
import InspirationPaletteModal from "@/components/ThemeEditor/components/InspirationPaletteModal";
import { useThemeContext } from "@/context/ThemeContext";
import { AITheme } from "@/types";
import { EventCategory, trackEvent } from "@/utils/analytics";
import { generateColorPalette } from "@/utils/colorUtils";
import { useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import PaletteActionButtons from "./PaletteActionButtons";

/**
 * Interface for components that respond to tab selection
 */
interface NavigationProps {
  onApplyAITheme?: (theme: AITheme) => void;
}

/**
 * Self-contained component that includes all the palette action buttons
 * and their associated modals and logic
 */
const PaletteActionsContainer: React.FC<NavigationProps> = ({ onApplyAITheme }) => {
  const { setThemeValues, themeValues, setNewColorName } = useThemeContext();
  const toast = useToast();

  // Function to apply the AI-generated theme
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
  };

  // Color picker modal state
  const {
    isOpen: isColorPickerModalOpen,
    onOpen: onColorPickerModalOpen,
    onClose: _onColorPickerModalClose,
  } = useDisclosure();

  // Image color picker modal state
  const {
    isOpen: isImagePickerModalOpen,
    onOpen: onImagePickerModalOpen,
    onClose: _onImagePickerModalClose,
  } = useDisclosure();

  // Inspiration palettes modal state
  const {
    isOpen: isInspirationModalOpen,
    onOpen: onInspirationModalOpen,
    onClose: _onInspirationModalClose,
  } = useDisclosure();

  // Curated themes modal state
  const {
    isOpen: isCuratedThemesModalOpen,
    onOpen: onCuratedThemesModalOpen,
    onClose: _onCuratedThemesModalClose,
  } = useDisclosure();

  // AI Generator modal state
  const {
    isOpen: isAIModalOpen,
    onOpen: onAIModalOpen,
    onClose: _onAIModalClose,
  } = useDisclosure();

  // Custom close handlers to prevent scroll jumps
  const onColorPickerModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onColorPickerModalClose();
    setNewColorName(""); // Reset color name when closing
  };

  const onImagePickerModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onImagePickerModalClose();
    setNewColorName(""); // Reset color name when closing
  };

  const onInspirationModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onInspirationModalClose();
  };

  const onCuratedThemesModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onCuratedThemesModalClose();
  };

  const onAIModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onAIModalClose();
  };

  // Handler functions for button actions
  const handleColorPicker = () => {
    onColorPickerModalOpen();
    trackEvent(EventCategory.COLOR, "open_color_picker", "palette_management");
  };

  const handleImagePicker = () => {
    onImagePickerModalOpen();
    trackEvent(EventCategory.COLOR, "open_image_picker", "palette_management");
  };

  const handleInspirationPicker = () => {
    onInspirationModalOpen();
    trackEvent(EventCategory.COLOR, "open_inspiration_picker", "palette_management");
  };

  const handleCuratedThemes = () => {
    onCuratedThemesModalOpen();
    trackEvent(EventCategory.COLOR, "open_curated_themes", "palette_management");
  };

  const handleAIGenerator = () => {
    onAIModalOpen();
    trackEvent(EventCategory.COLOR, "open_ai_generator");
  };

  // Handler for AI theme selection
  const handleSelectTheme = (theme: AITheme) => {
    // Apply the AI theme directly
    applyAITheme(theme);

    // If onApplyAITheme is provided, call it with the theme
    if (onApplyAITheme) {
      onApplyAITheme(theme);
    }

    toast({
      title: "Theme Applied",
      description: "AI-generated theme has been applied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    trackEvent(EventCategory.COLOR, "apply_ai_theme", theme.description);
  };

  return (
    <>
      {/* Action Buttons UI */}
      <PaletteActionButtons
        onOpenColorPicker={handleColorPicker}
        onOpenImagePicker={handleImagePicker}
        onOpenInspirationPicker={handleInspirationPicker}
        onOpenCuratedThemes={handleCuratedThemes}
        onOpenAIGenerator={handleAIGenerator}
        themeValues={themeValues}
      />

      {/* Three separate modals for each palette creation method */}
      <ColorPickerModal isOpen={isColorPickerModalOpen} onClose={onColorPickerModalClose} />

      <ImageColorPickerModal isOpen={isImagePickerModalOpen} onClose={onImagePickerModalClose} />

      <InspirationPaletteModal isOpen={isInspirationModalOpen} onClose={onInspirationModalClose} />

      <CuratedThemesModal isOpen={isCuratedThemesModalOpen} onClose={onCuratedThemesModalClose} />

      <AIThemeGeneratorModal
        isOpen={isAIModalOpen}
        onClose={onAIModalClose}
        onSelectTheme={handleSelectTheme}
      />
    </>
  );
};

export default PaletteActionsContainer;
