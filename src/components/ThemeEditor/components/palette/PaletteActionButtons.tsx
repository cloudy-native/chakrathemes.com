import { accentColor, textHeading } from "@/theme/themeConfiguration";
import { ThemeValues } from "@/types";
import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { BotMessageSquare, Image, Plus, Palette, PanelBottomOpen } from "lucide-react";
import React from "react";
import { ThemeDownloader } from "../../components/preview";
import ShareThemeButton from "../../components/ShareThemeButton";

interface PaletteActionButtonsProps {
  onOpenColorPicker: () => void;
  onOpenImagePicker: () => void;
  onOpenInspirationPicker: () => void;
  onOpenCuratedThemes: () => void;
  onOpenAIGenerator: () => void;
  themeValues: ThemeValues;
}

/**
 * Component that displays the action buttons for the Palette Management tab:
 * - Color Picker
 * - Image Color Picker
 * - Inspiration Palette
 * - Curated Themes
 * - AI Generator
 * - Download
 * - Share
 */
const PaletteActionButtons: React.FC<PaletteActionButtonsProps> = ({
  onOpenColorPicker,
  onOpenImagePicker,
  onOpenInspirationPicker,
  onOpenCuratedThemes,
  onOpenAIGenerator,
  themeValues,
}) => {
  const accentColorValue = useColorModeValue(accentColor.light, accentColor.dark);
  const textHeadingValue = useColorModeValue("white", textHeading.dark);

  return (
    <Flex
      gap={2}
      flexWrap={{ base: "wrap", md: "nowrap" }}
      justifyContent="space-between"
      width="100%"
    >
      <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap" }} flex="1">
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme="primary"
          leftIcon={<Icon as={Plus} boxSize={{ base: 4, md: 5 }} />}
          onClick={onOpenColorPicker}
          width="auto"
          flex={{ base: 1, md: "initial" }}
          minW={{ base: "initial", md: "120px" }}
        >
          From Color
        </Button>

        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme="primary"
          leftIcon={<Icon as={Image} boxSize={{ base: 4, md: 5 }} />}
          onClick={onOpenImagePicker}
          width="auto"
          flex={{ base: 1, md: "initial" }}
          minW={{ base: "initial", md: "120px" }}
        >
          From Image
        </Button>

        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme="primary"
          leftIcon={<Icon as={Palette} boxSize={{ base: 4, md: 5 }} />}
          onClick={onOpenInspirationPicker}
          width="auto"
          flex={{ base: 1, md: "initial" }}
          minW={{ base: "initial", md: "120px" }}
        >
          Inspiration
        </Button>

        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme="primary"
          leftIcon={<Icon as={PanelBottomOpen} boxSize={{ base: 4, md: 5 }} />}
          onClick={onOpenCuratedThemes}
          width="auto"
          flex={{ base: 1, md: "initial" }}
          minW={{ base: "initial", md: "140px" }}
        >
          Curated Themes
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
      <Flex
        display={{ base: "flex", md: "none" }}
        gap={2}
        width="100%"
        mt={3}
        justifyContent="center"
      >
        <ThemeDownloader themeValues={themeValues} />
        <ShareThemeButton variant="button" size="sm" label="Share" />
      </Flex>
    </Flex>
  );
};

export default PaletteActionButtons;
