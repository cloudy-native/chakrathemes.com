import { useThemeContext } from "@/context/ThemeContext";
import { RenamePaletteModalProps } from "@/types";
import { panelBackground, borderLight } from "@/theme/themeConfiguration";
import {
  Button,
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
import { PaletteNameInput } from "./ui";

export const RenamePaletteModal: React.FC<RenamePaletteModalProps> = ({
  isOpen,
  onClose,
  currentName,
}) => {
  const [newName, setNewName] = useState("");
  const { renameColorPalette } = useThemeContext();
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  // Reset the new name when the modal opens with a different palette
  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    }
  }, [isOpen, currentName]);

  const handleRename = (paletteName: string) => {
    if (paletteName.trim() !== "" && paletteName.trim() !== currentName) {
      renameColorPalette(currentName, paletteName);
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
          <PaletteNameInput
            label="New Name"
            initialValue={newName}
            placeholder="Enter new palette name"
            buttonText="Rename"
            showButton={false}
            onChange={setNewName}
            onSubmit={handleRename}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => handleRename(newName)}
            colorScheme="primary"
            isDisabled={!newName.trim() || newName.trim() === currentName}
          >
            Rename
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RenamePaletteModal;
