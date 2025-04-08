import { ThemeEditor } from "@/components";
import Layout from "@/components/Layout";
import { FeatureSection, HelpSection, HeroSection } from "@/components/home";
import { featureHeading } from "@/theme/themeConfiguration";
import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";

const IndexPage: React.FC<PageProps> = () => {
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);

  // For smooth scrolling to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Layout>
      <VStack spacing={0} width="100%">
        {/* Hero section with same width as features */}
        <Box width="100%" py={{ base: 8, md: 16 }}>
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <HeroSection />
          </Container>
        </Box>

        {/* Features Section */}
        <Box
          id="features-section"
          width="100%"
          py={{ base: 12, md: 16 }}
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 8, md: 12 }}>
              <FeatureSection />
            </VStack>
          </Container>
        </Box>

        {/* Theme Editor Section */}
        <Box py={{ base: 12, md: 16 }} width="100%" id="theme-editor-section">
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 8, md: 12 }}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                color={headingColor}
                textAlign="center"
                mb={{ base: 4, md: 8 }}
              >
                Explore the Theme Editor
              </Heading>
              <ThemeEditor />
            </VStack>
          </Container>
        </Box>

        {/* Help Section */}
        <Box
          py={{ base: 12, md: 16 }}
          width="100%"
          id="help-section"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 8, md: 12 }}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                color={headingColor}
                textAlign="center"
                mb={{ base: 4, md: 8 }}
              >
                Guides for Designers
              </Heading>
              <HelpSection />
            </VStack>
          </Container>
        </Box>

        {/* Mobile navigation bar removed */}
      </VStack>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
