import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useThemeContext } from '@/context/ThemeContext';
import PaletteGenerator from './PaletteGenerator';
import ImageColorExtractor from './ImageColorExtractor';
import InspirationPalettes from './InspirationPalettes';

interface NewColorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewColorModal: React.FC<NewColorModalProps> = ({ isOpen, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { newColorName, setNewColorName, baseColor, setBaseColor, addNewColorPalette } = useThemeContext();

  const handleAddColor = () => {
    addNewColorPalette();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Color</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Color Name</FormLabel>
            <Input
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="E.g., primary, secondary, accent"
            />
          </FormControl>

          <Tabs index={tabIndex} onChange={setTabIndex} variant="line">
            <TabList>
              <Tab>Color Picker</Tab>
              <Tab>From Image</Tab>
              <Tab>Inspiration</Tab>
            </TabList>
            
            <TabPanels>
              {/* Color Picker Tab */}
              <TabPanel p={4}>
                <PaletteGenerator 
                  baseColor={baseColor}
                  setBaseColor={setBaseColor}
                />
              </TabPanel>
              
              {/* Image Color Tab */}
              <TabPanel p={4}>
                <ImageColorExtractor
                  onSelectColor={(color) => setBaseColor(color)}
                />
              </TabPanel>
              
              {/* Color Inspiration Tab */}
              <TabPanel p={4}>
                <InspirationPalettes
                  onSelectColor={(color) => setBaseColor(color)}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleAddColor}
            isDisabled={!newColorName.trim() || !baseColor}
          >
            Add to Palette
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewColorModal;