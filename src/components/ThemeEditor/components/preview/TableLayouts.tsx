import { ThemeValues } from "@/types";
import {
  CheckIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React from "react";

interface TableLayoutsProps {
  colorKey: string;
  themeValues: ThemeValues;
}

const TableLayouts: React.FC<TableLayoutsProps> = ({
  colorKey,
  themeValues,
}) => {
  // Helper functions for getting theme colors
  const getColor = (shade: string): string => {
    return `${colorKey}.${shade}`;
  };

  // Helper for getting a light shade of the theme color
  const getLightShade = (): string => {
    if (
      themeValues.colors &&
      themeValues.colors[colorKey] &&
      themeValues.colors[colorKey]["50"]
    ) {
      return `${colorKey}.50`;
    }
    return `${colorKey}.100`;
  };

  // Helper for getting a medium shade of the theme color
  const getMediumShade = (): string => {
    if (
      themeValues.colors &&
      themeValues.colors[colorKey] &&
      themeValues.colors[colorKey]["200"]
    ) {
      return `${colorKey}.200`;
    }
    return `${colorKey}.300`;
  };

  // UI colors based on color mode
  const bgColor = useColorModeValue("white", "gray.800");
  const altBgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBgColor = useColorModeValue(getLightShade(), "gray.700");
  const hoverBgColor = useColorModeValue(getLightShade(), "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
    avatarUrl: string;
  };

  function randomUser(id: number) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;

    return {
      id,
      name,
      email: faker.internet.email({ firstName, lastName }),
      role: faker.helpers.arrayElement(["Administrator", "Editor", "Viewer"]),
      status: faker.helpers.arrayElement(["Active", "Inactive"]),
      lastActive: faker.date.recent({ days: 10 }).toLocaleDateString(),
      avatarUrl: faker.image.avatar(),
    };
  }

  // Sample data for tables
  // TODO: Fill table with function
  const users: User[] = [
    randomUser(1),
    randomUser(2),
    randomUser(3),
    randomUser(4),
    randomUser(5),
    randomUser(6),
  ];

  type Product = {
    id: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    rating: number;
  };

  function randomProduct() {
    return {
      id: `PRD-${faker.number.int({ min: 1000, max: 9999 })}`,
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: faker.commerce.price(),
      stock: faker.number.int({ min: 0, max: 100 }),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    };
  }

  // TODO: Fill array of length with function
  //
  const products: Product[] = [
    randomProduct(),
    randomProduct(),
    randomProduct(),
    randomProduct(),
    randomProduct(),
  ];

  type File = {
    name: string;
    type: string;
    size: string;
    modified: string;
    status: string;
  };

  function randomFile() {
    return {
      name: faker.system.fileName(),
      type: faker.helpers.arrayElement([
        "PDF",
        "Spreadsheet",
        "Document",
        "Presentation",
      ]),
      size:
        faker.number.int({ min: 1, max: 1000 }).toString() +
        " " +
        faker.helpers.arrayElement(["KB", "MB", "GB"]),
      modified: faker.date.recent({ days: 10 }).toLocaleDateString(),
      status: faker.helpers.arrayElement(["Public", "Shared", "Private"]),
    };
  }

  const files: File[] = [
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
  ];

  const files2: File[] = [
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
    randomFile(),
  ];

  return (
    <SimpleGrid columns={{ base: 1 }} spacing={10} mt={4}>
      {/* Table 1: Basic Table with Striped Rows */}
      <Box>
        <Text fontSize="lg" fontWeight="medium" mb={3}>
          Basic Table with Striped Rows
        </Text>
        <TableContainer
          border="1px solid"
          borderColor={borderColor}
          borderRadius={themeValues.radii?.md || "md"}
          boxShadow={themeValues.shadows?.sm || "sm"}
        >
          <Table variant="striped" colorScheme={colorKey}>
            <TableCaption>Product Inventory Summary</TableCaption>
            <Thead bg={headerBgColor}>
              <Tr>
                <Th>Product ID</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th isNumeric>Rating</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td fontFamily="mono">{product.id}</Td>
                  <Td fontWeight="medium">{product.name}</Td>
                  <Td>
                    <Badge colorScheme={colorKey}>{product.category}</Badge>
                  </Td>
                  <Td isNumeric>{product.price}</Td>
                  <Td isNumeric>
                    <Text
                      color={product.stock < 10 ? "red.500" : "green.500"}
                      fontWeight="medium"
                    >
                      {product.stock}
                    </Text>
                  </Td>
                  <Td isNumeric>{product.rating}/5.0</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot bg={headerBgColor}>
              <Tr>
                <Th colSpan={3}>Total Products: {products.length}</Th>
                <Th isNumeric>Avg: $176.24</Th>
                <Th isNumeric>Total: 103</Th>
                <Th isNumeric>Avg: 4.6</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>

      {/* Table 2: Advanced User Management Table */}
      <Box>
        <Text fontSize="lg" fontWeight="medium" mb={3}>
          User Management Table with Actions
        </Text>
        <TableContainer
          border="1px solid"
          borderColor={borderColor}
          borderRadius={themeValues.radii?.md || "md"}
          boxShadow={themeValues.shadows?.sm || "sm"}
          bg={bgColor}
        >
          <Table size="md">
            <Thead bg={headerBgColor} position="sticky" top={0} zIndex={1}>
              <Tr>
                <Th>
                  <Checkbox colorScheme={colorKey} />
                </Th>
                <Th>
                  <HStack>
                    <Text>User</Text>
                    <TriangleDownIcon boxSize={3} color="gray.500" />
                  </HStack>
                </Th>
                <Th>
                  <HStack>
                    <Text>Role</Text>
                    <TriangleDownIcon boxSize={3} color="gray.500" />
                  </HStack>
                </Th>
                <Th>
                  <HStack>
                    <Text>Status</Text>
                    <TriangleUpIcon boxSize={3} color="gray.500" />
                  </HStack>
                </Th>
                <Th>Last Active</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr
                  key={user.id}
                  _hover={{ bg: hoverBgColor }}
                  transition="background-color 0.2s"
                >
                  <Td>
                    <Checkbox colorScheme={colorKey} />
                  </Td>
                  <Td>
                    <HStack spacing={3}>
                      <Avatar size="sm" name={user.name} src={user.avatarUrl} />
                      <Box>
                        <Text fontWeight="medium">{user.name}</Text>
                        <Text fontSize="xs" color={subTextColor}>
                          {user.email}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        user.role === "Administrator"
                          ? "purple"
                          : user.role === "Editor"
                            ? "blue"
                            : "gray"
                      }
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <Box
                        w={2}
                        h={2}
                        borderRadius="full"
                        bg={user.status === "Active" ? "green.500" : "red.500"}
                      />
                      <Text>{user.status}</Text>
                    </HStack>
                  </Td>
                  <Td fontSize="sm" color={subTextColor}>
                    {user.lastActive}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Tooltip label="Edit user" hasArrow>
                        <IconButton
                          aria-label="Edit user"
                          icon={<EditIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme={colorKey}
                        />
                      </Tooltip>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="More options"
                          icon={<HamburgerIcon />}
                          size="sm"
                          variant="ghost"
                        />
                        <MenuList>
                          <MenuItem icon={<ViewIcon />}>View details</MenuItem>
                          <MenuItem icon={<CheckIcon />}>
                            {user.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </MenuItem>
                          <MenuItem icon={<DeleteIcon />} color="red.500">
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <HStack spacing={4} mt={3} justify="flex-end">
          <Button
            size="sm"
            colorScheme={colorKey}
            leftIcon={<CheckIcon />}
            variant="outline"
          >
            Bulk Edit
          </Button>
          <Button size="sm" colorScheme={colorKey}>
            Add User
          </Button>
        </HStack>
      </Box>

      {/* Table 3: Compact File Browser Table */}
      <Box>
        <Text fontSize="lg" fontWeight="medium" mb={3}>
          Compact File Browser Table
        </Text>
        <TableContainer
          border="1px solid"
          borderColor={borderColor}
          borderRadius={themeValues.radii?.md || "md"}
          bg={bgColor}
        >
          <Box
            py={3}
            px={4}
            borderBottom="1px solid"
            borderColor={borderColor}
            bg={headerBgColor}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="medium">Files (4)</Text>
              <HStack>
                <Button size="xs" variant="ghost">
                  Select All
                </Button>
                <Button size="xs" variant="ghost" colorScheme="red">
                  Clear
                </Button>
              </HStack>
            </Flex>
          </Box>
          <Table size="sm" variant="simple">
            <Thead bg={altBgColor}>
              <Tr>
                <Th width="40%">Name</Th>
                <Th width="15%">Type</Th>
                <Th width="15%">Size</Th>
                <Th width="20%">Modified</Th>
                <Th width="10%">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {files.map((file, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: hoverBgColor }}
                  transition="background-color 0.2s"
                >
                  <Td>
                    <HStack>
                      <Icon
                        as={
                          file.type === "PDF"
                            ? DownloadIcon
                            : file.type === "Spreadsheet"
                              ? ViewIcon
                              : file.type === "Document"
                                ? ViewIcon
                                : DownloadIcon
                        }
                        color={getColor("500")}
                      />
                      <Link color={getColor("500")} fontWeight="medium">
                        {file.name}
                      </Link>
                      {file.status !== "Private" && (
                        <Badge
                          size="sm"
                          colorScheme={
                            file.status === "Public"
                              ? "green"
                              : file.status === "Shared"
                                ? "blue"
                                : "gray"
                          }
                          variant="outline"
                        >
                          {file.status}
                        </Badge>
                      )}
                    </HStack>
                  </Td>
                  <Td>{file.type}</Td>
                  <Td>{file.size}</Td>
                  <Td fontSize="xs">{file.modified}</Td>
                  <Td>
                    <HStack spacing={1}>
                      <IconButton
                        aria-label="Download file"
                        icon={<DownloadIcon />}
                        size="xs"
                        variant="ghost"
                        colorScheme={colorKey}
                      />
                      <IconButton
                        aria-label="View file"
                        icon={<ExternalLinkIcon />}
                        size="xs"
                        variant="ghost"
                        colorScheme={colorKey}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box
            py={2}
            px={4}
            borderTop="1px solid"
            borderColor={borderColor}
            bg={altBgColor}
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="xs" color={subTextColor}>
                Showing 4 of 4 files
              </Text>
              <Button size="xs" colorScheme={colorKey} variant="outline">
                Upload New
              </Button>
            </Flex>
          </Box>
        </TableContainer>
      </Box>
    </SimpleGrid>
  );
};

export default TableLayouts;
