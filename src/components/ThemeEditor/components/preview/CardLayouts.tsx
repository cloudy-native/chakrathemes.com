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
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { formatRFC7231 } from "date-fns";
import React from "react";
import {
  FaChevronRight,
  FaComment,
  FaHeart,
  FaMapMarkerAlt,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegStar,
  FaRegThumbsUp,
  FaShare,
  FaStar,
} from "react-icons/fa";

interface CardLayoutsProps {
  colorKey: string;
  themeValues: ThemeValues;
}

// Helper function to get a lighter shade of the theme color
const getLightShade = (themeValues: ThemeValues, colorKey: string): string => {
  // Try to get a light shade (50, 100, or 200)
  if (themeValues.colors && themeValues.colors[colorKey]) {
    if (themeValues.colors[colorKey]["50"]) {
      return `${colorKey}.50`;
    } else if (themeValues.colors[colorKey]["100"]) {
      return `${colorKey}.100`;
    } else if (themeValues.colors[colorKey]["200"]) {
      return `${colorKey}.200`;
    }
  }
  return `${colorKey}.100`;
};

// Helper function to get a primary shade of the theme color
const getPrimaryShade = (
  themeValues: ThemeValues,
  colorKey: string
): string => {
  // Try to get a medium shade (500)
  if (themeValues.colors && themeValues.colors[colorKey]) {
    if (themeValues.colors[colorKey]["500"]) {
      return `${colorKey}.500`;
    } else if (themeValues.colors[colorKey]["400"]) {
      return `${colorKey}.400`;
    } else if (themeValues.colors[colorKey]["600"]) {
      return `${colorKey}.600`;
    }
  }
  return `${colorKey}.500`;
};

