import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

// Button variants available in Chakra UI
const CHAKRAUI_COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "gray",
];

const ALERTS: (
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading"
  | undefined
)[] = ["info", "warning", "success", "error", "loading"];

interface BuiltInSchemasProps {
  colorKey: string;
}

const BuiltInSchemas: React.FC<BuiltInSchemasProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">ChakraUI Scheme Reference</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="start" width="100%">
          {/* Buttons */}
          <Text fontWeight="medium" fontSize="sm">
            Buttons
          </Text>
          <Wrap spacing={2}>
            {CHAKRAUI_COLORS.map((color) => (
              <WrapItem>
                <Button key={color} colorScheme={color}>
                  {color}
                </Button>
              </WrapItem>
            ))}
          </Wrap>

          <Divider my={2} />

          {/* Tags */}
          <Text fontWeight="medium" fontSize="sm">
            Tags
          </Text>
          <Wrap spacing={2}>
            {CHAKRAUI_COLORS.map((color) => (
              <WrapItem>
                <Tag key={color} colorScheme={color}>
                  {color}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>

          <Divider my={2} />

          {/* Alerts */}
          <Text fontWeight="medium" fontSize="sm">
            Alerts
          </Text>
          <VStack spacing={2} align="start" width="100%">
            {ALERTS.map((status) => (
              <Alert key={status} status={status}>
                <AlertIcon />
                {status} alert
              </Alert>
            ))}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default BuiltInSchemas;
