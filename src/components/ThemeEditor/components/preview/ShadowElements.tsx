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
import { panelBackground, borderLight, textPrimary } from "@/theme/themeConfiguration";

interface ShadowElementsProps {
  themeValues: ThemeValues;
  colorKey?: string;
}

const ShadowElements: React.FC<ShadowElementsProps> = ({ themeValues, colorKey: _colorKey }) => {
  // Get the available shadow keys
  const shadowKeys = Object.keys(themeValues.shadows || {}).filter(
    key => key !== "outline" && key !== "inner" && key !== "none"
  );

  // Use theme constants for consistent styling
  const boxBgColor = useColorModeValue(panelBackground.light, panelBackground.dark);
  const boxBorderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const boxTextColor = useColorModeValue(textPrimary.light, textPrimary.dark);

  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Shadows</Heading>
      </CardHeader>
      <CardBody>
        {/* Shadows Preview */}
        <Text fontWeight="medium" fontSize="sm">
          Shadows
        </Text>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mb={4}>
          {shadowKeys.map(shadowKey => (
            <Box
              key={shadowKey}
              bg={boxBgColor}
              borderWidth="1px"
              borderColor={boxBorderColor}
              borderRadius="md"
              boxShadow={themeValues.shadows[shadowKey]}
              p={3}
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="sm" fontWeight="medium" color={boxTextColor}>
                {shadowKey}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default ShadowElements;
