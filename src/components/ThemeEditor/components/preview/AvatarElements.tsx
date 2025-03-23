import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  AvatarBadge,
  AvatarGroup
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

interface AvatarElementsProps {
  colorKey: string;
}

const AvatarElements: React.FC<AvatarElementsProps> = ({ colorKey }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">Avatars</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="flex-start" spacing={4} width="100%">
          <Text fontSize="sm">Avatar Sizes</Text>
          <HStack spacing={4}>
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <Avatar
                key={size}
                size={size as any}
                name={faker.person.fullName()}
                src={faker.image.avatar()}
                bg={`${colorKey}.500`}
              />
            ))}
          </HStack>

          <Text fontSize="sm">With Badge</Text>
          <HStack spacing={4}>
            {[
              `${colorKey}.200`,
              "green.500",
              "red.500",
            ].map((badgeBg, index) => (
              <Avatar
                key={index}
                bg={`${colorKey}.500`}
                name={faker.person.fullName()}
                src={faker.image.avatar()}
              >
                <AvatarBadge boxSize="1em" bg={badgeBg} />
              </Avatar>
            ))}
          </HStack>

          <Text fontSize="sm">Avatar Group</Text>
          <AvatarGroup size="md" max={3}>
            {[200, 400, 500, 600, 700].map((shade, index) => (
              <Avatar
                key={index}
                bg={`${colorKey}.${shade}`}
                name={faker.person.fullName()}
                src={faker.image.avatar()}
              />
            ))}
          </AvatarGroup>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AvatarElements;