import { Box, Heading } from "@chakra-ui/react";

const OverviewLayout = () => {
    return (
        <Box p={5} border="2px solid gray">
            <Heading as="h3" color="palegoldenrod" mb={0}>
                Recent Bookings
            </Heading>
        </Box>
    );
};

export default OverviewLayout;
