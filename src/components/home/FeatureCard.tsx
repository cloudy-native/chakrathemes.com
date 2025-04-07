import { borderLight, iconAccent, featureHeading } from "@/theme/themeConfiguration";
import { Box, Circle, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

/**
 * FeatureCardProps Interface
 *
 * Defines the properties for the FeatureCard component.
 *
 * @param {string} title - The title of the feature.
 * @param {string} description - A brief description of the feature.
 * @param {React.ElementType} icon - The icon to display alongside the title.
 */
export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

/**
 * FeatureCard Component
 *
 * A reusable card component to display a feature with a title, description, and icon.
 *
 * @param {FeatureCardProps} props - The properties for the FeatureCard component.
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  // Color values for the component, dynamically adjusted based on the color mode.
  const iconColor = useColorModeValue(iconAccent.light, iconAccent.dark);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue(borderLight.light, borderLight.dark);
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue(featureHeading.light, featureHeading.dark);

  return (
    <Box
      p={{ base: 6, md: 8 }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="xl"
      height="100%"
      bg={bgColor}
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
      display="flex"
      flexDirection="column"
    >
      {/* Icon and Title in a flex row */}
      <Box display="flex" alignItems="center" mb={4}>
        <Circle
          size={{ base: "40px", md: "50px" }}
          bg={useColorModeValue(`${iconColor}20`, `${iconColor}30`)}
          color={iconColor}
          mr={4}
        >
          <Icon as={icon} boxSize={{ base: 5, md: 6 }} />
        </Circle>

        <Heading
          color={headingColor}
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          lineHeight="1.2"
        >
          {title}
        </Heading>
      </Box>

      {/* Description */}
      <Text fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="1.7" flex="1">
        {description}
      </Text>
    </Box>
  );
};

export default FeatureCard;
