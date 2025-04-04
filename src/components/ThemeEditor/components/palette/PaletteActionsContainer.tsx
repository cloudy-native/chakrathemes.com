import React from "react";
import { useDisclosure, useToast, useColorModeValue } from "@chakra-ui/react";
import { EventCategory, trackEvent } from "@/utils/analytics";
import PaletteActionButtons from "./PaletteActionButtons";
import { AddPaletteModal } from "../../components";
import AIThemeGeneratorModal from "../../components/AIThemeGeneratorModal";
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
  backgroundLight 
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
const PaletteActionsContainer: React.FC<NavigationProps> = ({ 
  onNavigateToPreview
}) => {
  const { addNewColorPalette, setThemeValues, themeValues } = useThemeContext();
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
  
  // Add palette modal state
  const { 
    isOpen: isAddPaletteOpen, 
    onOpen: onAddPaletteOpen, 
    onClose: _onAddPaletteClose 
  } = useDisclosure();
  
  // Collections modal state
  const { 
    isOpen: isCollectionsModalOpen, 
    onOpen: onCollectionsModalOpen, 
    onClose: _onCollectionsModalClose 
  } = useDisclosure();
  
  // AI Generator modal state
  const { 
    isOpen: isAIModalOpen, 
    onOpen: onAIModalOpen, 
    onClose: _onAIModalClose 
  } = useDisclosure();
  
  // Custom close handlers to prevent scroll jumps
  const onAddPaletteClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onAddPaletteClose();
  };
  
  const onCollectionsModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onCollectionsModalClose();
  };
  
  const onAIModalClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    _onAIModalClose();
  };
  
  // Handler functions for button actions
  const handleAddPalette = () => {
    onAddPaletteOpen();
    trackEvent(EventCategory.COLOR, "open_add_palette_modal");
  };
  
  const handleCollections = () => {
    onCollectionsModalOpen();
    trackEvent(EventCategory.COLOR, "open_collections");
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
        onAddPalette={handleAddPalette}
        onOpenCollections={handleCollections}
        onOpenAIGenerator={handleAIGenerator}
        themeValues={themeValues}
      />
      
      {/* Modals */}
      <AddPaletteModal 
        isOpen={isAddPaletteOpen} 
        onClose={onAddPaletteClose} 
      />
      
      {/* Collections functionality - works with the Collections button but doesn't have a dedicated modal yet */}
      
      <AIThemeGeneratorModal 
        isOpen={isAIModalOpen} 
        onClose={onAIModalClose}
        onSelectTheme={handleSelectTheme}
      />
    </>
  );
};

export default PaletteActionsContainer;
