import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { ThemeValues } from "@/types";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ThemeDownloaderProps {
  themeValues: ThemeValues;
}

/**
 * Component for downloading the current theme
 */
export const ThemeDownloader: React.FC<ThemeDownloaderProps> = ({ themeValues }) => {
  const toast = useToast();
  const { trackDownload } = useAnalytics();

  // Download theme as a file
  const downloadTheme = () => {
    try {
      const themeStr = `import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme(${JSON.stringify(themeValues, null, 2)});

export default theme;`;

      const blob = new Blob([themeStr], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "theme.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Get the theme type (based on primary colors used)
      const colorKeys = Object.keys(themeValues.colors || {});
      const themeType = colorKeys.length > 0 ? colorKeys.join("-") : "custom";

      // Track the theme download event
      trackDownload(themeType);

      toast({
        title: "Theme downloaded",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error downloading theme:", error);
      toast({
        title: "Error downloading theme",
        description: "Check your theme configuration",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      onClick={downloadTheme}
      colorScheme="primary"
      leftIcon={<ArrowRight size={16} />}
      mb={4}
    >
      Download Theme
    </Button>
  );
};

export default ThemeDownloader;
