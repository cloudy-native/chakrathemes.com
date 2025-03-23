import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Badge,
  Switch,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

interface BasicElementsProps {
  colorKey: string;
}

const BasicElements: React.FC<BasicElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Basic Elements</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4}>
          <HStack spacing={4}>
            <Badge colorScheme={colorKey}>Badge</Badge>
            <Badge colorScheme={colorKey} variant="solid">
              Badge Solid
            </Badge>
            <Badge colorScheme={colorKey} variant="outline">
              Badge Outline
            </Badge>
          </HStack>
          <HStack spacing={4}>
            <Switch colorScheme={colorKey} />
            <Switch colorScheme={colorKey} defaultChecked />
          </HStack>
          <HStack spacing={4}>
            <Checkbox colorScheme={colorKey}>Checkbox</Checkbox>
            <Checkbox colorScheme={colorKey} defaultChecked>
              Checked
            </Checkbox>
            <Checkbox colorScheme={colorKey} isIndeterminate>
              Indeterminate
            </Checkbox>
          </HStack>
          <HStack spacing={4}>
            <RadioGroup defaultValue="1">
              <Stack direction="row">
                <Radio colorScheme={colorKey} value="1">
                  Option 1
                </Radio>
                <Radio colorScheme={colorKey} value="2">
                  Option 2
                </Radio>
              </Stack>
            </RadioGroup>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default BasicElements;