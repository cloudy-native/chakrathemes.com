import React from "react";
import { Box } from "@chakra-ui/react";
import ThemePresets from "@/components/ThemeEditor/components/ThemePresets";

export const ThemePresetsTab: React.FC = () => {
  return (
    <Box>
      <ThemePresets />
    </Box>
  );
};

export default ThemePresetsTab;
