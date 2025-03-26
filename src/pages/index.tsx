import { ThemeEditor } from "@/components";
import { Box, Container, VStack, useColorModeValue } from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import { 
  HeroSection, 
  FeatureSection, 
  HelpSection, 
  SectionDivider 
} from "@/components/home";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box bg={useColorModeValue("blue.50", "gray.900")} pt={10} pb={10}>
      <Container maxW="6xl">
        <VStack spacing={12} align="stretch">
          {/* Hero Section */}
          <HeroSection />

          {/* Feature Cards */}
          <FeatureSection />

          <SectionDivider title="Start Here" />

          {/* Editor */}
          <ThemeEditor />

          <SectionDivider title="Guide for Designers" />

          {/* Help Section */}
          <HelpSection />
        </VStack>
      </Container>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
