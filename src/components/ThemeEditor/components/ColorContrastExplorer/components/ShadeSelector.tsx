import React from "react";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { primaryAccent, successColor } from "@/theme/themeConfiguration";

interface ShadeSelectorProps {
  label: string;
  shades: Record<string, string>;
  selectedShade: string;
  onShadeChange: (shade: string) => void;
  disabled?: boolean;
  autoSelected?: boolean;
}

/**
 * A component for selecting color shades
 */
export const ShadeSelector: React.FC<ShadeSelectorProps> = ({
  label,
  shades,
  selectedShade,
  onShadeChange,
  disabled = false,
  autoSelected = false,
}) => {
  const primaryAccentValue = useColorModeValue(primaryAccent.light, primaryAccent.dark);
  const successColorValue = useColorModeValue(successColor.light, successColor.dark);

  return (
    <Box mb={3}>
      <Flex align="center">
        <Text fontSize="xs" fontWeight="bold" mb={1}>
          {label}: {selectedShade}
        </Text>
        {autoSelected && (
          <Badge
            ml={2}
            bg="transparent"
            color={successColorValue}
            borderColor={successColorValue}
            variant="outline"
            fontSize="9px"
            mb={1}
          >
            Auto
          </Badge>
        )}
      </Flex>
      <Flex gap={1} flexWrap="wrap">
        {Object.keys(shades)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(shade => (
            <Box
              key={shade}
              onClick={() => !disabled && onShadeChange(shade)}
              bg={shades[shade]}
              w="22px"
              h="22px"
              borderRadius="sm"
              borderWidth="2px"
              borderColor={selectedShade === shade ? primaryAccentValue : "transparent"}
              cursor={disabled ? "not-allowed" : "pointer"}
              opacity={disabled ? 0.7 : 1}
              _hover={{ transform: disabled ? "none" : "scale(1.1)" }}
              transition="all 0.2s"
              title={disabled ? `Disabled: ${shade}` : `Shade ${shade}`}
            />
          ))}
      </Flex>
    </Box>
  );
};

export default ShadeSelector;
