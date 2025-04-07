import { useThemeContext } from "@/context/ThemeContext";
import { borderLight, panelBackground } from "@/theme/themeConfiguration";
import { trackPaletteAction } from "@/utils/analytics";
import { generateColorPalette, isPaletteNameAvailable } from "@/utils/colorUtils";
import { showError, showSuccess } from "@/utils/notificationUtils";
import { addPaletteToTheme } from "@/utils/themeUtils";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import InspirationPalettes from "./InspirationPalettes";

interface InspirationPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InspirationPaletteModal: React.FC<InspirationPaletteModalProps> = ({ isOpen, onClose }) => {
  const { themeValues, setThemeValues } = useThemeContext();

  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  const toast = useToast();

  const handleSelectColor = (paletteName: string, baseColor: string) => {
    try {
      // Format the palette name
      const formattedName = paletteName.toLowerCase().replace(/\s+/g, "-");

      // Make sure we have valid values before proceeding
      if (!formattedName || !baseColor) {
        showError(toast, "Invalid Input", "Palette name or color value is missing");
        return;
      }

      // Check if the palette name is available
      if (!isPaletteNameAvailable(formattedName, themeValues.colors, toast)) {
        return;
      }

      // Generate a full color palette with shades from the base color
      const palette = generateColorPalette(baseColor);

      // Add the palette to the theme
      const updatedTheme = addPaletteToTheme(themeValues, formattedName, palette);

      // Update the entire theme
      setThemeValues(updatedTheme);

      // Track the action
      trackPaletteAction("add", formattedName);

      // Show success notification
      showSuccess(toast, `Added palette: ${formattedName}`);

      // Close the modal
      onClose();
    } catch (error: unknown) {
      console.error("Error adding color:", error instanceof Error ? error.message : String(error));
      showError(
        toast,
        "Error Adding Palette",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg={bg} borderColor={border}>
        <ModalHeader>Color Inspiration</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <InspirationPalettes onSelectColor={handleSelectColor} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InspirationPaletteModal;
