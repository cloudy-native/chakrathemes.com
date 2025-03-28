import { ThemeValues } from "@/types";
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, Pointer } from "lucide-react";
import React from "react";
import ThemeDownloader from "./ThemeDownloader";

interface ThemePreviewHeaderProps {
  themeValues: ThemeValues;
}

/**
 * Header section for theme preview with instructions and download button
 */
export const ThemePreviewHeader: React.FC<ThemePreviewHeaderProps> = ({ themeValues }) => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem rowSpan={2} colSpan={4}>
        <Text mb={4} fontSize="sm">
          Create color palettes in the "Palettes" tab. Click a palette's color below and look at
          "Color Palette" and "Basics". There are also styled samples of Cards, and Tables. Make
          sure to drill down.{" "}
        </Text>
        <Text mb={4} fontSize="sm">
          Review{" "}
          <Link href="https://v2.chakra-ui.com/docs/styled-system/customize-theme" isExternal>
            Customize Theme <Icon as={ExternalLinkIcon} />
          </Link>{" "}
          in the ChakraUI documentation and download the theme.
        </Text>
        <Text mb={4} fontSize="sm">
          <strong>Tip:</strong> Name your palettes "primary", "secondary", "accent", or "background"
          to see them in action in this application, but only with this tab selected.
        </Text>
      </GridItem>
      <GridItem>
        <Flex align="flex-end">
          <Spacer />
          <ThemeDownloader themeValues={themeValues} />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ThemePreviewHeader;
