import React from "react";
import { Box, Flex, Text, Code, IconButton, Icon, useToast } from "@chakra-ui/react";
import { Copy } from "lucide-react";
import { generateColorModeCode } from "../utils/codeGeneration";

interface CodeGeneratorProps {
  bgColorKey: string;
  bgShadeLight: string;
  bgShadeDark: string;
  textColorKey: string;
  textShadeLight: string;
  textShadeDark: string;
  trackCopy?: (action: string, label?: string) => void;
}

/**
 * Component to display and copy generated TypeScript code
 */
export const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  bgColorKey,
  bgShadeLight,
  bgShadeDark,
  textColorKey,
  textShadeLight,
  textShadeDark,
  trackCopy,
}) => {
  const toast = useToast();

  const generatedCode = generateColorModeCode(
    bgColorKey,
    bgShadeLight,
    bgShadeDark,
    textColorKey,
    textShadeLight,
    textShadeDark
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Code copied",
      description: "TypeScript code copied to clipboard",
      status: "success",
      duration: 2000,
    });

    if (trackCopy) {
      trackCopy("copy_contrast_code", `${bgColorKey}/${textColorKey}`);
    }
  };

  return (
    <Box p={3} borderWidth="1px" borderRadius="md">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="medium" fontSize="sm">
          Generated Code
        </Text>
        <IconButton
          variant="ghost"
          icon={<Icon as={Copy} />}
          aria-label="Copy code"
          onClick={handleCopyCode}
        />
      </Flex>
      <Code p={2} borderRadius="md" fontSize="xs" display="block" whiteSpace="pre">
        {generatedCode}
      </Code>
    </Box>
  );
};

export default CodeGenerator;
