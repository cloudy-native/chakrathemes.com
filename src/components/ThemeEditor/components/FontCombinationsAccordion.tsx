import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  VStack,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { FontCategory, FontCombination } from "@/types";
import { fontCategories } from "@/utils/curatedFonts";
import {
  backgroundLight,
  borderLight,
  backgroundMedium,
  textMuted,
  borderHighlight,
} from "@/theme/themeConfiguration";

interface FontCombinationsAccordionProps {
  onSelect: (combination: FontCombination) => void;
  selectedCombination?: string;
}

const FontCombinationsAccordion: React.FC<FontCombinationsAccordionProps> = ({
  onSelect,
  selectedCombination,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number[]>([0]);

  // Color mode values
  const bgColor = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const hoverBg = useColorModeValue(backgroundLight.light, backgroundLight.dark);
  const activeBg = useColorModeValue(backgroundMedium.light, backgroundMedium.dark);
  const codeBlockBg = useColorModeValue(backgroundMedium.light, backgroundMedium.dark);
  const shadow = useColorModeValue("md", "md");
  const borderHighlightColor = useColorModeValue(borderHighlight.light, borderHighlight.dark);
  const textMutedColor = useColorModeValue(textMuted.light, textMuted.dark);
  const accordionBg = useColorModeValue("white", "gray.800");

  const handleAccordionChange = (expandedIndexes: number[]) => {
    setExpandedIndex(expandedIndexes);
  };

  // Render a single font combination card
  const renderCombinationCard = (combo: FontCombination) => (
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
  );

  return (
    <Box mb={6}>
      <Text fontSize="sm" mb={4}>
        Select a pre-designed font combination for your brand style
      </Text>

      <Accordion
        allowMultiple
        index={expandedIndex}
        onChange={handleAccordionChange}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        bg={accordionBg}
      >
        {fontCategories.map((category, index) => (
          <AccordionItem key={category.name} border="0" mb={2}>
            <AccordionButton 
              py={3}
              _hover={{ bg: hoverBg }}
              rounded="md"
            >
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="sm">
                  {category.name}
                </Heading>
                <Text fontSize="xs" color={textMutedColor}>
                  {category.description}
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} px={2}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {category.combinations.map(combo => renderCombinationCard(combo))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FontCombinationsAccordion;