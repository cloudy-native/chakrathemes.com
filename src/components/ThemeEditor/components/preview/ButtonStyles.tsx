import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Button,
  Wrap,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";

// Button variants available in Chakra UI
const BUTTON_VARIANTS = ["solid", "outline", "ghost", "link", "disabled"];
const BUTTON_SIZES = ["lg", "md", "sm", "xs"];

interface ButtonStylesProps {
  colorKey: string;
}

const ButtonStyles: React.FC<ButtonStylesProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Button Styles</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="start">
          <Wrap>
            {BUTTON_SIZES.map((size) => (
              <Button
                key={size}
                size={size as any}
                colorScheme={colorKey}
              >
                {size.toUpperCase()} Button
              </Button>
            ))}
            {BUTTON_VARIANTS.map((variant) => (
              <Button
                key={variant}
                variant={variant as any}
                colorScheme={colorKey}
                isDisabled={variant === "disabled"}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}{" "}
            <Button leftIcon={<EmailIcon />} colorScheme={colorKey}>
              Left Icon
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme={colorKey}
              variant="outline"
            >
              Right Icon
            </Button>
            <ButtonGroup isAttached variant="outline">
              <Button colorScheme={colorKey}>Button Group</Button>
              <Button colorScheme={colorKey}>Group</Button>
            </ButtonGroup>
            <Button
              isLoading
              loadingText="Loading"
              colorScheme={colorKey}
              variant="solid"
            >
              Loading
            </Button>
          </Wrap>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ButtonStyles;