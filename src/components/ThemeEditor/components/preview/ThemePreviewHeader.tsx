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
    <Flex justifyContent="flex-end" mb={4}>
      <ThemeDownloader themeValues={themeValues} />
    </Flex>
  );
};

export default ThemePreviewHeader;
