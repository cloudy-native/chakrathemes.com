import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  Divider,
  ButtonGroup,
  Flex,
  Badge,
  Avatar,
  Link,
  Icon,
  HStack,
  VStack,
  SimpleGrid,
  Wrap,
  WrapItem,
  Spacer,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ThemeValues } from "@/types";
import {
  FaRegBookmark,
  FaHeart,
  FaComment,
  FaShare,
  FaChevronRight,
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaRegThumbsUp,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { faker } from "@faker-js/faker";
import { unsplashCollections } from "@/utils/unsplashCollections";

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

// Sample placeholder images
const PLACEHOLDER_IMAGES = {
  landscape:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  food: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1536&q=80",
  person:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  event:
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  travel:
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  nature:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80",
  avatarM:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  avatarF:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
          src={PLACEHOLDER_IMAGES.event}
          alt="Event Image"
          height="140px"
          objectFit="cover"
        />
        <CardBody pt={4}>
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Badge colorScheme={colorKey} variant="solid">
              WORKSHOP
            </Badge>
            <Text fontSize="sm" color={secondaryTextColor}>
              <Icon as={FaRegCalendarAlt} mr={1} />
              May 28, 2023
            </Text>
          </Flex>
          <Heading size="md" mb={2}>
            Design Thinking Workshop
          </Heading>
          <Text fontSize="sm" color={textColor} mb={3}>
            Learn design thinking methodology and apply it to solve real-world
            problems.
          </Text>
          <HStack mb={4} color={secondaryTextColor} fontSize="xs">
            <Icon as={FaMapMarkerAlt} />
            <Text>Creative Hub, San Francisco</Text>
          </HStack>
        </CardBody>
        <CardFooter
          pt={0}
          borderTop="1px solid"
          borderColor="rgba(0,0,0,0.1)"
          justifyContent="space-between"
        >
          <Text fontWeight="bold" fontSize="lg">
            $149.00
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
        <Image
          src={PLACEHOLDER_IMAGES.food}
          alt="Food Image"
          height="160px"
          objectFit="cover"
        />
        <CardBody>
          <Flex justify="space-between" align="center" mb={2}>
            <Heading size="md">Avocado Salad Bowl</Heading>
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
            A fresh and nutritious salad bowl with avocado, cherry tomatoes, and
            our special dressing.
          </Text>
          <Wrap spacing={2} mb={3}>
            <WrapItem>
              <Badge colorScheme="green" variant="subtle">
                Vegan
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="purple" variant="subtle">
                Gluten-free
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="orange" variant="subtle">
                High Protein
              </Badge>
            </WrapItem>
          </Wrap>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize="xl">
              $12.99
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
            src={PLACEHOLDER_IMAGES.travel}
            alt="Travel Image"
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
            <Heading
              size="md"
              color="white"
              textShadow="0px 2px 4px rgba(0,0,0,0.4)"
            >
              10 Hidden Gems in Southeast Asia
            </Heading>
          </Box>
        </Box>
        <CardBody>
          <Text fontSize="sm" color={secondaryTextColor} mb={3}>
            Discover these lesser-known destinations that offer authentic
            experiences away from the tourist crowds.
          </Text>
          <Flex alignItems="center" mb={4}>
            <Avatar size="sm" src={PLACEHOLDER_IMAGES.avatarM} mr={2} />
            <Box>
              <Text fontSize="xs" fontWeight="bold">
                By Michael Rodriguez
              </Text>
              <Text fontSize="xs" color={secondaryTextColor}>
                Travel Writer • April 15, 2023
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
            src={PLACEHOLDER_IMAGES.avatarM}
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
            Robert Chen
          </Heading>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={`${colorKey}.500`}
            mb={1}
          >
            UX/UI Designer
          </Text>
          <Text fontSize="sm" color={secondaryTextColor} mb={3}>
            San Francisco, CA
          </Text>
          <Text fontSize="sm" mb={4} maxW="280px" mx="auto">
            Passionate about creating intuitive and beautiful user experiences
            that solve real problems.
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
