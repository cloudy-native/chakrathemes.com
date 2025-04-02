import React from "react";
import { Accordion, Box, Center, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import PaletteAccordionItem, { PaletteData } from "./PaletteAccordionItem";
import { iconMuted, textMuted, emptyStateBorder } from "@/theme/themeConfiguration";

interface PaletteListProps {
  palettes: PaletteData[];
  onRename: (colorKey: string) => void;
  onDelete: (colorKey: string) => void;
  onOpenAccessibility: (colorKey: string, colorShades: Record<string, string>) => void;
  onOpenContrast: (colorKey: string, colorShades: Record<string, string>) => void;
  onOpenHarmony: (colorKey: string, colorShades: Record<string, string>) => void;
  onUpdateShade: (colorKey: string, shade: string, value: string) => void;
  onUpdateBaseColor: (colorKey: string, baseColor: string) => void;
}

/**
 * Component that displays a list of all color palettes in an accordion layout
 */
const PaletteList: React.FC<PaletteListProps> = ({
  palettes,
  onRename,
  onDelete,
  onOpenAccessibility,
  onOpenContrast,
  onOpenHarmony,
  onUpdateShade,
  onUpdateBaseColor,
}) => {
  // Define color mode values for empty state using theme configuration constants
  const emptyStateBorderColor = useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark);
  const emptyStateTextColor = useColorModeValue(textMuted.light, textMuted.dark);
  const emptyStateIconColor = useColorModeValue(iconMuted.light, iconMuted.dark);

  // If no palettes, show empty state
  if (palettes.length === 0) {
    return (
      <Center
        p={8}
        borderWidth="1px"
        borderRadius="md"
        borderStyle="dashed"
        borderColor={emptyStateBorderColor}
      >
        <Box textAlign="center">
          <Icon as={AlertCircle} w={8} h={8} color={emptyStateIconColor} mb={4} />
          <Text fontSize="md">No color palettes yet</Text>
          <Text fontSize="sm" color={emptyStateTextColor} mt={1}>
            Add a new palette to get started
          </Text>
        </Box>
      </Center>
    );
  }

  // Otherwise show the accordion list of palettes
  return (
    <Accordion allowMultiple defaultIndex={[]}>
      {palettes.map(palette => (
        <PaletteAccordionItem
          key={palette.colorKey}
          palette={palette}
          onRename={onRename}
          onDelete={onDelete}
          onOpenAccessibility={onOpenAccessibility}
          onOpenContrast={onOpenContrast}
          onOpenHarmony={onOpenHarmony}
          onUpdateShade={onUpdateShade}
          onUpdateBaseColor={onUpdateBaseColor}
        />
      ))}
    </Accordion>
  );
};

export default PaletteList;
