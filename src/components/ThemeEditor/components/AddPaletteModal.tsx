import { useThemeContext } from "@/context/ThemeContext";
import { panelBackground, borderLight } from "@/theme/themeConfiguration";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { PaletteNameInput } from "./ui";
import React, { useRef, useState } from "react";
import ImageColorExtractor from "./ImageColorExtractor";
import InspirationPalettes from "./InspirationPalettes";
import PaletteGenerator from "./PaletteGenerator";
import PalettePreview from "./PalettePreview";

interface OverwritePaletteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  paletteName: string;
}

const OverwritePaletteConfirmation: React.FC<OverwritePaletteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  paletteName,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent bg={bg} borderColor={border}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Overwrite Existing Palette
          </AlertDialogHeader>

          <AlertDialogBody>
            A palette named &quot;{paletteName}&quot; already exists. Do you want to overwrite it
            with your new palette?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Overwrite
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

interface AddPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTabIndex?: number;
}

export const AddPaletteModal: React.FC<AddPaletteModalProps> = ({
  isOpen,
  onClose,
  initialTabIndex = 0,
}) => {
  const [tabIndex, setTabIndex] = useState(initialTabIndex);
  const {
    newColorName,
    setNewColorName,
    baseColor,
    setBaseColor,
    addNewColorPalette,
    themeValues,
  } = useThemeContext();
  const [showOverwriteConfirmation, setShowOverwriteConfirmation] = useState(false);
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);

  const handleAddPalette = () => {
    if (!newColorName.trim() || !baseColor) return;

    const colorName = newColorName.trim().toLowerCase().replace(/\s+/g, "-");
    const existingColors = themeValues.colors || {};

    if (existingColors[colorName]) {
      setShowOverwriteConfirmation(true);
      return;
    }

    // No conflict, proceed normally
    addNewColorPalette();
    onClose();
  };

  const handleOverwritePalette = () => {
    addNewColorPalette(true); // true = overwrite existing
    setShowOverwriteConfirmation(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent bg={bg} borderColor={border}>
          <ModalHeader>Add New Palette</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Tabs index={tabIndex} onChange={setTabIndex} isFitted isLazy>
              <TabList>
                <Tab>Base Color Picker</Tab>
                <Tab>From Image</Tab>
                <Tab>Inspiration</Tab>
              </TabList>

              <TabPanels>
                {/* Base Color Picker Tab */}
                <TabPanel p={4}>
                  <PaletteGenerator baseColor={baseColor} setBaseColor={setBaseColor} />
                </TabPanel>

                {/* Image Color Tab */}
                <TabPanel p={4}>
                  <ImageColorExtractor
                    onSelectColor={color => {
                      setBaseColor(color);
                    }}
                  />
                </TabPanel>

                {/* Color Inspiration Tab */}
                <TabPanel p={4}>
                  <InspirationPalettes onSelectColor={color => setBaseColor(color)} />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* Preview of the generated palette for all tabs */}
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
                placeholder="E.g., primary, secondary, accent"
                onChange={setNewColorName}
                onSubmit={handleAddPalette}
                showButton={false}
                isDisabled={!baseColor}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddPalette} isDisabled={!newColorName.trim() || !baseColor}>
              Add to Theme
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmation dialog for overwriting existing palettes */}
      <OverwritePaletteConfirmation
        isOpen={showOverwriteConfirmation}
        onClose={() => setShowOverwriteConfirmation(false)}
        onConfirm={handleOverwritePalette}
        paletteName={newColorName.trim().toLowerCase().replace(/\s+/g, "-")}
      />
    </>
  );
};

export default AddPaletteModal;
