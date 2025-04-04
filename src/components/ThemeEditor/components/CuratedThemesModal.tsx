import React, { useMemo, useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { panelBackground, borderLight, textPrimary } from "@/theme/themeConfiguration";
import { themeGroups, ThemePalette } from "@/utils/curatedThemes";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

interface CuratedThemesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Extend the ThemePalette for UI purposes
type ThemeCard = ThemePalette & {
  // The ThemePalette interface already has the needed properties
  // name, description, and colors
};

const CuratedThemesModal: React.FC<CuratedThemesModalProps> = ({ isOpen, onClose }) => {
  const { setThemeValues, themeValues } = useThemeContext();
  const [selectedGroup, setSelectedGroup] = useState<string>(themeGroups[0].groupName);
  const [selectedTheme, setSelectedTheme] = useState<ThemeCard | null>(null);
  const toast = useToast();
  
  const bg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const border = useColorModeValue(borderLight.light, borderLight.dark);
  const textColor = useColorModeValue(textPrimary.light, textPrimary.dark);

  // Get palettes from the selected group
  const themesInGroup = useMemo(() => {
    const group = themeGroups.find(g => g.groupName === selectedGroup);
    return group ? group.palettes : [];
  }, [selectedGroup]);

  // Apply the selected theme
  const applyTheme = () => {
    if (!selectedTheme) return;
    
    try {
      // Create updated theme object
      const updatedThemeValues = { ...themeValues };
      
      // Ensure colors object exists
      if (!updatedThemeValues.colors) {
        updatedThemeValues.colors = {};
      }
      
      // Apply each color palette
      Object.entries(selectedTheme.colors).forEach(([name, color]) => {
        // Generate a full color palette for each base color
        updatedThemeValues.colors[name] = generateColorPalette(color);
      });
      
      // Update the theme
      setThemeValues(updatedThemeValues);
      
      // Show success toast
      toast({
        title: "Theme Applied",
        description: `${selectedTheme.name} theme has been applied.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Close the modal
      onClose();
    } catch (error: unknown) {
      // Show error toast
      toast({
        title: "Error Applying Theme",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Preview color box component
  const ColorPreview = ({ color, name }: { color: string; name: string }) => (
    <Box>
      <Box 
        bg={color} 
        height="24px" 
        width="100%" 
        borderRadius="md"
        boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
      />
      <Text fontSize="xs" mt={1} textAlign="center">
        {name}
      </Text>
    </Box>
  );

  // Theme card component
  const ThemeCard = ({ theme }: { theme: ThemePalette }) => {
    const isSelected = selectedTheme && selectedTheme.name === theme.name;
    
    return (
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={3}
        cursor="pointer"
        onClick={() => setSelectedTheme(theme)}
        bg={isSelected ? "blue.50" : "white"}
        borderColor={isSelected ? "blue.500" : "gray.200"}
        _hover={{ borderColor: "blue.300" }}
        transition="all 0.2s"
      >
        <Text fontWeight="bold" mb={2} fontSize="sm">
          {theme.name}
        </Text>
        <Text fontSize="xs" mb={3} color="gray.600" noOfLines={2}>
          {theme.description}
        </Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          <ColorPreview color={theme.colors.primary} name="Primary" />
          <ColorPreview color={theme.colors.secondary} name="Secondary" />
          <ColorPreview color={theme.colors.accent} name="Accent" />
          <ColorPreview color={theme.colors.background} name="Background" />
        </Grid>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent bg={bg} borderColor={border}>
        <ModalHeader>Curated Themes</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box mb={4}>
            <Select 
              value={selectedGroup} 
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {themeGroups.map((group) => (
                <option key={group.groupName} value={group.groupName}>
                  {group.groupName}
                </option>
              ))}
            </Select>
          </Box>
          
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4} mb={6}>
            {themesInGroup.map((theme: ThemePalette, index: number) => (
              <ThemeCard key={`${theme.name}-${index}`} theme={theme} />
            ))}
          </Grid>
          
          {selectedTheme && (
            <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="sm" mb={3}>Selected Theme: {selectedTheme.name}</Heading>
              <Text mb={4}>{selectedTheme.description}</Text>
              
              <Divider mb={4} />
              
              <Flex flexWrap="wrap" gap={4}>
                {Object.entries(selectedTheme.colors).map(([name, color]) => (
                  <Box key={name} textAlign="center" width="100px">
                    <Box 
                      bg={color}
                      height="50px"
                      borderRadius="md"
                      boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
                    />
                    <Text mt={2} fontWeight="bold" fontSize="sm">{name}</Text>
                    <Text fontSize="xs">{color}</Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            onClick={applyTheme}
            isDisabled={!selectedTheme}
          >
            Apply Theme
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CuratedThemesModal;
