import { ThemeValues } from "@/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import AlertElements from "./AlertElements";
import AvatarElements from "./AvatarElements";
import BasicElements from "./BasicElements";
import BorderElements from "./BorderElements";
import ButtonStyles from "./ButtonStyles";
import InputElements from "./InputElements";
import InteractiveElements from "./InteractiveElements";
import ProgressElements from "./ProgressElements";
import ShadowElements from "./ShadowElements";

interface ComponentPreviewProps {
  colorKey: string;
  themeValues: ThemeValues;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  colorKey,
  themeValues,
}) => {
  return (
    <Box>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Heading size="sm" as="span" flex="1" textAlign="left">
              Visual Elements
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
              {/* <BuiltInSchemas colorKey={colorKey} /> */}
              <ButtonStyles colorKey={colorKey} />
              <BorderElements themeValues={themeValues} colorKey={colorKey} />
              <ShadowElements themeValues={themeValues} colorKey={colorKey} />
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Heading size="sm" as="span" flex="1" textAlign="left">
              User Controls
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
              <BasicElements colorKey={colorKey} />
              <InputElements colorKey={colorKey} />
              <InteractiveElements colorKey={colorKey} />
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Heading size="sm" as="span" flex="1" textAlign="left">
              Feedback & Display{" "}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <AlertElements colorKey={colorKey} />
              <ProgressElements colorKey={colorKey} />
              <AvatarElements colorKey={colorKey} />
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ComponentPreview;
