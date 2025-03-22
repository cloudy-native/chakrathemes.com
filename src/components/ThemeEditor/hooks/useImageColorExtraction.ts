import { useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { Vibrant } from "node-vibrant/browser";
import { ExtractedColor, generateColorPalette } from "../utils/colorUtils";
import { ThemeValues } from "./useColorManagement";

export const useImageColorExtraction = (
  themeValues: ThemeValues,
  setThemeValues: React.Dispatch<React.SetStateAction<ThemeValues>>
) => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [extractionLoading, setExtractionLoading] = useState(false);
  const [selectedColorFromImage, setSelectedColorFromImage] = useState<
    string | null
  >(null);
  const [newPaletteNameFromImage, setNewPaletteNameFromImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  // Handle image upload from file
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setImageUrl("");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload from URL
  const handleImageUrlSubmit = () => {
    if (!imageUrl) {
      toast({
        title: "URL is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Simple URL validation
    if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|bmp)$/i)) {
      toast({
        title: "Invalid image URL",
        description: "Please enter a valid image URL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Use a CORS proxy to avoid cross-origin issues
    const corsProxyUrl = "https://api.allorigins.win/raw?url=";
    const proxiedUrl = corsProxyUrl + encodeURIComponent(imageUrl);

    // Show loading toast
    toast({
      title: "Loading image",
      description: "Fetching image through CORS proxy...",
      status: "loading",
      duration: 3000,
      isClosable: true,
    });

    // Load the image via proxy
    const testImg = document.createElement("img");
    testImg.crossOrigin = "anonymous";
    testImg.onload = () => {
      setUploadedImage(proxiedUrl);
    };
    testImg.onerror = () => {
      toast({
        title: "Error loading image",
        description:
          "There was an error loading the image. This may be due to CORS restrictions. Try downloading the image and uploading it directly instead.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
    testImg.src = proxiedUrl;
  };

  // Extract colors from the uploaded image
  const extractColorsFromImage = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image found",
        description: "Please upload an image first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setExtractionLoading(true);

    try {
      // Create a new image with cross-origin attributes for handling the uploaded image
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";

      // Use a promise to handle the image loading
      const imageLoaded = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = uploadedImage;
      });

      // Wait for the image to load
      await imageLoaded;

      // Create a new Vibrant instance with the loaded image and get the palette
      const vibrant = Vibrant.from(img);
      const palette = await vibrant.getPalette();

      const extractedColorsArray: ExtractedColor[] = [];

      if (palette.LightVibrant) {
        extractedColorsArray.push({
          name: "Light Vibrant",
          color: palette.LightVibrant.hex,
        });
      }

      if (palette.Vibrant) {
        extractedColorsArray.push({
          name: "Vibrant",
          color: palette.Vibrant.hex,
        });
      }

      if (palette.DarkVibrant) {
        extractedColorsArray.push({
          name: "Dark Vibrant",
          color: palette.DarkVibrant.hex,
        });
      }

      if (palette.LightMuted) {
        extractedColorsArray.push({
          name: "Light Muted",
          color: palette.LightMuted.hex,
        });
      }

      if (palette.Muted) {
        extractedColorsArray.push({
          name: "Muted",
          color: palette.Muted.hex,
        });
      }

      if (palette.DarkMuted) {
        extractedColorsArray.push({
          name: "Dark Muted",
          color: palette.DarkMuted.hex,
        });
      }

      setExtractedColors(extractedColorsArray);

      if (extractedColorsArray.length > 1) {
        // Vibrant
        setSelectedColorFromImage(extractedColorsArray[1].color);
      }

      toast({
        title: "Colors extracted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error extracting colors:", error);
      toast({
        title: "Error extracting colors",
        description: "There was an error processing the image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setExtractionLoading(false);
    }
  };

  // Generate palette from extracted color
  const generatePaletteFromExtractedColor = () => {
    if (!selectedColorFromImage) {
      toast({
        title: "No color selected",
        description: "Please select a color from the extracted colors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!newPaletteNameFromImage) {
      toast({
        title: "Palette name is required",
        description: "Please enter a name for the new palette",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const colorName = newPaletteNameFromImage
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    const palette = generateColorPalette(selectedColorFromImage);

    // Update theme with the new color palette
    setThemeValues((prev) => {
      const newTheme = { ...prev };
      if (!newTheme.colors) {
        newTheme.colors = {};
      }
      newTheme.colors[colorName] = palette;
      return newTheme;
    });

    toast({
      title: `Added color palette: ${colorName}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    // Reset inputs
    setNewPaletteNameFromImage("");
  };

  return {
    imageUrl,
    setImageUrl,
    uploadedImage,
    setUploadedImage,
    extractedColors,
    extractionLoading,
    selectedColorFromImage,
    setSelectedColorFromImage,
    newPaletteNameFromImage,
    setNewPaletteNameFromImage,
    fileInputRef,
    handleImageUpload,
    handleImageUrlSubmit,
    extractColorsFromImage,
    generatePaletteFromExtractedColor,
  };
};
