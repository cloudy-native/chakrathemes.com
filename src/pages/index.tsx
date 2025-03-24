import { ThemeEditor } from "@/components";
import {
  ArrowForwardIcon,
  CheckIcon,
  RepeatIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Flex,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import { ThemeProvider } from "@/context/ThemeContext";

// TypeScript interface for the FeatureCard component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  badge = null,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      height="100%"
    >
      <Flex direction="column" height="100%">
        <Flex align="center" mb={4}>
          <Icon
            as={icon}
            color={useColorModeValue("blue.500", "blue.300")}
            boxSize={5}
            mr={2}
          />
          <Heading size="md">{title}</Heading>
          {badge && (
            <Badge ml={2} colorScheme="green" variant="solid">
              {badge}
            </Badge>
          )}
        </Flex>
        <Text>{description}</Text>
      </Flex>
    </Box>
  );
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box bg={useColorModeValue("blue.50", "gray.900")} pt={10} pb={10}>
      <Container maxW="6xl">
        <VStack spacing={12} align="stretch">
          {/* Hero Section */}
          <VStack spacing={6} align="center" textAlign="center">
            <Heading as="h1" size="2xl">
              Chakra UI Theme Editor
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="3xl"
            >
              Create and customize a unique and distinctive Chakra UI theme for
              your brand. Modify colors, typography, spacing, and more, then
              export your theme file.
            </Text>
          </VStack>

          {/* Feature Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <FeatureCard
              title="Free Forever"
              description="This tool is completely free to use. No sign-up, no limits, no pro paid license. Ever."
              icon={StarIcon}
              badge="Free"
            />
            <FeatureCard
              title="Constantly Updated"
              description="We're continuously adding new features and improvements based on community feedback to make theme creation even easier."
              icon={RepeatIcon}
            />
            <FeatureCard
              title="Production Ready"
              description="Generate clean, optimized theme files that work perfectly with Chakra UI and can be used directly in your production applications."
              icon={CheckIcon}
            />
          </SimpleGrid>

          {/* Editor */}
          <ThemeEditor />

          <Alert status="warning">
            <AlertIcon /> This is v0.0.3 of the editor. Is is full of bugs and
            UX issues. Apologies. It is actively being worked on.
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
