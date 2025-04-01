import React from "react";
import {
  Button,
  useToast,
  Tooltip,
  IconButton,
  useClipboard,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Box,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { useThemeContext } from "@/context/ThemeContext";
import { generateShareableUrl } from "@/utils/urlThemeUtils";
import { Share2, Check, Copy } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";

interface ShareThemeButtonProps {
  variant?: "icon" | "button";
  size?: string;
  label?: string;
}

const ShareThemeButton: React.FC<ShareThemeButtonProps> = ({
  variant = "button",
  size = "md",
  label = "Share Theme",
}) => {
  const { themeValues } = useThemeContext();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Generate the shareable URL
  const shareableUrl = generateShareableUrl(themeValues);

  // Use Chakra's useClipboard hook for copying
  const { hasCopied, onCopy } = useClipboard(shareableUrl);

  const handleCopy = () => {
    onCopy();

    toast({
      title: "URL Copied!",
      description: "Share this link to let others see your theme",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Open share modal
  const handleShare = () => {
    onOpen();
  };

  // Render either an icon button or a regular button
  const renderButton = () => {
    if (variant === "icon") {
      return (
        <Tooltip label="Share Theme">
          <IconButton
            aria-label="Share theme"
            icon={<Icon as={Share2} />}
            onClick={handleShare}
            size={size}
            colorScheme="primary"
          />
        </Tooltip>
      );
    }

    return (
      <Button
        leftIcon={<Icon as={Share2} />}
        onClick={handleShare}
        colorScheme="primary"
        size={size}
      >
        {label}
      </Button>
    );
  };

  return (
    <>
      {renderButton()}

      {/* Share Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Your Theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text mb={2} fontWeight="medium">
                  Share this URL with others:
                </Text>
                <InputGroup size="md">
                  <Input value={shareableUrl} isReadOnly pr="4.5rem" />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleCopy}
                      leftIcon={
                        hasCopied ? <Icon as={Check} size={14} /> : <Icon as={Copy} size={14} />
                      }
                      colorScheme={hasCopied ? "green" : "gray"}
                    >
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Divider />

              <Box>
                <Text mb={4} fontWeight="medium" textAlign="center">
                  Share on social media:
                </Text>
                <SimpleGrid columns={4} spacing={4} justifyItems="center">
                  <SocialShareButton
                    platform="X"
                    icon={FaXTwitter}
                    url={shareableUrl}
                    color="#000000"
                    text="Check out this Chakra UI theme I created"
                  />
                  <SocialShareButton
                    platform="Facebook"
                    icon={FaFacebookF}
                    url={shareableUrl}
                    color="#4267B2"
                  />
                  <SocialShareButton
                    platform="LinkedIn"
                    icon={FaLinkedinIn}
                    url={shareableUrl}
                    color="#0077B5"
                    text="Check out this Chakra UI theme I created"
                  />
                  <SocialShareButton
                    platform="Email"
                    icon={MdEmail}
                    url={shareableUrl}
                    color="#DD4B39"
                    subject="Check out this Chakra UI theme"
                    body="I created this theme with Chakra Themes. Check it out:"
                  />
                </SimpleGrid>
              </Box>

              <Divider />

              <Box>
                <Text mb={4} fontWeight="medium" textAlign="center">
                  Or scan this QR code:
                </Text>
                <Box
                  display="flex"
                  justifyContent="center"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <QRCode
                    value={shareableUrl}
                    size={180}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="M"
                  />
                </Box>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

// Social share button component
interface SocialShareButtonProps {
  platform: string;
  icon: React.ComponentType;
  url: string;
  color: string;
  text?: string;
  subject?: string;
  body?: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  platform,
  icon,
  url,
  color,
  text = "",
  subject = "",
  body = "",
}) => {
  const handleShare = () => {
    let shareUrl = "";

    switch (platform) {
      case "X":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`; // URL still uses twitter.com
        break;
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
        break;
      case "Email":
        shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body} ${url}`)}`;
        break;
      default:
        break;
    }

    // Open in new window
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <VStack spacing={1}>
      <Tooltip label={`Share on ${platform}`}>
        <IconButton
          aria-label={`Share on ${platform}`}
          icon={<Icon as={icon} boxSize="1.2em" color="white" />}
          onClick={handleShare}
          size="lg"
          bg={color}
          _hover={{ bg: color, opacity: 0.8, transform: "translateY(-2px)" }}
          _active={{ bg: color, transform: "translateY(0)" }}
          transition="all 0.2s"
          borderRadius="full"
          boxShadow="md"
          w="50px"
          h="50px"
        />
      </Tooltip>
      <Text fontSize="xs" fontWeight="medium" color="gray.600">
        {platform}
      </Text>
    </VStack>
  );
};

export default ShareThemeButton;
