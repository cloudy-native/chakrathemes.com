import React from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { panelBackground, borderLight } from "@/theme/themeConfiguration";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import InspirationPalettes from "./InspirationPalettes";
import PalettePreview from "./PalettePreview";

interface InspirationPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InspirationPaletteModal: React.FC<InspirationPaletteModalProps> = ({ isOpen, onClose }) => {
  const {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    themeValues,
    setThemeValues
  } = useThemeContext();
  
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  const handleSelectColor = (name: string, color: string) => {
    try {
      // Format the color name
      const colorName = name.toLowerCase().replace(/\s+/g, "-");
      
      // Make sure we have valid values before proceeding
      if (!colorName || !color) {
        throw new Error('Color name or value is missing');
      }
      
      // Create updated theme object
      const updatedThemeValues = { ...themeValues };
      
      // Ensure colors object exists
      if (!updatedThemeValues.colors) {
        updatedThemeValues.colors = {};
      }
      
      // Generate a full color palette with shades from the base color
      updatedThemeValues.colors[colorName] = generateColorPalette(color);
      
      // Update the entire theme
      setThemeValues(updatedThemeValues);
      
      // Close the modal
      onClose();
    } catch (error: unknown) {
      console.error("Error adding color:", error instanceof Error ? error.message : String(error));
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
