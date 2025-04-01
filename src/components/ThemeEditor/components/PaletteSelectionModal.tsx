import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { generateColorPalette } from "@/utils/colorUtils";

interface AITheme {
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

// ColorChip component for displaying color swatches
const ColorChip: React.FC<{ color: string; size?: string }> = ({ color, size = "24px" }) => (
  <Box
    w={size}
    h={size}
    borderRadius="sm"
    bg={color}
    boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
  />
);

interface PaletteSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPalette: (paletteName: string, baseColor: string) => void;
  theme: AITheme | null;
}

export const PaletteSelectionModal: React.FC<PaletteSelectionModalProps> = ({
  isOpen,
  onClose,
  onAddPalette,
  theme,
}) => {
  const [paletteName, setPaletteName] = useState("");
  const [selectedBaseColor, setSelectedBaseColor] = useState<string>("");

  const handleAddPalette = () => {
    if (!paletteName.trim() || !selectedBaseColor) return;
    onAddPalette(paletteName.trim(), selectedBaseColor);
    // Reset form
    setPaletteName("");
    setSelectedBaseColor("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Selected Palette</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Palette Name</FormLabel>
            <Input
              value={paletteName}
              onChange={e => setPaletteName(e.target.value)}
              placeholder="E.g., primary, secondary, accent"
            />
          </FormControl>

          {theme && (
            <FormControl mb={4}>
              <FormLabel>Base Color</FormLabel>
              <Flex>
                <Button
                  mr={2}
                  leftIcon={
                    <Box w="16px" h="16px" bg={theme.primary} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(theme.primary)}
                  variant={selectedBaseColor === theme.primary ? "solid" : "outline"}
                  colorScheme="gray"
                >
                  Primary
                </Button>
                <Button
                  mr={2}
                  leftIcon={
                    <Box w="16px" h="16px" bg={theme.secondary} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(theme.secondary)}
                  variant={selectedBaseColor === theme.secondary ? "solid" : "outline"}
                  colorScheme="gray"
                >
                  Secondary
                </Button>
                <Button
                  mr={2}
                  leftIcon={
                    <Box w="16px" h="16px" bg={theme.accent} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(theme.accent)}
                  variant={selectedBaseColor === theme.accent ? "solid" : "outline"}
                  colorScheme="gray"
                >
                  Accent
                </Button>
                <Button
                  leftIcon={
                    <Box w="16px" h="16px" bg={theme.background} borderRadius="sm" />
                  }
                  onClick={() => setSelectedBaseColor(theme.background)}
                  variant={selectedBaseColor === theme.background ? "solid" : "outline"}
                  colorScheme="gray"
                >
                  Background
                </Button>
              </Flex>
            </FormControl>
          )}

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
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            isDisabled={!paletteName.trim() || !selectedBaseColor}
            onClick={handleAddPalette}
          >
            Add Palette
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaletteSelectionModal;
