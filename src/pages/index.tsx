import { ThemeEditor } from "@/components";
import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box bg={useColorModeValue("blue.50", "gray.900")} pt={10} pb={10}>
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          <VStack spacing={3} align="center" textAlign="center">
            <Heading as="h1" size="2xl">
              Chakra UI Theme Editor
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="3xl"
            >
              Customize your Chakra UI theme with this interactive editor.
              Modify colors, typography, spacing, and more, then export your
              theme file.
            </Text>
            <Text
              fontSize="md"
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="3xl"
            >
              There are great starter color palettes for inspiration. We have
              created reusable UI components in your colors like cards and
              tables that you can use in your site as-is.
            </Text>
          </VStack>

          <ThemeEditor />
          <Alert status="warning">
            <AlertIcon /> This is v0.0.1-beta of the editor. Is is full of bugs
            and UX issues. Apologies. It is actively being worked on.
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
