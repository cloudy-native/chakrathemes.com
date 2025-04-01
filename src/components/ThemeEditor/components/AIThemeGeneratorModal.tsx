import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Input,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import { trackEvent, EventCategory } from "@/utils/analytics";

// ColorChip component for displaying color swatches
const ColorChip: React.FC<{ color: string; size?: string }> = ({ color, size = "24px" }) => (
  <Box
    w={size}
    h={size}
    borderRadius="sm"
    bg={color}
    boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
  />
);

interface AITheme {
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface AIThemeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: AITheme) => void;
}

export const AIThemeGeneratorModal: React.FC<AIThemeGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectTheme,
}) => {
  const toast = useToast();
  const [aiPrompt, setAIPrompt] = useState("");
  const [aiThemeResults, setAIThemeResults] = useState<AITheme[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleGenerate = async () => {
    console.log("AI Prompt:", aiPrompt);
    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your theme",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch(
        "https://pnl3jv9t9f.execute-api.ap-southeast-1.amazonaws.com/prod/generate-theme",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: aiPrompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("AI Response:", data);
      // Access the themes array from the response
      if (data.themes && Array.isArray(data.themes)) {
        setAIThemeResults(data.themes);
      } else {
        console.error("Unexpected response format:", data);
        setGenerationError("Received an invalid response format from the API");
      }

      // Track analytics
      trackEvent(EventCategory.COLOR, "ai_generate_theme", aiPrompt);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setGenerationError(errorMessage);
      toast({
        title: "Error generating theme",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error generating theme:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>AI Theme Generator</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            Describe the theme you want to create, and AI will suggest color palettes for you.
          </Text>
          <Box mb={6}>
            <Flex>
              <Box flex="1" mr={2}>
                <Input
                  placeholder="Describe your theme idea..."
                  value={aiPrompt}
                  onChange={e => setAIPrompt(e.target.value.slice(0, 500))}
                  maxLength={500}
                />
                <Text fontSize="xs" textAlign="right" color="gray.500" mt={1}>
                  {aiPrompt.length}/500 characters
                </Text>
              </Box>
              <Button
                colorScheme="primary"
                isLoading={isGenerating}
                loadingText="Generating"
                onClick={handleGenerate}
              >
                Generate
              </Button>
            </Flex>
          </Box>

          {generationError && (
            <Box mt={4} p={3} bg="red.50" color="red.600" borderRadius="md">
              <Text fontWeight="medium">Error generating theme:</Text>
              <Text>{generationError}</Text>
            </Box>
          )}

          {!generationError && isGenerating && (
            <Flex justifyContent="center" mt={6} mb={6}>
              <Text>Generating theme suggestions...</Text>
            </Flex>
          )}

          {!generationError && !isGenerating && aiThemeResults && aiThemeResults.length > 0 && (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Description</Th>
                    <Th>Primary</Th>
                    <Th>Secondary</Th>
                    <Th>Accent</Th>
                    <Th>Background</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {aiThemeResults.map((theme, index) => (
                    <Tr key={index}>
                      <Td maxWidth="500px">{theme.description}</Td>
                      <Td>
                        <ColorChip color={theme.primary} />
                      </Td>
                      <Td>
                        <ColorChip color={theme.secondary} />
                      </Td>
                      <Td>
                        <ColorChip color={theme.accent} />
                      </Td>
                      <Td>
                        <ColorChip color={theme.background} />
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="primary"
                          onClick={() => onSelectTheme(theme)}
                        >
                          Use theme
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}

          {!generationError &&
            !isGenerating &&
            aiThemeResults &&
            aiThemeResults.length === 0 &&
            aiPrompt &&
            aiPrompt.trim() !== "" && (
              <Box mt={4} p={4} borderWidth="1px" borderRadius="md" borderStyle="dashed">
                <Text textAlign="center" color="gray.500">
                  No theme suggestions generated yet. Click the Generate button to get started.
                </Text>
              </Box>
            )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AIThemeGeneratorModal;
