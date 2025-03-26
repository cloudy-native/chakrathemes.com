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
    <Card>
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
              <WrapItem>
                <Button key={size} size={size as any} colorScheme={colorKey}>
                  {size.toUpperCase()} Button
                </Button>
              </WrapItem>
            ))}
            {BUTTON_VARIANTS.map(variant => (
              <WrapItem>
                <Button
                  key={variant}
                  variant={variant as any}
                  colorScheme={colorKey}
                  isDisabled={variant === "disabled"}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              </WrapItem>
            ))}
            <WrapItem>
              <Button leftIcon={<MailIcon />} colorScheme={colorKey}>
                Left Icon
              </Button>
            </WrapItem>
            <WrapItem>
              <Button rightIcon={<ArrowRight />} colorScheme={colorKey} variant="outline">
                Right Icon
              </Button>
            </WrapItem>
            <WrapItem>
              <ButtonGroup isAttached variant="outline">
                <Button colorScheme={colorKey}>Button Group</Button>
                <Button colorScheme={colorKey}>Group</Button>
              </ButtonGroup>
            </WrapItem>
            <WrapItem>
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
                <WrapItem>
                  <Tag colorScheme={colorKey} size="sm">
                    Small
                  </Tag>
                </WrapItem>
                <WrapItem>
                  <Tag colorScheme={colorKey} size="md">
                    Medium
                  </Tag>
                </WrapItem>
                <WrapItem>
                  <Tag colorScheme={colorKey} size="lg">
                    Large
                  </Tag>
                </WrapItem>
              </Wrap>
              <Wrap spacing={2}>
                <WrapItem>
                  <Tag colorScheme={colorKey} variant="solid">
                    Solid
                  </Tag>
                </WrapItem>
                <WrapItem>
                  <Tag colorScheme={colorKey} variant="subtle">
                    Subtle
                  </Tag>
                </WrapItem>
                <WrapItem>
                  <Tag colorScheme={colorKey} variant="outline">
                    Outline
                  </Tag>
                </WrapItem>
              </Wrap>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ButtonStyles;
