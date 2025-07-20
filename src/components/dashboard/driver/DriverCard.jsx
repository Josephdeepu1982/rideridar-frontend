import {
    Button,
    Card,
    HStack,
    Stack,
    Icon,
    Text,
    Avatar,
    Grid,
    Flex,
} from "@chakra-ui/react";

import { FaRegEnvelope, FaRegCalendar, FaCar } from "react-icons/fa";

const DriverCard = ({ data }) => {
    const addSpacingPhone = (phone) => {
        return phone.replace(/(\d{4})(\d{4})/, "$1 $2");
    };

    return (
        <Card.Root variant="outline">
            <Card.Header>
                <HStack mb="6" gap="3">
                    <Avatar.Root>
                        <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                        <Avatar.Fallback name="Nate Foss" />
                    </Avatar.Root>
                    <Stack gap="0">
                        <Text fontWeight="semibold" textStyle="sm">
                            {data.name}
                        </Text>
                        <Text color="fg.muted" textStyle="sm">
                            115 Bookings
                        </Text>
                    </Stack>
                </HStack>
            </Card.Header>
            <Card.Body>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={5}
                >
                    <Stack gap={0}>
                        <Text color="fg.muted" textStyle="sm">
                            Email
                        </Text>
                        <Text>{data.email}</Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text color="fg.muted" textStyle="sm">
                            Phone
                        </Text>
                        <Text>
                            +65 {addSpacingPhone(data.phone.toString())}
                        </Text>
                    </Stack>
                    <Stack columnSpan={2} gap={0}>
                        <Text color="fg.muted" textStyle="sm">
                            Vehicle Details
                        </Text>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaRegEnvelope} />
                            <Text>{data.email}</Text>
                        </HStack>
                        <HStack>
                            <Icon mr="1" fontSize="16" as={FaRegCalendar} />
                            <Text>{data.email}</Text>
                        </HStack>
                    </Stack>
                </Grid>
            </Card.Body>
            <Card.Footer flexDirection="column">
                <Button variant="outline" m={0} w="100%">
                    View Details
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default DriverCard;
