import React, { useState } from "react";
import { Box, Text, Flex, useColorModeValue, Tooltip, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { isLightColor } from "@/utils/colorUtils";

// Component to display a single shade from a palette
export const PaletteShade: React.FC<{
  colorKey: string;
  shade: string;
  color: string;
}> = ({ colorKey, shade, color }) => {
  const [copied, setCopied] = useState(false);

  // Use the standardized color utils function to determine text color
  const textColor = isLightColor(color) ? "black" : "white";
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Copy color hex to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
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
      <Box bg={color} height="80px" position="relative">
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

      {/* Color hex value with copy button */}
      <Box p={2} bg={useColorModeValue("gray.50", "gray.700")}>
        <Flex align="center" justify="space-between">
          <Text fontFamily="mono" fontSize="sm" flex="1">
            {color}
          </Text>
          <Tooltip label={copied ? "Copied!" : "Copy"} placement="top" hasArrow>
            <IconButton
              icon={<CopyIcon />}
              size="sm"
              aria-label="Copy color hex code"
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

export default PaletteShade;
