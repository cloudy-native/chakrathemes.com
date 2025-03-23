import React from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
  extendTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import { useThemeContext } from '@/context/ThemeContext';
import CardLayouts from '../components/preview/CardLayouts';

export const CardLayoutsTab: React.FC = () => {
  const { themeValues } = useThemeContext();
  
  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the color palettes from the theme
  const colorKeys = Object.keys(themeValues.colors || {});
  
  return (
    <Box>
      <Heading size="md" mb={2}>Card Layouts</Heading>
      
      <Text fontSize="sm" mb={6}>
        Explore different card designs using your theme colors and styles. These layouts showcase various ways to present 
        content with cards, using different components, spacing, and visual hierarchies.
      </Text>
      
      <ChakraProvider theme={previewTheme}>
        <Tabs variant="line" isLazy>
          <TabList flexWrap="wrap">
            {colorKeys.map((colorKey) => (
              <Tab
                key={colorKey}
                color={useColorModeValue("gray.700", "gray.200")}
                borderBottomWidth="3px"
                _selected={{
                  color: `${colorKey}.500`,
                  borderColor: `${colorKey}.500`,
                  fontWeight: "bold",
                }}
                mb={2}
                mr={2}
              >
                {colorKey}
              </Tab>
            ))}
          </TabList>
          <TabPanels mt={6}>
            {colorKeys.map((colorKey) => (
              <TabPanel key={colorKey} p={0}>
                <CardLayouts 
                  colorKey={colorKey} 
                  themeValues={themeValues} 
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </Box>
  );
};

export default CardLayoutsTab;