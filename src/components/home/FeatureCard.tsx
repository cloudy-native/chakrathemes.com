import React from "react";
import { Box, Badge, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, badge = null }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      height="100%"
    >
      <Flex direction="column" height="100%">
        <Flex align="center" mb={3}>
          <Icon as={icon} color={useColorModeValue("blue.500", "blue.300")} boxSize={5} mr={2} />
          <Heading size="md" lineHeight="1.2">
            {title}
          </Heading>
          {badge && (
            <Badge ml={2} colorScheme={badge === "Pro" ? "blue" : "green"} variant="solid">
              {badge}
            </Badge>
          )}
        </Flex>
        <Text fontSize="sm">{description}</Text>
      </Flex>
    </Box>
  );
};

export default FeatureCard;