const CardLayouts: React.FC<CardLayoutsProps> = ({ colorKey, themeValues }) => {
  const lightBgColor = getLightShade(themeValues, colorKey);
  const primaryColor = getPrimaryShade(themeValues, colorKey);
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
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
        borderColor={borderColor}
        backgroundColor={bgColor}
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
              New Arrival
            </Badge>
            <Text fontSize="sm" color={secondaryTextColor} mb={2}>
              {faker.commerce.productDescription()}
            </Text>
            <Text fontWeight="bold" fontSize="xl" color={primaryColor}>
              ${faker.commerce.price()}
            </Text>
          </CardBody>

          <CardFooter pt={0}>
            <ButtonGroup spacing={2}>
              <Button variant="solid" size="sm" colorScheme={colorKey}>
                Add to Cart
              </Button>
              <Button variant="ghost" size="sm" colorScheme={colorKey}>
                Details
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>

      {/* Card Layout 2: Social media post with avatar, content, and interaction buttons */}
      <Card
        variant="outline"
        borderColor={borderColor}
        backgroundColor={bgColor}
      >
        <CardHeader pb={0}>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center">
              <Avatar
                src={faker.image.avatar()}
                size="md"
                borderColor={primaryColor}
                borderWidth="2px"
              />
              <Box>
                <Heading size="sm">{landscape.credit}</Heading>
                <Text fontSize="xs" color={secondaryTextColor}>
                  Posted 2 hours ago
                </Text>
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
                {<Text color={primaryColor}>#{faker.word.adjective()}</Text>}
                {<Text color={primaryColor}>#{faker.word.adjective()}</Text>}
                {<Text color={primaryColor}>#{faker.word.adjective()}</Text>}
                {<Text color={primaryColor}>#{faker.word.adjective()}</Text>}
              </HStack>
            </Box>
          </VStack>
        </CardBody>
        <Image objectFit="cover" src={landscape.url} alt={landscape.alt} />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          borderTop="1px solid"
          borderColor={borderColor}
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
      <Card
        bg={lightBgColor}
        borderRadius={themeValues.radii?.md || "md"}
        overflow="hidden"
        boxShadow={themeValues.shadows?.md || "md"}
      >
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
            <Text fontSize="sm" color={secondaryTextColor}>
              <Icon as={FaRegCalendarAlt} mr={1} />
              May 28, 2023
            </Text>
          </Flex>
          <Heading size="md" mb={2}>
            {faker.company.name()}
          </Heading>
          <Text fontSize="sm" color={textColor} mb={3}>
            {faker.word.words({ count: 25 })}
          </Text>
          <HStack mb={4} color={secondaryTextColor} fontSize="xs">
            <Icon as={FaMapMarkerAlt} />
            <Text>
              {faker.location.city()}, {faker.location.country()}
            </Text>
          </HStack>
        </CardBody>
        <CardFooter
          pt={0}
          borderTop="1px solid"
          borderColor="rgba(0,0,0,0.1)"
          justifyContent="space-between"
        >
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
      <Card
        variant="outline"
        borderColor={borderColor}
        backgroundColor={bgColor}
        overflow="hidden"
      >
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
          <Text fontSize="sm" color={secondaryTextColor} mb={3}>
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
            <Button size="sm" colorScheme={colorKey} variant="outline">
              Order Now
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {/* Card Layout 5: Blog post card */}
      <Card
        variant="outline"
        borderColor={borderColor}
        backgroundColor={bgColor}
        overflow="hidden"
      >
        <Box position="relative">
          <Image
            src={travel.url}
            alt={travel.alt}
            height="180px"
            objectFit="cover"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient={`linear(to-b, transparent 50%, ${bgColor})`}
          />
          <Box position="absolute" bottom={4} left={4} right={4}>
            <Badge colorScheme={colorKey} mb={2}>
              Travel
            </Badge>
            <Heading size="md">
              10 Hidden Gems in {faker.location.country()}
            </Heading>
          </Box>
        </Box>
        <CardBody>
          <Text fontSize="sm" color={secondaryTextColor} mb={3}>
            {faker.word.words({ count: 25 })}
          </Text>
          <Flex alignItems="center" mb={4}>
            <Avatar size="sm" src={faker.image.avatar()} mr={2} />
            <Box>
              <Text fontSize="xs" fontWeight="bold">
                By {faker.name.fullName()}
              </Text>
              <Text fontSize="xs" color={secondaryTextColor}>
                {faker.person.jobTitle()} •{" "}
                {formatRFC7231(faker.date.recent({ days: 30 }))}
              </Text>
            </Box>
            <Spacer />
            <HStack spacing={2}>
              <Icon as={FaRegThumbsUp} />
              <Text fontSize="xs">245</Text>
            </HStack>
          </Flex>
          <Link color={`${colorKey}.500`} fontWeight="medium" fontSize="sm">
            Read Full Article &rarr;
          </Link>
        </CardBody>
      </Card>

      {/* Card Layout 6: Profile/Contact card */}
      <Card variant="filled" bg={lightBgColor} overflow="hidden">
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
            border="4px solid"
            borderColor={bgColor}
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
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={`${colorKey}.500`}
            mb={1}
          >
            {faker.person.jobTitle()}
          </Text>
          <Text fontSize="sm" color={secondaryTextColor} mb={3}>
            {faker.location.city()}, {faker.location.state()}
          </Text>
          <Text fontSize="sm" mb={4} maxW="280px" mx="auto">
            {faker.person.bio()}
          </Text>
          <HStack justify="center" spacing={4} mb={3}>
            <VStack alignItems="center">
              <Text fontWeight="bold">24</Text>
              <Text fontSize="xs" color={secondaryTextColor}>
                Projects
              </Text>
            </VStack>
            <Divider orientation="vertical" height="40px" />
            <VStack alignItems="center">
              <Text fontWeight="bold">12k</Text>
              <Text fontSize="xs" color={secondaryTextColor}>
                Followers
              </Text>
            </VStack>
            <Divider orientation="vertical" height="40px" />
            <VStack alignItems="center">
              <Text fontWeight="bold">8</Text>
              <Text fontSize="xs" color={secondaryTextColor}>
                Years Exp.
              </Text>
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
