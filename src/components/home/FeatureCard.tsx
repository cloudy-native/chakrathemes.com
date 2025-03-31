import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, badge = null }) => {
  const iconBg = useColorModeValue("blue.50", "blue.900");
  const iconColor = useColorModeValue("blue.500", "blue.300");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="lg"
      height="100%"
      bg={bgColor}
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
      }}
    >
      <VStack align="start" spacing={4} height="100%">
        <Circle size="50px" bg={iconBg} color={iconColor}>
          <Icon as={icon} boxSize={6} />
        </Circle>

        <Flex width="100%" align="center">
          <Heading color={headingColor} size="md" lineHeight="1.2">
            {title}
          </Heading>
          {badge && (
            <Badge ml={2} colorScheme="accent" fontSize="0.7em" fontWeight="bold">
              {badge}
            </Badge>
          )}
        </Flex>

        <Text fontSize="md" color={textColor} lineHeight="1.7">
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default FeatureCard;
