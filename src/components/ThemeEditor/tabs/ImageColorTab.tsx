import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { generateColorPalette } from "../utils/colorUtils";
import PalettePreview from "../components/PalettePreview";
import { ExtractedColor } from "../utils/colorUtils";

interface ImageColorTabProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  uploadedImage: string | null;
  extractedColors: ExtractedColor[];
  extractionLoading: boolean;
  selectedColorFromImage: string | null;
  setSelectedColorFromImage: (color: string | null) => void;
  newPaletteNameFromImage: string;
  setNewPaletteNameFromImage: (name: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUrlSubmit: () => void;
  extractColorsFromImage: () => void;
  generatePaletteFromExtractedColor: () => void;
}

export const ImageColorTab: React.FC<ImageColorTabProps> = ({
  imageUrl,
  setImageUrl,
  uploadedImage,
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
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack spacing={6} align="stretch">
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        bg={useColorModeValue("blue.50", "blue.900")}
      >
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
              {uploadedImage && !imageUrl && (
                <Text fontSize="sm">Image uploaded</Text>
              )}
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
              <ChakraImage
                src={uploadedImage}
                maxH="280px"
                objectFit="contain"
                borderRadius="md"
              />
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
                  borderWidth={
                    selectedColorFromImage === color.color ? "2px" : "1px"
                  }
                  borderRadius="md"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => setSelectedColorFromImage(color.color)}
                  position="relative"
                  borderColor={
                    selectedColorFromImage === color.color
                      ? "blue.500"
                      : borderColor
                  }
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
                      onChange={(e) =>
                        setNewPaletteNameFromImage(e.target.value)
                      }
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

                <Button
                  colorScheme="blue"
                  onClick={generatePaletteFromExtractedColor}
                >
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
