import { featureBackground } from "@/theme/themeConstants";
import { Badge, Box, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, badge = null }) => {
  const iconColor = useColorModeValue("accent.600", "accent.400");
  const bg = useColorModeValue(featureBackground.light, featureBackground.dark);

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" height="100%" bg={bg}>
      <Flex direction="column" height="100%">
        <Flex align="center" mb={3}>
          <Icon color={iconColor} as={icon} boxSize={5} mr={2} />
          <Heading size="md" lineHeight="1.2">
            {title}
          </Heading>
          {badge && (
            <Badge ml={2} variant="solid">
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
