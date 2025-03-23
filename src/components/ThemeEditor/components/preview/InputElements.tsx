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
  Input
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
          <FormControl>
            <FormLabel>Regular Input</FormLabel>
            <Input placeholder="Focus me" focusBorderColor={`${colorKey}.500`} />
          </FormControl>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default InputElements;