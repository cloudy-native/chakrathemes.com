import { ThemeDownloader } from "@/components/ThemeEditor/components/preview";
import ShareThemeButton from "@/components/ThemeEditor/components/ShareThemeButton";
import { accentColor, textHeading } from "@/theme/themeConfiguration";
import { ThemeValues } from "@/types";
import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { BotMessageSquare, Image, Palette, PanelBottomOpen, Plus } from "lucide-react";
import React from "react";

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
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={3} width="100%">
        <Flex
          gap={{ base: 3, md: 2 }}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          flex="1"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme="primary"
            leftIcon={<Icon as={Plus} boxSize={{ base: 4, md: 5 }} />}
            onClick={onOpenColorPicker}
            width="auto"
            flex={{ base: "auto", md: "initial" }}
            minW={{ base: "105px", md: "120px" }}
            fontSize={{ base: "xs", md: "md" }}
            px={{ base: 2, md: 3 }}
          >
            From Color
          </Button>

          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme="primary"
            leftIcon={<Icon as={Image} boxSize={{ base: 4, md: 5 }} />}
            onClick={onOpenImagePicker}
            width="auto"
            flex={{ base: "auto", md: "initial" }}
            minW={{ base: "105px", md: "120px" }}
            fontSize={{ base: "xs", md: "md" }}
            px={{ base: 2, md: 3 }}
          >
            From Image
          </Button>

          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme="primary"
            leftIcon={<Icon as={Palette} boxSize={{ base: 4, md: 5 }} />}
            onClick={onOpenInspirationPicker}
            width="auto"
            flex={{ base: "auto", md: "initial" }}
            minW={{ base: "105px", md: "120px" }}
            fontSize={{ base: "xs", md: "md" }}
            px={{ base: 2, md: 3 }}
          >
            Inspiration
          </Button>

          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme="primary"
            leftIcon={<Icon as={PanelBottomOpen} boxSize={{ base: 4, md: 5 }} />}
            onClick={onOpenCuratedThemes}
            width="auto"
            flex={{ base: "auto", md: "initial" }}
            minW={{ base: "130px", md: "140px" }}
            fontSize={{ base: "xs", md: "md" }}
            px={{ base: 2, md: 3 }}
          >
            Curated Themes
          </Button>

          <Box
            position="relative"
            display="inline-block"
            width="auto"
            flex={{ base: "auto", md: "initial" }}
          >
            <Button
              size={{ base: "sm", md: "md" }}
              colorScheme="primary"
              leftIcon={<Icon as={BotMessageSquare} boxSize={{ base: 4, md: 5 }} />}
              onClick={onOpenAIGenerator}
              width="full"
              minW={{ base: "120px", md: "160px" }}
              fontSize={{ base: "xs", md: "md" }}
              px={{ base: 2, md: 3 }}
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
      </Box>

      {/* Desktop - buttons on right side */}
      <Box
        display={{ base: "none", md: "flex" }}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={3}
        ml={2}
      >
        <Flex gap={2}>
          <ThemeDownloader themeValues={themeValues} />
          <ShareThemeButton variant="button" label="Share" />
        </Flex>
      </Box>

      {/* Mobile - buttons below the main action buttons */}
      <Box
        display={{ base: "flex", md: "none" }}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={3}
        width="100%"
        mt={3}
        flexDirection="column"
      >
        <Flex gap={2} justifyContent="center">
          <ThemeDownloader themeValues={themeValues} />
          <ShareThemeButton variant="button" size="sm" label="Share" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default PaletteActionButtons;
