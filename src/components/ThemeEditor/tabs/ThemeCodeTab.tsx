import React from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { ThemeValues } from '../hooks/useColorManagement';

interface ThemeCodeTabProps {
  themeValues: ThemeValues;
  themeString: string;
  setThemeString: (value: string) => void;
  showThemePreview: boolean;
  setShowThemePreview: (value: boolean) => void;
}

export const ThemeCodeTab: React.FC<ThemeCodeTabProps> = ({
  themeValues,
  themeString,
  setThemeString,
  showThemePreview,
  setShowThemePreview,
}) => {
  const toast = useToast();

  // Generate a preview of the theme
  const previewTheme = () => {
    try {
      const themeObj = extendTheme(themeValues);
      setThemeString(JSON.stringify(themeObj, null, 2));
      setShowThemePreview(true);
      toast({
        title: 'Theme preview generated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error generating theme',
        description: 'Check your theme configuration',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Download theme as a file
  const downloadTheme = () => {
    try {
      const themeObj = extendTheme(themeValues);
      const themeStr = `import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme(${JSON.stringify(themeValues, null, 2)});

export default theme;`;

      const blob = new Blob([themeStr], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'theme.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Theme downloaded',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error downloading theme',
        description: 'Check your theme configuration',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Button colorScheme="blue" onClick={previewTheme}>
          Generate Theme Code
        </Button>
        <Button colorScheme="green" onClick={downloadTheme}>
          Download Theme
        </Button>
      </HStack>
      
      {showThemePreview && (
        <Box>
          <Text mb={2} fontWeight="bold">
            Theme Preview:
          </Text>
          <Box 
            borderWidth="1px" 
            borderRadius="md" 
            p={2} 
            bg={useColorModeValue("gray.50", "gray.900")}
          >
            <Textarea
              value={themeString}
              isReadOnly
              minH="400px"
              fontFamily="mono"
              fontSize="sm"
            />
          </Box>
        </Box>
      )}
    </VStack>
  );
};

export default ThemeCodeTab;