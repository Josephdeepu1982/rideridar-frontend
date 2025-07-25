import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Heading,
    Text,
    Stack,
    HStack,
    Icon,
    Separator,
    Link,
    Grid,
    GridItem,
    Badge,
    Button,
    Select,
    createListCollection,
} from "@chakra-ui/react";
import {
    FaRegEnvelope,
    FaPhoneAlt,
    FaCar,
    FaUser,
    FaInfo,
    FaCaretSquareRight,
} from "react-icons/fa";

import {
    assignDriverToBooking,
    getBookingById,
} from "@/services/bookingService";
import { getFilteredDrivers } from "@/services/driverService";

const BookingDetail = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [booking, setBooking] = useState({});
    const [drivers, setDrivers] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState("");
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await getBookingById(id);
                setBooking(data);

                if (!data.driverAssigned) {
                    await fetchAvailableDrivers();
                }
            } catch (error) {
                console.error("Error fetching booking:", error);
            }
        };

        fetchBooking();

        const timeoutId = setTimeout(() => {}, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [id]);

    if (!booking) return <Text>Loading...</Text>;

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
            case "inprogress":
                return "yellow";
            case "confirmed":
                return "green";
            case "cancelled":
                return "red";
            case "completed":
                return "gray";
            default:
                return "yellow";
        }
    };

    const addSpacingPhone = (phone) => {
        if (!phone) return ""; // return empty string or placeholder
        return phone.toString().replace(/(\d{4})(\d{4})/, "$1 $2");
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);

        const options = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Singapore", // SGT timezone
        };

        const formatted = date.toLocaleString("en-GB", options);

        return formatted;
    };

    const handleAssignDriver = async () => {
        if (!selectedDriverId) return;

        try {
            setIsAssigning(true);

            // console.log("Selected Driver ID:", selectedDriverId);
            // console.log("Booking ID:", booking._id);

            await assignDriverToBooking(booking._id, selectedDriverId);

            const updatedBooking = await getBookingById(id);
            setBooking(updatedBooking);
            setSelectedDriverId("");
        } catch (error) {
            console.error("Error assigning driver:", error);
        } finally {
            setIsAssigning(false);
        }
    };

    const fetchAvailableDrivers = async () => {
        try {
            const data = await getFilteredDrivers(null, "active");
            setDrivers(data.data || data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    // check if guest data exists
    const hasGuestData =
        booking.guest && (booking.guest.name || booking.guest.phone);

    const driversCollection = createListCollection({
        items: drivers.map((driver) => ({
            label: `${driver.name} - ${driver.vehicle?.vehicleType || "N/A"}`,
            value: driver._id,
        })),
    });

    return (
        <>
            <Link onClick={() => navigate(-1)} mb={10}>
                &larr; Back to Bookings{" "}
            </Link>

            <Stack mb={6}>
                <Heading size="lg" color={"white"} mb={0} textAlign={"left"}>
                    Booking #{booking._id}
                </Heading>
                <Text color="gray.500">
                    Created on {formatDateTime(booking.createdAt)}
                </Text>
            </Stack>

            {/* Ride Details */}
            <Box p={5} border="2px solid gray" mb={8}>
                <HStack justify={"space-between"} mb={4}>
                    <Heading as="h3" color="palegoldenrod" mb={0}>
                        Ride Details
                    </Heading>
                    <Badge
                        colorPalette={getStatusColor(booking.status)}
                        textTransform={"uppercase"}
                        size={"lg"}
                    >
                        {booking.status}
                    </Badge>
                </HStack>
                <Separator border={"2px solid gray"} mb={5} />

                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={3}
                >
                    <GridItem colSpan={1}>
                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Trip Date & Time:
                            </Text>
                            <HStack>
                                <Icon as={FaCaretSquareRight} color="yellow" />
                                <Text>
                                    {formatDateTime(booking.trip?.date)}
                                </Text>
                            </HStack>
                        </Stack>

                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Pickup Location:
                            </Text>
                            <HStack>
                                <Icon as={FaCar} color="yellow" />
                                <Text>{booking.trip?.pickup || "N/A"}</Text>
                            </HStack>
                        </Stack>

                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Drop-off Location:
                            </Text>
                            <HStack>
                                <Icon as={FaCar} color="yellow" />
                                <Text>{booking.trip?.dropoff || "N/A"}</Text>
                            </HStack>
                        </Stack>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Purpose:
                            </Text>
                            <HStack>
                                <Icon as={FaInfo} color="yellow" />
                                <Text textTransform={"capitalize"}>
                                    {booking.trip?.ridePurpose || "N/A"}
                                </Text>
                            </HStack>
                        </Stack>

                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Driver:
                            </Text>
                            {booking.driverAssigned ? (
                                <HStack>
                                    <Icon as={FaUser} color="yellow" />
                                    <Text>{booking.driverAssigned?.name}</Text>
                                </HStack>
                            ) : (
                                <Stack gap={3}>
                                    <HStack>
                                        <Icon as={FaUser} color="yellow" />
                                        <Text>No driver assigned</Text>
                                    </HStack>
                                    <HStack gap={2}>
                                        <Select.Root
                                            textTransform={"capitalize"}
                                            collection={driversCollection}
                                            m={0}
                                            value={[selectedDriverId]}
                                            onValueChange={(details) =>
                                                setSelectedDriverId(
                                                    details.value[0]
                                                )
                                            }
                                        >
                                            <Select.HiddenSelect />
                                            <Select.Control>
                                                <Select.Trigger
                                                    bg="whiteAlpha.100"
                                                    color="white"
                                                >
                                                    <Select.ValueText
                                                        textTransform={
                                                            "capitalize"
                                                        }
                                                        placeholder="Select a driver"
                                                    />
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator />
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {driversCollection.items.map(
                                                        (driver) => (
                                                            <Select.Item
                                                                item={driver}
                                                                key={
                                                                    driver.value
                                                                }
                                                                textTransform={
                                                                    "capitalize"
                                                                }
                                                            >
                                                                {driver.label}
                                                                <Select.ItemIndicator />
                                                            </Select.Item>
                                                        )
                                                    )}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Select.Root>
                                        <Button
                                            size="sm"
                                            colorPalette="yellow"
                                            onClick={handleAssignDriver}
                                            disabled={
                                                !selectedDriverId || isAssigning
                                            }
                                            loading={isAssigning}
                                        >
                                            Assign
                                        </Button>
                                    </HStack>
                                </Stack>
                            )}
                        </Stack>

                        {booking.vehicle && (
                            <Stack gap={0} mb={5}>
                                <Text fontWeight="medium" color="gray.500">
                                    Vehicle:
                                </Text>
                                <HStack>
                                    <Icon as={FaCar} color="yellow" />
                                    <Text>
                                        {booking.vehicle?.model} (
                                        {booking.vehicle?.plateNumber})
                                    </Text>
                                </HStack>
                            </Stack>
                        )}
                    </GridItem>
                </Grid>
            </Box>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                }}
                gap={8}
                alignItems="stretch" // This makes both grid items equal height
            >
                {/* Customer Details */}
                <GridItem colSpan={hasGuestData ? 1 : 2}>
                    <Box p={5} border="2px solid gray" height="100%">
                        <Heading as="h3" color="palegoldenrod" mb={4}>
                            Contact Details
                        </Heading>
                        <Separator border={"2px solid gray"} mb={5} />

                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Full Name:
                            </Text>
                            <HStack>
                                <Icon as={FaUser} color="yellow" />
                                <Text>{booking.contact?.name || "N/A"}</Text>
                            </HStack>
                        </Stack>

                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Email:
                            </Text>
                            <HStack>
                                <Icon as={FaRegEnvelope} color="yellow" />
                                <Text>{booking.contact?.email || "N/A"}</Text>
                            </HStack>
                        </Stack>

                        <Stack gap={0} mb={5}>
                            {booking.contact?.phone && (
                                <Box>
                                    <Text fontWeight="medium" color="gray.500">
                                        Phone:
                                    </Text>
                                    <HStack>
                                        <Icon as={FaPhoneAlt} color="yellow" />
                                        <Text>
                                            +65{" "}
                                            {addSpacingPhone(
                                                booking.contact?.phone
                                            )}
                                        </Text>
                                    </HStack>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </GridItem>

                {/* Guest Details */}
                {hasGuestData && (
                    <GridItem colSpan={1}>
                        <Box p={5} border="2px solid gray" height="100%">
                            <Heading as="h3" color="palegoldenrod" mb={4}>
                                Guest Details
                            </Heading>
                            <Separator border={"2px solid gray"} mb={5} />

                            <Stack gap={0} mb={5}>
                                <Text fontWeight="medium" color="gray.500">
                                    Guest Name:
                                </Text>
                                <HStack>
                                    <Icon as={FaUser} color="yellow" />
                                    <Text>{booking.guest?.name || "N/A"}</Text>
                                </HStack>
                            </Stack>

                            {booking.guest?.phone && (
                                <Stack gap={0} mb={5}>
                                    <Text fontWeight="medium" color="gray.500">
                                        Guest Phone:
                                    </Text>
                                    <HStack>
                                        <Icon as={FaPhoneAlt} color="yellow" />
                                        <Text>
                                            +65{" "}
                                            {addSpacingPhone(
                                                booking.guest?.phone
                                            )}
                                        </Text>
                                    </HStack>
                                </Stack>
                            )}
                        </Box>
                    </GridItem>
                )}
            </Grid>
        </>
    );
};

export default BookingDetail;
