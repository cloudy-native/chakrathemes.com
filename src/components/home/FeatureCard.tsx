import {
  panelBackground,
  borderLight,
  textPrimary,
  iconAccent,
  featureHeading,
} from "@/theme/themeConfiguration";
import { Box, Circle, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const iconColor = useColorModeValue(iconAccent.light, iconAccent.dark);
  const bgColor = useColorModeValue(panelBackground.light, panelBackground.dark);
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const textColor = useColorModeValue(textPrimary.light, textPrimary.dark);
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);

  return (
    <Box
      p={{ base: 4, md: 6 }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="lg"
      height="100%"
      bg={bgColor}
      transition="all 0.3s"
      _hover={{
        transform: { base: "none", md: "translateY(-5px)" },
        boxShadow: { base: "lg", md: "xl" },
      }}
      display="flex"
      flexDirection="column"
    >
      <Flex
        width="100%"
        align="center"
        mb={3}
        flexDirection={{ base: "column", sm: "row" }}
        textAlign={{ base: "center", sm: "left" }}
      >
        <Circle size={{ base: "40px", md: "50px" }} color={iconColor} mb={{ base: 2, sm: 0 }}>
          <Icon as={icon} boxSize={{ base: 5, md: 6 }} />
        </Circle>

        <Flex
          ml={{ base: 0, sm: 3 }}
          align="center"
          flexWrap="wrap"
          justify={{ base: "center", sm: "flex-start" }}
        >
          <Heading color={headingColor} size={{ base: "sm", md: "md" }} lineHeight="1.2">
            {title}
          </Heading>
        </Flex>
      </Flex>

      <Text fontSize={{ base: "sm", md: "md" }} color={textColor} lineHeight="1.6" flex="1">
        {description}
      </Text>
    </Box>
  );
};

export default FeatureCard;
