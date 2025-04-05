import React from "react";
import { useDisclosure, useToast, useColorModeValue } from "@chakra-ui/react";
import { EventCategory, trackEvent } from "@/utils/analytics";
import PaletteActionButtons from "./PaletteActionButtons";
import ColorPickerModal from "../../components/ColorPickerModal";
import ImageColorPickerModal from "../../components/ImageColorPickerModal";
import InspirationPaletteModal from "../../components/InspirationPaletteModal";
import AIThemeGeneratorModal from "../../components/AIThemeGeneratorModal";
import CuratedThemesModal from "../../components/CuratedThemesModal";
import { AITheme } from "@/types";
import { useThemeContext } from "@/context/ThemeContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  accentColor,
  primaryAccent,
  textSecondary,
  textHeading,
  borderLight,
  backgroundLight,
} from "@/theme/themeConfiguration";

/**
 * Interface for components that respond to tab selection
 */
interface NavigationProps {
  onNavigateToPreview?: () => void;
  onApplyAITheme?: (theme: AITheme) => void;
}

/**
 * Self-contained component that includes all the palette action buttons
 * and their associated modals and logic
 */
const PaletteActionsContainer: React.FC<NavigationProps> = ({ onNavigateToPreview }) => {
  const { addNewColorPalette, setThemeValues, themeValues, setNewColorName, setBaseColor } =
    useThemeContext();
  const toast = useToast();
  const { trackColorAction } = useAnalytics();

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

  // Define color mode values at the top level to follow React Rules of Hooks
  const accentColorValue = useColorModeValue(accentColor.light, accentColor.dark);
  const primaryAccentColor = useColorModeValue(primaryAccent.light, primaryAccent.dark);
  const textSecondaryColor = useColorModeValue(textSecondary.light, textSecondary.dark);
  const textHeadingColor = useColorModeValue(textHeading.light, textHeading.dark);
  const borderLightColor = useColorModeValue(borderLight.light, borderLight.dark);
  const backgroundLightColor = useColorModeValue(backgroundLight.light, backgroundLight.dark);

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

  const handlePreview = () => {
    if (onNavigateToPreview) {
      onNavigateToPreview();
    } else {
      toast({
        title: "Preview",
        description: "Preview functionality not available in this view",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Handler for AI theme selection
  const handleSelectTheme = (theme: AITheme) => {
    // Apply the AI theme directly
    applyAITheme(theme);

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
