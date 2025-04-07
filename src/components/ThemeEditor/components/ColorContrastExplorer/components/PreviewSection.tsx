import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

interface PreviewSectionProps {
  backgroundColor: string;
  textColor: string;
  colorLabel: string;
  textLabel: string;
  mode: "light" | "dark";
}

/**
 * Color contrast preview section for a single mode
 */
export const PreviewSection: React.FC<PreviewSectionProps> = ({
  backgroundColor,
  textColor,
  colorLabel,
  textLabel,
  mode: _mode,
}) => {
  return (
    <Box p={4} borderRadius="md" bg={backgroundColor} color={textColor} borderWidth="1px">
      <Heading size="sm" mb={2}>
        Preview
      </Heading>
      <Text fontSize="sm">
        This text demonstrates {textLabel} on {colorLabel}.
      </Text>
      <Button mt={3} size="sm" bg="transparent" borderWidth="1px" color={textColor}>
        Button
      </Button>
    </Box>
  );
};

export default PreviewSection;
