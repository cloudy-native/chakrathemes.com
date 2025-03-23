import { ThemeValues } from '@/types';

export const useSpacingAndRadius = (
  themeValues: ThemeValues,
  updateThemeValue: (path: string[], value: any) => void
) => {
  // Handle spacing change
  const handleSpacingChange = (spacingKey: string, value: string) => {
    updateThemeValue(['space', spacingKey], value);
  };

  // Handle border radius change
  const handleRadiiChange = (radiusKey: string, value: string) => {
    updateThemeValue(['radii', radiusKey], value);
  };

  return {
    handleSpacingChange,
    handleRadiiChange,
  };
};