import { ThemeValues } from "@/types";
import { unsplashCollections } from "@/utils/unsplashCollections";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React from "react";
import {
  FaChevronRight,
  FaComment,
  FaHeart,
  FaMapMarkerAlt,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegStar,
  FaShare,
  FaStar,
} from "react-icons/fa";

interface CardLayoutsProps {
  colorKey: string;
  themeValues: ThemeValues;
}

const CardLayouts: React.FC<CardLayoutsProps> = ({ colorKey, themeValues }) => {
  const sofa = faker.helpers.arrayElement(unsplashCollections.sofas.images);
  const landscape = faker.helpers.arrayElement(
    unsplashCollections.landscape.images
  );
  const conference = faker.helpers.arrayElement(
    unsplashCollections.conference.images
  );
  const food = faker.helpers.arrayElement(unsplashCollections.food.images);
  const travel = faker.helpers.arrayElement(unsplashCollections.travel.images);

  return (
    <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={8}>
      {/* Card Layout 1: Horizontal product card with image, details and action buttons */}
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={sofa.url}
          alt="Product image"
        />

        <Stack flex={1}>
          <CardBody>
            <Heading size="md" mb={2}>
              {sofa.alt}
            </Heading>
            <Badge colorScheme={colorKey} mb={2}>
              {faker.company.buzzAdjective()}
            </Badge>
            <Text fontSize="sm" mb={2}>
              {faker.commerce.productDescription()}
            </Text>
            <Text fontWeight="bold" fontSize="xl">
              ${faker.commerce.price()}
            </Text>
          </CardBody>

          <CardFooter pt={0}>
            <ButtonGroup spacing={2}>
              <Button size="sm" colorScheme={colorKey}>
                Add to Cart
              </Button>
              <Button size="sm">Details</Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>

      {/* Card Layout 2: Social media post with avatar, content, and interaction buttons */}
      <Card variant="outline">
        <CardHeader pb={0}>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center">
              <Avatar src={faker.image.avatar()} size="md" borderWidth="2px" />
              <Box>
                <Heading size="sm">{landscape.credit}</Heading>
                <Text fontSize="xs">Posted 2 hours ago</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme={colorKey}
              aria-label="Options"
              icon={<FaRegBookmark />}
              size="sm"
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <VStack>
            <Text>{faker.word.words({ count: 25 })}</Text>
            <Box>
              <HStack>
                {<Text>#{faker.word.adjective()}</Text>}
                {<Text>#{faker.word.adjective()}</Text>}
                {<Text>#{faker.word.adjective()}</Text>}
                {<Text>#{faker.word.adjective()}</Text>}
              </HStack>
            </Box>
          </VStack>
        </CardBody>
        <Image objectFit="cover" src={landscape.url} alt={landscape.alt} />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          borderTop="1px solid"
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FaHeart />}
            colorScheme={colorKey}
            size="sm"
          >
            Like
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FaComment />}
            colorScheme={colorKey}
            size="sm"
          >
            Comment
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<FaShare />}
            colorScheme={colorKey}
            size="sm"
          >
            Share
          </Button>
        </CardFooter>
      </Card>

      {/* Card Layout 3: Event/Booking card with background color */}
      <Card overflow="hidden">
        <Image
          src={conference.url}
          alt="Event Image"
          height="140px"
          objectFit="cover"
        />
        <CardBody pt={4}>
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Badge colorScheme={colorKey} variant="solid">
              {faker.company.buzzAdjective()}
            </Badge>
            <Text fontSize="sm">
              <Icon as={FaRegCalendarAlt} mr={1} />
              May 28, 2023
            </Text>
          </Flex>
          <Heading size="md" mb={2}>
            {faker.company.name()}
          </Heading>
          <Text fontSize="sm" mb={3}>
            {faker.word.words({ count: 25 })}
          </Text>
          <HStack mb={4} fontSize="xs">
            <Icon as={FaMapMarkerAlt} />
            <Text>
              {faker.location.city()}, {faker.location.country()}
            </Text>
          </HStack>
        </CardBody>
        <CardFooter pt={0} justifyContent="space-between">
          <Text fontWeight="bold" fontSize="lg">
            ${faker.commerce.price()}
          </Text>
          <Button
            colorScheme={colorKey}
            size="sm"
            rightIcon={<FaChevronRight />}
          >
            Register Now
          </Button>
        </CardFooter>
      </Card>

      {/* Card Layout 4: Restaurant/Recipe card */}
      <Card variant="outline" overflow="hidden">
        <Image src={food.url} alt={food.alt} height="160px" objectFit="cover" />
        <CardBody>
          <Flex justify="space-between" align="center" mb={2}>
            <Heading size="md">{faker.food.dish()}</Heading>
            <HStack>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Icon
                  key={i}
                  as={i < 4 ? FaStar : FaRegStar}
                  color={i < 4 ? `${colorKey}.500` : "gray.300"}
                  fontSize="sm"
                />
              ))}
            </HStack>
          </Flex>
          <Text fontSize="sm" mb={3}>
            {faker.food.description()}
          </Text>
          <Wrap spacing={2} mb={3}>
            <WrapItem>
              <Badge colorScheme="green" variant="subtle">
                {faker.food.ethnicCategory()}
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="purple" variant="subtle">
                {faker.food.spice()}
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="orange" variant="subtle">
                {faker.food.ingredient()}
              </Badge>
            </WrapItem>
          </Wrap>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize="xl">
              ${faker.commerce.price({ min: 5, max: 10 })}
            </Text>
            <Button size="sm" colorScheme={colorKey}>
              Order Now
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {/* Card Layout 6: Profile/Contact card */}
      <Card variant="filled" overflow="hidden">
        <CardHeader
          pb={0}
          textAlign="center"
          position="relative"
          bgGradient={`linear(to-r, ${colorKey}.400, ${colorKey}.600)`}
          height="100px"
        >
          <Avatar
            src={faker.image.avatar()}
            size="xl"
            position="absolute"
            bottom="-40px"
            left="50%"
            transform="translateX(-50%)"
          />
        </CardHeader>
        <CardBody pt={12} textAlign="center">
          <Heading size="md" mb={1}>
            {faker.name.fullName()}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            {faker.person.jobTitle()}
          </Text>
          <Text fontSize="sm" mb={3}>
            {faker.location.city()}, {faker.location.state()}
          </Text>
          <Text fontSize="sm" mb={4} maxW="280px" mx="auto">
            {faker.person.bio()}
          </Text>
          <HStack justify="center" spacing={4} mb={3}>
            <VStack alignItems="center">
              <Text fontWeight="bold">24</Text>
              <Text fontSize="xs">Projects</Text>
            </VStack>
            <Divider orientation="vertical" height="40px" />
            <VStack alignItems="center">
              <Text fontWeight="bold">12k</Text>
              <Text fontSize="xs">Followers</Text>
            </VStack>
            <Divider orientation="vertical" height="40px" />
            <VStack alignItems="center">
              <Text fontWeight="bold">8</Text>
              <Text fontSize="xs">Years Exp.</Text>
            </VStack>
          </HStack>
        </CardBody>
        <CardFooter pt={0} justifyContent="center">
          <ButtonGroup spacing={4}>
            <Button colorScheme={colorKey} size="sm">
              Connect
            </Button>
            <Button variant="outline" colorScheme={colorKey} size="sm">
              View Portfolio
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
};

export default CardLayouts;
