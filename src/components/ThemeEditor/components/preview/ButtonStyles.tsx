import { ArrowRight, MailIcon } from "lucide-react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

// Button variants available in Chakra UI
const BUTTON_VARIANTS = ["solid", "outline", "ghost", "link", "disabled"];
const BUTTON_SIZES = ["lg", "md", "sm", "xs"];

interface ButtonStylesProps {
  colorKey: string;
}

const ButtonStyles: React.FC<ButtonStylesProps> = ({ colorKey }) => {
  return (
    <Card key={colorKey}>
      <CardHeader>
        <Heading size="sm">Button & Tag Styles</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="start" width="100%">
          {/* Buttons */}
          <Text fontWeight="medium" fontSize="sm">
            Buttons
          </Text>
          <Wrap spacing={2}>
            {BUTTON_SIZES.map(size => (
              <WrapItem key={size}>
                <Button key={size} size={size as "xs" | "sm" | "md" | "lg"} colorScheme={colorKey}>
                  {size.toUpperCase()} Button
                </Button>
              </WrapItem>
            ))}
            {BUTTON_VARIANTS.map(variant => (
              <WrapItem key={variant}>
                <Button
                  key={variant}
                  variant={variant as "solid" | "outline" | "ghost" | "link"}
                  colorScheme={colorKey}
                  isDisabled={variant === "disabled"}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              </WrapItem>
            ))}
            <WrapItem key="left-icon">
              <Button leftIcon={<MailIcon />} colorScheme={colorKey}>
                Left Icon
              </Button>
            </WrapItem>
            <WrapItem key="right-icon">
              <Button rightIcon={<ArrowRight />} colorScheme={colorKey} variant="outline">
                Right Icon
              </Button>
            </WrapItem>
            <WrapItem key="button-group">
              <ButtonGroup isAttached variant="outline">
                <Button colorScheme={colorKey}>Button Group</Button>
                <Button colorScheme={colorKey}>Group</Button>
              </ButtonGroup>
            </WrapItem>
            <WrapItem key="loading">
              <Button isLoading loadingText="Loading" colorScheme={colorKey} variant="solid">
                Loading
              </Button>
            </WrapItem>
          </Wrap>

          <Divider my={2} />

          {/* Tags */}
          <Text fontWeight="medium" fontSize="sm">
            Tags
          </Text>
          <Box width="100%">
            <VStack align="flex-start" spacing={4} width="100%">
              <Wrap spacing={2}>
                {["sm", "md", "lg"].map(size => (
                  <WrapItem key={size}>
                    <Tag colorScheme={colorKey} size={size as "sm" | "md" | "lg"}>
                      {size.toUpperCase()}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
              <Wrap spacing={2}>
                {["solid", "subtle", "outline"].map(variant => (
                  <WrapItem key={variant}>
                    <Tag colorScheme={colorKey} variant={variant as "solid" | "subtle" | "outline"}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ButtonStyles;
