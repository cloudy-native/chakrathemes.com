import { useThemeContext } from "@/context/ThemeContext";
import { usePaletteOperations } from "@/hooks/usePaletteOperations";
import { borderLight, panelBackground } from "@/theme/themeConfiguration";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import ImageColorExtractor from "./ImageColorExtractor";
import PalettePreview from "./PalettePreview";
import { PaletteNameInput } from "./ui";

interface ImageColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageColorPickerModal: React.FC<ImageColorPickerModalProps> = ({ isOpen, onClose }) => {
  // Get context values
  const { newColorName, setNewColorName, baseColor, setBaseColor, themeValues, setThemeValues } =
    useThemeContext();

  // Initialize palette operations hook
  const paletteOps = usePaletteOperations({
    themeValues,
    setThemeValues,
  });

  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  // Alternative implementation using paletteOps
  const handleAddPaletteWithOps = () => {
    if (!newColorName.trim() || !baseColor) return;

    // Use our centralized palette operations
    if (paletteOps.createPalette(newColorName, baseColor)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg={bg} borderColor={border}>
        <ModalHeader>Add Color From Image</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <ImageColorExtractor
            onSelectColor={(color: string) => {
              setBaseColor(color);
            }}
          />

          {baseColor && (
            <Box mt={4} mb={4}>
              <PalettePreview
                palette={generateColorPalette(baseColor)}
                label="Preview of generated palette:"
              />
            </Box>
          )}

          <Divider my={4} />

          <Box mb={4}>
            <PaletteNameInput
              label="Palette Name"
              initialValue={newColorName}
              onChange={setNewColorName}
              onSubmit={name => {
                if (name.trim() && baseColor) {
                  // Use our centralized palette operations
                  if (paletteOps.createPalette(name, baseColor)) {
                    onClose();
                  }
                }
              }}
              placeholder="e.g., primary, secondary, accent"
              showButton={false}
              isDisabled={!baseColor}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            onClick={handleAddPaletteWithOps}
            isDisabled={
              !newColorName.trim() || !baseColor || !paletteOps.isPaletteNameAvailable(newColorName)
            }
          >
            Add Palette
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageColorPickerModal;
