import React, { useEffect } from "react";
import { generateGoogleFontsUrl } from "@/utils/typographyUtils";

interface GoogleFontsLoaderProps {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
}

export const GoogleFontsLoader: React.FC<GoogleFontsLoaderProps> = ({
  headingFont,
  bodyFont,
  monoFont,
}) => {
  // Generate the Google Fonts URL based on selected fonts
  const fontsUrl = generateGoogleFontsUrl(headingFont, bodyFont, monoFont);

  // Dynamically add fonts to the document head
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Look for an existing Google Fonts link with our id
      const existingLink = document.getElementById("google-fonts-typography") as HTMLLinkElement;

      if (existingLink) {
        // Update existing link
        existingLink.href = fontsUrl;
      } else {
        // Create new link element
        const link = document.createElement("link");
        link.id = "google-fonts-typography";
        link.rel = "stylesheet";
        link.href = fontsUrl;

        // Add to document head
        document.head.appendChild(link);
      }
    }

    // For debugging
    console.log("Loaded fonts:", { headingFont, bodyFont, monoFont });
  }, [headingFont, bodyFont, monoFont, fontsUrl]);

  // This component doesn't render anything visible
  return null;
};

export default GoogleFontsLoader;
