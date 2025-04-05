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
  step,
  title,
  description,
  isActive,
  isCompleted,
  icon,
  showArrow = false,
}) => {
  // Color mode values
  const colors = {
    activeText: useColorModeValue("gray.800", "gray.100"),
    inactiveText: useColorModeValue("gray.600", "gray.400"),
    lightBg: useColorModeValue("white", "gray.800"),
    iconBg: useColorModeValue("primary.50", "primary.900"),
    activeIconBg: useColorModeValue("primary.400", "primary.600"),
    iconColor: useColorModeValue("primary.600", "primary.200"),
    activeIconColor: useColorModeValue("gray.800", "gray.100"),
  };

  return (
    <Tab
      flex={1}
      _selected={{ 
        fontWeight: "bold", 
        bg: "primary.500", 
        color: colors.activeText, 
        boxShadow: "lg", 
        transform: "translateY(-3px)"
      }}
      _hover={{ 
        transform: "translateY(-4px)", 
        boxShadow: "xl", 
        transition: "all 0.2s ease",
        zIndex: 10
      }}
      borderRadius="lg"
      mx={2}
      py={5}
      position="relative"
      transition="all 0.2s ease"
      bg={colors.lightBg}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex width="100%" height="100%">
        {/* Full-height icon on the left */}
        <Flex 
          alignItems="center" 
          justifyContent="center"
          backgroundColor={isActive ? colors.activeIconBg : useColorModeValue("gray.100", "gray.700")}
          width="60px" 
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          borderRightWidth="1px"
          borderRightColor={isActive ? 
            useColorModeValue("primary.600", "primary.700") : 
            useColorModeValue("gray.200", "gray.600")
          }
          borderTopLeftRadius="lg"
          borderBottomLeftRadius="lg"
          transition="all 0.2s ease"
        >
          <Icon 
            as={icon} 
            boxSize={8} 
            color={isActive ? colors.activeText : useColorModeValue("gray.600", "gray.400")}
            transition="all 0.2s ease"
          />
        </Flex>
        
        {/* Text content with left padding to accommodate icon */}
        <Flex 
          alignItems="center" 
          justifyContent="space-between" 
          width="100%" 
          pl="70px" 
          pr={4}
        >
          <Box textAlign="left">
            <Box fontWeight="semibold" fontSize="lg">
              {title}
            </Box>
            <Box fontSize="sm" opacity="0.8">
              {description}
            </Box>
          </Box>
          
          {showArrow && (
            <Box 
              ml={3} 
              opacity={isActive || isCompleted ? 1 : 0.6}
              bg={isActive ? "primary.500" : useColorModeValue("gray.200", "gray.600")}
              color={isActive ? colors.activeText : useColorModeValue("gray.600", "gray.400")}
              p={2}
              borderRadius="full"
              transition="all 0.2s ease"
            >
              <Icon as={ArrowRight} boxSize={6} />
            </Box>
          )}
        </Flex>
      </Flex>
    </Tab>
  );
};

export default StepTab;