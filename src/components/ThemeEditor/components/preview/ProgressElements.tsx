import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Spinner,
  Divider,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack
} from "@chakra-ui/react";

interface ProgressElementsProps {
  colorKey: string;
}

const ProgressElements: React.FC<ProgressElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Progress & Loading</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4} width="100%">
          <Text fontSize="sm">Progress</Text>
          <Progress colorScheme={colorKey} value={45} width="100%" />
          <Progress colorScheme={colorKey} hasStripe value={65} width="100%" />
          <Progress
            colorScheme={colorKey}
            hasStripe
            isAnimated
            value={85}
            width="100%"
          />
          <HStack spacing={4}>
            <Text fontSize="sm">Spinner</Text>
            <Spinner color={`${colorKey}.500`} size="xs" />
            <Spinner color={`${colorKey}.500`} size="sm" />
            <Spinner color={`${colorKey}.500`} size="md" />
            <Spinner color={`${colorKey}.500`} size="lg" />
          </HStack>
          <Divider />
          <Text fontSize="sm">Skeleton</Text>
          <Box width="100%">
            <Stack>
              <Skeleton
                startColor={`${colorKey}.100`}
                endColor={`${colorKey}.500`}
                height="20px"
                width="100%"
              />
              <Skeleton
                startColor={`${colorKey}.100`}
                endColor={`${colorKey}.500`}
                height="20px"
                width="90%"
              />
              <Skeleton
                startColor={`${colorKey}.100`}
                endColor={`${colorKey}.500`}
                height="20px"
                width="80%"
              />
            </Stack>
            <HStack mt={4} spacing={4}>
              <SkeletonCircle
                startColor={`${colorKey}.100`}
                endColor={`${colorKey}.500`}
                size="10"
              />
              <Box flex="1">
                <SkeletonText
                  startColor={`${colorKey}.100`}
                  endColor={`${colorKey}.500`}
                  noOfLines={3}
                  spacing="2"
                />
              </Box>
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProgressElements;