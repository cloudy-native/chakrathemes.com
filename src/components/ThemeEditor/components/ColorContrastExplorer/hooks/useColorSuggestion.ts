import { useEffect } from "react";
import { suggestDarkShade, findBestContrastShade } from "../utils/contrastUtils";

/**
 * Hook for auto-suggesting colors based on selected values
 */
export const useColorSuggestion = (
  autoSuggestDark: boolean,
  autoSuggestText: boolean,
  bgShadeLight: string,
  setBgShadeDark: (shade: string) => void,
  colorShades: Record<string, string>,
  textShades: Record<string, string>,
  setTextShadeLight: (shade: string) => void,
  setTextShadeDark: (shade: string) => void
) => {
  // Auto-suggest dark mode colors when light mode changes
  useEffect(() => {
    if (autoSuggestDark) {
      const suggestedDark = suggestDarkShade(bgShadeLight);
      setBgShadeDark(suggestedDark);
    }
  }, [bgShadeLight, autoSuggestDark, setBgShadeDark]);

  // Auto-suggest text shades for better contrast with the background
  useEffect(() => {
    if (autoSuggestText) {
      try {
        // Ensure we have the actual hex values for our background colors
        const bgColorLight = colorShades[bgShadeLight];
        const bgColorDark = colorShades[bgShadeLight ? suggestDarkShade(bgShadeLight) : "800"];

        if (bgColorLight) {
          // For light mode background, find the best contrast text color
          const suggestedLightText = findBestContrastShade(bgColorLight, textShades);
          setTextShadeLight(suggestedLightText);
        }

        if (bgColorDark) {
          // For dark mode background, find the best contrast text color
          const suggestedDarkText = findBestContrastShade(bgColorDark, textShades);
          setTextShadeDark(suggestedDarkText);
        }
      } catch (error) {
        console.error("Error suggesting text colors:", error);
      }
    }
  }, [bgShadeLight, autoSuggestText, colorShades, textShades, setTextShadeLight, setTextShadeDark]);
};

export default useColorSuggestion;
