import { ExtractedColor } from "@/types";
import {
  Box,
  Button,
  Image as ChakraImage,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Check, Plus } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";
import React, { useRef, useState } from "react";

interface ImageColorExtractorProps {
  onSelectColor: (color: string) => void;
}

const ImageColorExtractor: React.FC<ImageColorExtractorProps> = ({ onSelectColor }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        extractColors(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = async (imageSrc: string) => {
    try {
      const palette = await Vibrant.from(imageSrc).getPalette();

      const colors: ExtractedColor[] = [];
      if (palette.LightVibrant)
        colors.push({ name: "LightVibrant", color: palette.LightVibrant.hex });
      if (palette.Vibrant) colors.push({ name: "Vibrant", color: palette.Vibrant.hex });
      if (palette.DarkVibrant) colors.push({ name: "DarkVibrant", color: palette.DarkVibrant.hex });
      if (palette.LightMuted) colors.push({ name: "LightMuted", color: palette.LightMuted.hex });
      if (palette.Muted) colors.push({ name: "Muted", color: palette.Muted.hex });
      if (palette.DarkMuted) colors.push({ name: "DarkMuted", color: palette.DarkMuted.hex });

      setExtractedColors(colors);

      // Auto-select the Vibrant color if available
      const vibrantIndex = colors.findIndex(c => c.name === "Vibrant");
      if (vibrantIndex !== -1) {
        setSelectedColorIndex(vibrantIndex);
        onSelectColor(colors[vibrantIndex].color);
      }
    } catch (error) {
      console.error("Error extracting colors:", error);
      toast({
        title: "Error extracting colors",
        description: "Failed to extract colors from the image. Please try another image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
    onSelectColor(extractedColors[index].color);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {!selectedImage ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          borderWidth="2px"
          borderRadius="md"
          borderStyle="dashed"
          borderColor="gray.300"
          _hover={{ cursor: "pointer" }}
          onClick={triggerFileInput}
        >
          <Icon as={Plus} size={24} style={{ marginBottom: "12px" }} />
          <Text mb={1} fontWeight="medium">
            Upload an image
          </Text>
          <Text fontSize="sm" color="gray.500">
            Click to browse or drag and drop
          </Text>
        </Flex>
      ) : (
        <VStack spacing={6} align="stretch">
          <Box maxH="250px" overflow="hidden" borderRadius="md">
            <ChakraImage src={selectedImage} alt="Uploaded image" objectFit="cover" w="100%" />
          </Box>

          <Box>
            <Text fontWeight="medium" mb={3}>
              Extracted Colors
            </Text>
            <SimpleGrid columns={3} spacing={3}>
              {extractedColors.map((color, index) => (
                <Box
                  key={color.name}
                  onClick={() => handleColorSelect(index)}
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  borderRadius="md"
                  borderWidth="2px"
                  borderColor={selectedColorIndex === index ? "accent.500" : "transparent"}
                >
                  <Box bg={color.color} h="60px" w="100%" />
                  <Text
                    fontSize="xs"
                    p={1}
                    textAlign="center"
                    bg={selectedColorIndex === index ? "accent.50" : "gray.50"}
                  >
                    {color.name}
                  </Text>
                  {selectedColorIndex === index && (
                    <Flex
                      position="absolute"
                      top={1}
                      right={1}
                      align="center"
                      justify="center"
                      w="18px"
                      h="18px"
                      borderRadius="full"
                    >
                      <Icon as={Check} />
                    </Flex>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Button size="sm" onClick={triggerFileInput}>
            Choose Different Image
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default ImageColorExtractor;
