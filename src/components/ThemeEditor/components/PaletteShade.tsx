import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Tooltip,
  IconButton,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Copy, Lock, Unlock, Pencil } from "lucide-react";
import { isLightColor } from "@/utils/colorUtils";
import { useThemeContext } from "@/context/ThemeContext";
import { ThemeValues } from "@/types";
import { useAnalytics } from "@/hooks/useAnalytics";

// Component to display a single shade from a palette
export const PaletteShade: React.FC<{
  colorKey: string;
  shade: string;
  color: string;
}> = ({ colorKey, shade, color }) => {
  const { themeValues, setThemeValues } = useThemeContext();
  const { trackColorAction } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editColor, setEditColor] = useState(color);

  // Use the standardized color utils function to determine text color
  const textColor = isLightColor(color) ? "black" : "white";
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Copy color hex to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle locked state
  const toggleLocked = () => {
    setIsLocked(!isLocked);

    // Track the action
    trackColorAction(isLocked ? "unlock_shade" : "lock_shade", `${colorKey}.${shade}`);
  };

  // Edit the specific shade
  const toggleEdit = () => {
    if (isEditing) {
      // Save the edited color
      if (editColor !== color && editColor.match(/^#[0-9A-F]{6}$/i)) {
        // Create a new theme object based on the current one
        const newTheme: ThemeValues = JSON.parse(JSON.stringify(themeValues));

        // Update the specific shade
        if (newTheme.colors && newTheme.colors[colorKey] && newTheme.colors[colorKey][shade]) {
          newTheme.colors[colorKey][shade] = editColor;

          // Update the theme
          setThemeValues(newTheme);

          // Track the action
          trackColorAction("edit_shade", `${colorKey}.${shade}`);
        }
      }
    } else {
      // Reset edit color to current color when starting edit
      setEditColor(color);
    }

    setIsEditing(!isEditing);
  };

  // Handle color input change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditColor(e.target.value);
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      boxShadow={isLocked ? "0 0 0 2px gold" : "md"}
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
      position="relative"
    >
      {/* Lock indicator */}
      {isLocked && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bg="yellow.400"
          color="black"
          px={1}
          py={0.5}
          zIndex={1}
          fontSize="xs"
          fontWeight="bold"
        >
          LOCKED
        </Box>
      )}

      {/* Color display area */}
      <Box bg={isEditing ? editColor : color} height="80px" position="relative">
        {/* Shade number */}
        <Text
          position="absolute"
          top={2}
          left={2}
          fontSize="lg"
          fontWeight="bold"
          color={isEditing ? (isLightColor(editColor) ? "black" : "white") : textColor}
          textShadow="0px 1px 2px rgba(0,0,0,0.2)"
        >
          {shade}
        </Text>

        {/* Edit color input (visible only when editing) */}
        {isEditing && (
          <Box position="absolute" bottom={2} left={0} right={0} px={2}>
            <input
              type="text"
              value={editColor}
              onChange={handleColorChange}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.9)",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "2px 4px",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            />
          </Box>
        )}
      </Box>

      {/* Color hex value with controls */}
      <Box p={2} bg={useColorModeValue("gray.50", "gray.700")}>
        <Flex align="center" justify="space-between">
          <Text fontFamily="mono" fontSize="sm" flex="1">
            {isEditing ? editColor : color}
          </Text>
          <HStack spacing={1}>
            {/* Lock/Unlock button */}
            <Tooltip label={isLocked ? "Unlock shade" : "Lock shade"} placement="top" hasArrow>
              <IconButton
                size="xs"
                icon={isLocked ? <Icon as={Unlock} /> : <Icon as={Lock} />}
                aria-label={isLocked ? "Unlock shade" : "Lock shade"}
                variant="ghost"
                colorScheme={isLocked ? "yellow" : "gray"}
                onClick={toggleLocked}
              />
            </Tooltip>

            {/* Edit button */}
            <Tooltip label={isEditing ? "Save" : "Edit color"} placement="top" hasArrow>
              <IconButton
                size="xs"
                icon={<Icon as={Pencil} />}
                aria-label={isEditing ? "Save color" : "Edit color"}
                variant="ghost"
                colorScheme={isEditing ? "green" : "gray"}
                onClick={toggleEdit}
              />
            </Tooltip>

            {/* Copy button */}
            <Tooltip label={copied ? "Copied!" : "Copy"} placement="top" hasArrow>
              <IconButton
                size="xs"
                icon={<Icon as={Copy} />}
                aria-label="Copy color hex code"
                variant="ghost"
                colorScheme="primary"
                onClick={copyToClipboard}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default PaletteShade;
