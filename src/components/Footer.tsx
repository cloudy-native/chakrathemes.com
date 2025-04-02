import { primaryBackground, emptyStateBorder } from "@/theme/themeConfiguration";
import { Box, Icon, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import React from "react";
import version from "../version.json";

const Footer = () => {
  const bgColor = useColorModeValue(primaryBackground.light, primaryBackground.dark);
  const borderColor = useColorModeValue(emptyStateBorder.light, emptyStateBorder.dark);

  return (
    <Box as="footer" bg={bgColor} borderTop="1px" borderColor={borderColor}>
      <Box py={4}>
        <Stack spacing={2} align="center">
          <Text fontSize={"sm"} textAlign={"center"}>
            © {new Date().getFullYear()} ChakraUI Themes Editor. All rights reserved. Made with ❤️
            by{" "}
            <Link href="https://www.linkedin.com/in/stephenharrison/" isExternal>
              Stephen Harrison <Icon as={ExternalLink} />
            </Link>
          </Text>
          <Text fontSize="xs">
            Version {version.version} ({version.buildDate}) |
            <Link href="https://github.com/cloudy-native/chakrathemes.com/issues" ml={1} isExternal>
              Report Issues <Icon as={ExternalLink} boxSize={3} />
            </Link>{" "}
            |
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
