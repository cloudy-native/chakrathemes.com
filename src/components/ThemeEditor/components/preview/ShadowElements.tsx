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

interface ShadowElementsProps {
  themeValues: ThemeValues;
  colorKey?: string;
}

const ShadowElements: React.FC<ShadowElementsProps> = ({ themeValues, colorKey: _colorKey }) => {
  // Get the available shadow keys
  const shadowKeys = Object.keys(themeValues.shadows || {}).filter(
    key => key !== "outline" && key !== "inner" && key !== "none"
  );

  // Move useColorModeValue calls to the top level
  const boxBgColor = useColorModeValue("white", "gray.800");
  const boxBorderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

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
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
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
