import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";
import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  // {
  //   label: "Home",
  //   href: "/",
  // },
];

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  // Use specific colors to ensure opacity in both modes
  const bgColor = useColorModeValue("white", "#1A202C"); // Using specific hex for dark mode
  const textColor = useColorModeValue("neutral.800", "neutral.100");
  const borderColor = useColorModeValue("neutral.200", "neutral.700");

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      color={textColor}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Container maxW="container.xl" px={4}>
        <Flex h="16" alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Text
            as={GatsbyLink}
            to="/"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="xl"
            color="primary.500"
            _hover={{
              textDecoration: "none",
              color: "primary.600",
            }}
          >
            chakrathemes.com
          </Text>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <HStack as="nav" spacing={6}>
              {NAV_ITEMS.map(navItem => (
                <Link
                  key={navItem.label}
                  as={!navItem.isExternal ? GatsbyLink : undefined}
                  to={!navItem.isExternal ? navItem.href : undefined}
                  href={navItem.isExternal ? navItem.href : undefined}
                  fontSize="md"
                  fontWeight={500}
                  color={textColor}
                  _hover={{
                    textDecoration: "none",
                    color: "primary.500",
                  }}
                >
                  {navItem.label}
                </Link>
              ))}
            </HStack>

            <HStack spacing={4}>
              <IconButton
                aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
                variant="ghost"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
              />
              <Button
                as="a"
                href="https://github.com/cloudy-native/chakrathemes.com"
                target="_blank"
                rel="noopener noreferrer"
                rightIcon={<FaGithub />}
                variant="outline"
              >
                Fork me on GitHub
              </Button>
            </HStack>
          </HStack>

          {/* Mobile Navigation Toggle */}
          <Flex display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
        </Flex>

        {/* Mobile Navigation Menu */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4} pt={2}>
              {NAV_ITEMS.map(navItem => (
                <Link
                  key={navItem.label}
                  as={!navItem.isExternal ? GatsbyLink : undefined}
                  to={!navItem.isExternal ? navItem.href : undefined}
                  href={navItem.isExternal ? navItem.href : undefined}
                  py={2}
                  fontWeight={500}
                  color={textColor}
                  _hover={{
                    textDecoration: "none",
                    color: "primary.500",
                  }}
                >
                  {navItem.label}
                </Link>
              ))}
              <Button
                size="sm"
                leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="outline"
                justifyContent="flex-start"
                width="fit-content"
                mb={2}
              >
                Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
              </Button>

              <Button
                as="a"
                href="https://github.com/cloudy-native/chakrathemes.com"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                leftIcon={<FaGithub />}
                variant="outline"
                colorScheme="gray"
                justifyContent="flex-start"
                width="fit-content"
              >
                Fork me on GitHub
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header;
