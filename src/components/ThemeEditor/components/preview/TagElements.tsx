import { Card, CardBody, CardHeader, Heading, Tag, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

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
            <WrapItem>
              <Tag colorScheme={colorKey} size="sm">
                Small
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme={colorKey} size="md">
                Medium
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme={colorKey} size="lg">
                Large
              </Tag>
            </WrapItem>
          </Wrap>
          <Wrap spacing={2}>
            <WrapItem>
              <Tag colorScheme={colorKey} variant="solid">
                Solid
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme={colorKey} variant="subtle">
                Subtle
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme={colorKey} variant="outline">
                Outline
              </Tag>
            </WrapItem>
          </Wrap>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default TagElements;
