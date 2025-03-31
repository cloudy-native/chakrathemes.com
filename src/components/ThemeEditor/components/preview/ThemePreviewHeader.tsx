import { ThemeValues } from "@/types";
import { Flex } from "@chakra-ui/react";
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
    <Flex justifyContent="flex-end" mb={4}>
      <ThemeDownloader themeValues={themeValues} />
    </Flex>
  );
};

export default ThemePreviewHeader;
