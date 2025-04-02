import React from "react";
import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { accentColor, textHeading } from "@/theme/themeConfiguration";
import { BotMessageSquare, Plus, SwatchBook } from "lucide-react";

interface PaletteActionButtonsProps {
  onAddPalette: () => void;
  onOpenCollections: () => void;
  onOpenAIGenerator: () => void;
}

/**
 * Component that displays the action buttons for the Palette Management tab:
 * - Add Palette
 * - Collections
 * - AI Generator
 */
const PaletteActionButtons: React.FC<PaletteActionButtonsProps> = ({
  onAddPalette,
  onOpenCollections,
  onOpenAIGenerator,
}) => {
  return (
    <Flex
      direction="row"
      width="100%"
      gap={2}
      flexWrap="nowrap"
      justify={{ base: "space-between", md: "flex-end" }}
    >
      <Button
        size={{ base: "sm", md: "md" }}
        colorScheme="primary"
        leftIcon={<Icon as={Plus} boxSize={{ base: 4, md: 5 }} />}
        onClick={onAddPalette}
        width="auto"
        flex={{ base: 1, md: "initial" }}
        minW={{ base: "initial", md: "120px" }}
      >
        Add Palette
      </Button>

      <Button
        size={{ base: "sm", md: "md" }}
        colorScheme="primary"
        leftIcon={<Icon as={SwatchBook} boxSize={{ base: 4, md: 5 }} />}
        onClick={onOpenCollections}
        width="auto"
        flex={{ base: 1, md: "initial" }}
        minW={{ base: "initial", md: "150px" }}
      >
        Collections
      </Button>

      <Box
        position="relative"
        display="inline-block"
        width="auto"
        flex={{ base: 1, md: "initial" }}
      >
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme="primary"
          leftIcon={<Icon as={BotMessageSquare} boxSize={{ base: 4, md: 5 }} />}
          onClick={onOpenAIGenerator}
          width="full"
          minW={{ base: "initial", md: "160px" }}
          fontWeight="bold"
        >
          AI Generator
        </Button>
        <Box
          position="absolute"
          top="-16px"
          right={{ base: "0", sm: "-10px" }}
          bg={useColorModeValue(accentColor.light, accentColor.dark)}
          color={useColorModeValue("white", textHeading.dark)}
          fontSize="md"
          fontWeight="bold"
          px={2}
          py={0.5}
          borderRadius="full"
          boxShadow="md"
          zIndex={1}
        >
          NEW
        </Box>
      </Box>
    </Flex>
  );
};

export default PaletteActionButtons;
