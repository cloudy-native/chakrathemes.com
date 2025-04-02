import React from "react";
import { backgroundLight, borderLight, textMuted } from "@/theme/themeConfiguration";
import {
  FormControl,
  FormLabel,
  Select,
  Text,
  Flex,
  Box,
  useColorModeValue,
  Grid,
  GridItem,
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
  const bgColor = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const textMutedColor = useColorModeValue(textMuted.light, textMuted.dark);

  return (
    <FormControl mb={4}>
      <Grid templateColumns="1fr 1.5fr" gap={4} alignItems="flex-start">
        <GridItem>
          <FormLabel fontWeight="medium" mb={1}>
            {label}
          </FormLabel>
          {description && (
            <Text fontSize="xs" color={textMutedColor} mb={2}>
              {description}
            </Text>
          )}

          <Select value={selectedFont} onChange={e => onChange(e.target.value)} size="sm">
            {fonts.map(font => (
              <option key={font.family} value={font.family}>
                {font.family} ({font.category})
              </option>
            ))}
          </Select>
        </GridItem>

        <GridItem>
          <Flex
            direction="column"
            p={3}
            bg={bgColor}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
            h="100%"
          >
            <Text fontWeight="semibold" mb={1} fontSize="xs">
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
              <Text fontSize="lg" fontWeight="bold" mb={1}>
                {selectedFont}
              </Text>
              <Text fontSize="sm">{previewText}</Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </FormControl>
  );
};

export default FontSelector;
