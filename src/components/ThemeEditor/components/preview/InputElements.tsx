import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  PinInput,
  PinInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Input,
  Divider,
  Text
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface InputElementsProps {
  colorKey: string;
}

const InputElements: React.FC<InputElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Input Elements</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4} width="100%">
          {/* Text Inputs */}
          <Text fontWeight="medium" fontSize="sm">Text Inputs</Text>
          <FormControl>
            <FormLabel>Regular Input</FormLabel>
            <Input placeholder="Focus me" focusBorderColor={`${colorKey}.500`} />
          </FormControl>
          
          <Divider my={2} />
          
          {/* Numeric Inputs */}
          <Text fontWeight="medium" fontSize="sm">Numeric Inputs</Text>
          <FormControl>
            <FormLabel>Number Input</FormLabel>
            <NumberInput focusBorderColor={`${colorKey}.500`} max={10} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          
          <FormControl>
            <FormLabel>Pin Input</FormLabel>
            <HStack>
              <PinInput focusBorderColor={`${colorKey}.500`}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </FormControl>
          
          <Divider my={2} />
          
          {/* Range Input */}
          <Text fontWeight="medium" fontSize="sm">Range Input</Text>
          <FormControl>
            <FormLabel>Slider</FormLabel>
            <Slider
              colorScheme={colorKey}
              defaultValue={30}
              min={0}
              max={100}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color={`${colorKey}.500`} as={ArrowForwardIcon} />
              </SliderThumb>
            </Slider>
          </FormControl>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default InputElements;