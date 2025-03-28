import { ExtractedColor } from "@/types";
import {
  Box,
  Button,
  Image as ChakraImage,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Check, Image as ImageIcon, Upload } from "lucide-react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          py={12}
          borderWidth="2px"
          borderRadius="md"
          borderStyle="dashed"
          borderColor="gray.300"
          bg="gray.50"
          _hover={{ 
            cursor: "pointer", 
            borderColor: "primary.500", 
            bg: "primary.50", 
            transform: "translateY(-2px)",
            boxShadow: "md"
          }}
          transition="all 0.2s"
          onClick={triggerFileInput}
        >
          <Icon as={ImageIcon} boxSize={8} mb={4} color="gray.400" />
          <Icon as={Upload} boxSize={6} mb={4} color="gray.500" />
          <Text mb={2} fontWeight="bold" fontSize="lg">
            Upload an image
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center" maxW="80%">
            Click to browse or drag and drop
          </Text>
          <Text fontSize="xs" color="gray.400" mt={4}>
            JPG, PNG, GIF, or WEBP
          </Text>
        </Flex>
      ) : (
        <VStack spacing={6} align="stretch">
          <Box 
            borderRadius="md" 
            borderWidth="1px" 
            borderColor="gray.200" 
            cursor="pointer"
            onClick={onOpen}
            transition="all 0.2s"
            _hover={{ boxShadow: "md", transform: "scale(1.01)" }}
          >
            <ChakraImage 
              src={selectedImage} 
              alt="Uploaded image" 
              objectFit="contain" 
              w="100%" 
              maxH="400px"
            />
            <Text fontSize="xs" textAlign="center" p={1} color="gray.500">
              Click to view full size
            </Text>
          </Box>
          
          {/* Full size image modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton zIndex="10" />
              <ModalBody p={0}>
                <ChakraImage 
                  src={selectedImage} 
                  alt="Uploaded image full size" 
                  w="100%" 
                  objectFit="contain"
                  maxH="80vh"
                />
              </ModalBody>
            </ModalContent>
          </Modal>

          <Box>
            <Text fontWeight="medium" mb={3}>
              Extracted Colors
            </Text>
            <SimpleGrid columns={{base: 3, md: 6}} spacing={4}>
              {extractedColors.map((color, index) => (
                <Box
                  key={color.name}
                  onClick={() => handleColorSelect(index)}
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  borderRadius="md"
                  borderWidth="2px"
                  boxShadow={selectedColorIndex === index ? "lg" : "sm"}
                  borderColor={selectedColorIndex === index ? "primary.500" : "gray.200"}
                  transform={selectedColorIndex === index ? "scale(1.05)" : "scale(1)"}
                  transition="all 0.2s ease-in-out"
                  _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                >
                  <Box bg={color.color} h="80px" w="100%" />
                  <Box
                    p={2}
                    borderTopWidth="1px"
                    borderColor="gray.200"
                    bg={selectedColorIndex === index ? "primary.50" : "white"}
                  >
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      textAlign="center"
                      mb={1}
                    >
                      {color.name}
                    </Text>
                    <Text
                      fontSize="xs"
                      textAlign="center"
                      fontFamily="mono"
                    >
                      {color.color.toUpperCase()}
                    </Text>
                  </Box>
                  {selectedColorIndex === index && (
                    <Flex
                      position="absolute"
                      top={2}
                      right={2}
                      align="center"
                      justify="center"
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      bg="primary.500"
                      color="white"
                    >
                      <Icon as={Check} boxSize={4} />
                    </Flex>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Button 
            size="sm" 
            onClick={triggerFileInput} 
            leftIcon={<Icon as={Upload} size={16} />}
            colorScheme="primary"
            variant="outline"
          >
            Choose Different Image
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default ImageColorExtractor;
