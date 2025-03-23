import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Box,
  Text,
  Button,
  Input,
  Switch,
  Checkbox,
  Radio,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ThemeValues } from "@/types";

interface CombinedStylesPreviewProps {
  colorKey: string;
  themeValues: ThemeValues;
}

const CombinedStylesPreview: React.FC<CombinedStylesPreviewProps> = ({ 
  colorKey, 
  themeValues 
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  // Get shadow and radius samples for the preview
  const shadowSamples = ["sm", "md", "lg", "xl"].filter(key => themeValues.shadows?.[key]);
  const radiusSamples = ["sm", "md", "lg", "xl"].filter(key => themeValues.radii?.[key]);
  
  // If no samples are found, use defaults
  const shadows = shadowSamples.length > 0 ? shadowSamples : ["sm", "md", "lg", "xl"];
  const radii = radiusSamples.length > 0 ? radiusSamples : ["sm", "md", "lg", "xl"];

  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Combined UI Styles</Heading>
      </CardHeader>
      <CardBody>
        <Tabs variant="enclosed" colorScheme={colorKey} size="sm" mb={6}>
          <TabList>
            <Tab>Cards</Tab>
            <Tab>Inputs</Tab>
            <Tab>Buttons</Tab>
          </TabList>
          <TabPanels>
            {/* Cards with different shadow and radius combinations */}
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {shadows.map((shadow) => (
                  <Box 
                    key={shadow}
                    p={4}
                    bg={bgColor}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius={themeValues.radii?.md || "md"}
                    boxShadow={themeValues.shadows?.[shadow] || shadow}
                  >
                    <Heading size="xs" mb={2}>Card with {shadow} shadow</Heading>
                    <Text fontSize="sm">
                      This card demonstrates how the {shadow} shadow looks when applied to a card component.
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
            
            {/* Inputs with different radius values */}
            <TabPanel px={0}>
              <VStack spacing={4} align="flex-start">
                {radii.map((radius) => (
                  <Box key={radius} width="100%">
                    <Text fontSize="xs" fontWeight="medium" mb={1}>{radius} border radius:</Text>
                    <HStack spacing={4}>
                      <Input 
                        placeholder={`Input with ${radius} radius`}
                        borderRadius={themeValues.radii?.[radius] || radius}
                        width="auto"
                        flex="1"
                      />
                      <Checkbox 
                        colorScheme={colorKey}
                        borderRadius={themeValues.radii?.[radius] || radius}
                      >
                        Checkbox
                      </Checkbox>
                      <Switch colorScheme={colorKey} />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            
            {/* Buttons with different combinations */}
            <TabPanel px={0}>
              <VStack spacing={6} align="flex-start">
                {/* Buttons with different radii */}
                <Box width="100%">
                  <Text fontSize="xs" fontWeight="medium" mb={2}>Buttons with different border radii:</Text>
                  <HStack spacing={4} wrap="wrap">
                    {radii.map((radius) => (
                      <Button 
                        key={radius}
                        colorScheme={colorKey}
                        borderRadius={themeValues.radii?.[radius] || radius}
                        size="sm"
                      >
                        {radius} radius
                      </Button>
                    ))}
                  </HStack>
                </Box>
                
                {/* Buttons with different shadows */}
                <Box width="100%">
                  <Text fontSize="xs" fontWeight="medium" mb={2}>Buttons with different shadows:</Text>
                  <HStack spacing={4} wrap="wrap">
                    {shadows.map((shadow) => (
                      <Button 
                        key={shadow}
                        variant="outline"
                        colorScheme={colorKey}
                        boxShadow={themeValues.shadows?.[shadow] || shadow}
                        size="sm"
                      >
                        {shadow} shadow
                      </Button>
                    ))}
                  </HStack>
                </Box>
                
                {/* Badges with different radii */}
                <Box width="100%">
                  <Text fontSize="xs" fontWeight="medium" mb={2}>Badges with different shapes:</Text>
                  <HStack spacing={4} wrap="wrap">
                    {radii.map((radius) => (
                      <Badge 
                        key={radius}
                        colorScheme={colorKey}
                        borderRadius={themeValues.radii?.[radius] || radius}
                        py={1}
                        px={2}
                      >
                        {radius} badge
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CombinedStylesPreview;