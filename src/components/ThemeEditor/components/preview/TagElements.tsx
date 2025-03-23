import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Wrap,
  Tag
} from "@chakra-ui/react";

interface TagElementsProps {
  colorKey: string;
}

const TagElements: React.FC<TagElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Tags</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4}>
          <Wrap spacing={2}>
            <Tag colorScheme={colorKey} size="sm">
              Small
            </Tag>
            <Tag colorScheme={colorKey} size="md">
              Medium
            </Tag>
            <Tag colorScheme={colorKey} size="lg">
              Large
            </Tag>
          </Wrap>
          <Wrap spacing={2}>
            <Tag colorScheme={colorKey} variant="solid">
              Solid
            </Tag>
            <Tag colorScheme={colorKey} variant="subtle">
              Subtle
            </Tag>
            <Tag colorScheme={colorKey} variant="outline">
              Outline
            </Tag>
          </Wrap>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default TagElements;