import {
    Button,
    Card,
    HStack,
    Stack,
    Icon,
    Text,
    Avatar,
    Grid,
} from "@chakra-ui/react";

import { FaRegEnvelope, FaPhoneAlt, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DriverCard = ({ data }) => {
    const navigate = useNavigate();

    const addSpacingPhone = (phone) => {
        return phone.replace(/(\d{4})(\d{4})/, "$1 $2");
    };

    const handleViewDetails = () => {
        const dataId = data._id;

        if (dataId) {
            // Navigate to the driver detail page
            navigate(`/dashboard/drivers/${dataId}`);
        }
    };

    return (
        <Card.Root variant="outline">
            <Card.Header>
                <HStack gapY={3}>
                    <Avatar.Root>
                        <Avatar.Image src="https://picsum.photos/200/300" />
                        <Avatar.Fallback name={data.name} />
                    </Avatar.Root>
                    <Stack gap="0">
                        <Card.Title
                            fontWeight="semibold"
                            as="h3"
                            color={"palegoldenrod"}
                            mb={0}
                        >
                            {data.name}
                        </Card.Title>
                        <Text color="fg.muted" textStyle="sm">
                            115 Bookings
                        </Text>
                    </Stack>
                </HStack>
            </Card.Header>
            <Card.Body textStyle="sm">
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={5}
                >
                    <Stack gap={0}>
                        <HStack>
                            <Icon
                                mr="1"
                                fontSize="14"
                                color="fg.muted"
                                as={FaRegEnvelope}
                            />
                            <Text color="fg.muted">Email</Text>
                        </HStack>
                        <Text>{data.email}</Text>
                    </Stack>
                    <Stack gap={0}>
                        <HStack>
                            <Icon
                                mr="1"
                                fontSize="14"
                                color="fg.muted"
                                as={FaPhoneAlt}
                            />
                            <Text color="fg.muted">Phone</Text>
                        </HStack>
                        <Text>
                            +65 {addSpacingPhone(data.phone.toString())}
                        </Text>
                    </Stack>
                    <Stack columnSpan={2} gap={0}>
                        <HStack>
                            <Icon
                                mr="1"
                                fontSize="14"
                                color="fg.muted"
                                as={FaCar}
                            />
                            <Text color="fg.muted">Vehicle Details</Text>
                        </HStack>
                        <HStack>
                            <Text>Plate Number : </Text>
                            <Text textTransform={"uppercase"}>
                                {data.vehicle.plateNumber}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>Car Model : </Text>
                            <Text textTransform={"capitalize"}>
                                {data.vehicle.model}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text>Ride Type : </Text>
                            <Text textTransform={"capitalize"}>
                                {data.vehicle.vehicleType}
                            </Text>
                        </HStack>
                    </Stack>
                </Grid>
            </Card.Body>
            <Card.Footer flexDirection="column">
                <Button
                    variant="outline"
                    m={0}
                    w="100%"
                    onClick={handleViewDetails}
                >
                    View Details
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default DriverCard;
