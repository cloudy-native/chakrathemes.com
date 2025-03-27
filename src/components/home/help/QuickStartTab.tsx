import { OptimizedImage } from "@/components";
import { Box, Heading, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react";
import React from "react";

const QuickStartTab: React.FC = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={3}>
          Getting Started with the Theme Editor
        </Heading>
        <Text mb={4}>
          The Chakra UI Theme Editor makes it easy to create a custom theme for your project. Follow
          these steps to get started quickly:
        </Text>

        <OrderedList spacing={3}>
          <ListItem>
            <Text fontWeight="bold">Create your first color palette</Text>
            <Text>Navigate to the Palettes tab and click "Add Palette".</Text>
            <OptimizedImage
              filename="help/palettes-tab.png"
              alt="Palettes tab"
              caption="View the Palettes tab"
              width="70%"
            />
            <Text>
              Name your palette (e.g., "primary", "brand") and choose a base color. The editor will
              generate a full range of shades.
            </Text>
          </ListItem>

          <ListItem>
            <Text fontWeight="bold">Adjust spacing and borders</Text>
            <Text>
              Use the Spacing tab to set consistent spacing values, and the Borders & Shadows tab to
              define border radiuses and box shadows.
            </Text>
          </ListItem>

          <ListItem>
            <Text fontWeight="bold">Preview your theme</Text>
            <Text>
              Check the Theme Preview tab to see how your theme looks on real components. Toggle
              between light and dark modes to ensure your theme works well in both.
            </Text>
            <OptimizedImage
              filename="help/quick-theme-preview.png"
              alt="Theme preview"
              caption="Preview what your theme will look like in the palettes you created"
              width="70%"
            />
          </ListItem>

          <ListItem>
            <Text fontWeight="bold">Export your theme</Text>
            <Text>
              When you're satisfied with your theme, click the "Export Theme" button to download the
              theme as a JavaScript or TypeScript file ready to use in your Chakra UI project.
            </Text>
          </ListItem>
        </OrderedList>
      </Box>
    </VStack>
  );
};

export default QuickStartTab;
