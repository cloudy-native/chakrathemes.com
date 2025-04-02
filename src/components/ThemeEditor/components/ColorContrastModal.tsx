import { panelBackground, borderLight } from "@/theme/themeConfiguration";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { PaletteColorContrast } from "./ColorContrastExplorer";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ColorContrastModalProps {
  isOpen: boolean;
  onClose: () => void;
  colorKey: string;
  colorShades: Record<string, string>;
}

const ColorContrastModal: React.FC<ColorContrastModalProps> = ({
  isOpen,
  onClose,
  colorKey,
  colorShades,
}) => {
  const { trackColorAction } = useAnalytics();
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  // Track modal opened
  React.useEffect(() => {
    if (isOpen) {
      trackColorAction("open_color_contrast_modal", colorKey);
    }
  }, [isOpen, colorKey, trackColorAction]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bg} borderColor={border} maxWidth="800px">
        <ModalHeader>Color Contrast Explorer: {colorKey}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Use the existing component to maintain all functionality */}
          <PaletteColorContrast colorKey={colorKey} colorShades={colorShades} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ColorContrastModal;
