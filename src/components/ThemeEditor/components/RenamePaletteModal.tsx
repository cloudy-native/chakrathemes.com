import { useThemeContext } from "@/context/ThemeContext";
import { panelBackground, panelBorder } from "@/theme/themeConfiguration";
import {
  Button,
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
import React, { useState, useEffect } from "react";

interface RenamePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
}

export const RenamePaletteModal: React.FC<RenamePaletteModalProps> = ({
  isOpen,
  onClose,
  currentName,
}) => {
  const [newName, setNewName] = useState("");
  const { renameColorPalette } = useThemeContext();
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(panelBorder.light, panelBorder.dark);

  // Reset the new name when the modal opens with a different palette
  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    }
  }, [isOpen, currentName]);

  const handleRename = () => {
    if (newName.trim() !== "") {
      renameColorPalette(currentName, newName);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={bg} borderColor={border}>
        <ModalHeader>Rename Palette</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>New Name</FormLabel>
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Enter new palette name"
              autoFocus
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            isDisabled={!newName.trim() || newName.trim() === currentName}
            colorScheme="primary"
          >
            Rename
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RenamePaletteModal;
