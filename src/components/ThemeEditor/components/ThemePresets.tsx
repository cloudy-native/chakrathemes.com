import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Text,
  useDisclosure,
  useToast,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import { ThemeValues } from "@/types";
import { useThemeContext } from "@/context/ThemeContext";

// Define some preset themes with descriptive names
const BUILT_IN_PRESETS: { name: string; description: string; theme: Partial<ThemeValues> }[] = [
  {
    name: "Soft UI",
    description: "Rounded corners, subtle shadows, and pastel colors",
    theme: {
      radii: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      shadows: {
        sm: "0 2px 5px rgba(0, 0, 0, 0.05)",
        md: "0 4px 10px rgba(0, 0, 0, 0.08)",
        lg: "0 8px 30px rgba(0, 0, 0, 0.1)",
        xl: "0 15px 35px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  {
    name: "Sharp Modern",
    description: "Square corners, distinct shadows, high-contrast look",
    theme: {
      radii: {
        sm: "0",
        md: "0.125rem",
        lg: "0.25rem",
        xl: "0.375rem",
      },
      shadows: {
        sm: "3px 3px 0 rgba(0, 0, 0, 0.15)",
        md: "5px 5px 0 rgba(0, 0, 0, 0.2)",
        lg: "8px 8px 0 rgba(0, 0, 0, 0.25)",
        xl: "12px 12px 0 rgba(0, 0, 0, 0.3)",
      },
    },
  },
  {
    name: "Glassmorphism",
    description: "Frosted glass effect with subtle transparency",
    theme: {
      radii: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
      },
      shadows: {
        sm: "0 4px 6px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)",
        md: "0 10px 15px rgba(0, 0, 0, 0.03), 0 4px 6px rgba(0, 0, 0, 0.05)",
        lg: "0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.02)",
        xl: "0 25px 50px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6)",
      },
    },
  },
  {
    name: "Neumorphism",
    description: "Soft, embossed UI components with subtle shadows",
    theme: {
      radii: {
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      shadows: {
        sm: "3px 3px 6px rgba(0, 0, 0, 0.1), -3px -3px 6px rgba(255, 255, 255, 0.7)",
        md: "5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.7)",
        lg: "10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.7)",
        xl: "15px 15px 30px rgba(0, 0, 0, 0.1), -15px -15px 30px rgba(255, 255, 255, 0.7)",
        inner: "inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
      },
    },
  },
];

// Preset Card Component
const PresetCard: React.FC<{
  name: string;
  description: string;
  onApply: () => void;
}> = ({ name, description, onApply }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card 
      variant="outline" 
      bg={bgColor}
      borderColor={borderColor}
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <CardBody>
        <VStack align="flex-start" spacing={2}>
          <Heading size="sm">{name}</Heading>
          <Text fontSize="sm" color="gray.500">{description}</Text>
          <Button 
            size="sm" 
            colorScheme="blue" 
            variant="outline"
            onClick={onApply}
            mt={2}
          >
            Apply Preset
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

// Save Theme Preset Modal
const SavePresetModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");

  const handleSave = () => {
    if (presetName.trim()) {
      onSave(presetName.trim(), presetDescription.trim());
      setPresetName("");
      setPresetDescription("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save Current Theme as Preset</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Preset Name</FormLabel>
              <Input
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Enter a name for your preset"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={presetDescription}
                onChange={(e) => setPresetDescription(e.target.value)}
                placeholder="Brief description of this theme style"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave} isDisabled={!presetName.trim()}>
            Save Preset
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Main component for managing themes
export const ThemePresets: React.FC = () => {
  const { themeValues, setThemeValues, updateThemeValue } = useThemeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  // State for user-saved presets
  const [userPresets, setUserPresets] = useState<{
    name: string;
    description: string;
    theme: ThemeValues;
  }[]>(() => {
    // Try to load saved presets from localStorage
    const savedPresets = localStorage.getItem("chakraThemePresets");
    if (savedPresets) {
      try {
        return JSON.parse(savedPresets);
      } catch (e) {
        console.error("Error parsing saved presets", e);
        return [];
      }
    }
    return [];
  });

  // Apply a built-in preset
  const applyBuiltinPreset = (index: number) => {
    const preset = BUILT_IN_PRESETS[index];
    
    // Apply preset theme values
    if (preset.theme.radii) {
      Object.entries(preset.theme.radii).forEach(([key, value]) => {
        updateThemeValue(['radii', key], value);
      });
    }
    
    if (preset.theme.shadows) {
      Object.entries(preset.theme.shadows).forEach(([key, value]) => {
        updateThemeValue(['shadows', key], value);
      });
    }
    
    toast({
      title: "Preset Applied",
      description: `Applied the ${preset.name} preset`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Apply a user-saved preset
  const applyUserPreset = (index: number) => {
    const preset = userPresets[index];
    setThemeValues(preset.theme);
    
    toast({
      title: "Preset Applied",
      description: `Applied your ${preset.name} preset`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Save current theme as a new preset
  const saveCurrentTheme = (name: string, description: string) => {
    const newPreset = {
      name,
      description,
      theme: { ...themeValues },
    };
    
    const updatedPresets = [...userPresets, newPreset];
    setUserPresets(updatedPresets);
    
    // Save to localStorage
    localStorage.setItem("chakraThemePresets", JSON.stringify(updatedPresets));
    
    toast({
      title: "Preset Saved",
      description: `Saved current theme as "${name}"`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Download all presets as JSON
  const downloadPresets = () => {
    const data = JSON.stringify({
      builtIn: BUILT_IN_PRESETS,
      user: userPresets,
    }, null, 2);
    
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chakra-theme-presets.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="md">Theme Presets</Heading>
        <HStack>
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="green" 
            size="sm"
            onClick={onOpen}
          >
            Save Current Theme
          </Button>
          <Button 
            leftIcon={<DownloadIcon />} 
            variant="outline" 
            size="sm"
            onClick={downloadPresets}
          >
            Export Presets
          </Button>
        </HStack>
      </HStack>
      
      {/* Built-in Presets */}
      <Text fontSize="sm" fontWeight="medium" mb={2}>Built-in Style Presets</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
        {BUILT_IN_PRESETS.map((preset, index) => (
          <PresetCard
            key={`built-in-${index}`}
            name={preset.name}
            description={preset.description}
            onApply={() => applyBuiltinPreset(index)}
          />
        ))}
      </SimpleGrid>
      
      {/* User-saved Presets */}
      {userPresets.length > 0 && (
        <>
          <Text fontSize="sm" fontWeight="medium" mb={2} mt={6}>Your Saved Themes</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {userPresets.map((preset, index) => (
              <PresetCard
                key={`user-${index}`}
                name={preset.name}
                description={preset.description}
                onApply={() => applyUserPreset(index)}
              />
            ))}
          </SimpleGrid>
        </>
      )}
      
      {/* Save Preset Modal */}
      <SavePresetModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={saveCurrentTheme}
      />
    </Box>
  );
};

export default ThemePresets;