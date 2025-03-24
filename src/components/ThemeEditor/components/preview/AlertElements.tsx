import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface AlertElementsProps {
  colorKey: string;
}

const AlertElements: React.FC<AlertElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Alerts</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4} width="100%">
          <Alert status="info" colorScheme={colorKey} variant="subtle">
            <AlertIcon />
            Info alert
          </Alert>
          <Alert status="success" colorScheme={colorKey} variant="subtle">
            <AlertIcon />
            Success alert
          </Alert>
          <Alert status="warning" colorScheme={colorKey} variant="subtle">
            <AlertIcon />
            Warning alert
          </Alert>
          <Alert status="error" colorScheme={colorKey} variant="subtle">
            <AlertIcon />
            Error alert
          </Alert>
          <Alert status="loading" colorScheme={colorKey} variant="subtle">
            <AlertIcon />
            Loading alert
          </Alert>

          <Divider my={2} />

          {/* Visual Variants */}
          <Alert status="info" colorScheme={colorKey} variant="subtle">
            <AlertIcon />
            Subtle
          </Alert>
          <Alert status="info" colorScheme={colorKey} variant="solid">
            <AlertIcon />
            Solid
          </Alert>
          <Alert status="info" colorScheme={colorKey} variant="left-accent">
            <AlertIcon />
            Left Accent
          </Alert>
          <Alert status="info" colorScheme={colorKey} variant="top-accent">
            <AlertIcon />
            Top Accent
          </Alert>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AlertElements;
