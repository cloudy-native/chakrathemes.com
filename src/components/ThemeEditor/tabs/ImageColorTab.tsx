import PalettePreview from "@/components/ThemeEditor/components/PalettePreview";
import { useThemeContext } from "@/context/ThemeContext";
import { ExtractedColor, ThemeValues } from "@/types";
import { trackPaletteCreation } from "@/utils/analytics";
import { generateColorPalette } from "@/utils/colorUtils";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState, ChangeEvent } from "react";

export const ImageColorTab: React.FC = () => {
  const { themeValues, setThemeValues } = useThemeContext();
  const toast = useToast();

  // Image and color state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  // Palette generation state
  const [selectedColorFromImage, setSelectedColorFromImage] = useState("");
  const [newPaletteNameFromImage, setNewPaletteNameFromImage] = useState("");

  // Image drag and drop handling
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file input click when clicking the drop area
  const handleDropAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image upload from file
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement> | File) => {
    let file: File | null = null;

    if (event instanceof File) {
      file = event;
    } else if (event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    }

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
        // Automatically extract colors after upload
        extractColorsFromImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Extract colors from the uploaded image
  const extractColorsFromImage = async (imageUrl: string) => {
    if (!imageUrl) {
      toast({
        title: "No image found",
        description: "Please upload an image first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsExtracting(true);

    try {
      // Simulate color extraction - in a real app, use a library like node-vibrant
      // This is a simplified example
      setTimeout(() => {
        const mockExtractedColors: ExtractedColor[] = [
          { name: "Vibrant", color: "#FF61D2" },
          { name: "Dark Vibrant", color: "#8833AA" },
          { name: "Light Vibrant", color: "#FFAAE9" },
          { name: "Muted", color: "#AA7799" },
          { name: "Dark Muted", color: "#553344" },
          { name: "Light Muted", color: "#DDBBCC" },
        ];

        setExtractedColors(mockExtractedColors);
        setSelectedColorFromImage(mockExtractedColors[0].color);
        setNewPaletteNameFromImage(mockExtractedColors[0].name || "new-palette");

        toast({
          title: "Colors extracted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setIsExtracting(false);
      }, 1000);
    } catch (error) {
      console.error("Error extracting colors:", error);
      toast({
        title: "Error extracting colors",
        description: "There was an error processing the image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsExtracting(false);
    }
  };

  // Reset image extraction
  const resetImageExtraction = () => {
    setUploadedImage(null);
    setExtractedColors([]);
    setSelectedColorFromImage("");
    setNewPaletteNameFromImage("");
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleImageUpload(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Generate palette UI background colors
  const dropAreaBg = useColorModeValue("gray.50", "gray.700");
  const dropAreaHoverBg = useColorModeValue("gray.100", "gray.600");
  const dropAreaBorderColor = useColorModeValue("gray.200", "gray.600");
  const activeBorderColor = useColorModeValue("primary.500", "primary.300");

  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Text mb={4} fontSize="sm">
            Upload an image to extract colors and create palettes for your theme. You can click on
            any extracted color to use it as a base for a new palette. This is a great way to ensure
            your theme aligns with your brand identity or desired aesthetic.
          </Text>
        </GridItem>
      </Grid>

      <Box mb={6}>
        {!uploadedImage ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            p={6}
            bg={isDragging ? dropAreaHoverBg : dropAreaBg}
            borderWidth={2}
            borderStyle="dashed"
            borderColor={isDragging ? activeBorderColor : dropAreaBorderColor}
            borderRadius="md"
            transition="all 0.2s"
            cursor="pointer"
            height="200px"
            onClick={handleDropAreaClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Text mb={2}>Drag and drop an image here, or click to browse</Text>
            <Text fontSize="sm">Supported formats: PNG, JPG, JPEG, WebP</Text>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              display="none"
            />
          </Flex>
        ) : (
          <Box>
            <Flex direction={{ base: "column", md: "row" }} gap={4} align="flex-start">
              <Box flex="1" mr={{ md: 6 }} maxW={{ md: "400px" }} mb={{ base: 4, md: 0 }}>
                <Image
                  src={uploadedImage}
                  alt="Uploaded image"
                  borderRadius="md"
                  maxH="300px"
                  width="100%"
                  objectFit="cover"
                />
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={resetImageExtraction}
                >
                  Remove Image
                </Button>
              </Box>

              <VStack align="flex-start" spacing={4} flex="2">
                <Heading size="md">Extracted Colors</Heading>
                {isExtracting ? (
                  <Center w="100%" p={8}>
                    <Spinner size="xl" />
                  </Center>
                ) : (
                  <>
                    <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={3} width="100%">
                      {extractedColors.map((color, index) => (
                        <Box
                          key={`${color.color}-${index}`}
                          onClick={() => {
                            setSelectedColorFromImage(color.color);
                            setNewPaletteNameFromImage(color.name || `palette-${index + 1}`);
                          }}
                          cursor="pointer"
                          borderWidth="2px"
                          borderColor={
                            selectedColorFromImage === color.color ? "primary.500" : "transparent"
                          }
                          borderRadius="md"
                          overflow="hidden"
                          transition="all 0.2s"
                          _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                        >
                          <Box
                            bg={color.color}
                            h="80px"
                            display="flex"
                            alignItems="flex-end"
                            p={2}
                          ></Box>
                          <Stack p={2} spacing={1} bg={useColorModeValue("white", "gray.800")}>
                            <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                              {color.name || `Color ${index + 1}`}
                            </Text>
                            <Text fontSize="xs" fontFamily="mono">
                              {color.color}
                            </Text>
                          </Stack>
                        </Box>
                      ))}
                    </SimpleGrid>

                    {selectedColorFromImage && (
                      <Box width="100%" mt={2}>
                        <Divider my={4} />
                        <Heading size="sm" mb={2}>
                          Create Palette from Selected Color
                        </Heading>
                        <Flex direction={{ base: "column", sm: "row" }} gap={2}>
                          <Input
                            placeholder="Enter palette name"
                            value={newPaletteNameFromImage}
                            onChange={e => setNewPaletteNameFromImage(e.target.value)}
                            size="md"
                          />
                          <Button
                            colorScheme="primary"
                            onClick={() => {
                              if (!newPaletteNameFromImage) {
                                toast({
                                  title: "Palette name is required",
                                  status: "error",
                                  duration: 2000,
                                  isClosable: true,
                                });
                                return;
                              }

                              const paletteName = newPaletteNameFromImage
                                .trim()
                                .toLowerCase()
                                .replace(/\s+/g, "-");
                              const palette = generateColorPalette(selectedColorFromImage);

                              // Create new theme with the palette
                              const themeWithNewPalette: ThemeValues = {
                                ...themeValues,
                                colors: {
                                  ...(themeValues.colors || {}),
                                  [paletteName]: palette,
                                },
                              };

                              // Set the updated theme
                              setThemeValues(themeWithNewPalette);

                              // Track palette creation from image
                              trackPaletteCreation("image-extraction", 1);

                              toast({
                                title: `Added palette: ${paletteName}`,
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                              });

                              // Reset inputs
                              setSelectedColorFromImage("");
                              setNewPaletteNameFromImage("");
                            }}
                          >
                            Create Palette
                          </Button>
                        </Flex>
                        <Box mt={4}>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
                            Preview:
                          </Text>
                          {selectedColorFromImage && (
                            <PalettePreview
                              palette={generateColorPalette(selectedColorFromImage)}
                              label={newPaletteNameFromImage || "New Palette"}
                            />
                          )}
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </VStack>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageColorTab;
