import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Box, Text } from "@chakra-ui/react";
import ImageModal from "./ImageModal";

interface ImageProps {
  filename: string;
  alt: string;
  caption?: string;
  mt?: number | string;
  mb?: number | string;
  width?: string | number;
}

const OptimizedImage: React.FC<ImageProps> = ({
  filename,
  alt,
  caption,
  mt = 4,
  mb = 4,
  width = "50%",
}) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 1200, quality: 90)
            }
          }
        }
      }
    }
  `);

  const imageNode = data.images.edges.find((n: any) => n.node.relativePath.includes(filename));

  if (!imageNode) {
    console.error(`Could not find image with filename: ${filename}`);
    return (
      <Box
        borderWidth="1px"
        borderStyle="dashed"
        p={4}
        my={2}
        borderRadius="md"
        bg="gray.50"
        mt={mt}
        mb={mb}
        width={width}
        display="inline-block"
        textAlign="center"
      >
        <Text fontWeight="medium" color="red.500">
          [Image not found]
        </Text>
        <Text fontSize="sm" mt={1}>
          {filename}
        </Text>
      </Box>
    );
  }

  const image = getImage(imageNode.node);

  if (!image) {
    console.error(`Could not process image: ${filename}`);
    return (
      <Box
        borderWidth="1px"
        borderStyle="dashed"
        p={4}
        my={2}
        borderRadius="md"
        bg="gray.50"
        mt={mt}
        mb={mb}
        display="inline-block"
        width={width}
        textAlign="center"
      >
        <Text fontWeight="medium" color="orange.500">
          [Error processing image]
        </Text>
        <Text fontSize="sm" mt={1}>
          {filename}
        </Text>
      </Box>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the full-size image URL for the modal
  const fullSizeImageUrl = getSrc(imageNode.node);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        mt={mt}
        mb={mb}
        boxShadow="md"
        display="inline-block" // Makes the box fit the content
        maxWidth="100%" // Ensures it doesn't overflow
        width={width} // Default to 50% of container
        cursor="zoom-in" // Shows the user they can click to zoom
        onClick={openModal}
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.02)",
        }}
      >
        <GatsbyImage image={image} alt={alt} objectFit="contain" style={{ width: "100%" }} />
        {caption && (
          <Text p={2} bg="gray.50" fontSize="xs" textAlign="center">
            {caption}
          </Text>
        )}
      </Box>

      {/* Full-size image modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        src={fullSizeImageUrl || ""}
        alt={alt}
      />
    </>
  );
};

export default OptimizedImage;
