import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import ThemeEditor from '../components/ThemeEditor';

const ThemeEditorPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Box 
        bg={useColorModeValue("blue.50", "gray.900")}
        pt={10} 
        pb={10}
      >
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
                Modify colors, typography, spacing, and more, then export your theme file.
              </Text>
            </VStack>
            
            <ThemeEditor />
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default ThemeEditorPage;

export const Head: HeadFC = () => <title>Theme Editor | Gatsby TypeScript ChakraUI Starter</title>;