import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

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
            This is an info alert
          </Alert>
          <Alert status="success" colorScheme={colorKey} variant="solid">
            <AlertIcon />
            This is a success alert
          </Alert>
          <Alert status="warning" colorScheme={colorKey} variant="left-accent">
            <AlertIcon />
            This is a warning alert
          </Alert>
          <Alert status="error" colorScheme={colorKey} variant="top-accent">
            <AlertIcon />
            This is an error alert
          </Alert>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AlertElements;