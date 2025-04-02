import React from "react";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { accentColor } from "@/theme/themeConfiguration";
import { Blend, CaptionsOff, Contrast, Edit2, Trash, ChevronDown } from "lucide-react";
import { PaletteAdjustment } from "@/components/ThemeEditor/components/PaletteAdjustment";
import { PaletteShade } from "@/components/ThemeEditor/components/PaletteShade";
import { ThemeColorSwatch } from "@/components/ThemeEditor/components";

// Define the structure for a palette item
export interface PaletteData {
  colorKey: string;
  colorShades: Record<string, string>;
  baseColor?: string;
}

interface PaletteAccordionItemProps {
  palette: PaletteData;
  onRename: (colorKey: string) => void;
  onDelete: (colorKey: string) => void;
  onOpenAccessibility: (colorKey: string, colorShades: Record<string, string>) => void;
  onOpenContrast: (colorKey: string, colorShades: Record<string, string>) => void;
  onOpenHarmony: (colorKey: string, colorShades: Record<string, string>) => void;
  onUpdateShade: (colorKey: string, shade: string, value: string) => void;
  onUpdateBaseColor: (colorKey: string, baseColor: string) => void;
}

/**
 * Component that displays a single palette item in the accordion list
 * with all its color shades and action buttons
 */
const PaletteAccordionItem: React.FC<PaletteAccordionItemProps> = ({
  palette,
  onRename,
  onDelete,
  onOpenAccessibility,
  onOpenContrast,
  onOpenHarmony,
}) => {
  return (
    <AccordionItem key={palette.colorKey}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center" gap={2}>
              <Tooltip label="Rename palette" placement="top">
                <IconButton
                  aria-label="Rename palette"
                  icon={<Edit2 size={16} />}
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation(); // Prevent accordion from toggling
                    onRename(palette.colorKey);
                  }}
                />
              </Tooltip>
              <Text fontWeight="medium">{palette.colorKey}</Text>
            </Flex>
            <HStack spacing={1}>
              {/* Accessibility Analysis Button */}
              <Tooltip label="Accessibility Analysis" placement="top">
                <IconButton
                  aria-label="Accessibility Analysis"
                  icon={<Icon as={CaptionsOff} size={16} />}
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation(); // Prevent accordion from toggling
                    onOpenAccessibility(palette.colorKey, palette.colorShades);
                  }}
                />
              </Tooltip>

              {/* Color Contrast Button */}
              <Tooltip label="Color Contrast Explorer" placement="top">
                <IconButton
                  aria-label="Color Contrast Explorer"
                  icon={<Icon as={Contrast} size={16} />}
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation(); // Prevent accordion from toggling
                    onOpenContrast(palette.colorKey, palette.colorShades);
                  }}
                />
              </Tooltip>

              {/* Color Harmony Button */}
              <Tooltip label="Color Harmony" placement="top">
                <IconButton
                  aria-label="Color Harmony"
                  icon={<Icon as={Blend} size={16} />}
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation(); // Prevent accordion from toggling
                    onOpenHarmony(palette.colorKey, palette.colorShades);
                  }}
                />
              </Tooltip>

              {/* Delete Button */}
              <Tooltip label="Delete palette" placement="top">
                <IconButton
                  aria-label="Delete palette"
                  icon={<Icon as={Trash} />}
                  variant="ghost"
                  color={useColorModeValue(accentColor.light, accentColor.dark)}
                  onClick={e => {
                    e.stopPropagation(); // Prevent accordion from toggling
                    onDelete(palette.colorKey);
                  }}
                />
              </Tooltip>
            </HStack>
          </Flex>
          <Box mt={2}>
            <ThemeColorSwatch
              colorKey={palette.colorKey}
              colorShades={palette.colorShades}
              isCompact={true}
              size="lg"
            />
          </Box>
        </Box>
        <Icon as={ChevronDown} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {/* Individual Color Shades */}
        <Box mb={4}>
          <SimpleGrid columns={{ base: 2, sm: 5 }} spacing={4} maxWidth="100%">
            {Object.entries(palette.colorShades)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([shade, color]) => (
                <Box key={`${palette.colorKey}-${shade}`}>
                  <PaletteShade colorKey={palette.colorKey} shade={shade} color={color} />
                  {/* We would need to wrap PaletteShade or modify it to support onChange */}
                </Box>
              ))}
          </SimpleGrid>
        </Box>

        {/* Color Adjustment Controls */}
        <PaletteAdjustment colorKey={palette.colorKey} colorShades={palette.colorShades} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default PaletteAccordionItem;
