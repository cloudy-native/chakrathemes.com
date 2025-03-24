import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

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
        <VStack align="flex-start" spacing={4} width="100%">
          {/* Badge Elements */}
          <Text fontWeight="medium" fontSize="sm">
            Badges
          </Text>
          <Wrap spacing={2}>
            <WrapItem>
              <Badge colorScheme={colorKey}>Badge</Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme={colorKey} variant="solid">
                Badge Solid
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme={colorKey} variant="outline">
                Badge Outline
              </Badge>
            </WrapItem>
          </Wrap>

          <Divider my={2} />

          {/* Toggle Elements */}
          <Text fontWeight="medium" fontSize="sm">
            Toggle Controls
          </Text>
          <HStack spacing={4}>
            <Switch colorScheme={colorKey} />
            <Switch colorScheme={colorKey} defaultChecked />
          </HStack>

          <Divider my={2} />

          {/* Selection Elements */}
          <Text fontWeight="medium" fontSize="sm">
            Selection Controls
          </Text>
          <Wrap spacing={2}>
            <WrapItem>
              <Checkbox colorScheme={colorKey}>Checkbox</Checkbox>
            </WrapItem>
            <WrapItem>
              <Checkbox colorScheme={colorKey} defaultChecked>
                Checked
              </Checkbox>
            </WrapItem>
            <WrapItem>
              <Checkbox colorScheme={colorKey} isIndeterminate>
                Indeterminate
              </Checkbox>
            </WrapItem>
          </Wrap>
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
