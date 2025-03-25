import PalettePreview from "@/components/ThemeEditor/components/PalettePreview";
import { useThemeContext } from "@/context/ThemeContext";
import { ExtractedColor } from "@/types";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  Badge,
  Box,
  Button,
  Center,
  Image as ChakraImage,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Vibrant } from "node-vibrant/browser";
import React, { useRef, useState } from "react";

export const ImageColorTab: React.FC = () => {
  const { themeValues, setThemeValues } = useThemeContext();
  const toast = useToast();

  // Image color state
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [extractionLoading, setExtractionLoading] = useState(false);
  const [selectedColorFromImage, setSelectedColorFromImage] = useState<string | null>(null);
  const [newPaletteNameFromImage, setNewPaletteNameFromImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const borderColor = useColorModeValue("gray.200", "gray.700");

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

    const colorName = newPaletteNameFromImage.trim().toLowerCase().replace(/\s+/g, "-");
    const palette = generateColorPalette(selectedColorFromImage);

    // Update theme with the new color palette
    setThemeValues(prev => {
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

  return (
    <VStack spacing={6} align="stretch">
      <Box p={4} borderWidth="1px" borderRadius="md" bg={useColorModeValue("blue.50", "blue.900")}>
        <Text fontWeight="bold" mb={4}>
          Extract Colors from Image
        </Text>

        {/* Image Upload Options */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
          <Box>
            <Text fontWeight="medium" mb={2}>
              Upload from your device
            </Text>
            <HStack>
              <Button
                onClick={() => fileInputRef.current?.click()}
                colorScheme="blue"
                variant="outline"
              >
                Choose File
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {uploadedImage && !imageUrl && <Text fontSize="sm">Image uploaded</Text>}
            </HStack>
          </Box>

          {/* Doesn't work yet */}
          {/* <Box>
            <Text fontWeight="medium" mb={2}>Or paste an image URL</Text>
            <HStack>
              <Input 
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button 
                colorScheme="blue" 
                onClick={handleImageUrlSubmit}
              >
                Load
              </Button>
            </HStack>
          </Box> */}
        </SimpleGrid>

        {/* Image Preview */}
        {uploadedImage && (
          <Box mb={4}>
            <Text fontWeight="medium" mb={2}>
              Image Preview
            </Text>
            <Center
              borderWidth="1px"
              borderRadius="md"
              p={2}
              bg={useColorModeValue("white", "gray.700")}
              maxH="300px"
              overflow="hidden"
            >
              <ChakraImage src={uploadedImage} maxH="280px" objectFit="contain" borderRadius="md" />
            </Center>

            <Button
              mt={4}
              colorScheme="teal"
              onClick={extractColorsFromImage}
              isLoading={extractionLoading}
              loadingText="Extracting Colors"
              width="full"
            >
              Extract Colors from Image
            </Button>
          </Box>
        )}

        {/* Extracted Colors */}
        {extractedColors.length > 0 && (
          <Box mt={6}>
            <Text fontWeight="bold" mb={3}>
              Extracted Colors
            </Text>

            <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={4} mb={6}>
              {extractedColors.map((color, idx) => (
                <Box
                  key={idx}
                  borderWidth={selectedColorFromImage === color.color ? "2px" : "1px"}
                  borderRadius="md"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => setSelectedColorFromImage(color.color)}
                  position="relative"
                  borderColor={selectedColorFromImage === color.color ? "blue.500" : borderColor}
                >
                  <Box h="60px" style={{ backgroundColor: color.color }} />
                  <Box p={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      {color.name}
                    </Text>
                    <Text fontSize="xs">{color.color}</Text>
                  </Box>
                  {selectedColorFromImage === color.color && (
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      Selected
                    </Badge>
                  )}
                </Box>
              ))}
            </SimpleGrid>

            {selectedColorFromImage && (
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Generate Palette from Selected Color
                </Text>

                <HStack spacing={4} mb={4}>
                  <FormControl>
                    <FormLabel>Palette Name</FormLabel>
                    <Input
                      placeholder="e.g. 'image-palette'"
                      value={newPaletteNameFromImage}
                      onChange={e => setNewPaletteNameFromImage(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Selected Color</FormLabel>
                    <HStack>
                      <Input value={selectedColorFromImage} isReadOnly />
                      <Box
                        w="40px"
                        h="40px"
                        bg={selectedColorFromImage}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                      />
                    </HStack>
                  </FormControl>
                </HStack>

                <Button colorScheme="blue" onClick={generatePaletteFromExtractedColor}>
                  Add Palette
                </Button>

                {/* Preview of the generated palette */}
                <Box mt={4}>
                  {selectedColorFromImage && (
                    <PalettePreview
                      palette={generateColorPalette(selectedColorFromImage)}
                      label="Preview of generated palette:"
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default ImageColorTab;
