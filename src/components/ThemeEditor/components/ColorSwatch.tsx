import React, { useState } from "react";
import { 
  Box, 
  Text, 
  Flex, 
  HStack, 
  Input,
  SimpleGrid,
  VStack, 
  useColorModeValue, 
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { ColorSwatch as ColorSwatchType } from "@/types";
import { TriangleDownIcon, TriangleUpIcon, CopyIcon } from "@chakra-ui/icons";
import ThemeColorSwatch from "./ThemeColorSwatch";
import { useThemeContext } from "@/context/ThemeContext";

// Paint chip style color component with editable hex value
const PaintChip: React.FC<{
  colorKey: string;
  shade: string;
  color: string;
}> = ({ colorKey, shade, color }) => {
  const [colorValue, setColorValue] = useState(color);
  const { updateColorValue } = useThemeContext();
  const [copied, setCopied] = useState(false);
  
  const isDark = (hex: string) => {
    // Simple check if the color is dark (for text contrast)
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b *.114) <= 186;
  };
  
  const textColor = isDark(colorValue) ? "white" : "black";
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  // Handle color input change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value);
  };
  
  // Update color in theme context when input loses focus
  const handleBlur = () => {
    // Simple validation to ensure it's a valid hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
      updateColorValue(colorKey, shade, colorValue);
    } else {
      // Reset to original value if invalid
      setColorValue(color);
    }
  };
  
  // Copy color hex to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(colorValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Box 
      borderWidth="1px" 
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      {/* Color display area */}
      <Box 
        bg={colorValue} 
        height="80px"
        position="relative"
      >
        {/* Shade number */}
        <Text 
          position="absolute"
          top={2}
          left={2}
          fontSize="lg"
          fontWeight="bold"
          color={textColor}
          textShadow="0px 1px 2px rgba(0,0,0,0.2)"
        >
          {shade}
        </Text>
      </Box>
      
      {/* Editable hex value with copy button */}
      <Box p={2} bg={useColorModeValue("gray.50", "gray.700")}>
        <Flex align="center">
          <Input
            value={colorValue}
            onChange={handleColorChange}
            onBlur={handleBlur}
            size="sm"
            fontFamily="mono"
            flex="1"
            variant="filled"
            placeholder="#FFFFFF"
          />
          <Tooltip 
            label={copied ? "Copied!" : "Copy"} 
            placement="top"
            hasArrow
          >
            <IconButton
              icon={<CopyIcon />}
              size="sm"
              aria-label="Copy color hex code"
              ml={1}
              variant="ghost"
              colorScheme="blue"
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : ""}
            </IconButton>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

interface ColorSwatchProps {
  colorSwatch: ColorSwatchType;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colorSwatch,
  isOpen,
  toggleOpen,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  return (
    <VStack spacing={0} align="stretch">
      <Box
        as="button"
        onClick={toggleOpen}
        width="full"
        textAlign="left"
        py={3}
        px={4}
        display="flex"
        alignItems="center"
        bg={bgColor}
        _hover={{ bg: hoverBgColor }}
        transition="all 0.2s"
        borderTopRadius="md"
        borderBottomRadius={isOpen ? "none" : "md"}
      >
        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="medium">{colorSwatch.colorKey}</Text>
            {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
          </Flex>
          <HStack spacing={3} mt={2}>
            {/* Color swatch preview */}
            <Box flex={1}>
              <ThemeColorSwatch 
                colorKey={colorSwatch.colorKey}
                colorShades={colorSwatch.colorShades}
                isCompact={true}
                size="lg"
              />
            </Box>
          </HStack>
        </Box>
      </Box>
      
      {/* Expanded content - Paint Chip Style */}
      {isOpen && (
        <Box 
          p={4} 
          bg={useColorModeValue("white", "gray.800")}
          borderWidth="1px"
          borderColor={borderColor}
          borderBottomRadius="md"
        >
          <SimpleGrid columns={{ base: 2, sm: 5 }} spacing={4} maxWidth="100%">
            {Object.entries(colorSwatch.colorShades)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([shade, color]) => (
                <PaintChip 
                  key={shade}
                  colorKey={colorSwatch.colorKey}
                  shade={shade}
                  color={color as string}
                />
              ))
            }
          </SimpleGrid>
        </Box>
      )}
    </VStack>
  );
};

export default ColorSwatch;
