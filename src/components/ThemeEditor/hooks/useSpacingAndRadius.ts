import { ThemeValues } from './useColorManagement';

export const useSpacingAndRadius = (
  themeValues: ThemeValues,
  updateThemeValue: (path: string[], value: any) => void
) => {
  // Handle spacing change
  const handleSpacingChange = (spaceKey: string, value: string) => {
    updateThemeValue(['space', spaceKey], value);
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