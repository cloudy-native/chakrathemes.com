import React from "react";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Code,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface FontPreviewProps {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
}

export const FontPreview: React.FC<FontPreviewProps> = ({ headingFont, bodyFont, monoFont }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const headingStyle = { fontFamily: `'${headingFont}', sans-serif` };
  const bodyStyle = { fontFamily: `'${bodyFont}', sans-serif` };
  const monoStyle = { fontFamily: `'${monoFont}', monospace` };

  return (
    <Box
      p={6}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      boxShadow="sm"
    >
      <VStack spacing={6} align="start">
        <Box width="100%">
          <Text fontSize="sm" color="gray.500" mb={1}>
            Heading Font: {headingFont}
          </Text>
          <Heading as="h1" size="xl" mb={2} style={headingStyle}>
            Main Heading Example
          </Heading>
          <Heading as="h2" size="lg" mb={2} style={headingStyle}>
            Secondary Heading Example
          </Heading>
          <Heading as="h3" size="md" mb={2} style={headingStyle}>
            Tertiary Heading Example
          </Heading>
        </Box>

        <Box width="100%">
          <Text fontSize="sm" color="gray.500" mb={1}>
            Body Font: {bodyFont}
          </Text>
          <Text style={bodyStyle} mb={3}>
            This is a paragraph of text that demonstrates how body copy will appear on your website.
            The body font is used for all general text content across your site including
            paragraphs, lists, and other text elements. Good body fonts are highly readable at
            smaller sizes and work well for extended reading.
          </Text>

          <Text style={bodyStyle} mb={3}>
            <strong>Bold text</strong> and <em>italic text</em> should be clearly distinguishable
            within paragraphs to establish visual hierarchy and emphasis.
          </Text>

          <Link color="blue.500" style={bodyStyle}>
            This is how links will appear in your content
          </Link>

          <UnorderedList mt={3} style={bodyStyle}>
            <ListItem>First list item example</ListItem>
            <ListItem>Second list item example</ListItem>
            <ListItem>Third list item with slightly more text to demonstrate wrapping</ListItem>
          </UnorderedList>
        </Box>

        <Box width="100%">
          <Text fontSize="sm" color="gray.500" mb={1}>
            Monospace Font: {monoFont}
          </Text>
          <Box
            p={4}
            borderRadius="md"
            bg={useColorModeValue("gray.50", "gray.900")}
            width="100%"
            overflowX="auto"
          >
            <Code display="block" whiteSpace="pre" style={monoStyle} fontSize="sm" bg="transparent">
              {`function greet(name) {
  return \`Hello, \${name}!\`;
}

// Call the function
const message = greet('World');
console.log(message); // Output: Hello, World!`}
            </Code>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default FontPreview;
