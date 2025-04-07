import React from "react";
import { FormControl, FormLabel, Switch, VStack } from "@chakra-ui/react";

interface ColorModeToggleProps {
  autoSuggestDark: boolean;
  setAutoSuggestDark: (value: boolean) => void;
  autoSuggestText: boolean;
  setAutoSuggestText: (value: boolean) => void;
  trackAction?: (action: string, label: string) => void;
  colorKey?: string;
}

/**
 * Component for toggling auto-suggest features
 */
export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
  autoSuggestDark,
  setAutoSuggestDark,
  autoSuggestText,
  setAutoSuggestText,
  trackAction,
  colorKey = "",
}) => {
  const handleDarkToggle = () => {
    const newValue = !autoSuggestDark;
    setAutoSuggestDark(newValue);
    if (trackAction) {
      trackAction(
        "toggle_palette_auto_dark",
        `${newValue ? "enabled" : "disabled"}${colorKey ? `_${colorKey}` : ""}`
      );
    }
  };

  const handleTextToggle = () => {
    const newValue = !autoSuggestText;
    setAutoSuggestText(newValue);
    if (trackAction) {
      trackAction(
        "toggle_palette_auto_text",
        `${newValue ? "enabled" : "disabled"}${colorKey ? `_${colorKey}` : ""}`
      );
    }
  };

  return (
    <VStack align="stretch" spacing={2} mb={4}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="auto-dark" mb="0" fontSize="sm">
          Auto-suggest dark mode shade
        </FormLabel>
        <Switch
          id="auto-dark"
          size="sm"
          isChecked={autoSuggestDark}
          onChange={handleDarkToggle}
          colorScheme="primary"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="auto-text" mb="0" fontSize="sm">
          Auto-suggest text colors
        </FormLabel>
        <Switch
          id="auto-text"
          size="sm"
          isChecked={autoSuggestText}
          onChange={handleTextToggle}
          colorScheme="primary"
        />
      </FormControl>
    </VStack>
  );
};

export default ColorModeToggle;
