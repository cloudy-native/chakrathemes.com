import React, { useRef } from "react";
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
 * OverwriteConfirmModalProps Interface
 *
 * Defines the properties for the OverwriteConfirmModal component.
 *
 * @param {boolean} isOpen - Controls whether the modal is open or closed.
 * @param {() => void} onClose - Callback function to close the modal.
 * @param {() => void} onConfirm - Callback function to execute when the user confirms the overwrite.
 * @param {string} [title] - Optional title for the modal. Defaults to "Overwrite Existing Palettes?".
 * @param {string} [description] - Optional description for the modal body. Defaults to a message about overwriting existing palettes.
 */
interface OverwriteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

/**
 * OverwriteConfirmModal Component
 *
 * This component renders a modal for confirming the overwrite of existing color palettes.
 * It uses Chakra UI's AlertDialog component to provide a clear and accessible confirmation dialog.
 *
 * @param {OverwriteConfirmModalProps} props - The properties for the OverwriteConfirmModal component.
 */
const OverwriteConfirmModal: React.FC<OverwriteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Overwrite Existing Palettes?",
  description = "This will replace existing palettes with the same names. This action cannot be undone.",
}) => {
  // useRef hook to create a reference to the cancel button for focus management.
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    // Chakra UI AlertDialog component for creating the confirmation dialog.
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered={true} // Centers the modal on the screen.
    >
      {/* Overlay that covers the background when the modal is open. */}
      <AlertDialogOverlay>
        {/* Main content container for the modal. */}
        <AlertDialogContent>
          {/* Header of the modal. */}
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          {/* Body of the modal, containing the confirmation message. */}
          <AlertDialogBody>{description}</AlertDialogBody>

          {/* Footer of the modal, containing the action buttons. */}
          <AlertDialogFooter>
            {/* Cancel button, which closes the modal without overwriting. */}
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            {/* Overwrite button, which confirms the overwrite and executes the onConfirm callback. */}
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Overwrite
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default OverwriteConfirmModal;
