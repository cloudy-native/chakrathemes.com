import React, { useRef } from "react";
import { DeletePaletteModalProps } from "@/types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

/**
 * Modal for confirming deletion of a color palette
 */
const DeletePaletteModal: React.FC<DeletePaletteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  paletteName,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Palette
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the <b>{paletteName}</b> palette? This action cannot be
            undone.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeletePaletteModal;
