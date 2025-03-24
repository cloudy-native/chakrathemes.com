import { ThemeValues } from "@/types";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  DownloadIcon,
  EditIcon,
  InfoIcon,
  RepeatIcon,
  SettingsIcon,
  ViewIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Progress,
  SimpleGrid,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import React from "react";
import {
  FaBolt,
  FaChartArea,
  FaChartLine,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaFilter,
  FaHistory,
  FaList,
  FaRadiation,
  FaShieldAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaThermometerFull,
  FaUsersCog,
} from "react-icons/fa";

interface NuclearDashboardProps {
  colorKey: string;
  themeValues: ThemeValues;
}

const NuclearDashboard: React.FC<NuclearDashboardProps> = ({ colorKey, themeValues }) => {
  // Get the current time
  const currentDate = new Date();
  const timeString = currentDate.toLocaleTimeString();
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate some random data for the reactor stats
  const reactorPower = faker.number.float({ min: 93.4, max: 98.7, fractionDigits: 1 });
  const coolantTemp = faker.number.float({ min: 297.0, max: 302.0, fractionDigits: 1 });
  const pressurePsi = faker.number.float({ min: 2200, max: 2250, fractionDigits: 0 });
  const radiationLevel = faker.number.float({ min: 0.05, max: 0.12, fractionDigits: 2 });
  const turbineLoad = faker.number.float({ min: 92.0, max: 99.5, fractionDigits: 1 });
  const gridOutput = faker.number.float({ min: 1020, max: 1090, fractionDigits: 0 });

  // Power generation stats
  const dailyOutput = faker.number.float({ min: 23500, max: 24500, fractionDigits: 0 });
  const dailyDelta = faker.number.float({ min: -2, max: 3, fractionDigits: 1 });
  const monthlyOutput = faker.number.float({ min: 700000, max: 750000, fractionDigits: 0 });
  const monthlyDelta = faker.number.float({ min: 1, max: 4, fractionDigits: 1 });
  const yearlyOutput = faker.number.float({ min: 8200000, max: 8900000, fractionDigits: 0 });
  const yearlyDelta = faker.number.float({ min: 2, max: 6, fractionDigits: 1 });

  // Generate some alarms and notifications
  const alertLevels = ["critical", "warning", "info", "success"];
  const alertTypes = ["Reactor", "Cooling", "Electrical", "Security", "Maintenance"];

  const generateAlert = () => {
    const level = faker.helpers.arrayElement(alertLevels);
    const type = faker.helpers.arrayElement(alertTypes);
    const time = faker.date.recent({ days: 1 }).toLocaleTimeString();
    const description = faker.word.words(7);

    return { level, type, time, description };
  };

  const alerts = Array.from({ length: 6 }, generateAlert).sort((a, b) => {
    const levelOrder = { critical: 0, warning: 1, info: 2, success: 3 };
    return levelOrder[a.level] - levelOrder[b.level];
  });

  // Generate maintenance tasks
  const maintenanceTasks = [
    {
      id: "MT-1",
      task: "Cooling System Inspection",
      assignee: "Engineering Team A",
      status: "In Progress",
      due: "03/26/2025",
    },
    {
      id: "MT-2",
      task: "Containment Valve Replacement",
      assignee: "Maintenance Team C",
      status: "Scheduled",
      due: "03/29/2025",
    },
    {
      id: "MT-3",
      task: "Radiation Monitor Calibration",
      assignee: "Safety Team B",
      status: "Completed",
      due: "03/23/2025",
    },
    {
      id: "MT-4",
      task: "Control Rod Mechanism Test",
      assignee: "Engineering Team D",
      status: "Pending Approval",
      due: "04/02/2025",
    },
    {
      id: "MT-5",
      task: "Emergency Generator Testing",
      assignee: "Electrical Team A",
      status: "Scheduled",
      due: "03/31/2025",
    },
  ];

  // Shift schedule
  const shifts = [
    { name: "Morning", time: "6:00 - 14:00", supervisor: "Sarah Chen", staff: 12, color: "green" },
    {
      name: "Afternoon",
      time: "14:00 - 22:00",
      supervisor: "Michael Rodriguez",
      staff: 11,
      color: "blue",
    },
    { name: "Night", time: "22:00 - 6:00", supervisor: "William Park", staff: 8, color: "purple" },
  ];

  // Safety metrics
  const safetyMetrics = [
    { metric: "Days Since Last Incident", value: 312, change: "up", delta: 1 },
    { metric: "Safety Compliance", value: "97.2%", change: "up", delta: 0.4 },
    { metric: "Open Safety Issues", value: 3, change: "down", delta: 2 },
    { metric: "Upcoming Drills", value: 2, change: "same", delta: 0 },
  ];

  // For layout and UI elements
  const bgColor = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue(`${colorKey}.500`, `${colorKey}.500`);
  const headerColor = useColorModeValue("white", "white");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  // Active alarms counter - let's have a couple active
  const activeAlerts = faker.number.int({ min: 1, max: 3 });

  return (
    <Box>
      {/* Dashboard Header */}
      <Flex
        bg={headerBg}
        color={headerColor}
        p={4}
        alignItems="center"
        justifyContent="space-between"
        mb={6}
        borderRadius="md"
        boxShadow="md"
      >
        <HStack spacing={4}>
          <Icon as={FaRadiation} boxSize={8} />
          <Box>
            <Heading size="md">Nuclear Plant Control Dashboard</Heading>
            <Text fontSize="sm">Unit #1 - Reactor Operations Overview</Text>
          </Box>
        </HStack>

        <HStack spacing={6}>
          <Box textAlign="right">
            <Text fontWeight="bold">{timeString}</Text>
            <Text fontSize="sm">{dateString}</Text>
          </Box>

          <Divider orientation="vertical" height="40px" />

          <Box>
            <Flex alignItems="center" mb={1}>
              <Text fontWeight="bold" mr={2}>
                Status:
              </Text>
              <Badge colorScheme="green" variant="solid" borderRadius="full" px={2}>
                OPERATIONAL
              </Badge>
            </Flex>
            <HStack>
              <Badge colorScheme="red" variant="solid">
                {activeAlerts} Active Alerts
              </Badge>
              <Badge colorScheme="blue">
                Shift:{" "}
                {currentDate.getHours() >= 6 && currentDate.getHours() < 14
                  ? "Morning"
                  : currentDate.getHours() >= 14 && currentDate.getHours() < 22
                    ? "Afternoon"
                    : "Night"}
              </Badge>
            </HStack>
          </Box>

          <HStack>
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              colorScheme={colorKey}
              variant="ghost"
              position="relative"
            >
              {activeAlerts > 0 && (
                <Box
                  position="absolute"
                  top="-1px"
                  right="-1px"
                  px={1.5}
                  py={0.5}
                  fontSize="xs"
                  fontWeight="bold"
                  lineHeight="none"
                  color="white"
                  bg="red.500"
                  borderRadius="full"
                >
                  {activeAlerts}
                </Box>
              )}
            </IconButton>
            <IconButton
              aria-label="Settings"
              icon={<SettingsIcon />}
              colorScheme={colorKey}
              variant="ghost"
            />
            <IconButton
              aria-label="Logout"
              icon={<FaSignOutAlt />}
              colorScheme={colorKey}
              variant="ghost"
            />
          </HStack>

          <Avatar name="Operator" bg={`${colorKey}.700`} color="white">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
        </HStack>
      </Flex>

      {/* Main Dashboard Grid */}
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {/* Main Status Metrics */}
        <GridItem colSpan={{ base: 12, lg: 9 }}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={6}>
            {/* Power Output */}
            <Card
              boxShadow="md"
              bgGradient={`linear(to-r, ${colorKey}.500, ${colorKey}.600)`}
              color="white"
            >
              <CardBody p={4}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium" mb={1}>
                      Reactor Power
                    </Text>
                    <Heading size="xl">{reactorPower}%</Heading>
                    <Text fontSize="sm">of Maximum Capacity</Text>
                  </Box>
                  <Box>
                    <CircularProgress
                      value={reactorPower}
                      color="white"
                      thickness="12px"
                      size="80px"
                    >
                      <CircularProgressLabel color="white" fontWeight="bold" fontSize="lg">
                        {reactorPower}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                </Flex>
              </CardBody>
              <CardFooter pt={0} pb={3} px={4}>
                <Flex justifyContent="space-between" width="100%" fontSize="sm">
                  <Text>Target: 98.5%</Text>
                  <Text>Variance: {(reactorPower - 98.5).toFixed(1)}%</Text>
                </Flex>
              </CardFooter>
            </Card>

            {/* Coolant Temperature */}
            <Card boxShadow="md">
              <CardBody p={4}>
                <HStack mb={1}>
                  <Icon as={FaThermometerFull} color="orange.500" />
                  <Text fontWeight="medium">Coolant Temperature</Text>
                </HStack>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Heading size="xl">{coolantTemp}°C</Heading>
                    <Flex mt={1} align="center">
                      <Text fontSize="sm" color={coolantTemp > 300 ? "orange.500" : "green.500"}>
                        {coolantTemp > 300 ? "Above" : "Within"} Normal Range
                      </Text>
                      <Icon
                        as={coolantTemp > 300 ? WarningIcon : CheckIcon}
                        ml={1}
                        boxSize={3}
                        color={coolantTemp > 300 ? "orange.500" : "green.500"}
                      />
                    </Flex>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" fontWeight="medium">
                      Safe Range
                    </Text>
                    <Text fontSize="xs">285°C - 300°C</Text>
                  </Box>
                </Flex>
              </CardBody>
              <CardFooter pt={0} pb={3} px={4}>
                <Progress
                  value={((coolantTemp - 280) / (320 - 280)) * 100}
                  size="sm"
                  colorScheme={coolantTemp > 300 ? "orange" : "green"}
                  borderRadius="full"
                />
              </CardFooter>
            </Card>

            {/* Reactor Pressure */}
            <Card boxShadow="md">
              <CardBody p={4}>
                <HStack mb={1}>
                  <Icon as={FaTachometerAlt} color={`${colorKey}.500`} />
                  <Text fontWeight="medium">Reactor Pressure</Text>
                </HStack>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Heading size="xl">{pressurePsi}</Heading>
                    <Text fontSize="sm">PSI</Text>
                  </Box>
                  <Box textAlign="right">
                    <Box
                      bg={`${colorKey}.100`}
                      color={`${colorKey}.700`}
                      px={3}
                      py={2}
                      borderRadius="md"
                      fontWeight="bold"
                    >
                      NORMAL
                    </Box>
                  </Box>
                </Flex>
              </CardBody>
              <CardFooter pt={0} pb={3} px={4}>
                <Flex justifyContent="space-between" width="100%" fontSize="sm">
                  <Text>Min: 2100 PSI</Text>
                  <Text>Max: 2300 PSI</Text>
                </Flex>
              </CardFooter>
            </Card>
          </SimpleGrid>

          {/* Secondary Metrics */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
            {/* Radiation Level */}
            <Card boxShadow="sm">
              <CardBody p={4}>
                <HStack justify="space-between" mb={1}>
                  <HStack>
                    <Icon as={FaRadiation} color="purple.500" />
                    <Text fontWeight="medium">Radiation Level</Text>
                  </HStack>
                  <Badge colorScheme={radiationLevel < 0.1 ? "green" : "orange"} variant="subtle">
                    {radiationLevel < 0.1 ? "Normal" : "Elevated"}
                  </Badge>
                </HStack>
                <Heading size="lg">{radiationLevel} mSv/h</Heading>
                <Text fontSize="xs" mt={1}>
                  Regulatory limit: 0.25 mSv/h
                </Text>
              </CardBody>
            </Card>

            {/* Turbine Load */}
            <Card boxShadow="sm">
              <CardBody p={4}>
                <HStack justify="space-between" mb={1}>
                  <HStack>
                    <Icon as={FaChartArea} color="blue.500" />
                    <Text fontWeight="medium">Turbine Load</Text>
                  </HStack>
                  <Badge colorScheme="blue" variant="subtle">
                    {turbineLoad > 95 ? "High" : "Normal"}
                  </Badge>
                </HStack>
                <Heading size="lg">{turbineLoad}%</Heading>
                <Text fontSize="xs" mt={1}>
                  Target efficiency: 97.0%
                </Text>
              </CardBody>
            </Card>

            {/* Grid Output */}
            <Card boxShadow="sm">
              <CardBody p={4}>
                <HStack justify="space-between" mb={1}>
                  <HStack>
                    <Icon as={FaBolt} color="yellow.500" />
                    <Text fontWeight="medium">Grid Output</Text>
                  </HStack>
                  <Badge colorScheme="yellow" variant="subtle">
                    {gridOutput > 1050 ? "Peak" : "Nominal"}
                  </Badge>
                </HStack>
                <Heading size="lg">{gridOutput} MW</Heading>
                <Text fontSize="xs" mt={1}>
                  Capacity: 1100 MW
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Power Generation Statistics */}
          <Card boxShadow="md" mb={6}>
            <CardHeader pb={0}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Power Generation</Heading>
                <HStack>
                  <IconButton
                    aria-label="Refresh"
                    icon={<RepeatIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme={colorKey}
                  />
                  <IconButton
                    aria-label="Download"
                    icon={<DownloadIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme={colorKey}
                  />
                </HStack>
              </Flex>
            </CardHeader>
            <CardBody p={4}>
              <Tabs colorScheme={colorKey} size="sm">
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Detailed Analysis</Tab>
                  <Tab>Historical Data</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel pt={4} px={0}>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Daily Output</StatLabel>
                        <StatNumber>{dailyOutput.toLocaleString()} MWh</StatNumber>
                        <StatHelpText>
                          <StatArrow type={dailyDelta > 0 ? "increase" : "decrease"} />
                          {Math.abs(dailyDelta)}% from yesterday
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Monthly Output</StatLabel>
                        <StatNumber>{monthlyOutput.toLocaleString()} MWh</StatNumber>
                        <StatHelpText>
                          <StatArrow type={monthlyDelta > 0 ? "increase" : "decrease"} />
                          {Math.abs(monthlyDelta)}% from last month
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Yearly Output</StatLabel>
                        <StatNumber>{yearlyOutput.toLocaleString()} MWh</StatNumber>
                        <StatHelpText>
                          <StatArrow type={yearlyDelta > 0 ? "increase" : "decrease"} />
                          {Math.abs(yearlyDelta)}% from last year
                        </StatHelpText>
                      </Stat>
                    </StatGroup>

                    {/* Placeholder for power generation chart */}
                    <Box
                      mt={6}
                      h="180px"
                      bg={`${colorKey}.50`}
                      borderRadius="md"
                      position="relative"
                      overflow="hidden"
                    >
                      {/* Simulated chart bars */}
                      {Array.from({ length: 24 }).map((_, i) => (
                        <Box
                          key={i}
                          position="absolute"
                          bottom="0"
                          left={`${i * 4 + 2}%`}
                          width="3%"
                          height={`${15 + Math.random() * 70}%`}
                          bg={`${colorKey}.${300 + (i % 3) * 100}`}
                          borderTopRadius="sm"
                        />
                      ))}

                      {/* Chart overlay */}
                      <Flex
                        position="absolute"
                        inset="0"
                        justify="center"
                        align="center"
                        bg="rgba(255, 255, 255, 0.7)"
                        color={`${colorKey}.600`}
                      >
                        <Text fontWeight="medium">Hourly Power Generation (24h)</Text>
                      </Flex>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box p={6} textAlign="center">
                      <Icon as={FaChartLine} boxSize={10} color={`${colorKey}.300`} mb={4} />
                      <Text color="gray.500">Detailed analysis charts would appear here</Text>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box p={6} textAlign="center">
                      <Icon as={FaHistory} boxSize={10} color={`${colorKey}.300`} mb={4} />
                      <Text color="gray.500">Historical data would appear here</Text>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>

          {/* Maintenance Schedule */}
          <Card boxShadow="md" mb={6}>
            <CardHeader pb={0}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Maintenance Schedule</Heading>
                <HStack>
                  <Button size="sm" leftIcon={<FaFilter />} variant="ghost" colorScheme={colorKey}>
                    Filter
                  </Button>
                  <Button size="sm" leftIcon={<FaList />} variant="ghost" colorScheme={colorKey}>
                    View All
                  </Button>
                </HStack>
              </Flex>
            </CardHeader>
            <CardBody p={4}>
              <TableContainer>
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Task</Th>
                      <Th>Assignee</Th>
                      <Th>Status</Th>
                      <Th>Due Date</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {maintenanceTasks.map(task => (
                      <Tr key={task.id}>
                        <Td fontFamily="mono">{task.id}</Td>
                        <Td fontWeight="medium">{task.task}</Td>
                        <Td>{task.assignee}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              task.status === "Completed"
                                ? "green"
                                : task.status === "In Progress"
                                  ? "blue"
                                  : task.status === "Pending Approval"
                                    ? "orange"
                                    : "gray"
                            }
                          >
                            {task.status}
                          </Badge>
                        </Td>
                        <Td>{task.due}</Td>
                        <Td>
                          <HStack spacing={1}>
                            <IconButton
                              aria-label="Edit task"
                              icon={<EditIcon />}
                              size="xs"
                              variant="ghost"
                              colorScheme={colorKey}
                            />
                            <IconButton
                              aria-label="View details"
                              icon={<ViewIcon />}
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
              </TableContainer>
            </CardBody>
            <CardFooter pt={0} justifyContent="center">
              <Button size="sm" colorScheme={colorKey}>
                Schedule New Maintenance
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

        {/* Right Sidebar */}
        <GridItem colSpan={{ base: 12, lg: 3 }}>
          {/* Alerts Section */}
          <Card boxShadow="md" mb={6} borderWidth="1px" borderColor={borderColor}>
            <CardHeader bg="red.500" color="white" py={3} borderTopRadius="md">
              <Flex align="center" justify="space-between">
                <HStack>
                  <Icon as={FaExclamationCircle} />
                  <Heading size="sm">Alerts & Notifications</Heading>
                </HStack>
                <Badge bg="white" color="red.500" borderRadius="full">
                  {alerts.length}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody p={0}>
              <VStack divider={<Divider />} spacing={0} align="stretch">
                {alerts.map((alert, index) => (
                  <Box
                    key={index}
                    p={3}
                    bg={
                      alert.level === "critical"
                        ? "red.50"
                        : alert.level === "warning"
                          ? "orange.50"
                          : alert.level === "info"
                            ? "blue.50"
                            : "green.50"
                    }
                  >
                    <Flex justify="space-between" mb={1}>
                      <HStack>
                        <Icon
                          as={
                            alert.level === "critical"
                              ? FaExclamationCircle
                              : alert.level === "warning"
                                ? FaExclamationTriangle
                                : alert.level === "info"
                                  ? InfoIcon
                                  : CheckIcon
                          }
                          color={
                            alert.level === "critical"
                              ? "red.500"
                              : alert.level === "warning"
                                ? "orange.500"
                                : alert.level === "info"
                                  ? "blue.500"
                                  : "green.500"
                          }
                        />
                        <Text
                          fontWeight="bold"
                          fontSize="sm"
                          color={
                            alert.level === "critical"
                              ? "red.500"
                              : alert.level === "warning"
                                ? "orange.500"
                                : alert.level === "info"
                                  ? "blue.500"
                                  : "green.500"
                          }
                        >
                          {alert.type}
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">
                        {alert.time}
                      </Text>
                    </Flex>
                    <Text fontSize="sm">{alert.description}</Text>
                  </Box>
                ))}
              </VStack>
            </CardBody>
            <CardFooter
              p={3}
              borderTop="1px solid"
              borderColor={borderColor}
              justifyContent="space-between"
            >
              <Button size="xs" variant="ghost" colorScheme={colorKey}>
                Mark All Read
              </Button>
              <Button
                size="xs"
                variant="ghost"
                colorScheme={colorKey}
                rightIcon={<ChevronRightIcon />}
              >
                View All
              </Button>
            </CardFooter>
          </Card>

          {/* Shift Schedule */}
          <Card boxShadow="md" mb={6}>
            <CardHeader pb={2}>
              <HStack>
                <Icon as={FaUsersCog} color={`${colorKey}.500`} />
                <Heading size="sm">Current Shift Schedule</Heading>
              </HStack>
            </CardHeader>
            <CardBody p={3}>
              {shifts.map((shift, index) => (
                <Flex
                  key={index}
                  mb={index < shifts.length - 1 ? 2 : 0}
                  p={2}
                  borderRadius="md"
                  borderLeft="3px solid"
                  borderColor={`${shift.color}.400`}
                  bg={`${shift.color}.50`}
                  _hover={{ bg: `${shift.color}.100` }}
                  transition="background 0.2s"
                >
                  <Box flex="1">
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold" fontSize="sm">
                        {shift.name} Shift
                      </Text>
                      <Badge colorScheme={shift.color} size="sm">
                        {shift.time}
                      </Badge>
                    </Flex>
                    <Text fontSize="xs" mt={1}>
                      Supervisor: {shift.supervisor}
                    </Text>
                    <Text fontSize="xs">Staff on duty: {shift.staff}</Text>
                  </Box>
                </Flex>
              ))}
            </CardBody>
            <CardFooter pt={0} justifyContent="center">
              <Button
                size="xs"
                leftIcon={<CalendarIcon />}
                variant="outline"
                colorScheme={colorKey}
              >
                Full Schedule
              </Button>
            </CardFooter>
          </Card>

          {/* Safety Section */}
          <Card boxShadow="md">
            <CardHeader pb={2}>
              <HStack>
                <Icon as={FaShieldAlt} color="green.500" />
                <Heading size="sm">Safety Metrics</Heading>
              </HStack>
            </CardHeader>
            <CardBody py={2} px={3}>
              <VStack spacing={3} align="stretch">
                {safetyMetrics.map((metric, index) => (
                  <Box
                    key={index}
                    borderRadius="md"
                    p={2}
                    bg={index % 2 === 0 ? `gray.50` : `transparent`}
                  >
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm">{metric.metric}</Text>
                      <Flex align="center">
                        <Text fontWeight="bold" mr={1}>
                          {metric.value}
                        </Text>
                        {metric.change !== "same" && (
                          <Icon
                            as={metric.change === "up" ? ArrowUpIcon : ArrowDownIcon}
                            color={
                              metric.metric.includes("Incident") || metric.metric.includes("Issues")
                                ? metric.change === "up"
                                  ? "red.500"
                                  : "green.500"
                                : metric.change === "up"
                                  ? "green.500"
                                  : "red.500"
                            }
                            boxSize={3}
                          />
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </CardBody>
            <CardFooter pt={2} justifyContent="center">
              <Button size="xs" leftIcon={<FaFileAlt />} variant="outline" colorScheme="green">
                Safety Report
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NuclearDashboard;
