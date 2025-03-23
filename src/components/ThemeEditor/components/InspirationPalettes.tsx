import React, { useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  HStack,
  VStack,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Tooltip,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { InfoIcon, AddIcon, CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { useThemeContext } from "@/context/ThemeContext";
import inspirationPalettes from "@/utils/inspirationPalettes";

// Individual color swatch component
const ColorSwatch: React.FC<{
  colorName: string;
  hexValue: string;
  onClick: () => void;
}> = ({ colorName, hexValue, onClick }) => {
  const [copied, setCopied] = useState(false);
  const textColor = isLightColor(hexValue) ? "gray.800" : "white";

  // Simple function to determine if a color is light or dark
  function isLightColor(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186;
  }

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hexValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box
      height="80px"
      backgroundColor={hexValue}
      borderRadius="md"
      p={3}
      cursor="pointer"
      boxShadow="md"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
      onClick={onClick}
      position="relative"
    >
      <Flex direction="column" height="100%" justify="space-between">
        <Text fontWeight="bold" color={textColor} fontSize="sm" noOfLines={1}>
          {colorName}
        </Text>
        <HStack>
          <Text color={textColor} fontSize="xs" fontFamily="mono" opacity={0.9}>
            {hexValue}
          </Text>
          <Tooltip
            label={copied ? "Copied!" : "Copy hex"}
            placement="top"
            hasArrow
          >
            <IconButton
              aria-label="Copy color code"
              icon={copied ? <CheckIcon /> : <CopyIcon />}
              size="xs"
              variant="ghost"
              color={textColor}
              onClick={copyToClipboard}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  );
};

// Palette details modal
const PaletteDetailModal: React.FC<{
  palette: (typeof inspirationPalettes)[0];
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (name: string, color: string) => void;
}> = ({ palette, isOpen, onClose, onSelectColor }) => {
  const { newColorName, setNewColorName } = useThemeContext();
  const [selectedColorName, setSelectedColorName] = useState<string>("");
  const [selectedHexValue, setSelectedHexValue] = useState<string>("");

  const handleSelectColor = (name: string, color: string) => {
    setSelectedColorName(name);
    setSelectedHexValue(color);

    // Auto-fill the color name if it's empty
    if (!newColorName) {
      setNewColorName(name.toLowerCase().replace(/\s+/g, "-"));
    }

    onSelectColor(name, color);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center">
            <Text>{palette.concept}</Text>
            <Badge ml={2} colorScheme="purple">
              {Object.keys(palette.colors).length} colors
            </Badge>
          </Flex>
          <Text fontSize="sm" mt={1} color="gray.500">
            {palette.description}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Select a color and add it to your theme</FormLabel>
            <Input
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="Color category name (e.g., primary, accent)"
              mb={4}
            />
          </FormControl>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mb={6}>
            {Object.entries(palette.colors).map(([name, hex]) => (
              <Box
                key={name}
                borderWidth={selectedColorName === name ? "3px" : "0px"}
                borderColor="blue.500"
                borderRadius="md"
                transition="all 0.2s"
              >
                <ColorSwatch
                  colorName={name}
                  hexValue={hex}
                  onClick={() => handleSelectColor(name, hex)}
                />
              </Box>
            ))}
          </SimpleGrid>

          {selectedHexValue && (
            <Flex
              mt={4}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              align="center"
              bg={useColorModeValue("gray.50", "gray.700")}
            >
              <Box
                width="40px"
                height="40px"
                borderRadius="md"
                bg={selectedHexValue}
                boxShadow="md"
                mr={3}
              />
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="medium">{selectedColorName}</Text>
                <Text fontSize="sm" fontFamily="mono">
                  {selectedHexValue}
                </Text>
              </VStack>
              <Spacer />
              <Button
                size="sm"
                leftIcon={<AddIcon />}
                colorScheme="blue"
                onClick={onClose}
              >
                Use This Color
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Palette card component
const PaletteCard: React.FC<{
  palette: (typeof inspirationPalettes)[0];
  onSelectPalette: () => void;
}> = ({ palette, onSelectPalette }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
      cursor="pointer"
      onClick={onSelectPalette}
    >
      {/* Color preview bar */}
      <Flex height="24px">
        {Object.values(palette.colors).map((color, idx) => (
          <Box
            key={idx}
            bg={color}
            height="100%"
            flex="1"
            _first={{ borderTopLeftRadius: "lg" }}
            _last={{ borderTopRightRadius: "lg" }}
          />
        ))}
      </Flex>

      <Box p={4}>
        <Heading size="sm" mb={1}>
          {palette.concept}
        </Heading>
        <Text fontSize="xs" color="gray.500" mb={3}>
          {palette.description}
        </Text>
      </Box>
    </Box>
  );
};

// Main inspiration palettes component
const InspirationPalettes: React.FC<{
  onSelectColor: (color: string) => void;
}> = ({ onSelectColor }) => {
  const [selectedPalette, setSelectedPalette] = useState<
    (typeof inspirationPalettes)[0] | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPalette = (palette: (typeof inspirationPalettes)[0]) => {
    setSelectedPalette(palette);
    setModalOpen(true);
  };

  const handleSelectColor = (name: string, color: string) => {
    onSelectColor(color);
  };

  return (
    <Box>
      <Flex align="center" mb={4}>
        <Heading size="sm">Color Inspiration Palettes</Heading>
        <Spacer />
        <Tooltip
          label="Choose from curated color palettes across different themes and styles"
          placement="top"
          hasArrow
        >
          <InfoIcon color="gray.500" />
        </Tooltip>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {inspirationPalettes.map((palette) => (
          <PaletteCard
            key={palette.concept}
            palette={palette}
            onSelectPalette={() => handleSelectPalette(palette)}
          />
        ))}
      </SimpleGrid>

      {selectedPalette && (
        <PaletteDetailModal
          palette={selectedPalette}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelectColor={handleSelectColor}
        />
      )}
    </Box>
  );
};

export default InspirationPalettes;
