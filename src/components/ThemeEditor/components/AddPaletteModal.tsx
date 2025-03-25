import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Input,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { useThemeContext } from "@/context/ThemeContext";
import PaletteGenerator from "./PaletteGenerator";
import ImageColorExtractor from "./ImageColorExtractor";
import InspirationPalettes from "./InspirationPalettes";
import PalettePreview from "./PalettePreview";
import { generateColorPalette } from "@/utils/colorUtils";

interface AddPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPaletteModal: React.FC<AddPaletteModalProps> = ({ isOpen, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { newColorName, setNewColorName, baseColor, setBaseColor, addNewColorPalette } =
    useThemeContext();

  const handleAddPalette = () => {
    addNewColorPalette();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
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
                    // Also set a default palette name
                    if (!newColorName) {
                      const paletteNames = ["primary", "accent", "highlight", "brand", "feature"];
                      const randomName =
                        paletteNames[Math.floor(Math.random() * paletteNames.length)];
                      setNewColorName(randomName);
                    }
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

          <FormControl mb={4}>
            <FormLabel>Palette Name</FormLabel>
            <Input
              value={newColorName}
              onChange={e => setNewColorName(e.target.value)}
              placeholder="E.g., primary, secondary, accent"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleAddPalette}
            isDisabled={!newColorName.trim() || !baseColor}
          >
            Add to Theme
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPaletteModal;
