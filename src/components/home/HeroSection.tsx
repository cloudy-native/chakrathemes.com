import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { featureHeading } from "@/theme/themeConfiguration";
import React, { useState, useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { keyframes } from "@emotion/react";

/**
 * HeroSection Component
 *
 * This component displays the main hero section of the homepage, featuring a large heading,
 * descriptive text, and a carousel of images showcasing the application's capabilities.
 */

// Define slide animation keyframes
const slideInFromRight = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

// Array of image filenames for the carousel
const carouselImages = [
  "color-from-image.png",
  "ai-theme-generator.png",
  "analogous-harmony.png",
  "complementary-harmony.png",
  "theme-preview.png",
  "palette-creation-tab.png",
  "typography-tab.png",
  "curated-palettes.png",
  "accessibility-colorblindness.png",
];

const HeroSection: React.FC = () => {
  // Query all the images
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: {relativePath: {regex: "/.*\\.(png|jpg|jpeg)$/"}}) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 90)
            }
          }
        }
      }
    }
  `);

  // State for tracking current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation style for the slide effect
  const slideAnimation = `${slideInFromRight} 0.5s ease-out forwards`;

  // Color value for the heading, dynamically adjusted based on the color mode.
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);
  const textColor = useColorModeValue("gray.700", "gray.300");
  const buttonBg = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("gray.700", "white");

  // Function to move to the next image
  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Wait for animation to complete before allowing next interaction
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    setCurrentImageIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Wait for animation to complete before allowing next interaction
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextImage();
      }
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAnimating]); // Add isAnimating as dependency

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 10, md: 16 }}
      alignItems="center"
      width="100%"
    >
      {/* Text content side */}
      <VStack
        align={{ base: "center", lg: "flex-start" }}
        spacing={{ base: 6, md: 8 }}
        textAlign={{ base: "center", lg: "left" }}
      >
        {/* Main heading */}
        <Heading
          as="h1"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          lineHeight="1.1"
          color={headingColor}
          fontWeight="extrabold"
        >
          Create Perfect Chakra UI Themes
        </Heading>

        {/* Description text container */}
        <VStack spacing={{ base: 4, md: 6 }} align={{ base: "center", lg: "flex-start" }}>
          {/* First description text */}
          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} maxW="3xl" color={textColor}>
            Design stunning, accessible themes with our powerful editor. Customize colors and
            typography, then share your work and export directly to your project.
          </Text>

          {/* Second description text */}
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            maxW="3xl"
            fontWeight="medium"
            color={textColor}
          >
            Free to use. No license. No Pro tier. No exceptions. Ever.
          </Text>
        </VStack>
      </VStack>

      {/* Carousel side */}
      <Flex
        justify="center"
        align="center"
        order={{ base: 1, lg: 2 }}
        position="relative"
        overflow="hidden"
        width="100%"
      >
        <Box
          position="relative"
          width={{ base: "95%", md: "100%" }}
          key={currentImageIndex} // Force re-render with new key
          animation={slideAnimation}
          borderRadius="xl"
          overflow="hidden"
          height={{ base: "300px", sm: "380px", md: "450px", lg: "500px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {(() => {
            // Find the current image
            const imageNode = data.images.edges.find((edge: any) =>
              edge.node.relativePath.includes(carouselImages[currentImageIndex])
            );

            if (!imageNode) {
              return (
                <Box p={4} bg="gray.100" borderRadius="md" width="100%" textAlign="center">
                  <Text>Image not found: {carouselImages[currentImageIndex]}</Text>
                </Box>
              );
            }

            const image = getImage(imageNode.node);

            // Safety check to ensure image is not undefined
            if (!image) {
              return (
                <Box p={4} bg="gray.100" borderRadius="md" width="100%" textAlign="center">
                  <Text>Failed to process image: {carouselImages[currentImageIndex]}</Text>
                </Box>
              );
            }

            return (
              <Box width="100%" height="100%" textAlign="center">
                <GatsbyImage
                  image={image}
                  alt={`Chakra UI Theme Editor - ${carouselImages[currentImageIndex]}`}
                  style={{
                    width: "auto",
                    height: "100%",
                    maxWidth: "100%",
                    margin: "0 auto",
                  }}
                  imgStyle={{ objectFit: "contain" }}
                />
              </Box>
            );
          })()}
        </Box>

        {/* Navigation buttons */}
        <IconButton
          aria-label="Previous image"
          icon={<ChevronLeft />}
          position="absolute"
          left="2"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bg={buttonBg}
          color={buttonColor}
          boxShadow="lg"
          opacity={0.9}
          _hover={{ opacity: 1, transform: "translateY(-50%) scale(1.1)" }}
          onClick={prevImage}
          size="md"
          isRound
          border="1px solid"
          borderColor="gray.200"
        />

        <IconButton
          aria-label="Next image"
          icon={<ChevronRight />}
          position="absolute"
          right="2"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bg={buttonBg}
          color={buttonColor}
          boxShadow="lg"
          opacity={0.9}
          _hover={{ opacity: 1, transform: "translateY(-50%) scale(1.1)" }}
          onClick={nextImage}
          size="md"
          isRound
          border="1px solid"
          borderColor="gray.200"
        />

        {/* Indicator dots - hidden on mobile */}
        <Flex
          position="absolute"
          bottom="4"
          justify="center"
          width="100%"
          zIndex={2}
          display={{ base: "none", md: "flex" }}
        >
          {carouselImages.map((_, index) => (
            <Box
              key={index}
              w="3"
              h="3"
              mx="1"
              borderRadius="full"
              bg={
                index === currentImageIndex
                  ? useColorModeValue("blue.500", "blue.300")
                  : useColorModeValue("blackAlpha.300", "whiteAlpha.400")
              }
              boxShadow="md"
              cursor="pointer"
              onClick={() => setCurrentImageIndex(index)}
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.2)",
                bg:
                  index === currentImageIndex
                    ? useColorModeValue("blue.600", "blue.400")
                    : useColorModeValue("blackAlpha.400", "whiteAlpha.600"),
              }}
            />
          ))}
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default HeroSection;
