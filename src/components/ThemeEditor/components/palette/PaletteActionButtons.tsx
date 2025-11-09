import { ThemeDownloader } from "@/components/ThemeEditor/components/preview";
import ShareThemeButton from "@/components/ThemeEditor/components/ShareThemeButton";
import { useThemeContext } from "@/context/ThemeContext";
import { accentColor, featureHeading, textHeading } from "@/theme/themeConfiguration";
import { ThemeValues } from "@/types";
import { Box, Button, Divider, Flex, Heading, Icon, Switch, Text, useColorModeValue, Tooltip } from "@chakra-ui/react";
import { BotMessageSquare, Download, Eye, Image, Palette, PanelBottomOpen, Plus } from "lucide-react";
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
  const { isPreviewMode, setIsPreviewMode } = useThemeContext();
  const accentColorValue = useColorModeValue(accentColor.light, accentColor.dark);
  const textHeadingValue = useColorModeValue("white", textHeading.dark);
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <Box width="100%" mb={6}>
      {/* DESKTOP VIEW */}
      <Box display={{ base: "none", md: "block" }}>
        {/* Row 1: Heading and Create Color Buttons */}
        <Box mb={5}>
          <Heading as="h3" size="xl" mb={3} color={headingColor} textAlign="left">
            Add Color
          </Heading>
          <Flex
            gap={3}
            flexWrap="wrap"
            width="100%"
            justifyContent="flex-start"
          >
            <Tooltip 
              label="Create a new color palette from a single base color" 
              placement="top" 
              hasArrow
            >
              <Button
                size="md"
                colorScheme="primary"
                leftIcon={<Icon as={Plus} boxSize={5} />}
                onClick={onOpenColorPicker}
                flex="0 1 auto"
                minW="auto"
                m={0}
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                From Color
              </Button>
            </Tooltip>

            <Tooltip 
              label="Extract colors from an uploaded image" 
              placement="top" 
              hasArrow
            >
              <Button
                size="md"
                colorScheme="primary"
                leftIcon={<Icon as={Image} boxSize={5} />}
                onClick={onOpenImagePicker}
                flex="0 1 auto"
                minW="auto"
                m={0}
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                From Image
              </Button>
            </Tooltip>

            <Tooltip 
              label="Browse inspiration palette collections" 
              placement="top" 
              hasArrow
            >
              <Button
                size="md"
                colorScheme="primary"
                leftIcon={<Icon as={Palette} boxSize={5} />}
                onClick={onOpenInspirationPicker}
                flex="0 1 auto"
                minW="auto"
                m={0}
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                Get Inspiration
              </Button>
            </Tooltip>

            <Tooltip 
              label="Select from professionally designed theme palettes" 
              placement="top" 
              hasArrow
            >
              <Button
                size="md"
                colorScheme="primary"
                leftIcon={<Icon as={PanelBottomOpen} boxSize={5} />}
                onClick={onOpenCuratedThemes}
                flex="0 1 auto"
                minW="auto"
                m={0}
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                Curated Themes
              </Button>
            </Tooltip>

            <Box
              position="relative"
              display="inline-block"
            >
              <Tooltip 
                label="Generate complete theme palettes with AI" 
                placement="top" 
                hasArrow
              >
                <Button
                  size="md"
                  colorScheme="primary"
                  leftIcon={<Icon as={BotMessageSquare} boxSize={5} />}
                  onClick={onOpenAIGenerator}
                  flex="0 1 auto"
                  minW="auto"
                  m={0}
                  fontWeight="bold"
                  boxShadow="sm"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  AI Generator
                </Button>
              </Tooltip>
              <Box
                position="absolute"
                top="-16px"
                right="-10px"
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
        
        <Divider borderColor={borderColor} my={4} />
        
        {/* Row 2: Preview Toggle */}
        <Flex 
          direction="column"
          alignItems="center" 
          width="100%" 
          my={4}
        >
          <Tooltip label="Toggle between edit and preview modes" placement="top" hasArrow>
            <Flex 
              alignItems="center" 
              bg="gray.50" 
              _dark={{ bg: "gray.800" }} 
              py={2} 
              px={5} 
              borderRadius="full"
              border="1px solid"
              borderColor={borderColor}
              mb={2}
            >
              <Icon 
                as={Eye} 
                boxSize={5} 
                color={isPreviewMode ? "primary.500" : "gray.400"} 
                mr={3}
              />
              <Switch
                colorScheme="primary"
                size="md"
                isChecked={isPreviewMode}
                onChange={togglePreviewMode}
                id="preview-mode-switch"
                mr={3}
              />
              <Text 
                fontSize="md" 
                fontWeight={isPreviewMode ? "bold" : "normal"}
                color={isPreviewMode ? "primary.500" : "gray.600"}
              >
                Preview Mode {isPreviewMode ? "Active" : "Inactive"}
              </Text>
            </Flex>
          </Tooltip>
          
          {/* Check if required palettes exist */}
          {(!themeValues.colors?.primary || 
            !themeValues.colors?.secondary || 
            !themeValues.colors?.accent || 
            !themeValues.colors?.background) && (
            <Text 
              fontSize="sm" 
              color="gray.500" 
              textAlign="center"
              mt={1}
            >
              Note: Preview works best with <Text as="span" fontWeight="bold">primary</Text>, <Text as="span" fontWeight="bold">secondary</Text>, <Text as="span" fontWeight="bold">accent</Text>, and <Text as="span" fontWeight="bold">background</Text> palettes defined.
            </Text>
          )}
        </Flex>
        
        <Divider borderColor={borderColor} my={4} />
        
        {/* Row 3: Download and Share */}
        <Flex 
          justifyContent="center" 
          gap={6} 
          mt={4}
        >
          <Tooltip label="Download your theme as a JSON file" placement="top" hasArrow>
            <Box>
              <ThemeDownloader themeValues={themeValues} />
            </Box>
          </Tooltip>
          
          <Tooltip label="Share your theme with a URL" placement="top" hasArrow>
            <Box>
              <ShareThemeButton variant="button" label="Share" />
            </Box>
          </Tooltip>
        </Flex>
      </Box>

      {/* MOBILE VIEW */}
      <Box display={{ base: "block", md: "none" }}>
        <Heading as="h3" size="xl" mb={2} color={headingColor} textAlign="center">
          Add Color
        </Heading>
        <Flex
          gap={{ base: 2, sm: 3 }}
          flexWrap="wrap"
          width="100%"
          justifyContent="center"
          mb={6}
        >
          <Tooltip 
            label="Create a new color palette from a single base color" 
            placement="top" 
            hasArrow
          >
            <Button
              size={{ base: "sm", sm: "md" }}
              colorScheme="primary"
              leftIcon={<Icon as={Plus} boxSize={{ base: 4, sm: 5 }} />}
              onClick={onOpenColorPicker}
              width="auto"
              flex="0 1 auto"
              minW={{ base: "110px", sm: "auto" }}
              m={{ base: 1 }}
              fontSize={{ base: "xs", sm: "md" }}
              px={{ base: 2, sm: 3 }}
              boxShadow="sm"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              From Color
            </Button>
          </Tooltip>

          <Tooltip 
            label="Extract colors from an uploaded image" 
            placement="top" 
            hasArrow
          >
            <Button
              size={{ base: "sm", sm: "md" }}
              colorScheme="primary"
              leftIcon={<Icon as={Image} boxSize={{ base: 4, sm: 5 }} />}
              onClick={onOpenImagePicker}
              width="auto"
              flex="0 1 auto"
              minW={{ base: "110px", sm: "auto" }}
              m={{ base: 1 }}
              fontSize={{ base: "xs", sm: "md" }}
              px={{ base: 2, sm: 3 }}
              boxShadow="sm"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              From Image
            </Button>
          </Tooltip>

          <Tooltip 
            label="Browse inspiration palette collections" 
            placement="top" 
            hasArrow
          >
            <Button
              size={{ base: "sm", sm: "md" }}
              colorScheme="primary"
              leftIcon={<Icon as={Palette} boxSize={{ base: 4, sm: 5 }} />}
              onClick={onOpenInspirationPicker}
              width="auto"
              flex="0 1 auto"
              minW={{ base: "110px", sm: "auto" }}
              m={{ base: 1 }}
              fontSize={{ base: "xs", sm: "md" }}
              px={{ base: 2, sm: 3 }}
              boxShadow="sm"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              Get Inspiration
            </Button>
          </Tooltip>

          <Tooltip 
            label="Select from professionally designed theme palettes" 
            placement="top" 
            hasArrow
          >
            <Button
              size={{ base: "sm", sm: "md" }}
              colorScheme="primary"
              leftIcon={<Icon as={PanelBottomOpen} boxSize={{ base: 4, sm: 5 }} />}
              onClick={onOpenCuratedThemes}
              width="auto"
              flex="0 1 auto"
              minW={{ base: "110px", sm: "auto" }}
              m={{ base: 1 }}
              fontSize={{ base: "xs", sm: "md" }}
              px={{ base: 2, sm: 3 }}
              boxShadow="sm"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              Curated Themes
            </Button>
          </Tooltip>

          <Box
            position="relative"
            display="inline-block"
            width="auto"
            flex="0 1 auto"
          >
            <Tooltip 
              label="Generate complete theme palettes with AI" 
              placement="top" 
              hasArrow
            >
              <Button
                size={{ base: "sm", sm: "md" }}
                colorScheme="primary"
                leftIcon={<Icon as={BotMessageSquare} boxSize={{ base: 4, sm: 5 }} />}
                onClick={onOpenAIGenerator}
                width="auto"
                flex="0 1 auto"
                minW={{ base: "110px", sm: "auto" }}
                m={{ base: 1 }}
                fontSize={{ base: "xs", sm: "md" }}
                px={{ base: 2, sm: 3 }}
                fontWeight="bold"
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                AI Generator
              </Button>
            </Tooltip>
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

        {/* Mobile Preview Toggle */}
        <Box width="100%" mb={4}>
          <Tooltip label="Toggle between edit and preview modes" placement="top" hasArrow>
            <Button
              width="100%"
              size="lg"
              variant={isPreviewMode ? "solid" : "outline"}
              colorScheme={isPreviewMode ? "primary" : "gray"}
              onClick={togglePreviewMode}
              justifyContent="space-between"
              boxShadow="sm"
              py={6}
              px={4}
              mb={2}
            >
              <Flex alignItems="center" gap={2}>
                <Icon 
                  as={Eye} 
                  boxSize={5} 
                  color={isPreviewMode ? "white" : "gray.500"} 
                />
                <Text 
                  fontSize="md" 
                  fontWeight="bold"
                >
                  Preview Mode
                </Text>
              </Flex>
              <Switch
                colorScheme={isPreviewMode ? "white" : "primary"}
                size="lg"
                isChecked={isPreviewMode}
                onChange={togglePreviewMode}
                id="preview-mode-switch-mobile"
              />
            </Button>
          </Tooltip>
          
          {/* Check if required palettes exist - Mobile version */}
          {(!themeValues.colors?.primary || 
            !themeValues.colors?.secondary || 
            !themeValues.colors?.accent || 
            !themeValues.colors?.background) && (
            <Text 
              fontSize="xs" 
              color="gray.500" 
              textAlign="center"
            >
              Note: Preview works best with <Text as="span" fontWeight="bold">primary</Text>, <Text as="span" fontWeight="bold">secondary</Text>, <Text as="span" fontWeight="bold">accent</Text>, and <Text as="span" fontWeight="bold">background</Text> palettes defined.
            </Text>
          )}
        </Box>
        
        {/* Mobile Download and Share */}
        <Flex gap={4} justifyContent="center" width="100%">
          <Tooltip label="Download your theme as a JSON file" placement="top" hasArrow>
            <Box flex="1">
              <Button
                onClick={() => {
                  const downloadButton = document.querySelector("[data-testid='theme-download-button']");
                  if (downloadButton) {
                    (downloadButton as HTMLElement).click();
                  }
                }}
                leftIcon={<Icon as={Download} />}
                size="md"
                width="100%"
                colorScheme="gray"
                variant="outline"
              >
                Download
              </Button>
            </Box>
          </Tooltip>
          <Box flex="1">
            <Tooltip label="Share your theme with a URL" placement="top" hasArrow>
              <Box width="100%">
                <ShareThemeButton variant="button" size="md" label="Share" />
              </Box>
            </Tooltip>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default PaletteActionButtons;