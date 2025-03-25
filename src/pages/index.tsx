import { ThemeEditor } from "@/components";
import { CheckIcon, RepeatIcon, StarIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import versionData from '../version.json';

const appVersion = versionData.version;

// TypeScript interface for the FeatureCard component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string | null;
}

// Feature List Data
const featureList: FeatureCardProps[] = [
  {
    title: "Genuinely Free Forever",
    description:
      "No catches here—completely free to use whenever you need it. No sign-ups, no usage limits, no attribution requirements, and definitely no surprise premium tiers. Just straightforward theme creation tools available to everyone.",
    icon: StarIcon,
    badge: "Free",
  },
  {
    title: "Constantly Improving",
    description:
      "We're actively developing new features based on what our users actually want. Your feedback directly shapes our roadmap, helping us make theme creation smoother and more powerful with each update.",
    icon: RepeatIcon,
  },
  {
    title: "Production-Ready Output",
    description:
      "Generate clean, optimized theme files that integrate perfectly with Chakra UI. These aren't just demo-quality exports—they're refined, efficient code you can confidently use in your professional projects right away.",
    icon: CheckIcon,
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, badge = null }) => {
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
          <Icon as={icon} color={useColorModeValue("blue.500", "blue.300")} boxSize={5} mr={2} />
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
            <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.400")} maxW="3xl">
              Create and customize a unique and distinctive Chakra UI theme for your brand. Modify
              colors, typography, spacing, and more, then export your theme file.
            </Text>
          </VStack>

          {/* Feature Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {featureList.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                badge={feature.badge}
              />
            ))}
          </SimpleGrid>

          {/* Editor */}
          <ThemeEditor />

          <Alert status="warning">
            <AlertIcon /> This is v{appVersion} of the editor. Is is full of bugs and UX issues.
            Apologies. It is actively being worked on.
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home | ChakraUI Themes Editor</title>;
