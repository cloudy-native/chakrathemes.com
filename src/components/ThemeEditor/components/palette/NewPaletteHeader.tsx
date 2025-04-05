import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
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
  return (
    <Box mb={{ base: 6, md: 8 }}>
      <Flex direction="column" justify="space-between" align="flex-start" gap={4}>
        <Text fontSize={{ base: "xs", md: "sm" }} width="full" lineHeight="1.5">
          Color palettes define your theme&apos;s identity. Use the names{" "}
          <Text as={"strong"}>primary</Text>, <Text as={"strong"}>secondary</Text>,{" "}
          <Text as={"strong"}>accent</Text>, and <Text as={"strong"}>background</Text> to see them
          in the Preview Theme tab.
        </Text>

        <PaletteActionsContainer onNavigateToPreview={onNavigateToPreview} />
      </Flex>
    </Box>
  );
};

export default NewPaletteHeader;
