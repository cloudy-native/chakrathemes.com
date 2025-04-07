import { Heading, Icon, useColorModeValue, VStack } from "@chakra-ui/react";
import { iconSecondary } from "@/theme/themeConfiguration";
import { ChevronsDown } from "lucide-react";
import React from "react";

/**
 * SectionDividerProps Interface
 *
 * Defines the properties for the SectionDivider component.
 *
 * @param {string} title - The title to display above the divider icon.
 */
interface SectionDividerProps {
  title: string;
}

/**
 * SectionDivider Component
 *
 * This component displays a heading with a downward-pointing chevron icon,
 * typically used to visually separate sections of content.
 *
 * @param {SectionDividerProps} props - The properties for the SectionDivider component.
 */
const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
  // Color value for the icon, dynamically adjusted based on the color mode.
  const iconColor = useColorModeValue(iconSecondary.light, iconSecondary.dark);

  return (
    // Main container for the SectionDivider.
    <VStack>
      {/* Heading with icon */}
      <Heading>
        {/* Chevron icon */}
        <Icon color={iconColor} as={ChevronsDown} />
        {/* Title text */}
        {title}
      </Heading>
    </VStack>
  );
};

export default SectionDivider;
