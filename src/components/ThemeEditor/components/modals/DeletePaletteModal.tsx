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
 * DeletePaletteModal Component
 *
 * This component renders a modal for confirming the deletion of a color palette.
 * It uses Chakra UI's AlertDialog component to provide a clear and accessible confirmation dialog.
 *
 * @param {DeletePaletteModalProps} props - The properties for the DeletePaletteModal component.
 * @param {boolean} props.isOpen - Controls whether the modal is open or closed.
 * @param {() => void} props.onClose - Callback function to close the modal.
 * @param {() => void} props.onConfirm - Callback function to execute when the user confirms the deletion.
 * @param {string} props.paletteName - The name of the palette to be deleted.
 */
const DeletePaletteModal: React.FC<DeletePaletteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  paletteName,
}) => {
  // useRef hook to create a reference to the cancel button for focus management.
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    // Chakra UI AlertDialog component for creating the confirmation dialog.
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      {/* Overlay that covers the background when the modal is open. */}
      <AlertDialogOverlay>
        {/* Main content container for the modal. */}
        <AlertDialogContent>
          {/* Header of the modal. */}
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Palette
          </AlertDialogHeader>

          {/* Body of the modal, containing the confirmation message. */}
          <AlertDialogBody>
            Are you sure you want to delete the <b>{paletteName}</b> palette? This action cannot be
            undone.
          </AlertDialogBody>

          {/* Footer of the modal, containing the action buttons. */}
          <AlertDialogFooter>
            {/* Cancel button, which closes the modal without deleting. */}
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            {/* Delete button, which confirms the deletion and executes the onConfirm callback. */}
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
