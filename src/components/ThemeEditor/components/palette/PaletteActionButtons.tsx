import React from "react";
import { Box, Button, Flex, Icon, useColorModeValue, Spacer } from "@chakra-ui/react";
import { accentColor, textHeading } from "@/theme/themeConfiguration";
import { BotMessageSquare, Plus, SwatchBook } from "lucide-react";
import { ThemeDownloader } from "../../components/preview";
import ShareThemeButton from "../../components/ShareThemeButton";
import { ThemeValues } from "@/types";

interface PaletteActionButtonsProps {
  onAddPalette: () => void;
  onOpenCollections: () => void;
  onOpenAIGenerator: () => void;
  themeValues: ThemeValues;
}

/**
 * Component that displays the action buttons for the Palette Management tab:
 * - Add Palette
 * - Collections
 * - AI Generator
 * - Download
 * - Share
 */
const PaletteActionButtons: React.FC<PaletteActionButtonsProps> = ({
  onAddPalette,
  onOpenCollections,
  onOpenAIGenerator,
  themeValues,
}) => {
  const accentColorValue = useColorModeValue(accentColor.light, accentColor.dark);
  const textHeadingValue = useColorModeValue("white", textHeading.dark);
  
  return (
    <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap" }} justifyContent="space-between" width="100%">
      <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap"}} flex="1">
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
            bg={accentColorValue}
            color={textHeadingValue}
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
      
      {/* Desktop - buttons on right side */}
      <Flex display={{ base: "none", md: "flex" }} gap={2}>
        <ThemeDownloader themeValues={themeValues} />
        <ShareThemeButton variant="button" label="Share" />
      </Flex>
      
      {/* Mobile - buttons below the main action buttons */}
      <Flex display={{ base: "flex", md: "none" }} gap={2} width="100%" mt={3} justifyContent="center">
        <ThemeDownloader themeValues={themeValues} />
        <ShareThemeButton variant="button" size="sm" label="Share" />
      </Flex>
    </Flex>
  );
};

export default PaletteActionButtons;
