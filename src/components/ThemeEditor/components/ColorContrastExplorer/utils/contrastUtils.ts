import chroma from "chroma-js";
import { getContrastRatio } from "@/utils/colorUtils";

// Function to suggest a good dark shade based on light shade
export function suggestDarkShade(lightShade: string): string {
  // Simple mapping strategy (inverse relationship)
  const mapping: Record<string, string> = {
    "50": "900",
    "100": "800",
    "200": "700",
    "300": "600",
    "400": "500",
    "500": "400",
    "600": "300",
    "700": "200",
    "800": "100",
    "900": "50",
  };

  return mapping[lightShade] || "800"; // Default to 800 if no mapping
}

/**
 * Finds the best text shade for contrast against a background color
 */
export function findBestContrastShade(
  bgColor: string,
  textPalette: Record<string, string>
): string {
  // Validate inputs
  if (!bgColor || typeof bgColor !== "string") {
    console.error("Invalid background color:", bgColor);
    return "50"; // Default to light text
  }

  if (!textPalette || typeof textPalette !== "object" || Object.keys(textPalette).length === 0) {
    console.error("Invalid text palette:", textPalette);
    return "50"; // Default to light text
  }

  try {
    // 1. Determine if the background is light or dark
    const bgLuminance = chroma(bgColor).luminance();
    const bgIsDark = bgLuminance < 0.45;

    // 2. Define preferred shades based on background darkness
    const preferredShades = bgIsDark ? ["50", "100", "200"] : ["900", "800", "700"];

    // 3. Set the minimum contrast ratio
    const minContrast = 4.5; // WCAG AA

    // 4. Initialize variables to track the best shade
    let bestShade = "50"; // Default to lightest shade
    let bestContrast = 0;

    // 5. Iterate through all available shades
    for (const shade in textPalette) {
      const textColor = textPalette[shade];
      const contrast = getContrastRatio(bgColor, textColor);

      // 6. Check if the current shade meets the minimum contrast
      if (contrast >= minContrast) {
        // 7. Prioritize preferred shades
        if (preferredShades.includes(shade)) {
          // 8. If a preferred shade has better contrast, update bestShade
          if (contrast > bestContrast) {
            bestShade = shade;
            bestContrast = contrast;
          }
        } else {
          // 9. If not a preferred shade, but still meets contrast, update if better
          if (contrast > bestContrast) {
            bestShade = shade;
            bestContrast = contrast;
          }
        }
      } else {
        // 10. If the shade doesn't meet the minimum contrast, update if it's the best so far
        if (contrast > bestContrast) {
          bestShade = shade;
          bestContrast = contrast;
        }
      }
    }

    // 11. If no shade meets the minimum contrast, log a warning
    if (bestContrast < minContrast) {
      console.warn(
        `No text shade meets the minimum contrast of ${minContrast}:1 for background color ${bgColor}. Best available contrast is ${bestContrast.toFixed(
          2
        )}:1 with shade ${bestShade}.`
      );
    }

    return bestShade;
  } catch (error) {
    console.error("Error in findBestContrastShade:", error);
    return "50"; // Default fallback on error
  }
}

/**
 * Checks if a contrast ratio passes WCAG AA standard (4.5:1)
 */
export function passesWCAGAA(contrastRatio: number): boolean {
  return contrastRatio >= 4.5;
}

/**
 * Checks if a contrast ratio passes WCAG AAA standard (7:1)
 */
export function passesWCAGAAA(contrastRatio: number): boolean {
  return contrastRatio >= 7;
}

/**
 * Checks if a contrast ratio passes WCAG AA for large text (3:1)
 */
export function passesWCAGAALarge(contrastRatio: number): boolean {
  return contrastRatio >= 3;
}
