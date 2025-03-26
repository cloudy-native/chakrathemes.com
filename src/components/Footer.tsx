import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import { ExternalLink, Github, Linkedin } from "lucide-react";
import BuyMeCoffeeButton from "./BuyMeCoffeeButton";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <IconButton
      as="a"
      href={href}
      aria-label={label}
      icon={<>{children}</>}
      isRound
      size="sm"
      variant="ghost"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
    </IconButton>
  );
};

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight={"600"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const bgColor = useColorModeValue("neutral.50", "neutral.900");
  const borderColor = useColorModeValue("neutral.200", "neutral.700");

  return (
    <Box as="footer" bg={bgColor} borderTop="1px" borderColor={borderColor}>
      <Container as={Stack} maxW={"container.xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Text
                as={GatsbyLink}
                to="/"
                fontFamily={"heading"}
                fontWeight="bold"
                fontSize="xl"
                color="primary.500"
              >
                ChakraUI Themes Editor
              </Text>
            </Box>
            <Text fontSize={"sm"}>A simple ChakraUI Themes Editor.</Text>
            <Stack direction={"row"} spacing={4}>
              <SocialButton label={"LinkedIn"} href={"https://www.linkedin.com/in/stephenharrison"}>
                <Linkedin size={18} />
              </SocialButton>
              <SocialButton label={"GitHub"} href={"https://github.com/cloudy-native"}>
                <Github size={18} />
              </SocialButton>
            </Stack>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Resources</ListHeader>
            <Link href="https://www.gatsbyjs.com/docs/" isExternal>
              Gatsby Docs
            </Link>
            <Link href="https://chakra-ui.com/docs/getting-started" isExternal>
              Chakra UI Docs
            </Link>
            <Link href="https://www.typescriptlang.org/docs/" isExternal>
              TypeScript Docs
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Site</ListHeader>
            <Link as={GatsbyLink} to="/">
              Home
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support Me</ListHeader>
            <Text>
              If you like this and want to help a little bit, you can send small donation.
            </Text>
            <BuyMeCoffeeButton />
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider borderColor={borderColor} />

      <Box py={4}>
        <Stack spacing={2} align="center">
          <Text fontSize={"sm"} textAlign={"center"}>
            © {new Date().getFullYear()} ChakraUI Themes Editor. All rights reserved. Made with ❤️ by{" "}
            <Link href="https://www.linkedin.com/in/stephenharrison/" isExternal>
              Stephen Harrison <Icon as={ExternalLink} />
            </Link>
          </Text>
          <Text fontSize="xs" color="gray.500">
            Version 0.1.1 (March 25, 2025) | 
            <Link href="https://github.com/cloudy-native/chakrathemes.com/issues" ml={1} isExternal>
              Report Issues <Icon as={ExternalLink} boxSize={3} />
            </Link> | 
            <Link href="https://github.com/cloudy-native/chakrathemes.com/pulls" ml={1} isExternal>
              Submit PRs <Icon as={ExternalLink} boxSize={3} />
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
