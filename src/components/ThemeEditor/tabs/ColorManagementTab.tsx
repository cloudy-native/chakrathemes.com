import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  useDisclosure,
  SimpleGrid,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useThemeContext } from "@/context/ThemeContext";
import ColorSwatch from "../components/ColorSwatch";
import NewColorModal from "../components/NewColorModal";

export const ColorManagementTab: React.FC = () => {
  const { getColors } = useThemeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colors = getColors();

  // Track which color swatches are expanded
  const [openColorSwatches, setOpenColorSwatches] = useState<{
    [key: string]: boolean;
  }>({});

  // Toggle a color swatch expansion
  const toggleColorSwatch = (colorKey: string) => {
    setOpenColorSwatches((prev) => ({
      ...prev,
      [colorKey]: !prev[colorKey],
    }));
  };

  return (
    <Box>
      <Text mb={6} fontSize="sm">
        Create and manage color palettes for your theme. Add colors manually,
        extract from images, or check out the curated Inspiration tab! You can
        always copy or tweak the color values., but be careful because it's easy
        to get messed up.
      </Text>
      <Flex justify="right" mb={2}>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          New Color
        </Button>
      </Flex>

      {/* Color Swatches */}
      <Box mb={8}>
        {colors.map((colorSwatch, index) => (
          <Box key={colorSwatch.colorKey} mb={4}>
            <ColorSwatch
              colorSwatch={colorSwatch}
              isOpen={!!openColorSwatches[colorSwatch.colorKey]}
              toggleOpen={() => toggleColorSwatch(colorSwatch.colorKey)}
            />
            {index < colors.length - 1 && <Divider mt={4} />}
          </Box>
        ))}
      </Box>

      {/* Empty state */}
      {colors.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          borderWidth="1px"
          borderRadius="md"
          borderStyle="dashed"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Text mb={4} color={useColorModeValue("gray.500", "gray.400")}>
            No colors in your palette yet
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<AddIcon />}
            onClick={onOpen}
          >
            Add Your First Color
          </Button>
        </Flex>
      )}

      {/* Add Color Modal */}
      <NewColorModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ColorManagementTab;
