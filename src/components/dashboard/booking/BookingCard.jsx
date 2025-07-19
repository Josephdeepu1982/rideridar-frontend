import { Button, Card, HStack, Tag, Stack, Icon, Text } from "@chakra-ui/react";

import { FaRegUserCircle, FaRegCalendar, FaCar } from "react-icons/fa";
import { FaMapLocation, FaMapLocationDot } from "react-icons/fa6";
import { TbSteeringWheel } from "react-icons/tb";

const BookingCard = ({ data, index }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "yellow";
            case "confirmed":
                return "green";
            case "inprogress":
                return "teal";
            case "completed":
                return "gray";
            case "cancelled":
                return "red";
            default:
                return "yellow";
        }
    };

    return (
        <Card.Root variant="outline">
            <Card.Header>
                <HStack justifyContent="space-between">
                    <Card.Title m={0}>Booking #{index + 1}</Card.Title>
                    <Tag.Root
                        size={{ base: "sm", md: "lg" }}
                        colorPalette={getStatusColor(data.status)}
                    >
                        <Tag.Label textTransform="uppercase">
                            {data.status}
                        </Tag.Label>
                    </Tag.Root>
                </HStack>
            </Card.Header>
            <Card.Body>
                <Card.Description>
                    <Stack>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaRegUserCircle} />
                            <Text>{data.contact.name}</Text>
                        </HStack>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaRegCalendar} />
                            <Text>
                                {new Date(data.trip.date).toLocaleDateString()}{" "}
                                at {data.trip.time}
                            </Text>
                        </HStack>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaMapLocation} />
                            <Text>From : {data.trip.pickup}</Text>
                        </HStack>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaMapLocationDot} />
                            <Text>To : {data.trip.dropoff}</Text>
                        </HStack>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaCar} />
                            <Text textTransform="capitalize">
                                {data.trip.vehicleType}
                            </Text>
                        </HStack>
                        {data.driverAssigned && (
                            <HStack>
                                <Icon
                                    mr="1"
                                    fontSize="16"
                                    as={TbSteeringWheel}
                                />
                                <Text>{data.driverAssigned.name}</Text>
                                {/* <Text>Peter</Text> */}
                            </HStack>
                        )}
                    </Stack>
                </Card.Description>
            </Card.Body>
            <Card.Footer flexDirection="column">
                <HStack w="100%" colorPalette="blue">
                    <Tag.Root size={{ base: "sm", md: "md" }}>
                        <Tag.Label textTransform="uppercase">
                            {data.trip.paxNumber} pax
                        </Tag.Label>
                    </Tag.Root>
                    <Tag.Root size={{ base: "sm", md: "md" }}>
                        <Tag.Label textTransform="uppercase">
                            {data.trip.ridePurpose}
                        </Tag.Label>
                    </Tag.Root>
                    {data.flight.isGatePickupRequested ? (
                        <Tag.Root size={{ base: "sm", md: "md" }}>
                            <Tag.Label textTransform="uppercase">
                                Gate Pickup
                            </Tag.Label>
                        </Tag.Root>
                    ) : null}
                </HStack>
                <Button variant="outline" m={0} w="100%">
                    View Details
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default BookingCard;
