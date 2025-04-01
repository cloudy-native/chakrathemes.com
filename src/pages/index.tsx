import { ThemeEditor } from "@/components";
import Layout from "@/components/Layout";
import { FeatureSection, HelpSection, HeroSection } from "@/components/home";
import {
  Box,
  Container,
  useBreakpointValue,
  VStack,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";

const IndexPage: React.FC<PageProps> = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showFullContent, setShowFullContent] = React.useState(false);

  return (
    <Layout>
      <Box>
        {/* Hero section takes full width */}
        <Container maxW="8xl" px={{ base: 4, md: 6 }}>
          <HeroSection />
        </Container>

        {/* Theme Editor Section */}
        <Box py={16} id="theme-editor-section">
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={8} align="stretch">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="center"
                color="secondary.500"
              >
                Design Your Perfect Theme
              </Heading>
              <ThemeEditor />
            </VStack>
          </Container>
        </Box>

        {/* Features Section */}
        {(!isMobile || showFullContent) && (
          <Box py={16}>
            <Container maxW="7xl" px={{ base: 4, md: 6 }}>
              <VStack spacing={12} align="stretch">
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  textAlign="center"
                  color="secondary.500"
                >
                  Powerful Features
                </Heading>
                <FeatureSection />
              </VStack>
            </Container>
          </Box>
        )}

        {/* Help Section */}
        {(!isMobile || showFullContent) && (
          <Box py={16}>
            <Container maxW="7xl" px={{ base: 4, md: 6 }}>
              <VStack spacing={8} align="stretch">
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  textAlign="center"
                  color="secondary.500"
                >
                  Guide for Designers
                </Heading>
                <HelpSection />
              </VStack>
            </Container>
          </Box>
        )}

        {/* Show "View more" button on mobile */}
        {isMobile && !showFullContent && (
          <Box py={8}>
            <Flex justify="center">
              <Button colorScheme="primary" onClick={() => setShowFullContent(true)} size="lg">
                View more content
              </Button>
            </Flex>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
