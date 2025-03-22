import { useState, useEffect } from 'react';
import { ThemeValues } from './useColorManagement';

// Define interface for Google Font data
interface GoogleFont {
  family: string;
  variants: string[];
  category: string;
}

interface GoogleFontsResponse {
  items: GoogleFont[];
}

// Font weight mapping for preview
const FONT_WEIGHT_VARIANTS = [
  { name: 'Thin', value: 100 },
  { name: 'Light', value: 300 },
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
  { name: 'SemiBold', value: 600 },
  { name: 'Bold', value: 700 },
  { name: 'ExtraBold', value: 800 },
  { name: 'Black', value: 900 },
];

export const useTypographyManagement = (
  themeValues: ThemeValues,
  updateThemeValue: (path: string[], value: any) => void
) => {
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<GoogleFont | null>(null);
  const [availableVariants, setAvailableVariants] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyLoaded, setApiKeyLoaded] = useState<boolean>(false);
  
  // Try to get the API key from environment variables
  const apiKey = typeof window !== 'undefined' ? 
    (window as any).___GATSBY_GOOGLE_FONTS_API_KEY || 
    process.env.GATSBY_GOOGLE_FONTS_API_KEY || 
    process.env.GOOGLE_FONTS_API_KEY : null;

  // Handle font family change
  const handleFontChange = (fontType: string, value: string) => {
    updateThemeValue(['fonts', fontType], value);
  };

  // Handle font size change
  const handleFontSizeChange = (sizeKey: string, value: string) => {
    updateThemeValue(['fontSizes', sizeKey], value);
  };

  // Handle font weight change
  const handleFontWeightChange = (weightKey: string, value: number) => {
    updateThemeValue(['fontWeights', weightKey], value);
  };

  // Handle letter spacing change
  const handleLetterSpacingChange = (spacingKey: string, value: string) => {
    updateThemeValue(['letterSpacings', spacingKey], value);
  };

  // Handle line height change
  const handleLineHeightChange = (lineHeightKey: string, value: string | number) => {
    updateThemeValue(['lineHeights', lineHeightKey], value);
  };

  // Fetch Google Fonts with optional key parameter
  const fetchGoogleFonts = async (providedApiKey?: string) => {
    // Use provided API key or the one from environment variables
    const keyToUse = providedApiKey || apiKey;
    
    if (!keyToUse) {
      setError('No Google Fonts API key found. Please add it to your .env file as GOOGLE_FONTS_API_KEY or provide it directly.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${keyToUse}&sort=popularity`);
      if (!response.ok) {
        throw new Error('Failed to fetch fonts');
      }
      const data: GoogleFontsResponse = await response.json();
      setGoogleFonts(data.items);
      setApiKeyLoaded(true); // Mark that we've successfully loaded fonts
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching Google Fonts:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Auto-load fonts if API key is available in environment variables
  useEffect(() => {
    if (apiKey && !apiKeyLoaded && !isLoading && googleFonts.length === 0) {
      fetchGoogleFonts();
    }
  }, [apiKey, apiKeyLoaded, isLoading, googleFonts.length]);

  // Select a Google Font
  const selectGoogleFont = (fontFamily: string) => {
    const font = googleFonts.find(f => f.family === fontFamily);
    if (font) {
      setSelectedFont(font);
      setAvailableVariants(font.variants);
      
      // Load the font for preview only
      loadGoogleFont(font.family, font.variants);
      
      // No longer automatically update the theme
      // Users will need to click the "Set as..." buttons
    }
  };

  // Load Google Font (scoped to ThemeEditor)
  // Load Google Font
  const loadGoogleFont = (family: string, variants: string[]) => {
    const variantsStr = variants.join(',');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${variantsStr}&display=swap`;
    link.rel = 'stylesheet';
    
    // Remove existing font links for this font (to avoid duplicates)
    document.head.querySelectorAll(`link[href*="${family.replace(/ /g, '+')}"]`).forEach(el => el.remove());
    
    // Add the new link
    document.head.appendChild(link);
  };

  // Get default fallback based on font category
  const getDefaultFallback = (category: string): string => {
    switch (category) {
      case 'serif':
        return 'serif';
      case 'display':
        return 'cursive';
      case 'handwriting':
        return 'cursive';
      case 'monospace':
        return 'monospace';
      case 'sans-serif':
      default:
        return 'sans-serif';
    }
  };

  // Get numeric weight from variant
  const getNumericWeight = (variant: string): number => {
    // Handle variants like "regular", "italic", "700italic", etc.
    if (variant === 'regular') return 400;
    if (variant === 'italic') return 400;
    
    // Extract numeric part from variants like "700" or "700italic"
    const numericMatch = variant.match(/^(\d+)/);
    if (numericMatch) return parseInt(numericMatch[1], 10);
    
    return 400; // Default weight
  };

  return {
    handleFontChange,
    handleFontSizeChange,
    handleFontWeightChange,
    handleLetterSpacingChange,
    handleLineHeightChange,
    fetchGoogleFonts,
    selectGoogleFont,
    googleFonts,
    isLoading,
    selectedFont,
    availableVariants,
    getNumericWeight,
    error,
    FONT_WEIGHT_VARIANTS
  };
};