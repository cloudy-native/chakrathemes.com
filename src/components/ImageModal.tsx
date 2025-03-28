import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, Image, Box } from "@chakra-ui/react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

/**
 * Modal to display full-size images when clicked
 * Clicking anywhere on the overlay or image dismisses the modal
 */
const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
      <ModalOverlay bg="blackAlpha.800" onClick={onClose} cursor="pointer" />
      <ModalContent bg="transparent" boxShadow="none" maxW="90vw" maxH="90vh" onClick={onClose}>
        <ModalBody p={0} display="flex" justifyContent="center" alignItems="center">
          <Box
            maxW="100%"
            maxH="90vh"
            overflow="hidden"
            onClick={e => {
              // Prevent propagation so the image click doesn't immediately close the modal
              e.stopPropagation();
              // But we still want to close on click, just with a small delay for UX
              setTimeout(onClose, 100);
            }}
          >
            <Image
              src={src}
              alt={alt}
              // objectFit="fill"
              maxH="90vh"
              margin="0 auto"
              cursor="pointer"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
