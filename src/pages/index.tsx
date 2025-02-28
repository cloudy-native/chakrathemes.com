import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HeadFC, Link as GatsbyLink, PageProps } from "gatsby";
import * as React from "react";
import { FaGithub, FaReact, FaCode } from "react-icons/fa";
import { SiGatsby, SiTypescript, SiChakraui } from "react-icons/si";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      align={"center"}
      textAlign={"center"}
      p={8}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      transition="transform 0.3s"
      _hover={{
        transform: "translateY(-5px)",
      }}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"blue.500"}
        mb={5}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading fontSize={"xl"}>{title}</Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>{text}</Text>
    </Stack>
  );
};

const IndexPage: React.FC<PageProps> = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  return (
    <>
      {/* Hero Section */}
      <Box 
        bg={useColorModeValue("blue.50", "gray.900")}
        bgGradient={bgGradient}
        pt={20} 
        pb={16}
      >
        <Container maxW={"5xl"}>
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
          >
            <Heading
              fontWeight={700}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              color={useColorModeValue("blue.600", "blue.300")}
            >
              Gatsby + TypeScript +{" "}
              <Text as={"span"} color={useColorModeValue("teal.500", "teal.300")}>
                Chakra UI
              </Text>
            </Heading>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              maxW={"3xl"}
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight={1.8}
            >
              A modern starter template for building fast, responsive websites with
              Gatsby, TypeScript, and Chakra UI. Get started quickly with a
              production-ready setup featuring dark mode support, responsive design,
              and a component-based architecture.
            </Text>
            <Stack spacing={6} direction={{ base: "column", sm: "row" }}>
              <Button
                as={Link}
                href="https://github.com/cloudy-native/gatsby-typescript-chakraui"
                isExternal
                rounded={"full"}
                size={"lg"}
                fontWeight={"bold"}
                px={6}
                colorScheme={"blue"}
                leftIcon={<FaGithub />}
              >
                GitHub Repo
              </Button>
              <Button
                as={GatsbyLink}
                to="/blog"
                rounded={"full"}
                size={"lg"}
                fontWeight={"bold"}
                px={6}
                leftIcon={<FaCode />}
                colorScheme={"teal"}
              >
                View Blog
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW={"6xl"} py={16}>
        <VStack spacing={10}>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl" }}
            textAlign="center"
          >
            Key Features
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            <Feature
              icon={SiGatsby}
              title={"Gatsby"}
              text={"Leverage Gatsby's performance optimizations, plugin ecosystem, and modern development features for a lightning-fast site."}
            />
            <Feature
              icon={SiTypescript}
              title={"TypeScript"}
              text={"Build with confidence using TypeScript for type safety, better developer experience, and fewer runtime errors."}
            />
            <Feature
              icon={SiChakraui}
              title={"Chakra UI"}
              text={"Create beautiful, accessible interfaces with Chakra UI's composable and reusable component library with built-in dark mode."}
            />
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Getting Started */}
      <Box bg={useColorModeValue("gray.50", "gray.900")} py={16}>
        <Container maxW={"4xl"}>
          <VStack spacing={8} textAlign="center">
            <Heading>Getting Started</Heading>
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
              Clone the repository and start building your next project with this template. 
              Customize the theme, add your content, and deploy!
            </Text>
            <Box
              p={6}
              rounded="md"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.100")}
              width="full"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Text fontFamily="mono" fontSize={{ base: "sm", md: "md" }}>
                # Clone the repository<br />
                git clone https://github.com/cloudy-native/gatsby-typescript-chakraui.git<br /><br />
                
                # Navigate to the directory<br />
                cd gatsby-typescript-chakraui<br /><br />
                
                # Install dependencies<br />
                npm install<br /><br />
                
                # Start the development server<br />
                npm run develop
              </Text>
            </Box>
            <Button
              as={GatsbyLink}
              to="/about"
              colorScheme="blue"
              size="lg"
              rounded="full"
              mt={4}
            >
              Learn More
            </Button>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | Gatsby TypeScript ChakraUI Starter</title>;
