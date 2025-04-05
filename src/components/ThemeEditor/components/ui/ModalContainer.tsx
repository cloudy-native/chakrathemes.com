import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: string;
  isCentered?: boolean;
  scrollBehavior?: "inside" | "outside";
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
  closeButton?: boolean;
  closeOnOverlayClick?: boolean;
}

/**
 * A standardized modal container component to unify modal appearance and behavior
 * throughout the application.
 */
const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  isCentered = false,
  scrollBehavior = "inside",
  initialFocusRef,
  finalFocusRef,
  closeButton = true,
  closeOnOverlayClick = true,
}) => {
  // Default footer if none provided
  const defaultFooter = (
    <>
      <Button variant="ghost" mr={3} onClick={onClose}>
        Close
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      isCentered={isCentered}
      scrollBehavior={scrollBehavior}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {closeButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer || defaultFooter}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
