import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Grid, GridItem, Text, Link, Flex, Spacer } from "@chakra-ui/react";
import ThemeDownloader from "./ThemeDownloader";
import { ThemeValues } from "@/types";

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
          Select a color below to preview how the theme will look in your application. Start with
          Color Palette and Basics. There are also styled samples of Cards, and Tables Make sure
          to drill down and explore all the variations.{" "}
        </Text>
        <Text mb={4} fontSize="sm">
          When you're ready, download the theme and add it to your project. Review{" "}
          <Link href="https://v2.chakra-ui.com/docs/styled-system/customize-theme" isExternal>
            Customize Theme <ExternalLinkIcon />
          </Link>{" "}
          in the ChakraUI documentation for details.
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