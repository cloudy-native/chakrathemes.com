import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ThemeValues } from "@/types";

interface BorderShadowElementsProps {
  themeValues: ThemeValues;
  colorKey?: string;
}

const BorderShadowElements: React.FC<BorderShadowElementsProps> = ({ themeValues, colorKey }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  // Get the available shadow keys
  const shadowKeys = Object.keys(themeValues.shadows || {}).filter(key => 
    key !== "outline" && key !== "inner" && key !== "none"
  );

  // Get the border radius keys
  const radiusKeys = Object.keys(themeValues.radii || {}).filter(key => 
    key !== "none" && key !== "full"
  );
  
  // Use the provided colorKey or find the first available color
  const firstColorKey = Object.keys(themeValues.colors || {})[0];
  const activeColorKey = colorKey || firstColorKey || "blue";
  
  // Use the 500 shade of the color, or fallback to 400 or 600 if not available
  const getActiveColorShade = () => {
    if (themeValues.colors && themeValues.colors[activeColorKey]) {
      if (themeValues.colors[activeColorKey]["500"]) {
        return `${activeColorKey}.500`;
      } else if (themeValues.colors[activeColorKey]["400"]) {
        return `${activeColorKey}.400`;
      } else if (themeValues.colors[activeColorKey]["600"]) {
        return `${activeColorKey}.600`;
      } else {
        // Get first available shade
        const firstShade = Object.keys(themeValues.colors[activeColorKey])[0];
        return `${activeColorKey}.${firstShade}`;
      }
    }
    return "blue.500"; // Fallback
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Border & Shadow Preview</Heading>
      </CardHeader>
      <CardBody>
        {/* Shadows Preview */}
        <Heading size="xs" mb={3}>Shadows</Heading>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mb={6}>
          {shadowKeys.map((shadowKey) => (
            <Box 
              key={shadowKey}
              bg={useColorModeValue("white", "gray.800")}
              borderWidth="1px"
              borderColor={useColorModeValue("gray.100", "gray.700")}
              borderRadius="md"
              boxShadow={themeValues.shadows[shadowKey]}
              p={3}
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text 
                fontSize="sm" 
                fontWeight="medium"
                color={useColorModeValue("gray.800", "gray.100")}
              >
                {shadowKey}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Border Radius Preview */}
        <Heading size="xs" mb={3}>Border Radius</Heading>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
          {radiusKeys.map((radiusKey) => (
            <Box 
              key={radiusKey}
              bg={getActiveColorShade()}
              borderRadius={themeValues.radii[radiusKey]}
              p={3}
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
            >
              <Text fontSize="sm" fontWeight="medium">
                {radiusKey}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default BorderShadowElements;