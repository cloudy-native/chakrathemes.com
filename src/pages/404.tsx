import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HeadFC, Link, PageProps } from "gatsby";
import * as React from "react";
import { AlertTriangle, Home } from "lucide-react";

const NotFoundPage: React.FC<PageProps> = () => {
  // Theme colors
  const cardBgColor = useColorModeValue("white", "gray.800");
  const primaryColor = useColorModeValue("primary.500", "primary.400");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");

  return (
    <Container maxW="container.md">
      <Center>
        <VStack
          bg={cardBgColor}
          p={{ base: 8, md: 12 }}
          borderRadius="xl"
          boxShadow="xl"
          spacing={8}
          w="full"
        >
          {/* Icon and Heading */}
          <Flex direction="column" align="center" justify="center" textAlign="center">
            <Icon as={AlertTriangle} w={20} h={20} color={primaryColor} mb={6} />
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} mb={2} color={headingColor}>
              404
            </Heading>
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
              mb={6}
              fontWeight="normal"
              color={headingColor}
            >
              Page Not Found
            </Heading>
            <Text fontSize="lg" maxW="md" textAlign="center" color={textColor}>
              Oops! The page you're looking for doesn't seem to exist.
            </Text>
          </Flex>

          {/* Developer message in development */}
          {process.env.NODE_ENV === "development" && (
            <Box
              bg={useColorModeValue("primary.50", "primary.900")}
              p={4}
              borderRadius="md"
              borderLeft="4px solid"
              maxW="full"
            >
              <Text color={useColorModeValue("primary.700", "primary.100")} fontSize="sm">
                Developer Note: You can create new pages in the <code>src/pages/</code> directory.
              </Text>
            </Box>
          )}

          {/* Navigation options */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            mt={6}
            width="full"
            justify="center"
          >
            <Button as={Link} to="/" size="lg" leftIcon={<Home size={18} />} px={8}>
              Back to Home
            </Button>
          </Stack>
        </VStack>
      </Center>
    </Container>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Page Not Found | Chakra UI Themes Editor</title>;
