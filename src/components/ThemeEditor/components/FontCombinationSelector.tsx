import React from "react";
import { Box, Text, SimpleGrid, useColorModeValue, VStack, Heading, Badge } from "@chakra-ui/react";
import { FontCombination } from "@/types";
import {
  backgroundLight,
  borderLight,
  backgroundMedium,
  textMuted,
  borderHighlight,
} from "@/theme/themeConfiguration";

interface FontCombinationSelectorProps {
  combinations: FontCombination[];
  onSelect: (combination: FontCombination) => void;
  selectedCombination?: string;
}

export const FontCombinationSelector: React.FC<FontCombinationSelectorProps> = ({
  combinations,
  onSelect,
  selectedCombination,
}) => {
  const bgColor = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const hoverBg = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const activeBg = useColorModeValue(backgroundMedium.light, backgroundMedium.dark);
  const codeBlockBg = useColorModeValue(backgroundMedium.light, backgroundMedium.dark);
  const shadow = useColorModeValue("md", "md");
  const borderHighlightColor = useColorModeValue(borderHighlight.light, borderHighlight.dark);
  const textMutedColor = useColorModeValue(textMuted.light, textMuted.dark);

  return (
    <Box mb={6}>
      <Text fontSize="sm" mb={4}>
        Select a pre-designed font combination for your brand style
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {combinations.map(combo => (
          <Box
            key={combo.name}
            p={4}
            bg={selectedCombination === combo.name ? activeBg : bgColor}
            borderWidth="1px"
            borderColor={selectedCombination === combo.name ? borderHighlightColor : borderColor}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: hoverBg, shadow: shadow }}
            onClick={() => onSelect(combo)}
            transition="all 0.2s"
            shadow={selectedCombination === combo.name ? shadow : "none"}
          >
            <VStack align="start" spacing={3}>
              <Box>
                <Heading
                  as="h3"
                  size="sm"
                  mb={1}
                  style={{ fontFamily: `'${combo.heading}', sans-serif` }}
                >
                  {combo.name}
                  {selectedCombination === combo.name && (
                    <Badge ml={2} colorScheme="primary" fontSize="0.7em">
                      Selected
                    </Badge>
                  )}
                </Heading>
                <Text fontSize="xs" color={textMutedColor} mb={2}>
                  {combo.description}
                </Text>
              </Box>

              <Box w="100%">
                <Text fontSize="xs" fontWeight="medium" mb={1}>
                  Heading:{" "}
                  <Text as="span" color={textMutedColor}>
                    {combo.heading}
                  </Text>
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  style={{ fontFamily: `'${combo.heading}', sans-serif` }}
                  mb={2}
                >
                  The quick brown fox
                </Text>

                <Text fontSize="xs" fontWeight="medium" mb={1}>
                  Body:{" "}
                  <Text as="span" color={textMutedColor}>
                    {combo.body}
                  </Text>
                </Text>
                <Text fontSize="sm" style={{ fontFamily: `'${combo.body}', sans-serif` }} mb={2}>
                  A quick movement of the enemy will jeopardize five gunboats.
                </Text>

                <Text fontSize="xs" fontWeight="medium" mb={1}>
                  Mono:{" "}
                  <Text as="span" color={textMutedColor}>
                    {combo.mono}
                  </Text>
                </Text>
                <Text
                  fontSize="xs"
                  fontFamily={`'${combo.mono}', monospace`}
                  p={1}
                  bg={codeBlockBg}
                  borderRadius="sm"
                >
                  {`const example = () => console.log("Hello!");`}
                </Text>
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FontCombinationSelector;
