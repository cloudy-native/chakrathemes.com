import { useMemo } from "react";
import { getContrastRatio } from "@/utils/colorUtils";

/**
 * Hook for calculating color contrast ratios
 */
export const useContrastCalculation = (
  bgColorLight: string,
  bgColorDark: string,
  textColorLight: string,
  textColorDark: string
) => {
  // Calculate contrast ratios - memoized to avoid recalculation on every render
  const lightContrast = useMemo(
    () => getContrastRatio(bgColorLight, textColorLight),
    [bgColorLight, textColorLight]
  );

  const darkContrast = useMemo(
    () => getContrastRatio(bgColorDark, textColorDark),
    [bgColorDark, textColorDark]
  );

  return { lightContrast, darkContrast };
};

export default useContrastCalculation;
