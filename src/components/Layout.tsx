import { headerBackground, panelBackground } from "@/theme/themeConfiguration";
import { Box, Flex, Icon, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import version from "../version.json";
import Header from "./Header";
import { ExternalLink } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

// TODO: Footer is appearing twice because we botched the SSR code. So annoying! Just comment out for now.
//
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const applicationBg = useColorModeValue(panelBackground.light, panelBackground.dark);
  const bgColor = useColorModeValue(headerBackground.light, headerBackground.dark);
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex direction="column" minH="100vh" bg={applicationBg}>
      <Box as="header" width="100%">
        <Header />
      </Box>
      <Box as="main" flex="1" width="100%">
        {children}
      </Box>
      <Box as="footer" bg={bgColor} borderTop="1px" borderColor={borderColor}>
        <Box py={4}>
          <Stack spacing={2} align="center">
            <Text fontSize={"sm"} textAlign={"center"}>
              © {new Date().getFullYear()} ChakraUI Themes Editor. All rights reserved. Made with
              ❤️ by{" "}
              <Link href="https://www.linkedin.com/in/stephenharrison/" isExternal>
                Stephen Harrison <Icon as={ExternalLink} />
              </Link>
            </Text>
            <Text fontSize="xs">
              Version {version.version} ({version.buildDate}) |
              <Link
                href="https://github.com/cloudy-native/chakrathemes.com/issues"
                ml={1}
                isExternal
              >
                Report Issues <Icon as={ExternalLink} boxSize={3} />
              </Link>{" "}
              |
              <Link
                href="https://github.com/cloudy-native/chakrathemes.com/pulls"
                ml={1}
                isExternal
              >
                Submit PRs <Icon as={ExternalLink} boxSize={3} />
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
