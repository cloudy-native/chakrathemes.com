import { ThemeValues } from "@/types";
import { Flex, Grid, GridItem, Icon, Link, Spacer, Text } from "@chakra-ui/react";
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
          sure to drill down and explore all the variations.{" "}
        </Text>
        <Text mb={4} fontSize="sm">
          When you're ready, download the theme and add it to your project. Review{" "}
          <Link href="https://v2.chakra-ui.com/docs/styled-system/customize-theme" isExternal>
            Customize Theme <Icon as={ExternalLinkIcon} />
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
