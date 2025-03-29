import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Text,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { GoogleFont } from "@/types";

interface FontSelectorProps {
  label: string;
  description?: string;
  fonts: GoogleFont[];
  selectedFont: string;
  onChange: (fontFamily: string) => void;
  previewText?: string;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  label,
  description,
  fonts,
  selectedFont,
  onChange,
  previewText = "The quick brown fox jumps over the lazy dog",
}) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <FormControl mb={6}>
      <FormLabel fontWeight="medium">{label}</FormLabel>
      {description && (
        <Text fontSize="sm" color="gray.500" mb={2}>
          {description}
        </Text>
      )}

      <Select value={selectedFont} onChange={e => onChange(e.target.value)} mb={3}>
        {fonts.map(font => (
          <option key={font.family} value={font.family}>
            {font.family} ({font.category})
          </option>
        ))}
      </Select>

      <Flex
        direction="column"
        p={4}
        bg={bgColor}
        borderRadius="md"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Text fontWeight="semibold" mb={1} fontSize="sm">
          Preview
        </Text>
        <Box
          p={2}
          style={{
            fontFamily: `'${selectedFont}', ${
              fonts.find(f => f.family === selectedFont)?.category || "sans-serif"
            }`,
          }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            {selectedFont}
          </Text>
          <Text fontSize="md">{previewText}</Text>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default FontSelector;
