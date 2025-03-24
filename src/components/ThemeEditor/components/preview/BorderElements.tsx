import { ThemeValues } from "@/types";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface BorderElementsProps {
  themeValues: ThemeValues;
  colorKey?: string;
}

const BorderElements: React.FC<BorderElementsProps> = ({
  themeValues,
  colorKey,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Get the available shadow keys
  const shadowKeys = Object.keys(themeValues.shadows || {}).filter(
    (key) => key !== "outline" && key !== "inner" && key !== "none"
  );

  // Get the border radius keys
  const radiusKeys = Object.keys(themeValues.radii || {}).filter(
    (key) => key !== "none" && key !== "full"
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
        <Heading size="sm">Borders</Heading>
      </CardHeader>
      <CardBody>
        {/* Border Radius Preview */}
        <Text fontWeight="medium" fontSize="sm">
          Border Radius
        </Text>
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

export default BorderElements;
