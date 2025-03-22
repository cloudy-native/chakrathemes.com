import { ArrowForwardIcon, CopyIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Checkbox,
  Divider,
  extendTheme,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  PinInput,
  PinInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import { ThemeValues } from "../hooks/useColorManagement";
import {HamburgerIcon} from "@chakra-ui/icons"

interface ComponentsPreviewTabProps {
  themeValues: ThemeValues;
  themeString: string;
  setThemeString: (value: string) => void;
  showThemePreview: boolean;
  setShowThemePreview: (value: boolean) => void;
}

// Button variants available in Chakra UI
const BUTTON_VARIANTS = ["solid", "outline", "ghost", "link", "disabled"];
const BUTTON_SIZES = ["lg", "md", "sm", "xs"];

export const ComponentsPreviewTab: React.FC<ComponentsPreviewTabProps> = ({
  themeValues,
  themeString,
  setThemeString,
  showThemePreview,
  setShowThemePreview,
}) => {
  // Generate a preview theme based on current values
  const previewTheme = extendTheme(themeValues);

  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});
  const primaryColor = colorKeys.length > 0 ? colorKeys[0] : "blue";

  // Clipboard functionality
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedValue(null);
    }, 2000);
  };

  // Download theme as a file
  const downloadTheme = () => {
    try {
      const themeStr = `import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme(${JSON.stringify(themeValues, null, 2)});

export default theme;`;

      const blob = new Blob([themeStr], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "theme.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Theme downloaded",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error downloading theme",
        description: "Check your theme configuration",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <ChakraProvider theme={previewTheme}>
        {/* Theme Code Buttons */}
        <Button
          colorScheme="green"
          onClick={downloadTheme}
          leftIcon={<ArrowForwardIcon />}
          mb={4}
        >
          Download Theme
        </Button>

        {/* Full-width Color Palette Cards Section */}
        <Box
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          width="100%"
        >
          <Heading size="md" mb={4}>
            Theme Colors
          </Heading>
          <Tabs variant="line" isLazy>
            <TabList flexWrap="wrap">
              {colorKeys.map((colorKey) => (
                <Tab
                  key={colorKey}
                  color="white"
                  bg={themeValues.colors[colorKey][500]}
                  _selected={{
                    color: "white",
                    bg: themeValues.colors[colorKey][700],
                    boxShadow: "md",
                  }}
                  mb={2}
                  mr={2}
                >
                  {colorKey}
                </Tab>
              ))}
            </TabList>
            <TabPanels mt={4}>
              {colorKeys.map((colorKey) => (
                <TabPanel key={colorKey} p={0}>
                  <Tabs variant="line" isLazy>
                    <TabList>
                      <Tab>Color Palette</Tab>
                      <Tab>Components</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <SimpleGrid
                          columns={{ base: 2, sm: 3, md: 5 }}
                          spacing={6}
                        >
                          {Object.entries(themeValues.colors[colorKey])
                            .sort(([a], [b]) => parseInt(a) - parseInt(b))
                            .map(([shade, colorValue]) => (
                              <Box
                                key={shade}
                                bg="white"
                                boxShadow="md"
                                borderRadius="md"
                                overflow="hidden"
                                transition="all 0.2s"
                                _hover={{
                                  transform: "translateY(-4px)",
                                  boxShadow: "lg",
                                }}
                              >
                                <Box
                                  h="100px"
                                  bg={colorValue as string}
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  position="relative"
                                >
                                  <Text
                                    fontSize="lg"
                                    fontWeight="bold"
                                    color={
                                      parseInt(shade) > 500 ? "white" : "black"
                                    }
                                    textShadow="0px 0px 2px rgba(0,0,0,0.2)"
                                  >
                                    {shade}
                                  </Text>
                                </Box>
                                <Box p={3}>
                                  <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Text
                                      fontSize="xs"
                                      fontFamily="monospace"
                                      color="gray.700"
                                    >
                                      {colorValue as string}
                                    </Text>
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      onClick={() =>
                                        handleCopyToClipboard(
                                          colorValue as string
                                        )
                                      }
                                      aria-label={`Copy ${colorValue}`}
                                      leftIcon={<CopyIcon />}
                                    >
                                      {copiedValue === colorValue
                                        ? "Copied!"
                                        : ""}
                                    </Button>
                                  </Flex>
                                </Box>
                              </Box>
                            ))}
                        </SimpleGrid>
                      </TabPanel>
                      <TabPanel>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                          {/* Basic Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Basic Elements</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack align="flex-start" spacing={4}>
                                <HStack spacing={4}>
                                  <Badge colorScheme={colorKey}>Badge</Badge>
                                  <Badge colorScheme={colorKey} variant="solid">
                                    Badge Solid
                                  </Badge>
                                  <Badge
                                    colorScheme={colorKey}
                                    variant="outline"
                                  >
                                    Badge Outline
                                  </Badge>
                                </HStack>
                                <HStack spacing={4}>
                                  <Switch colorScheme={colorKey} />
                                  <Switch
                                    colorScheme={colorKey}
                                    defaultChecked
                                  />
                                </HStack>
                                <HStack spacing={4}>
                                  <Checkbox colorScheme={colorKey}>
                                    Checkbox
                                  </Checkbox>
                                  <Checkbox
                                    colorScheme={colorKey}
                                    defaultChecked
                                  >
                                    Checked
                                  </Checkbox>
                                  <Checkbox
                                    colorScheme={colorKey}
                                    isIndeterminate
                                  >
                                    Indeterminate
                                  </Checkbox>
                                </HStack>
                                <HStack spacing={4}>
                                  <RadioGroup defaultValue="1">
                                    <Stack direction="row">
                                      <Radio colorScheme={colorKey} value="1">
                                        Option 1
                                      </Radio>
                                      <Radio colorScheme={colorKey} value="2">
                                        Option 2
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                </HStack>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Button Styles */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Button Styles</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack spacing={4} align="start">
                                <Wrap>
                                  {BUTTON_SIZES.map((size) => (
                                    <Button
                                      key={size}
                                      size={size as any}
                                      colorScheme={primaryColor}
                                    >
                                      {size.toUpperCase()} Button
                                    </Button>
                                  ))}
                                  {BUTTON_VARIANTS.map((variant) => (
                                    <Button
                                      key={variant}
                                      variant={variant as any}
                                      colorScheme={primaryColor}
                                      isDisabled={variant === "disabled"}
                                    >
                                      {variant.charAt(0).toUpperCase() +
                                        variant.slice(1)}
                                    </Button>
                                  ))}{" "}
                                  <Button
                                    leftIcon={<EmailIcon />}
                                    colorScheme={primaryColor}
                                  >
                                    Left Icon
                                  </Button>
                                  <Button
                                    rightIcon={<ArrowForwardIcon />}
                                    colorScheme={primaryColor}
                                    variant="outline"
                                  >
                                    Right Icon
                                  </Button>
                                  <ButtonGroup isAttached variant="outline">
                                    <Button colorScheme={primaryColor}>
                                      Button Group
                                    </Button>
                                    <Button colorScheme={primaryColor}>
                                      Group
                                    </Button>
                                  </ButtonGroup>
                                  <Button
                                    isLoading
                                    loadingText="Loading"
                                    colorScheme={primaryColor}
                                    variant="solid"
                                  >
                                    Loading
                                  </Button>
                                </Wrap>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Progress Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Progress & Loading</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack
                                align="flex-start"
                                spacing={4}
                                width="100%"
                              >
                                <Text fontSize="sm">Progress</Text>
                                <Progress
                                  colorScheme={colorKey}
                                  value={45}
                                  width="100%"
                                />
                                <Progress
                                  colorScheme={colorKey}
                                  hasStripe
                                  value={65}
                                  width="100%"
                                />
                                <Progress
                                  colorScheme={colorKey}
                                  hasStripe
                                  isAnimated
                                  value={85}
                                  width="100%"
                                />
                                <HStack spacing={4}>
                                  <Text fontSize="sm">Spinner</Text>
                                  <Spinner
                                    color={`${colorKey}.500`}
                                    size="xs"
                                  />
                                  <Spinner
                                    color={`${colorKey}.500`}
                                    size="sm"
                                  />
                                  <Spinner
                                    color={`${colorKey}.500`}
                                    size="md"
                                  />
                                  <Spinner
                                    color={`${colorKey}.500`}
                                    size="lg"
                                  />
                                </HStack>
                                <Divider />
                                <Text fontSize="sm">Skeleton</Text>
                                <Box width="100%">
                                  <Stack>
                                    <Skeleton
                                      startColor={`${colorKey}.100`}
                                      endColor={`${colorKey}.500`}
                                      height="20px"
                                      width="100%"
                                    />
                                    <Skeleton
                                      startColor={`${colorKey}.100`}
                                      endColor={`${colorKey}.500`}
                                      height="20px"
                                      width="90%"
                                    />
                                    <Skeleton
                                      startColor={`${colorKey}.100`}
                                      endColor={`${colorKey}.500`}
                                      height="20px"
                                      width="80%"
                                    />
                                  </Stack>
                                  <HStack mt={4} spacing={4}>
                                    <SkeletonCircle
                                      startColor={`${colorKey}.100`}
                                      endColor={`${colorKey}.500`}
                                      size="10"
                                    />
                                    <Box flex="1">
                                      <SkeletonText
                                        startColor={`${colorKey}.100`}
                                        endColor={`${colorKey}.500`}
                                        noOfLines={3}
                                        spacing="2"
                                      />
                                    </Box>
                                  </HStack>
                                </Box>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Interactive Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Interactive Elements</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack align="flex-start" spacing={4}>
                                <HStack spacing={4}>
                                  <Tooltip hasArrow label="Tooltip text">
                                    <Button size="sm" colorScheme={colorKey}>
                                      Hover me
                                    </Button>
                                  </Tooltip>
                                </HStack>
                                <HStack spacing={4}>
                                  <Menu>
                                    <MenuButton
                                      as={Button}
                                      colorScheme={colorKey}
                                      size="sm"
                                    >
                                      <Icon as={HamburgerIcon} />
                                    </MenuButton>
                                    <MenuList>
                                      <MenuItem>Option 1</MenuItem>
                                      <MenuItem>Option 2</MenuItem>
                                      <MenuItem>Option 3</MenuItem>
                                    </MenuList>
                                  </Menu>
                                </HStack>
                                <HStack spacing={4}>
                                  <Popover>
                                    <PopoverTrigger>
                                      <Button colorScheme={colorKey} size="sm">
                                        Popover
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverHeader>Header</PopoverHeader>
                                      <PopoverBody>
                                        Popover content goes here
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Popover>
                                </HStack>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Input Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Input Elements</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack
                                align="flex-start"
                                spacing={4}
                                width="100%"
                              >
                                <FormControl>
                                  <FormLabel>Number Input</FormLabel>
                                  <NumberInput
                                    focusBorderColor={`${colorKey}.500`}
                                    max={10}
                                    min={0}
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Pin Input</FormLabel>
                                  <HStack>
                                    <PinInput
                                      focusBorderColor={`${colorKey}.500`}
                                    >
                                      <PinInputField />
                                      <PinInputField />
                                      <PinInputField />
                                      <PinInputField />
                                    </PinInput>
                                  </HStack>
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Slider</FormLabel>
                                  <Slider
                                    colorScheme={colorKey}
                                    defaultValue={30}
                                    min={0}
                                    max={100}
                                  >
                                    <SliderTrack>
                                      <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6}>
                                      <Box
                                        color={`${colorKey}.500`}
                                        as={ArrowForwardIcon}
                                      />
                                    </SliderThumb>
                                  </Slider>
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Regular Input</FormLabel>
                                  <Input
                                    placeholder="Focus me"
                                    focusBorderColor={`${colorKey}.500`}
                                  />
                                </FormControl>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Tag Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Tags</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack align="flex-start" spacing={4}>
                                <Wrap spacing={2}>
                                  <Tag colorScheme={colorKey} size="sm">
                                    Small
                                  </Tag>
                                  <Tag colorScheme={colorKey} size="md">
                                    Medium
                                  </Tag>
                                  <Tag colorScheme={colorKey} size="lg">
                                    Large
                                  </Tag>
                                </Wrap>
                                <Wrap spacing={2}>
                                  <Tag colorScheme={colorKey} variant="solid">
                                    Solid
                                  </Tag>
                                  <Tag colorScheme={colorKey} variant="subtle">
                                    Subtle
                                  </Tag>
                                  <Tag colorScheme={colorKey} variant="outline">
                                    Outline
                                  </Tag>
                                </Wrap>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Alert Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Alerts</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack
                                align="flex-start"
                                spacing={4}
                                width="100%"
                              >
                                <Alert
                                  status="info"
                                  colorScheme={colorKey}
                                  variant="subtle"
                                >
                                  <AlertIcon />
                                  This is an info alert
                                </Alert>
                                <Alert
                                  status="success"
                                  colorScheme={colorKey}
                                  variant="solid"
                                >
                                  <AlertIcon />
                                  This is a success alert
                                </Alert>
                                <Alert
                                  status="warning"
                                  colorScheme={colorKey}
                                  variant="left-accent"
                                >
                                  <AlertIcon />
                                  This is a warning alert
                                </Alert>
                                <Alert
                                  status="error"
                                  colorScheme={colorKey}
                                  variant="top-accent"
                                >
                                  <AlertIcon />
                                  This is an error alert
                                </Alert>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Avatar Elements */}
                          <Card>
                            <CardHeader>
                              <Heading size="sm">Avatars</Heading>
                            </CardHeader>
                            <CardBody>
                              <VStack
                                align="flex-start"
                                spacing={4}
                                width="100%"
                              >
                                <Text fontSize="sm">Avatar Sizes</Text>
                                <HStack spacing={4}>
                                  {["xs", "sm", "md", "lg", "xl"].map(
                                    (size) => (
                                      <Avatar
                                        size={size}
                                        name={faker.name.fullName()}
                                        src={faker.image.avatar()}
                                        bg={`${colorKey}.500`}
                                      />
                                    )
                                  )}
                                </HStack>

                                <Text fontSize="sm">With Badge</Text>
                                <HStack spacing={4}>
                                  {[
                                    `${colorKey}.200`,
                                    "green.500",
                                    "red.500",
                                  ].map((badgeBg) => (
                                    <Avatar
                                      bg={`${colorKey}.500`}
                                      name={faker.name.fullName()}
                                      src={faker.image.avatar()}
                                    >
                                      <AvatarBadge boxSize="1em" bg={badgeBg} />
                                    </Avatar>
                                  ))}
                                </HStack>

                                <Text fontSize="sm">Avatar Group</Text>
                                <AvatarGroup size="md" max={3}>
                                  {[200, 400, 500, 600, 700].map((shade) => (
                                    <Avatar
                                      bg={`${colorKey}.${shade}`}
                                      name={faker.name.fullName()}
                                      src={faker.image.avatar()}
                                    />
                                  ))}
                                </AvatarGroup>
                              </VStack>
                            </CardBody>
                          </Card>
                        </SimpleGrid>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </ChakraProvider>
    </Box>
  );
};

export default ComponentsPreviewTab;
