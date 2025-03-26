import React from "react";
import { Heading, Icon, VStack } from "@chakra-ui/react";
import { ChevronsDown } from "lucide-react";

interface SectionDividerProps {
  title: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
  return (
    <VStack>
      <Heading>
        <Icon as={ChevronsDown} color="blue.500" /> {title}
      </Heading>
    </VStack>
  );
};

export default SectionDivider;