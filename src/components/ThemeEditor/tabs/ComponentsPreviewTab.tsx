import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import ThemeColorSwatch from "../components/ThemeColorSwatch";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Flex,
  Checkbox,
  Divider,
  extendTheme,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { ThemeValues } from "../hooks/useColorManagement";

interface ComponentsPreviewTabProps {
  themeValues: ThemeValues;
}

// Button variants available in Chakra UI
const BUTTON_VARIANTS = ["solid", "outline", "ghost", "link", "disabled"];
const BUTTON_SIZES = ["lg", "md", "sm", "xs"];

export const ComponentsPreviewTab: React.FC<ComponentsPreviewTabProps> = ({
  themeValues,
}) => {
  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});
  const primaryColor = colorKeys.length > 0 ? colorKeys[0] : "blue";

  return (
    <Box>
      <ChakraProvider theme={previewTheme}>
        {/* Buttons Matrix - Full Width */}
        <Box
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          mb={8}
          width="100%"
        >
          <Heading size="md" mb={4}>
            Buttons
          </Heading>
          <Box>
            {colorKeys.map((colorKey, index) => (
              <Box key={colorKey}>
                {index === 0 && (
                  <Box mb={4}>
                    <Text fontWeight="bold" fontSize="lg">
                      Sizes
                    </Text>
                    <ButtonGroup>
                      {BUTTON_SIZES.map((size) => (
                        <Button
                          key={`${colorKey}-${size}`}
                          colorScheme={colorKey}
                          size={size as any}
                        >
                          {size}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                )}
                {index > 0 && <Divider mt={4}/>}
                <Text fontWeight="bold"  fontSize="lg">
                  {colorKey}
                </Text>

                <ButtonGroup>
                  {BUTTON_VARIANTS.map((variant) => (
                    <GridItem key={`${colorKey}-${variant}`}>
                      <VStack align="flex-start" spacing={3}>
                        <Button colorScheme={colorKey} variant={variant as any}>
                          {variant}
                        </Button>
                      </VStack>
                    </GridItem>
                  ))}
                  <Button
                    leftIcon={<EmailIcon />}
                    colorScheme={colorKey}
                    variant="solid"
                  >
                    Email
                  </Button>
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme={colorKey}
                    variant="outline"
                  >
                    Call us
                  </Button>
                </ButtonGroup>
              </Box>
            ))}
          </Box>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* Typography Preview */}
          <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              Typography
            </Heading>
            <Heading size="2xl">Heading 2XL</Heading>
            <Heading size="xl">Heading XL</Heading>
            <Heading size="lg">Heading LG</Heading>
            <Heading size="md">Heading MD</Heading>
            <Heading size="sm">Heading SM</Heading>
            <Heading size="xs">Heading XS</Heading>
            <Divider my={4} />
            <Text fontSize="2xl">Text 2XL</Text>
            <Text fontSize="xl">Text XL</Text>
            <Text fontSize="lg">Text LG</Text>
            <Text fontSize="md">Text MD</Text>
            <Text fontSize="sm">Text SM</Text>
            <Text fontSize="xs">Text XS</Text>
          </Box>

          {/* Form Elements Preview - Buttons removed */}
          <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              Form Elements
            </Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Input Field</FormLabel>
                <Input placeholder="Enter text here" />
              </FormControl>
              <FormControl>
                <FormLabel>Select Field</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <Checkbox>Checkbox</Checkbox>
              <Switch>Switch</Switch>
              <RadioGroup defaultValue="1">
                <Stack direction="row">
                  <Radio value="1">Radio 1</Radio>
                  <Radio value="2">Radio 2</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </Box>

          {/* Colors Preview */}
          <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              Other Components
            </Heading>
            {colorKeys.map((colorKey) => (
              <Box key={colorKey} mb={5}>
                <Text fontWeight="bold" mb={2}>
                  {colorKey}
                </Text>
                <HStack gap={2}>
                  <Badge colorScheme={colorKey}>Badge</Badge>
                  <Alert status="info" colorScheme={colorKey}>
                    <AlertIcon />
                    Alert
                  </Alert>
                  <Switch colorScheme={colorKey} defaultChecked />
                  <Checkbox colorScheme={colorKey} defaultChecked>
                    Check
                  </Checkbox>
                </HStack>
              </Box>
            ))}
          </Box>

          {/* Components Preview */}
          <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              UI Components
            </Heading>
            <Stack spacing={4}>
              <Card>
                <CardHeader>
                  <Heading size="md">Card Title</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    Card content goes here. This is a preview of how cards will
                    look with your theme.
                  </Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme={primaryColor}>Action</Button>
                </CardFooter>
              </Card>

              <Tabs colorScheme={primaryColor}>
                <TabList>
                  <Tab>Tab 1</Tab>
                  <Tab>Tab 2</Tab>
                  <Tab>Tab 3</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Text>Content for Tab 1</Text>
                  </TabPanel>
                  <TabPanel>
                    <Text>Content for Tab 2</Text>
                  </TabPanel>
                  <TabPanel>
                    <Text>Content for Tab 3</Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Alert status="success" variant="subtle">
                <AlertIcon />
                This is how alerts will look
              </Alert>

              <Alert status="error" variant="solid">
                <AlertIcon />
                Error alert with solid variant
              </Alert>
            </Stack>
          </Box>
        </SimpleGrid>
      </ChakraProvider>
    </Box>
  );
};

export default ComponentsPreviewTab;
