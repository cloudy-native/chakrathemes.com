import { headerBackground, headerText } from "@/theme/themeConfiguration";
import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { Github, Menu, Moon, Sun, X } from "lucide-react";
import React from "react";
import BuyMeCoffeeButton from "./BuyMeCoffeeButton";

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
  const bgColor = useColorModeValue(headerBackground.light, headerBackground.dark);
  const textColor = useColorModeValue(headerText.light, headerText.dark);
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
            color={textColor}
            to="/"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="xl"
            _hover={{
              textDecoration: "none",
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
              <Button
                color={textColor}
                as="a"
                href="https://github.com/cloudy-native/chakrathemes.com"
                target="_blank"
                rel="noopener noreferrer"
                rightIcon={<Github size={18} />}
                variant="ghost"
              >
                Fork me on GitHub
              </Button>
              <BuyMeCoffeeButton />
              <IconButton
                color={textColor}
                aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
                variant="ghost"
                size="lg"
                icon={colorMode === "light" ? <Icon as={Moon} /> : <Icon as={Sun} />}
                onClick={toggleColorMode}
              />
            </HStack>
          </HStack>

          {/* Mobile Navigation Toggle */}
          <Flex display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <X size={18} /> : <Menu size={18} />}
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
                as="a"
                href="https://github.com/cloudy-native/chakrathemes.com"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                leftIcon={<Github size={16} />}
                variant="outline"
                colorScheme="gray"
                justifyContent="flex-start"
                width="fit-content"
              >
                Fork me on GitHub
              </Button>
              <BuyMeCoffeeButton />
              <Button
                size="sm"
                leftIcon={colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
                onClick={toggleColorMode}
                variant="outline"
                justifyContent="flex-start"
                width="fit-content"
                mb={2}
              >
                Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header;
