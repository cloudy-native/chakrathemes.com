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
import PaletteGenerator from "./PaletteGenerator";
import PalettePreview from "./PalettePreview";

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ isOpen, onClose }) => {
  const {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    themeValues,
  } = useThemeContext();
  
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  const handleAddPalette = () => {
    if (!newColorName.trim() || !baseColor) return;
    addNewColorPalette();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg={bg} borderColor={border}>
        <ModalHeader>Add Color From Picker</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <PaletteGenerator baseColor={baseColor} setBaseColor={setBaseColor} />
          
          {baseColor && (
            <Box mt={4} mb={4}>
              <PalettePreview
                palette={generateColorPalette(baseColor)}
                label="Preview of generated palette:"
              />
            </Box>
          )}

          <Divider my={4} />

          <FormControl mb={4}>
            <FormLabel>Palette Name</FormLabel>
            <Input
              value={newColorName}
              onChange={e => setNewColorName(e.target.value)}
              placeholder="e.g., primary, secondary, accent"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            onClick={handleAddPalette}
            isDisabled={!newColorName.trim() || !baseColor}
          >
            Add Palette
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ColorPickerModal;
