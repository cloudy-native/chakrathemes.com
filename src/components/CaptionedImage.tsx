import React, { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import ImageModal from "./ImageModal";

interface CaptionedImageProps {
  src: string;
  alt: string;
  caption: string;
  mt?: number | string;
  mb?: number | string;
  width?: string | number;
}

/**
 * A reusable component for displaying an image with a caption
 * Default width is 50% of container
 */
const CaptionedImage: React.FC<CaptionedImageProps> = ({
  src,
  alt,
  caption,
  mt = 4,
  mb = 4,
  width = "50%",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Image src={src} alt={alt} width="100%" style={{ display: "block" }} />
        <Text p={2} fontSize="xs" textAlign="center">
          {caption}
        </Text>
      </Box>

      {/* Full-size image modal */}
      <ImageModal isOpen={isModalOpen} onClose={closeModal} src={src} alt={alt} />
    </>
  );
};

export default CaptionedImage;
