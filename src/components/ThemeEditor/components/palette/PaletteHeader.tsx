import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

// Empty props type for this component
type PaletteHeaderProps = Record<string, never>;

/**
 * Component that displays the header section of the Palette Management tab
 * with descriptive text and action buttons.
 */
const PaletteHeader: React.FC<PaletteHeaderProps> = () => {
  return (
    <Box mb={{ base: 6, md: 8 }}>
      <Flex direction="column" justify="space-between" align="flex-start" gap={4}>
        <Text fontSize={{ base: "xs", md: "sm" }} width="full" lineHeight="1.5">
          Color palettes define your theme&apos;s identity. Use the "From Color", "From Image",
          "Inspiration", "Curated Themes", and "AI Generator" buttons above to add new palettes. Use
          the names <Text as={"strong"}>primary</Text>, <Text as={"strong"}>secondary</Text>,{" "}
          <Text as={"strong"}>accent</Text>, and <Text as={"strong"}>background</Text> to see them
          in the Preview Theme tab.
        </Text>
      </Flex>
    </Box>
  );
};

export default PaletteHeader;
