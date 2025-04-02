import { Heading, Icon, useColorModeValue, VStack } from "@chakra-ui/react";
import { iconSecondary } from "@/theme/themeConfiguration";
import { ChevronsDown } from "lucide-react";
import React from "react";

interface SectionDividerProps {
  title: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
  const iconColor = useColorModeValue(iconSecondary.light, iconSecondary.dark);

  return (
    <VStack>
      <Heading>
        <Icon color={iconColor} as={ChevronsDown} /> {title}
      </Heading>
    </VStack>
  );
};

export default SectionDivider;
