import React from "react";
import { Tab, Flex, Box, Icon, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { ArrowRight, ArrowDown } from "lucide-react";

interface StepTabProps {
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  icon: React.ElementType;
  showArrow?: boolean;
  isVertical?: boolean;
  isAccordion?: boolean; // New prop to handle accordion variant
}

/**
 * A reusable component for step-based navigation tabs
 * Displays a numbered step with title and description
 * Can be used in tabs or accordions
 */
export const StepTab: React.FC<StepTabProps> = ({
  step: _step,
  title,
  description,
  isActive,
  isCompleted,
  icon,
  showArrow = false,
  isVertical = false,
  isAccordion = false,
}) => {
  // Color mode values for text
  const activeText = useColorModeValue("white", "white");
  const inactiveText = useColorModeValue("gray.700", "gray.200");
  // Color mode values for backgrounds
  const activeBg = useColorModeValue("primary.500", "primary.600");
  const inactiveBg = useColorModeValue(isAccordion ? "gray.50" : "gray.100", "gray.700");
  // Color mode values for icons
  const activeIconColor = useColorModeValue("white", "white");
  const inactiveIconColor = useColorModeValue("gray.600", "gray.300");
  // Border colors
  const activeBorderColor = useColorModeValue("primary.600", "primary.700");
  const inactiveBorderColor = useColorModeValue("gray.200", "gray.600");
  // Arrow colors
  const arrowColor = useColorModeValue("gray.600", "gray.300");

  // Determine arrow direction based on screen size or orientation
  const isMobile = useBreakpointValue({ base: true, md: false });
  const ArrowIcon = isVertical || isMobile ? ArrowDown : ArrowRight;

  // Component content
  const tabContent = (
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
          <Box fontSize="sm" opacity={isActive ? 0.9 : 0.8} mt={1} pl={1}>
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
            <Icon as={ArrowIcon} boxSize={6} color={isActive ? activeIconColor : arrowColor} />
          </Box>
        )}
      </Flex>
    </Flex>
  );

  // If being used in an accordion, just return the content
  if (isAccordion) {
    return (
      <Box
        flex={1}
        borderRadius="lg"
        py={5}
        position="relative"
        transition="all 0.2s ease"
        color={isActive ? activeText : inactiveText}
        bg={isActive ? activeBg : inactiveBg}
        boxShadow="sm"
        border="1px solid"
        borderColor={isActive ? activeBorderColor : inactiveBorderColor}
      >
        {tabContent}
      </Box>
    );
  }

  // Otherwise return as a Tab component
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
      {tabContent}
    </Tab>
  );
};

export default StepTab;
