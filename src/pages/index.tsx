import { ThemeEditor } from "@/components";
import { FeatureSection, HelpSection, HeroSection, SectionDivider } from "@/components/home";
import { Box, Container, useBreakpointValue, VStack, Button, Flex } from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";

const IndexPage: React.FC<PageProps> = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showFullContent, setShowFullContent] = React.useState(false);

  return (
    <Box pt={10} pb={10}>
      <Container maxW="6xl">
        <VStack spacing={12} align="stretch">
          <HeroSection />

          {/* Always show the theme editor */}
          <SectionDivider title="Start Here" />
          <ThemeEditor />

          {/* On mobile, conditionally show the rest of content */}
          {(!isMobile || showFullContent) && (
            <>
              <FeatureSection />
              <SectionDivider title="Guide for Designers" />
              <HelpSection />
            </>
          )}

          {/* Show "View more" button on mobile */}
          {isMobile && !showFullContent && (
            <Flex justify="center" mt={4}>
              <Button colorScheme="blue" onClick={() => setShowFullContent(true)}>
                View more content
              </Button>
            </Flex>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
