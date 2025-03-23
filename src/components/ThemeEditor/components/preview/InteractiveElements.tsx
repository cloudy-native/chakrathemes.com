import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

interface InteractiveElementsProps {
  colorKey: string;
}

const InteractiveElements: React.FC<InteractiveElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Interactive Elements</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4}>
          <HStack spacing={4}>
            <Tooltip hasArrow label="Tooltip text">
              <Button size="sm" colorScheme={colorKey}>
                Hover me
              </Button>
            </Tooltip>
          </HStack>
          <HStack spacing={4}>
            <Menu>
              <MenuButton as={Button} colorScheme={colorKey} size="sm">
                <Icon as={HamburgerIcon} />
              </MenuButton>
              <MenuList>
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <HStack spacing={4}>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme={colorKey} size="sm">
                  Popover
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Header</PopoverHeader>
                <PopoverBody>Popover content goes here</PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default InteractiveElements;