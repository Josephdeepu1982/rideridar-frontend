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
    Image,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import {
    FaRegEnvelope,
    FaPhoneAlt,
    FaCar,
    FaUser,
    FaInfo,
    FaCaretSquareRight,
} from "react-icons/fa";

import { getDriverById } from "@/services/driverService";

const DriverDetail = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [driver, setDriver] = useState({});

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const data = await getDriverById(id);
                setDriver(data);
            } catch (error) {
                console.error("Error fetching driver:", error);
            }
        };

        fetchDriver();

        const timeoutId = setTimeout(() => {}, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [id]);

    if (!driver) return <Text>Loading...</Text>;

    const addSpacingPhone = (phone) => {
        if (!phone) return ""; // return empty string or placeholder
        return phone.toString().replace(/(\d{4})(\d{4})/, "$1 $2");
    };

    return (
        <>
            <Link onClick={() => navigate(-1)} mb={10}>
                &larr; Back to Drivers{" "}
            </Link>

            <HStack spacing={6} mb={6}>
                <Image
                    src="https://picsum.photos/200/300"
                    boxSize="150px"
                    borderRadius="full"
                    fit="cover"
                    alt={driver.name}
                    mr={30}
                />
                <Stack>
                    <Heading size="lg" color={"white"} mb={0}>
                        {driver.name}
                    </Heading>
                    <Text color="gray.500">115 Bookings</Text>
                </Stack>
            </HStack>

            <Box p={5} border={"2px solid gray"}>
                <Heading as="h3" color={"palegoldenrod"}>
                    Driver Information
                </Heading>
                <Separator border={"2px solid gray"} mb={5} />

                {/* Driver Information */}
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
                                Full Name:
                            </Text>
                            <HStack>
                                <Icon as={FaUser} color="yellow" />
                                <Text>{driver.name}</Text>
                            </HStack>
                        </Stack>

                        <Stack gap={0} mb={5}>
                            <Text fontWeight="medium" color="gray.500">
                                Email:
                            </Text>
                            <HStack>
                                <Icon as={FaRegEnvelope} color="yellow" />
                                <Text>{driver.email}</Text>
                            </HStack>
                        </Stack>

                        {driver.phone && (
                            <Stack gap={0} mb={5}>
                                <Text fontWeight="medium" color="gray.500">
                                    Phone:
                                </Text>
                                <HStack>
                                    <Icon as={FaPhoneAlt} color="yellow" />
                                    <Text>
                                        +65 {addSpacingPhone(driver.phone)}
                                    </Text>
                                </HStack>
                            </Stack>
                        )}
                    </GridItem>

                    <GridItem colSpan={1}>
                        {driver.vehicle?.plateNumber && (
                            <Stack gap={0} mb={5}>
                                <Text fontWeight="medium" color="gray.500">
                                    Plate Number:
                                </Text>
                                <HStack>
                                    <Icon as={FaInfo} color="yellow" />
                                    <Text textTransform="uppercase">
                                        {driver.vehicle.plateNumber}
                                    </Text>
                                </HStack>
                            </Stack>
                        )}

                        {driver.vehicle?.model && (
                            <Stack gap={0} mb={5}>
                                <Text fontWeight="medium" color="gray.500">
                                    Car Model:
                                </Text>
                                <HStack>
                                    <Icon as={FaCar} color="yellow" />
                                    <Text textTransform="capitalize">
                                        {driver.vehicle.model}
                                    </Text>
                                </HStack>
                            </Stack>
                        )}

                        {driver.vehicle?.vehicleType && (
                            <Stack gap={0} mb={5}>
                                <Text fontWeight="medium" color="gray.500">
                                    Ride Type:
                                </Text>
                                <HStack>
                                    <Icon
                                        as={FaCaretSquareRight}
                                        color="yellow"
                                    />
                                    <Text textTransform="capitalize">
                                        {driver.vehicle.vehicleType}
                                    </Text>
                                </HStack>
                            </Stack>
                        )}
                    </GridItem>
                </Grid>
            </Box>
        </>
    );
};

export default DriverDetail;
