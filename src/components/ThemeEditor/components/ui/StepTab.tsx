import React from "react";
import { Tab, Flex, Box, Icon, useColorModeValue } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

interface StepTabProps {
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  icon: React.ElementType;
  showArrow?: boolean;
}

/**
 * A reusable component for step-based navigation tabs
 * Displays a numbered step with title and description
 */
export const StepTab: React.FC<StepTabProps> = ({
  step: _step,
  title,
  description,
  isActive,
  isCompleted,
  icon,
  showArrow = false,
}) => {
  // Color mode values for text
  const activeText = useColorModeValue("white", "white");
  const inactiveText = useColorModeValue("gray.700", "gray.200");
  // Color mode values for backgrounds
  const activeBg = useColorModeValue("primary.500", "primary.600");
  const inactiveBg = useColorModeValue("gray.100", "gray.700");
  // Color mode values for icons
  const activeIconColor = useColorModeValue("white", "white");
  const inactiveIconColor = useColorModeValue("gray.600", "gray.300");
  // Border colors
  const activeBorderColor = useColorModeValue("primary.600", "primary.700");
  const inactiveBorderColor = useColorModeValue("gray.200", "gray.600");
  // Arrow colors
  const arrowColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Tab
      flex={1}
      _selected={{
        fontWeight: "bold",
        color: activeText,
        bg: activeBg,
        borderColor: activeBorderColor,
        boxShadow: "lg",
        transform: "translateY(-3px)",
      }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        transition: "all 0.2s ease",
        zIndex: 10,
      }}
      borderRadius="lg"
      mx={2}
      py={5}
      position="relative"
      transition="all 0.2s ease"
      border="1px solid"
      borderColor={isActive ? activeBorderColor : inactiveBorderColor}
      bg={isActive ? activeBg : inactiveBg}
      color={isActive ? activeText : inactiveText}
    >
      <Flex width="100%" height="100%">
        {/* Full-height icon on the left */}
        <Flex
          alignItems="center"
          justifyContent="center"
          width="60px"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          borderRightWidth="1px"
          borderRightColor={isActive ? activeBorderColor : inactiveBorderColor}
          borderTopLeftRadius="lg"
          borderBottomLeftRadius="lg"
          transition="all 0.2s ease"
        >
          <Icon
            as={icon}
            boxSize={8}
            color={isActive ? activeIconColor : inactiveIconColor}
            transition="all 0.2s ease"
          />
        </Flex>

        {/* Text content with left padding to accommodate icon */}
        <Flex alignItems="center" justifyContent="space-between" width="100%" pl="70px" pr={4}>
          <Box textAlign="left">
            <Box fontWeight="semibold" fontSize="lg">
              {title}
            </Box>
            <Box fontSize="sm" opacity={isActive ? 0.9 : 0.8}>
              {description}
            </Box>
          </Box>

          {showArrow && (
            <Box
              ml={3}
              opacity={isActive || isCompleted ? 1 : 0.6}
              p={2}
              borderRadius="full"
              transition="all 0.2s ease"
            >
              <Icon as={ArrowRight} boxSize={6} color={isActive ? activeIconColor : arrowColor} />
            </Box>
          )}
        </Flex>
      </Flex>
    </Tab>
  );
};

export default StepTab;
