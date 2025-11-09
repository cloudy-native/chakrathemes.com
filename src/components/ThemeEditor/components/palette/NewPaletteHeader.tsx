import React from "react";
import { Box, Flex, Text, useColorModeValue, Heading } from "@chakra-ui/react";
import PaletteActionsContainer from "./PaletteActionsContainer";

interface PaletteHeaderProps {
  onNavigateToPreview?: () => void;
}

/**
 * Component that displays the header section of the Palette Management tab
 * with descriptive text and action buttons.
 * This version uses the self-contained PaletteActionsContainer.
 */
const NewPaletteHeader: React.FC<PaletteHeaderProps> = ({ onNavigateToPreview }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  
  return (
    <Box mb={{ base: 6, md: 8 }}>
      <Flex direction="column" justify="space-between" align="flex-start" gap={5}>
        <Box width="full">
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            fontStyle="italic"
            color="gray.600" 
            _dark={{ color: "gray.400" }}
            mb={3}
            textAlign={{ base: "center", md: "left" }}
          >
            Color palettes define your theme's identity
          </Text>
          
          <Box 
            p={4} 
            borderRadius="md" 
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            fontSize={{ base: "xs", md: "sm" }}
            lineHeight="1.6"
          >
            Use the name <Text as="span" fontWeight="bold">primary</Text>,{" "}
            <Text as="span" fontWeight="bold">secondary</Text>,{" "}
            <Text as="span" fontWeight="bold">accent</Text>, and{" "}
            <Text as="span" fontWeight="bold">background</Text> to see them in the Preview tab.
          </Box>
        </Box>

        <PaletteActionsContainer />
      </Flex>
    </Box>
  );
};

export default NewPaletteHeader;
