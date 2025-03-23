import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { ThemeValues } from "../../../../types";
import BasicElements from "./BasicElements";
import ButtonStyles from "./ButtonStyles";
import ProgressElements from "./ProgressElements";
import InteractiveElements from "./InteractiveElements";
import InputElements from "./InputElements";
import TagElements from "./TagElements";
import AlertElements from "./AlertElements";
import AvatarElements from "./AvatarElements";

interface ComponentPreviewProps {
  colorKey: string;
  themeValues: ThemeValues;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  colorKey,
  themeValues,
}) => {
  // Use the first color palette as the primary color
  const colorKeys = Object.keys(themeValues.colors || {});
  const primaryColor = colorKeys.length > 0 ? colorKeys[0] : "blue";

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      <BasicElements colorKey={colorKey} />
      <ButtonStyles colorKey={colorKey} />
      <ProgressElements colorKey={colorKey} />
      <InteractiveElements colorKey={colorKey} />
      <InputElements colorKey={colorKey} />
      <TagElements colorKey={colorKey} />
      <AlertElements colorKey={colorKey} />
      <AvatarElements colorKey={colorKey} />
    </SimpleGrid>
  );
};

export default ComponentPreview;