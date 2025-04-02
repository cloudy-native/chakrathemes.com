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

  // For smooth scrolling to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Layout>
      <Box>
        {/* Hero section takes full width */}
        <Container maxW="8xl" px={{ base: 4, md: 6 }}>
          <HeroSection />
        </Container>

        {/* Theme Editor Section */}
        <Box py={{ base: 6, md: 10 }} id="theme-editor-section">
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={4} align="stretch">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="center"
                color="secondary.500"
                mb={{ base: 0, md: 2 }}
              >
                Design Your Perfect Theme
              </Heading>
              <ThemeEditor />
            </VStack>
          </Container>
        </Box>

        {/* Features Section */}
        <Box py={{ base: 6, md: 12 }} id="features-section">
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 4, md: 8 }} align="stretch">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="center"
                color="secondary.500"
                mb={{ base: 2, md: 4 }}
              >
                Powerful Features
              </Heading>
              <FeatureSection />
            </VStack>
          </Container>
        </Box>

        {/* Help Section */}
        <Box py={{ base: 6, md: 12 }} id="help-section">
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 4, md: 8 }} align="stretch">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="center"
                color="secondary.500"
                mb={{ base: 2, md: 4 }}
              >
                Guide for Designers
              </Heading>
              <HelpSection />
            </VStack>
          </Container>
        </Box>

        {/* Quick Navigation on Mobile */}
        {isMobile && (
          <Box 
            position="fixed" 
            bottom={0} 
            left={0} 
            right={0} 
            bg="rgba(255,255,255,0.9)" 
            backdropFilter="blur(8px)"
            boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
            zIndex={10}
            py={2}
            _dark={{
              bg: "rgba(26,32,44,0.9)"
            }}
          >
            <Flex justify="space-around">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection("theme-editor-section")}
                fontWeight="medium"
              >
                Editor
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection("features-section")}
                fontWeight="medium"
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection("help-section")}
                fontWeight="medium"
              >
                Guide
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
